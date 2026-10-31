import type { CarId } from "./site";
import type { ContentSourceId } from "./content-sources";
import { emergencyFaqs } from "./emergency-faqs";

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  reviewedAt?: string;
  points?: string[];
  table?: { caption: string; columns: string[]; rows: string[][] };
  sourceIds: ContentSourceId[];
  links?: { href: string; label: string }[];
}

export const faqPage = {
  updatedAt: "2026-10-31",
  title: "常見 QA｜購車、事故保險與 SUZUKI 車型問題｜張鈺漣",
  description: "查找購車交車、保養胎壓及事故保險問題：停車被撞、玻璃飛石、爆胎、淹水與借車出險，也能了解 SWIFT 與 Jimny 重點問答。",
};

export const generalFaqGroups: { id: string; title: string; items: FaqItem[] }[] = [
  { id: "emergency", title: "事故與保險", items: emergencyFaqs },
  { id: "selection", title: "選車與用車需求", items: [
    { id: "suv-or-hatchback", question: "小家庭一定要買休旅車嗎？掀背小車夠不夠？", answer: "一至兩人市區通勤、以好停車為優先，可以先看 SWIFT；後座直立有 265 L 行李空間。經常全家出遊、需要同時放嬰兒車和行李，優先比較 S-CROSS 的 430–440 L 行李箱（依椅背角度）。兩張安全座椅加一位後座成人的組合，則需要把座椅裝好後試坐，因為五人座不等於三個座位都同樣寬。", reviewedAt: "2026-10-31", sourceIds: ["swift", "sCross"], links: [{ href: "/guides/suv-selection", label: "用五步驟挑家庭用車" }] },
    { id: "two-child-seats", question: "後座放兩張安全座椅，中間還能坐大人嗎？", answer: "不能只看五人座標示判斷。需以實際安全座椅正確安裝後，確認中間座面、肩部空間與安全帶扣具，讓成人試坐並正確繫帶。安裝位置和固定方式依車輛及安全座椅手冊，不為了擠出空間移動固定點。", sourceIds: [], links: [{ href: "/guides/suv-selection#seating", label: "帶家人試坐時確認這幾件事" }] },
    { id: "hybrid-payback", question: "一年只開五千公里，買油電就不划算嗎？", answer: "沒有固定里程門檻。先用實際成交價差、預估油耗與年里程算能源費差異，再把稅費、保養、保險與持有年數一起比較。里程少通常讓能源費較慢抵銷價差，但起步、煞車和乘坐感受仍可納入選擇；不要直接套用別台車的回本年限。", sourceIds: ["energyLabel"], links: [{ href: "/guides/powertrain-choice#cost", label: "看油電成本與回本算式範例" }] },
    { id: "hybrid-plug", question: "輕油電、一般油電、純電都要插電嗎？", answer: "SWIFT、VITARA、S-CROSS 的輕油電都不用插電，加汽油即可；減速時回收電能，再用來輔助引擎。一般 HEV 油電也不用插電。e VITARA 是純電車，要用充電設備補電；PHEV 則同時有油箱與外接充電功能。沒有固定充電位置、想維持加油習慣的人，可先選汽油或免插電油電。", reviewedAt: "2026-10-31", sourceIds: ["swift", "vitara", "sCross", "fit", "eVitara"], links: [{ href: "/guides/powertrain-choice#systems", label: "一次看懂動力系統差異" }] },
    { id: "suv-motion", question: "休旅車後座一定比較晃，或比較容易暈車嗎？", answer: "不能只用車型類別判斷每個人的感受。建議讓常坐車的人一起試乘，以相近路線、座位及一般起步煞車比較，記下座椅支撐、路面震動與噪音。網友心得適合拿來找試乘重點，無法代替家人的實際感受。", sourceIds: [], links: [{ href: "/guides/suv-selection#test-drive", label: "如何安排有比較基準的試乘" }] },
  ] },
  { id: "budget", title: "預算與付款", items: [
    { id: "total-cost", question: "網頁車價就是交車總價嗎？還有哪些費用？", answer: "網頁標示的是建議售價。請另外核對成交車價、保險、領牌及稅費、選配、貸款費用和另約運送費。已包含的項目不重複加算；已付訂金會抵車款。先拿到明細，再比較交車前支出與全期總成本。", sourceIds: ["consumer", "registration"], links: [{ href: "/guides/first-car#budget", label: "看購車預算與試算範例" }] },
    { id: "cash-or-loan", question: "現金、零利率或低月付，哪一種比較划算？", answer: "先取得各方案實際車價，再加總頭款、全部期款、尾期款及另收費用。低月付可能只是拉長期數或把金額留到後面；零利率也要看費用與折扣差異。請同時比較總費用年百分率、提前清償條件及自己的現金需求。", sourceIds: ["loan"], links: [{ href: "/guides/first-car#payment", label: "看貸款與保險比較清單" }, { href: "/#loan-calculator", label: "前往貸款試算" }] },
    { id: "insurance-coverage", question: "只買強制險夠嗎？「全險」到底包含什麼？", answer: "強制險提供法定範圍的人身傷亡保障，不包含車輛修復費用。對方財物損失、自己的車損與其他風險，需要分別確認相應險種。「全險」不是所有事故都賠的保證；請逐項核對保額、自負額及除外條款，再比較同條件保費。", sourceIds: ["insurance", "autoInsurance"], links: [{ href: "/guides/car-insurance-basics", label: "用四種損失看懂強制險、第三人與超額" }] },
    { id: "insurance-choice", question: "買新車一定要跟業務買乙式車險嗎？", answer: "汽車買賣定型化契約不得寫入排除或限制消費者自由投保的條款。乙式車體險不是所有新車都必買；但領牌仍須備妥有效的強制險。先分清強制險、車體險及第三人責任險，再依自己能承擔的損失選保障。若有人說報價、貸款或活動必須搭配特定保險，請對方把條件和不搭配時的價格寫清楚，再比較。", reviewedAt: "2026-10-03", points: ["用相同保障項目、保額、自負額及被保險人條件，分別取得報價；不要只比乙式或丙式的名稱與保費。", "自行投保時先與領牌承辦人確認保單生效及文件；簽約前看完整購車契約，確認理賠和後續服務找誰。"], sourceIds: ["carSalesContract", "insurance", "registration", "autoInsurance"], links: [{ href: "/guides/car-damage-insurance", label: "甲、乙、丙式情境比較" }, { href: "/guides/car-insurance-quote#buying-channel", label: "業務與網路投保怎麼比" }] },
  ] },
  { id: "order", title: "看車與訂車", items: [
    { id: "test-drive-booking", question: "試乘一定要先預約嗎？到北投所可以停車嗎？", answer: "建議先確認展示或試乘車款、可安排時段與路線，並說明同行人數。北投所提供免費停車位，抵達時可詢問現場人員停放位置；留下網站需求後，仍需由顧問確認才算完成預約。", sourceIds: [], links: [{ href: "/visit/beitou", label: "查看北投所交通與試乘預約" }] },
    { id: "deposit", question: "付了訂金可以退嗎？貸款沒過怎麼辦？", answer: "要看契約、解除原因與適用規定。先談妥退訂、貸款未核准、額度不足或利率不符預期時的處理方式，連同已施工配件如何結算一起留下書面約定。保留契約與收據，有爭議時再依實際文件尋求消費諮詢。", sourceIds: ["consumer"], links: [{ href: "/guides/first-car#contract", label: "看訂車前合約核對清單" }] },
    { id: "model-year", question: "年式、出廠年份和領牌日期有什麼不同？", answer: "年式指車輛款式或配備版本，出廠年月指實際生產時間，領牌日則是車籍登記的日期。三者可能不同；詢價時分開列出，並確認是否已領牌、實際配備與保固起算方式。不要只用『今年的新車』作為約定。", sourceIds: ["consumer"], links: [{ href: "/guides/first-car#contract", label: "了解報價與車輛身分核對" }] },
    { id: "window-tint", question: "2026 年新車隔熱紙怎麼選？業務送的也要符合規定嗎？", answer: "2026 年 2 月 28 日起首次領牌的新車若貼隔熱紙，一般車的前擋須用可見光透過率至少 70% 的合格產品，前側窗至少 40%，並有合格標識。贈送的隔熱紙也一樣。這是隔熱紙產品的規範；一般車的後側窗與後擋沒有同一數值門檻，計程車與幼童專用車另有要求。", reviewedAt: "2026-10-03", points: ["報價或訂單寫明每個車窗的隔熱紙廠牌、完整型號、透光率、費用及施工保固；「送隔熱紙」四個字不足以核對。", "用完整型號到官方合格產品清單查詢；合格型號會更新，不用舊貼文的款數或推薦名單判斷。", "交車時核對實際產品與合格標識，並在夜間或雨天留意視線；有攝影機或感測器的區域，請施工方依車輛手冊確認不可遮蔽的位置。"], sourceIds: ["windowTintRules", "windowTintProducts"], links: [{ href: "/guides/first-car#contract", label: "看報價單還要寫清哪些配件" }] },
    { id: "waiting-time", question: "訂車後多久能交？有車是不是就能馬上領？", answer: "交期還會受到車色與版本供應、貸款及文件進度、領牌與配件施工影響。先確認是否已有可分配車輛、目前完成哪個步驟，以及預估時間或約定期限。若有指定用車日期，下訂前就提出並談妥延誤處理。", sourceIds: [], links: [{ href: "/guides/first-car#paperwork", label: "看訂車到交車的安排" }] },
  ] },
  { id: "delivery", title: "領牌與交車", items: [
    { id: "payment-inspection", question: "要先付尾款還是先驗車？領牌前能看車嗎？", answer: "看車、付款、領牌及配件施工的順序，應在簽約時明確約定。希望領牌前看指定實車，就提前安排查看時間及付款條件；不要把別人的交車經驗當成所有車商都相同的流程。交車當天仍需依契約點交並記錄待處理事項。", sourceIds: ["consumer"], links: [{ href: "/guides/first-car#paperwork", label: "看付款與領牌前的安排" }] },
    { id: "registration-documents", question: "領牌要準備什麼？證件什麼時候交？", answer: "個人、公司及委託代辦所需文件不同。個人身分證明與印章、車輛出廠及完稅資料、發票、保險等需按監理要求備妥，請承辦人提供完整清單。交付前確認用途、管道與歸還時間；本站諮詢表單不用填證件或銀行資料。", sourceIds: ["registration"], links: [{ href: "/guides/first-car#paperwork", label: "看領牌文件與交車準備" }, { href: "/guides/license-plate", label: "車牌怎麼選？看費用、競標與領牌期限" }] },
    { id: "remote-purchase", question: "住外縣市也能買嗎？可以送到家嗎？", answer: "可以先遠端了解車款、需求與報價，再確認到店或文件安排。若希望其他地點交車，需依地點討論運送方式、費用、保險與驗收；交車地點、時程和可安排範圍以個案約定為準。", sourceIds: [], links: [{ href: "/guides/first-car#paperwork", label: "看跨縣市購車與交車流程" }] },
  ] },
  { id: "ownership", title: "換車與售後", items: [
    { id: "local-service", question: "在台北買車，之後保養一定要回台北嗎？", answer: "可先從 Taiwan Suzuki 官方保修據點查找附近服務中心，洽詢預約及車輛保養需求。保固依隨車文件與適用條件辦理；購車贈送保養或經銷商專案是否限店使用，另行確認。加裝配件也要分清施工與保固窗口。", sourceIds: ["service"], links: [{ href: "/guides/first-car#paperwork", label: "看跨縣市交車安排" }] },
    { id: "trade-in-tax", question: "沒有舊車也能減稅嗎？換購一定能折 10 萬嗎？", answer: "新購小客車減稅與汰舊換新是兩組條件。依財政部現行規則，符合條件的新購 2,000cc 以下小客車可減徵最高 5 萬元；符合汰舊換新可另申請最高 5 萬元，合計受已繳貨物稅額限制。純電車、小貨車等須另核對，不是每台車都能折 10 萬。", sourceIds: ["tax"], links: [{ href: "/guides/trade-in#tax", label: "看舊車換購與減稅注意事項" }] },
  ] },
  { id: "maintenance", title: "保養與日常檢查", items: [
    { id: "maintenance-low-mileage", question: "半年開不到三千公里，也要保養嗎？", answer: "先看自己的保養表，不能只看里程。若同時規定時間與里程、採先到者為準，時間到仍應安排相應保養。首次檢查與後續定保分開核對；各車型、年式和使用條件可能不同，請服務廠依 Suzuki 台灣隨車文件確認，不套用其他品牌或海外週期。", sourceIds: ["maintenancePrinciples", "service"], links: [{ href: "/guides/car-maintenance#schedule", label: "找到自己適用的保養週期" }] },
    { id: "maintenance-extras", question: "保養單上的清潔、添加劑都一定要做嗎？", answer: "先問這一項是手冊到期項目、檢查後的症狀處理，還是可自選的清潔服務，並請接待說明原因與費用。不能把所有加項都當必要，也不要只看名稱就刪掉有車況依據的處置。維修與追加項目應事先說明、取得同意，取車時再核對工單。", sourceIds: ["repairConsent"], links: [{ href: "/guides/car-maintenance#work-order", label: "把保養工單分成三類來看" }] },
    { id: "tire-pressure", question: "胎壓要打多少？可以跟別台車一樣嗎？", answer: "依自己車門框標籤或車主手冊的建議冷胎胎壓，在冷胎時量測，並確認前後輪、負載條件和單位。不同車型不共用同一個 PSI 數字，也不要把胎壁最大壓力當成車輛建議值。找不到標籤或讀不懂時，請服務廠協助核對。", sourceIds: ["tirePressure"], links: [{ href: "/guides/car-maintenance#daily-checks", label: "查看日常檢查與紀錄清單" }] },
    { id: "tire-replacement", question: "第一次換輪胎，幾公里或幾年一定要換？", answer: "沒有適用所有車的固定公里數。先看四輪最淺胎紋與磨耗指示點，再看胎側是否有裂傷、鼓包或異常變形，以及製造日期與使用狀況。交通部建議輪胎從製造日起最長使用 10 年，並非保證 10 年內都安全。胎紋任一點不足 1.6 mm 不得行駛高速或快速公路；雨天抓地和排水可能在磨到下限前就變差，有疑慮應請專業人員檢查。", reviewedAt: "2026-10-03", points: ["請技師量四輪胎紋、指出是否偏磨，說明是調整胎壓、檢查定位，還是需要換胎。", "輪胎破損、胎壓持續下降或行駛異常時，先安全停車尋求協助，不靠補氣或只看胎紋判定能繼續開。"], sourceIds: ["tireSafety", "tireAge", "tireManufacturerAdvice", "tireReplacement"], links: [{ href: "/guides/car-maintenance#daily-checks", label: "平常怎麼檢查輪胎與胎壓" }] },
    { id: "tire-pair", question: "只換兩條輪胎可以嗎？新胎要放前輪還是後輪？", answer: "先看另外兩條的胎紋、胎齡與損傷，不能只因兩條看起來還有紋就保留。輪胎廠建議四條一致；若經檢查只換兩條，至少同軸成對，尺寸與類型須符合原車規格，新胎通常裝後軸以維持濕地穩定。四驅車更要先依車主手冊及服務廠確認四輪規格與磨耗差，不能直接套用一般換兩條的做法。", reviewedAt: "2026-10-03", points: ["帶車主手冊或車門標示，請店家列明新胎尺寸、載重與速度指數、完整型號、製造日期及含安裝的總價。", "問清楚新胎安裝位置、是否需要檢查定位與胎壓警示系統，施工後核對工單；選安靜、耐磨或濕地表現時，以自己常走路況排序。"], sourceIds: ["tireReplacement", "tireManufacturerAdvice"], links: [{ href: "/faq#tire-replacement", label: "先看自己的輪胎是否該換" }, { href: "/faq#tire-pressure", label: "確認適用的冷胎胎壓" }] },
    { id: "ev-maintenance", question: "油電車少換機油、純電車不用保養，是真的嗎？", answer: "不能這樣推定。汽油引擎仍在的輕油電或一般油電，須依各車保養表維護引擎；純電車雖沒有引擎機油，輪胎、煞車等仍需檢查。實際更換項目與週期以該車手冊為準，不能直接沿用別種動力的保養單。", sourceIds: ["maintenancePrinciples", "service"], links: [{ href: "/guides/car-maintenance#powertrain", label: "不同動力的保養差別" }] },
    { id: "battery-life", question: "油電或電動車的電池，保固到期就得換嗎？", answer: "保固期限不是固定更換日期，也不是壽命保證。是否需要更換要看電池種類、檢測結果與車況；先分清一般供電電瓶、輕油電電池與純電動力電池。詢價時再核對零件、工資及保固條件，不直接拿網友帳單推算自己的費用。", sourceIds: [], links: [{ href: "/guides/powertrain-choice#decision", label: "選車前要問清楚哪些電池條件？" }] },
  ] },
];

const suvTable = {
  caption: "VITARA 與 S-CROSS：動力、驅動與行李空間",
  columns: ["比較項目", "VITARA", "S-CROSS"],
  rows: [
    ["動力", "1.4L 渦輪、48V 輕油電", "1.4L 渦輪、48V 輕油電"],
    ["驅動", "ALLGRIP 四驅", "前輪驅動"],
    ["後座直立行李空間", "375 L", "430–440 L（依椅背角度）"],
    ["適合優先考慮的需求", "需要四驅、常遇低抓地路面", "家庭出遊、嬰兒車與行李載物"],
  ],
};

export const carFaqs: Record<CarId, FaqItem[]> = {
  swift: [
    { id: "swift-vs-small-cars", question: "SWIFT 和 FIT 等小車怎麼選？", answer: "以市區通勤、巷弄停車為主，優先看車長 3.86 m、迴轉半徑 4.8 m 的 SWIFT。常載高物品或需要更多座椅變化，FIT 的後座上掀與前倒功能更值得比較。動力方面，SWIFT 是 1.2L 輕油電；FIT 可選 1.5L 汽油或有純電驅動模式的 e:HEV，兩款都能在不用外接充電的情況下使用。", reviewedAt: "2026-10-31", table: { caption: "SWIFT 與 Honda FIT：依台灣版本整理的選車重點", columns: ["比較項目", "SWIFT", "Honda FIT"], rows: [["動力選擇", "1.2L、12V 輕油電", "1.5L 汽油／e:HEV 油電"], ["座椅與載物", "後座直立 265 L、傾倒 579 L", "後座可上掀、前倒，適合高物品與多種裝載方式"], ["選擇重點", "車長 3.86 m，偏重市區通勤與好停車", "偏重後座與載物彈性，可選 e:HEV 油電"]] }, sourceIds: ["swift", "swiftSpecs", "fit"], links: [{ href: "/guides/first-car#budget", label: "把完整購車與養車成本也算進去" }] },
    { id: "swift-hybrid", question: "SWIFT 輕油電需要充電嗎？和一般油電一樣嗎？", answer: "不用充電，日常加汽油即可。SWIFT 的 1.2L 引擎搭配 12V 輕油電與 CVT，減速時回收電能，起步與加速時輔助引擎。它以引擎驅動為主；如果想要一般油電那種低速純電行駛模式，可一起比較 FIT e:HEV。", reviewedAt: "2026-10-31", sourceIds: ["swift", "swiftSpecs", "fit"], links: [{ href: "/guides/powertrain-choice", label: "比較輕油電、一般油電與純電的選購條件" }] },
    { id: "swift-rear-seat", question: "SWIFT 後座和行李箱夠用嗎？可以放嬰兒車嗎？", answer: "後座直立時有 265 L 行李箱，傾倒後可擴充到 579 L。一至兩人通勤、日常採買適合先看 SWIFT；經常帶嬰兒車又要載全家出遊，建議同時比較 430–440 L 的 S-CROSS。嬰兒車能否放入取決於收折後的長寬高，到店時以保留安全座椅與後座乘客的位置試放最實用。", reviewedAt: "2026-10-31", sourceIds: ["swift", "swiftSpecs", "sCross"], links: [{ href: "/visit/beitou", label: "帶著家人與行李尺寸到店確認" }] },
    { id: "swift-parking", question: "SWIFT 尺寸多大？可以停機械車位嗎？", answer: "SWIFT 車長 386 cm、車寬 173.5 cm、車高 148 cm，空車重 945 kg，最小迴轉半徑 4.8 m，適合以巷弄通勤、停車便利為優先的買家。以限高 155 cm 的機械車位為例，車身高度有 7 cm 餘裕；限高 145 cm 的車位則不適用。長、寬、載重也須符合車位標示，機械設備還要比對輪槽與入口，這兩項可直接用車位照片和設備尺寸討論。", reviewedAt: "2026-10-31", sourceIds: ["swiftSpecs"] },
    { id: "swift-consumption", question: "SWIFT 實際油耗怎麼算？官方數字和車主心得能直接比較嗎？", answer: "SWIFT 官方能源效率標示為 24.5 km/L。要算自己的通勤油耗，用兩次加滿之間的行駛公里數除以補入油量；例如跑 420 km、補 21 L，就是 20 km/L。估油錢時用自己的加油紀錄，儀表數字和車主心得則適合比較不同路線、塞車比例帶來的差異。", reviewedAt: "2026-10-31", points: ["每次加至油槍第一次自動跳停，記下里程與補入公升數。", "連續記錄幾次後，用總行駛里程除以總補入油量；起始第一次加滿的油量不計入。"], sourceIds: ["swift", "swiftSpecs"], links: [{ href: "/cars/swift#owner-experience", label: "看 SWIFT 車主的通勤與出遊心得" }, { href: "/guides/first-car#budget", label: "看每月養車費怎麼抓" }] },
    { id: "swift-vibration", question: "SWIFT 三缸引擎會很抖嗎？試乘要怎麼判斷？", answer: "SWIFT 使用 1.2L 三缸引擎與 12V 輕油電；在意振動的人，試乘重點是停等怠速、熄火後再啟動、低速起步這三段。開著平常會用的冷氣，留意方向盤、座椅與引擎聲，再讓經常同行的家人坐後座感受。這比只在順暢道路繞一圈，更容易判斷是否適合每天通勤。", reviewedAt: "2026-10-31", sourceIds: ["swift", "swiftSpecs"], links: [{ href: "/cars/swift#owner-experience", label: "把車主心得當成自己的試乘檢查項目" }] },
  ],
  jimny: [
    { id: "jimny-model-update", question: "Jimny 2026 改款差在哪？新舊配備要怎麼比？", answer: "與官方 2024 台灣型錄相比，Jimny 2026 改款的重點是主動安全與車內介面升級：ACC 主動式車距巡航、DSBS II 煞車輔助、LDP 車道偏離輔助、TSR 交通標誌辨識，以及支援無線 Apple CarPlay／Android Auto 的 9 吋車機。仍保留 1.5L 引擎、四速自排、大樑與加力箱四驅配置。", reviewedAt: "2026-09-20", table: { caption: "Jimny：2024 台灣型錄與 2026 現行台灣規配對照", columns: ["核對重點", "2024 台灣型錄", "2026 現行台灣規配"], rows: [["煞車輔助", "DSBS 雙感知器", "DSBS II 雙感知器"], ["巡航", "定速巡航", "ACC 主動式車距巡航"], ["車道與路標", "LDWS 車道偏離警示", "保留 LDWS，加入 LDP 與 TSR"], ["車機", "CD／MP3、藍牙；觸控螢幕為選配", "標配 9 吋觸控螢幕、無線手機連結"], ["動力與四驅", "1.5L、四速自排、加力箱四驅", "維持 1.5L、四速自排、加力箱四驅"]] }, points: ["本文 Jimny 2026 指台灣現行 THE NEW Jimny 三門四人座；不混用海外五門車型的價格與配備。", "年式、出廠年月與領牌日期分開確認，下訂時以台灣規配表、實際車輛及合約配備清單為準。", "駕駛輔助有作動條件，請依車主手冊使用，駕駛仍須持續注意路況。"], sourceIds: ["jimny", "jimnySpecs", "jimnyPrevious", "jimny2026"], links: [{ href: "/faq#model-year", label: "年式、出廠與領牌日期有何不同？" }] },
    { id: "jimny-daily-use", question: "Jimny 只跑市區、平地適合嗎？後座和長途要注意什麼？", answer: "一至兩人用車、喜歡方正造型，也可以選 Jimny 作市區通勤。車長 3.65 m、車寬 1.645 m，車身短小；但車高 1.705 m，低限高車位要先排除。三門四人座的後座需要從前門進出，經常三、四人長途又帶行李，會更建議先看五門的 VITARA 或 S-CROSS。", reviewedAt: "2026-10-31", points: ["兩人用車可將後座傾倒載物；需要乘坐後座時，保留座位再安排行李。", "長途試乘帶常同行的家人一起，重點感受後座進出、路面起伏與噪音。"], sourceIds: ["jimny", "jimnySpecs"], links: [{ href: "/cars/jimny#daily-use", label: "照人數、行李與車位檢查日常適用性" }, { href: "/cars/jimny#owner-experience", label: "看 Jimny 車主分享的優點與取捨" }, { href: "/cars/vitara#vitara-vs-s-cross", label: "看看 VITARA 與 S-CROSS 的選擇方向" }] },
    { id: "jimny-four-wheel-drive", question: "Jimny 四驅可以一直開著嗎？下雨就要切 4H 嗎？", answer: "一般柏油路使用 2H，不要只因下雨就固定切到 4H。Jimny 採分時四驅，4H、4L 是給適合的低抓地路面與低速需求使用，切換方式依隨車手冊操作。日常通勤先熟悉 2H，真的需要走非鋪裝路面時，再學習四驅模式與路線判斷。", reviewedAt: "2026-10-07", sourceIds: ["jimny", "jimnyDrive"], links: [{ href: "/guides/jimny-history#off-road-design", label: "了解 Jimny 越野結構與日常使用的關係" }] },
    { id: "jimny-modifications", question: "Jimny 想改 AT 胎、升高或車頂架，先改哪一項？", answer: "先試原廠車，確認要改善的是舒適、裝載還是非鋪裝路能力。通勤不一定需要 AT 胎，升高也不等於一定更舒服。台灣避震器變更有不得超過原核定車身高度等規定；車頂架另按固定方式確認檢驗登記。現行 Jimny 的雷達、攝影機與保固，也要按實際配件核對。", reviewedAt: "2026-10-07", sourceIds: ["jimny", "allTerrainTyres", "vehicleModificationRules", "roofRackRules"], links: [{ href: "/guides/jimny-modifications", label: "看輪胎、升高、車頂架與保固的完整確認清單" }] },
    { id: "jimny-five-door", question: "Jimny 五門、Sierra、Nomade 和台灣三門版有什麼不同？", answer: "日本 Jimny 輕型版與 Jimny Sierra 的車體、動力規格不同；五門版在 2023 年全球發表，日本則於 2025 年推出名為 Nomade 的版本。台灣官網本次核對仍以三門四人座 Jimny 為準，不能直接套用海外價格、配備或交期；想看五門消息，請以台灣官方後續公告確認。", reviewedAt: "2026-10-07", sourceIds: ["jimnyHistory", "jimnyFiveDoor", "jimnyNomade", "jimny"], links: [{ href: "/guides/jimny-history#model-names", label: "對照 JB64、JB74 與五門版的名稱" }] },
    { id: "jimny-all-terrain-tyres", question: "Jimny 換 AT 胎，雨天就一定更安全嗎？", answer: "不能這樣判斷。AT 代表全地形取向，不是濕地煞車保證；不同胎款仍有噪音與公路性能取捨。多數時間通勤時，先比較符合原廠規格的輪胎、濕地表現、載重與速度等級，再依實際路況選擇，不只看胎紋外型。", reviewedAt: "2026-10-07", sourceIds: ["allTerrainTyres"], links: [{ href: "/guides/jimny-modifications#tyres", label: "換胎與輪圈前要核對哪些項目？" }] },
  ],
  "e-vitara": [
    { id: "e-vitara-charging", question: "e VITARA 充電前要準備什麼？用哪種接頭？", answer: "台灣 e VITARA 的慢充接頭是 Type 1（J1772），快充是 CCS1。家中能裝充電設備，可用晚間停車時間補電；主要使用公共充電的人，先找通勤路線上的 CCS1 快充與另一個備用站。家充安裝需要專業人員評估停車位供電、配線及社區施工安排。", reviewedAt: "2026-10-31", points: ["日常慢充找 Type 1（J1772），途中快充找 CCS1。", "比較站點時，把充電費、停車費與開放時間一起看。"], sourceIds: ["eVitara"], links: [{ href: "/guides/first-car#budget", label: "把設備、施工與充電費納入預算" }] },
    { id: "e-vitara-public-charging", question: "沒有家用充電樁，也適合買 e VITARA 嗎？", answer: "可以，但更適合公司或常去地點有固定充電機會的人。只靠公共快充時，先把補電排進採買、用餐等原有行程，並找一個備用 CCS1 站；如果每次都要特地繞路、等候，免插電的 VITARA 或 S-CROSS 會更省事。", reviewedAt: "2026-10-31", sourceIds: ["eVitara", "vitara", "sCross"] },
    { id: "e-vitara-charging-time", question: "充到滿一定只要官網寫的時間嗎？", answer: "快充約 45 分鐘指的是 DC CCS1 從 10% 充到 80%，不是充滿；AC Type 1 以 7 kW 充電，10% 到 100% 約 9 小時。兩者是官方公布的開發階段室溫目標值，適合用來理解「途中補電」與「停一晚慢充」的差別，現場時間還會隨充電功率與電池溫度改變。", reviewedAt: "2026-10-31", sourceIds: ["eVitara"] },
    { id: "e-vitara-range", question: "官方續航里程是實際保證嗎？長途怎麼安排？", answer: "2WD 的官方 NEDC 續航為 516 km，ALLGRIP-e 為 444 km；這是測試續航。長途規劃先找出路線上的 CCS1 快充，將補電安排在用餐或休息站，下一站之外再留一個備用站。行駛中以車上剩餘里程與導航距離調整停靠，不必等到接近沒電才找站。", reviewedAt: "2026-10-31", sourceIds: ["eVitara"] },
    { id: "e-vitara-versions", question: "e VITARA 2WD 與 ALLGRIP-e 怎麼選？", answer: "市區通勤、一般公路旅行，希望兩次充電之間跑得更遠，優先選單馬達前驅 2WD，官方 NEDC 續航 516 km。需要四驅與 TRAIL 模式，再選前後雙馬達的 ALLGRIP-e，官方 NEDC 續航 444 km。兩款的核心取捨就是較長續航與四驅能力。", reviewedAt: "2026-10-31", sourceIds: ["eVitara"] },
  ],
  vitara: [
    { id: "vitara-vs-s-cross", question: "VITARA 和 S-CROSS 怎麼選？", answer: "通勤、接送與家庭旅行為主，優先看 S-CROSS：後座直立行李箱 430–440 L（依椅背角度），比 VITARA 的 375 L 更寬裕。需要 ALLGRIP 四驅、常遇到較低抓地路面，再選 VITARA。兩款都是 1.4L 渦輪、48V 輕油電，不用外接充電。", reviewedAt: "2026-10-31", table: suvTable, sourceIds: ["vitara", "sCross"], links: [{ href: "/cars/s-cross#s-cross-vs-vitara", label: "從 S-CROSS 的需求看看怎麼選" }] },
    { id: "vitara-hybrid", question: "VITARA 和 e VITARA 是同一種油電車嗎？", answer: "不同。VITARA 是 1.4L 汽油渦輪搭配 48V 輕油電，加汽油、不用插電；e VITARA 是純電車，使用 Type 1 慢充與 CCS1 快充。想維持原本的加油習慣選 VITARA；有方便的充電位置、想改用純電，再比較 e VITARA。", reviewedAt: "2026-10-31", sourceIds: ["vitara", "eVitara"], links: [{ href: "/cars/e-vitara#e-vitara-charging", label: "了解 e VITARA 充電準備" }] },
    { id: "vitara-allgrip", question: "VITARA 有四驅，就適合所有露營或山路嗎？", answer: "VITARA 的 ALLGRIP 有 Auto、Sport、Snow、Lock 四種模式：日常道路用 Auto，需要時分配四驅動力；Snow 對應濕滑路面，Lock 用於受困時脫困。常跑一般柏油山路不一定需要四驅，優先比較乘坐與行李空間；路線涉及泥地、鬆軟地面時，四驅才是更值得比較的條件。", reviewedAt: "2026-10-31", sourceIds: ["vitara"] },
  ],
  "s-cross": [
    { id: "s-cross-vs-vitara", question: "S-CROSS 與 VITARA，家庭用車先比什麼？", answer: "以全家接送、旅行與載行李為主，優先看 S-CROSS。後座直立有 430–440 L 行李箱（依椅背角度），比 VITARA 的 375 L 更寬裕，也有 360 度環景輔助停車。若更需要四輪驅動，再選 ALLGRIP 的 VITARA；兩款都採免插電的 1.4L 渦輪、48V 輕油電。", reviewedAt: "2026-10-31", table: suvTable, sourceIds: ["sCross", "vitara"], links: [{ href: "/cars/vitara#vitara-vs-s-cross", label: "查看 VITARA 的比較與四驅問答" }] },
    { id: "s-cross-luggage", question: "S-CROSS 行李箱夠放全家出遊行李嗎？", answer: "S-CROSS 後座直立時有 430–440 L 行李空間，依椅背角度而變；傾倒後可擴充到 1,230 L。全家出遊以 430–440 L 規劃；兩人出門要載較大物件，才用得到傾倒後的空間。經常要同時放嬰兒車與行李，S-CROSS 比 265 L 的 SWIFT 更值得優先試放。", reviewedAt: "2026-10-31", sourceIds: ["sCross", "swift"] },
    { id: "s-cross-hybrid", question: "S-CROSS 要充電嗎？台灣版本有四驅嗎？", answer: "不用充電。台灣 S-CROSS 採 1.4L 渦輪、48V 輕油電與前輪驅動，平常加汽油即可。想要相近動力並加上四驅，直接比較 VITARA ALLGRIP。", reviewedAt: "2026-10-31", sourceIds: ["sCross", "vitara"] },
  ],
  carry: [
    { id: "carry-loading", question: "CARRY 貨台放得下，就代表可以載嗎？", answer: "CARRY 貨台長 256.5 cm、寬 166 cm，酬載 915 kg，貨台離地 75 cm，三邊側欄都能開啟。選車時先把常載貨物的總重量與堆放尺寸列出：輕而大的貨物先看尺寸，重物先看重量。加裝貨箱或工作設備後，也要把設備重量算入裝載安排，貨物則需固定妥當。", reviewedAt: "2026-10-31", sourceIds: ["carry"] },
    { id: "carry-business-purchase", question: "CARRY 用公司名義購車，要先準備什麼？", answer: "先確認登記名義、用途、發票與付款方式，再由承辦人依公司及是否貸款提供文件清單。商用車的方案或減稅資格須另外核對，不能直接套用一般小客車優惠。", sourceIds: ["registration", "tax"], links: [{ href: "/guides/trade-in#tax", label: "看舊車換購與減稅注意事項" }] },
    { id: "carry-test-drive", question: "可以直接到現場看 CARRY 或帶貨物試放嗎？", answer: "可以先約看車，並提供常載貨物的長寬高、單件重量與裝卸方式。貨台是 256.5 × 166 cm、三邊可開；先用這個範圍規劃擺放，再和鈺漣約有展示車、能安排試放的時段。", reviewedAt: "2026-10-31", sourceIds: ["carry"], links: [{ href: "/visit/beitou", label: "查看到店與預約方式" }] },
  ],
};

// Shared references keep the hub and each car page's answer identical.
export const featuredCarFaqs: { carId: CarId; faqId: string }[] = [
  { carId: "swift", faqId: "swift-vs-small-cars" },
  { carId: "swift", faqId: "swift-hybrid" },
  { carId: "jimny", faqId: "jimny-model-update" },
  { carId: "jimny", faqId: "jimny-daily-use" },
  { carId: "jimny", faqId: "jimny-modifications" },
  { carId: "jimny", faqId: "jimny-five-door" },
];

export function getGeneralFaq(id: string) { return generalFaqGroups.flatMap((group) => group.items).find((item) => item.id === id); }
