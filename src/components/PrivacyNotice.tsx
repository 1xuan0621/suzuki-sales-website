export default function PrivacyNotice({ locale = "zh-TW" }: { locale?: "zh-TW" | "en" }) {
  if (locale === "en") return <details className="mx-auto mb-5 max-w-3xl text-left text-xs leading-6 text-[#666]">
    <summary className="cursor-pointer py-2 text-center underline underline-offset-4">Consultation data and website analytics</summary>
    <p>Your form details are used to contact you about your car purchase and are saved in the advisor&apos;s private request system. To correct or delete your details, contact the advisor by phone or LINE using the links on this page.</p>
    <p className="mt-2">When Google Analytics is enabled, this website uses cookies and similar technologies to measure page views and clicks on model and contact links. This helps us understand whether the website supports your car search. Analytics events do not include your name, phone number, form details or request ID. A contact click does not mean a purchase or appointment has been completed.</p>
    <a href="https://policies.google.com/technologies/partner-sites?hl=en" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block underline">How Google uses information from partner websites</a>
  </details>;
  return <details className="mx-auto mb-5 max-w-3xl text-left text-xs leading-6 text-[#666]">
    <summary className="cursor-pointer py-2 text-center underline underline-offset-4">諮詢資料與網站分析說明</summary>
    <p>表單資料用於聯繫與處理購車需求，由顧問以私人收件系統保存。若需更正或刪除諮詢資料，請透過本頁電話或 LINE 聯繫鈺漣。</p>
    <p className="mt-2">本站啟用 Google Analytics 時，會使用 Cookie 等技術統計頁面瀏覽、車款與聯絡按鈕點擊，了解網站是否有助於選車。分析事件不包含姓名、電話、表單內容或案件編號；點擊聯絡不代表完成購車或預約。</p>
    <a href="https://policies.google.com/technologies/partner-sites?hl=zh-TW" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block underline">Google 如何處理合作網站的資訊</a>
  </details>;
}
