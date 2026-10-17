/**
 * Signed consultation receiver for a Google Apps Script web app (V8 runtime).
 *
 * Setup:
 * 1. Create a private spreadsheet with a tab named 諮詢收件 and these A:J headers:
 *    收件時間, 姓名, 聯絡方式, 想了解車款, 購車用途, 預算區間, 案件編號,
 *    處理狀態, 最後聯繫, 備註.
 * 2. In Project Settings > Script properties, set SPREADSHEET_ID, then run
 *    setupReceiver once as the owner to authorize spreadsheet access and create
 *    CONSULTATION_WEBHOOK_SECRET if it is absent. The function only verifies
 *    the target and configures the secret; it does not write spreadsheet data.
 *    Use the generated value as the website's server-only
 *    GOOGLE_SHEETS_WEBHOOK_SECRET. Never paste secret values into this file.
 * 3. Deploy as a web app executing as the owner, accessible to Anyone. The HMAC
 *    below authenticates requests; anonymous requests cannot read or write rows.
 *    Set the deployment /exec URL as GOOGLE_SHEETS_WEBHOOK_URL on the server.
 * 4. Keep only one receiver script project active for this sheet. ScriptLock
 *    coordinates this project's executions, not unrelated script projects.
 *
 * The signed input is timestamp + "." + the exact JSON payload string (UTF-8).
 * A request expires after five minutes. Replays inside that window acknowledge
 * the existing requestId without adding another row or overwriting status/notes.
 * Do not delete or edit the UUID in column G while retaining a consultation.
 * No request bodies, customer details, secrets, or raw errors are logged.
 *
 * API references:
 * https://developers.google.com/apps-script/reference/utilities/utilities
 * https://developers.google.com/apps-script/reference/lock/lock
 * https://developers.google.com/apps-script/guides/content
 */

function setupReceiver() {
  var lock;
  try {
    var properties = PropertiesService.getScriptProperties();
    var spreadsheetId = properties.getProperty("SPREADSHEET_ID");
    if (!spreadsheetId) return false;
    var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName("諮詢收件");
    if (!sheet || JSON.stringify(sheet.getRange(1, 1, 1, 10).getDisplayValues()[0]) !==
        JSON.stringify(receiverHeaders_())) return false;
    lock = LockService.getScriptLock();
    if (!lock.tryLock(3000)) return false;
    var existingSecret = properties.getProperty("CONSULTATION_WEBHOOK_SECRET");
    if (existingSecret !== null) return existingSecret.length >= 32;
    // Generate on Google's server and retain only in Script properties.
    var secret = Utilities.getUuid().replace(/-/g, "") + Utilities.getUuid().replace(/-/g, "");
    properties.setProperty("CONSULTATION_WEBHOOK_SECRET", secret);
    return true;
  } catch (_) {
    return false;
  } finally {
    if (lock && lock.hasLock()) lock.releaseLock();
  }
}

function doGet() {
  return jsonResponse_({ ok: false, error: "method_not_allowed" });
}

function doPost(event) {
  var lock;
  try {
    var properties = PropertiesService.getScriptProperties();
    var spreadsheetId = properties.getProperty("SPREADSHEET_ID");
    var secret = properties.getProperty("CONSULTATION_WEBHOOK_SECRET");
    if (!spreadsheetId || !secret || secret.length < 32) {
      return jsonResponse_({ ok: false, error: "not_configured" });
    }

    var contents = event && event.postData && event.postData.contents;
    if (typeof contents !== "string" || contents.length > 8192 ||
        typeof event.postData.type !== "string" ||
        event.postData.type.split(";")[0].trim().toLowerCase() !== "application/json") {
      return jsonResponse_({ ok: false, error: "invalid_request" });
    }
    var envelope = JSON.parse(contents);
    if (!envelope || typeof envelope !== "object" || Array.isArray(envelope) ||
        typeof envelope.timestamp !== "string" || !/^\d{10}$/.test(envelope.timestamp) ||
        typeof envelope.payload !== "string" || envelope.payload.length > 4096 ||
        typeof envelope.signature !== "string" || !/^[0-9a-f]{64}$/.test(envelope.signature)) {
      return jsonResponse_({ ok: false, error: "invalid_request" });
    }
    if (Math.abs(Math.floor(Date.now() / 1000) - Number(envelope.timestamp)) > 300) {
      return jsonResponse_({ ok: false, error: "expired_request" });
    }
    var expected = Utilities.computeHmacSha256Signature(
      envelope.timestamp + "." + envelope.payload, secret, Utilities.Charset.UTF_8
    ).map(function (byte) { return ("0" + ((byte + 256) % 256).toString(16)).slice(-2); }).join("");
    if (!equalSignature_(expected, envelope.signature)) {
      return jsonResponse_({ ok: false, error: "unauthorized" });
    }

    var record = JSON.parse(envelope.payload);
    if (!validRecord_(record)) return jsonResponse_({ ok: false, error: "invalid_record" });

    lock = LockService.getScriptLock();
    if (!lock.tryLock(3000)) return jsonResponse_({ ok: false, error: "busy" });
    var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName("諮詢收件");
    if (!sheet) return jsonResponse_({ ok: false, error: "sheet_not_configured" });
    if (JSON.stringify(sheet.getRange(1, 1, 1, 10).getDisplayValues()[0]) !== JSON.stringify(receiverHeaders_())) {
      return jsonResponse_({ ok: false, error: "headers_mismatch" });
    }
    var lastRow = sheet.getLastRow();
    var existing = lastRow > 1 && sheet.getRange(2, 7, lastRow - 1, 1)
      .createTextFinder(record.requestId).matchEntireCell(true).matchCase(true)
      .useRegularExpression(false).findNext();
    if (existing) return jsonResponse_({ ok: true, requestId: record.requestId, duplicate: true });

    var rowNumber = Math.max(lastRow + 1, 2);
    if (rowNumber > sheet.getMaxRows()) sheet.insertRowsAfter(sheet.getMaxRows(), 1);
    // Plain-text formatting preserves the phone's leading zero and prevents
    // automatic date/number conversion. Formula prefixes are escaped as well.
    var row = sheet.getRange(rowNumber, 1, 1, 10);
    row.setNumberFormat("@");
    row.setValues([[
      Utilities.formatDate(new Date(record.receivedAt), "Asia/Taipei", "yyyy-MM-dd HH:mm:ss"),
      sheetText_(record.name), sheetText_(record.contact), sheetText_(record.car),
      sheetText_(record.usage), sheetText_(record.budget), record.requestId,
      "待聯繫", "", ""
    ]]);
    // Complete pending writes before releasing the lock or acknowledging receipt.
    SpreadsheetApp.flush();
    return jsonResponse_({ ok: true, requestId: record.requestId, duplicate: false });
  } catch (_) {
    // A write may already have completed. Reconcile by requestId before retrying.
    return jsonResponse_({ ok: false, error: "receiver_error" });
  } finally {
    if (lock && lock.hasLock()) lock.releaseLock();
  }
}

function validRecord_(record) {
  if (!record || typeof record !== "object" || Array.isArray(record)) return false;
  var limits = { requestId: 36, receivedAt: 24, name: 50, contact: 10, car: 100, usage: 100, budget: 100 };
  if (!Object.keys(limits).every(function (key) {
    return typeof record[key] === "string" && record[key].length <= limits[key] &&
      !/[\u0000-\u001f\u007f]/.test(record[key]);
  })) return false;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(record.requestId) &&
    record.name.trim().length > 0 && /^09\d{8}$/.test(record.contact) &&
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(record.receivedAt) &&
    isFinite(Date.parse(record.receivedAt)) && new Date(record.receivedAt).toISOString() === record.receivedAt;
}

function receiverHeaders_() {
  return ["收件時間", "姓名", "聯絡方式", "想了解車款", "購車用途", "預算區間", "案件編號", "處理狀態", "最後聯繫", "備註"];
}

function equalSignature_(expected, supplied) {
  var difference = 0;
  for (var index = 0; index < expected.length; index++) {
    difference |= expected.charCodeAt(index) ^ supplied.charCodeAt(index);
  }
  return difference === 0;
}

function sheetText_(value) {
  return /^[=+\-@\t\r]/.test(value) ? "'" + value : value;
}

function jsonResponse_(result) {
  return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
}
