export default function PrivacyNotice() {
  return <details className="mx-auto mb-5 max-w-3xl text-left text-xs leading-6 text-[#666]">
    <summary className="cursor-pointer py-2 text-center underline underline-offset-4">諮詢資料與網站分析說明</summary>
    <p>表單資料用於聯繫與處理購車需求，由顧問以私人收件系統保存。若需更正或刪除諮詢資料，請透過本頁電話或 LINE 聯繫鈺漣。</p>
    <p className="mt-2">本站啟用 Google Analytics 時，會使用 Cookie 等技術統計頁面瀏覽、車款與聯絡按鈕點擊，了解網站是否有助於選車。分析事件不包含姓名、電話、表單內容或案件編號；點擊聯絡不代表完成購車或預約。</p>
    <a href="https://policies.google.com/technologies/partner-sites?hl=zh-TW" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block underline">Google 如何處理合作網站的資訊</a>
  </details>;
}
