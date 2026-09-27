import type { CarId } from "./site";

export interface UsageTopic {
  title: string;
  answer: string;
  checks: { label: string; text: string }[];
}

export interface CarUsageContent {
  label: string;
  title: string;
  introduction: string;
  image: { src: string; alt: string; caption: string; width: number; height: number };
  topics: [UsageTopic, ...UsageTopic[]];
  preparation: string;
  reviewedAt: string;
  sources: { label: string; href: string }[];
}

// Imported only by the server-rendered car page; keep full editorial copy out of client bundles.
export const carUsage: Partial<Record<CarId, CarUsageContent>> = {
  swift: {
    label: "停車空間",
    title: "SWIFT 停車好不好用？把車位和進出空間一起看",
    introduction: "選市區通勤車，除了車身尺寸，也要想每天下車、拿東西和進出車道的動作。先用這張圖整理車位條件，到店時就有明確的核對方向。",
    image: {
      src: "/images/usage/swift-parking.svg",
      alt: "SWIFT 停車檢查概念圖：俯視車位，標出左右開門及後方取物空間；另核對限長、限寬、限高與載重。",
      caption: "紅色虛線為開門與取物空間概念，未按比例繪製，不代表車位所需的最小尺寸。",
      width: 640,
      height: 480,
    },
    topics: [{
      title: "從車道開進去，再走一遍下車動線",
      answer: "車位本身能容納車身，還要確認轉進車格、開門和尾門取物是否方便。機械車位則需一起核對設備條件。",
      checks: [
        { label: "先拍設備限制", text: "留下限長、限寬、限高與載重標示，請管理單位確認可停條件，再對照實際車輛；不要只靠車高判斷。" },
        { label: "再看兩側和後方", text: "記錄柱子、牆面和鄰車位置，想想駕駛下車、接送家人及尾門拿行李的空間。會使用兒童座椅時，也要預留抱孩子進出的動作。" },
        { label: "最後看車道", text: "拍下入口、轉角與坡道，在允許且安全的條件下確認進出方式；到店時再感受視野與停車操作。" },
      ],
    }],
    preparation: "帶車位限制標示、車格與車道照片，告訴鈺漣平常接送幾人、是否常從尾門拿東西，先一起找出需要實車確認的位置。",
    reviewedAt: "2026-09-27",
    sources: [{ label: "台灣 Suzuki SWIFT 官方介紹", href: "https://www.taiwansuzuki.com.tw/cars/swift" }],
  },
  "e-vitara": {
    label: "充電安排",
    title: "e VITARA 怎麼補電？先排好日常與備用站點",
    introduction: "純電車的日常方便程度，和停車地點、能停多久及附近充電選擇有關。先把一週生活路線畫出來，比只比較最高續航更容易評估適不適合。",
    image: {
      src: "/images/usage/e-vitara-charging.svg",
      alt: "e VITARA 充電安排：AC Type 1 交流充電與 DC CCS1 直流快充兩種介面，日常安排之外另準備備用站點。",
      caption: "圖示表達充電安排與介面分類，不是充電設備接線圖；實際功率、可用性與時間依車輛及站點條件確認。",
      width: 640,
      height: 480,
    },
    topics: [{
      title: "先確認在哪充，再確認多久能充",
      answer: "台灣官方標示 AC Type 1 與 DC CCS1。找站時先核對接頭，再看可停留時間、收費與營業條件。",
      checks: [
        { label: "家裡或公司能不能充", text: "若有固定車位，先了解管理規定，再由合格人員勘查供電及安裝條件；不能只看附近有插座就當成可用的日常方案。" },
        { label: "常用站點是否順路", text: "用平常的到站時段查看接頭、營業時間、停車費和充電費；把等待與繞路時間也算進日常安排。" },
        { label: "長途多留一個選擇", text: "出發前確認沿途與目的地站點，另準備替代站。依當天剩餘電量、路況及車上預估調整，不把型錄續航當成每趟都能跑到的距離。" },
      ],
    }],
    preparation: "告訴鈺漣每日大約里程、停車位置、通常停多久，以及常去的遠程目的地；先確認充電安排，再討論版本與試乘。",
    reviewedAt: "2026-09-27",
    sources: [{ label: "台灣 Suzuki e VITARA 充電資訊", href: "https://www.taiwansuzuki.com.tw/cars/eVITARA" }],
  },
  vitara: {
    label: "四驅用途",
    title: "VITARA 的 ALLGRIP，先認識四種模式的用途",
    introduction: "評估四驅需求時，可以從常走的路開始。把平日通勤、週末出遊與偶爾遇到的路況分開說明，再請鈺漣示範模式介面與適用條件。",
    image: {
      src: "/images/usage/vitara-modes.svg",
      alt: "VITARA ALLGRIP 模式用途概念圖：AUTO 日常行駛、SPORT 操駕反應、SNOW 雪地等濕滑路況、LOCK 受困脫困。",
      caption: "依台灣官方模式說明整理，圖示不是通行保證；切換方式與使用條件以實車車主手冊為準。",
      width: 640,
      height: 480,
    },
    topics: [{
      title: "把用途問清楚，再安排合適的試乘",
      answer: "AUTO、SPORT、SNOW、LOCK 各有設定目的。知道模式名稱之後，也要了解何時適用、如何確認車輛目前的狀態。",
      checks: [
        { label: "日常通勤：AUTO／SPORT", text: "AUTO 著重燃油效率並依需要分配驅動；SPORT 調整動力與轉向相關反應。到店可先看介面，再在允許的試乘路線感受差異。" },
        { label: "特殊路況：SNOW／LOCK", text: "SNOW 對應雪地等濕滑路況，LOCK 用於受困時協助脫困。先請顧問說明操作條件，不因為有四驅就嘗試不熟悉或封閉的道路。" },
        { label: "把家人與裝備一起考慮", text: "如果多數時間是多人市區通勤，也請家人試坐、確認行李需求，並同場比較 S-CROSS；四驅只是整體選車條件之一。" },
      ],
    }],
    preparation: "提供平常路線、週末目的地與同行人數。一般道路試乘可確認乘坐和操作感受；特殊路況或越野體驗需另行確認是否能安排。",
    reviewedAt: "2026-09-27",
    sources: [{ label: "台灣 Suzuki VITARA ALLGRIP 說明", href: "https://www.taiwansuzuki.com.tw/cars/vitara" }],
  },
  "s-cross": {
    label: "家庭載物",
    title: "S-CROSS 行李怎麼試？先坐好家人，再放常用物品",
    introduction: "嬰兒車、旅行箱和採買物品的形狀不同，光看容積不容易想像。把最大件物品的尺寸帶來，依平常乘坐方式核對開口、底面和尾門。",
    image: {
      src: "/images/usage/s-cross-luggage.svg",
      alt: "S-CROSS 行李試放概念圖：先確認行李箱開口，再確認底面深度，最後檢查尾門能否正常關閉；圖中箱體不是可裝件數示範。",
      caption: "以通用行李箱輪廓說明量測順序，未按實車比例繪製；箱體僅為示意，不代表特定行李一定放得下。",
      width: 640,
      height: 480,
    },
    topics: [{
      title: "照開口、底面、關門的順序試放",
      answer: "先保留這趟會坐人的座位，再檢查行李。需要後座傾倒才能放入的物品，要一起確認剩餘座位是否夠用。",
      checks: [
        { label: "開口：拿進拿出是否順手", text: "量物品收折後含輪子、把手的長寬高，確認拿進去的角度和搬起高度；常用嬰兒車時，也試試每天收車再放入的動作。" },
        { label: "底面：常用狀態能不能放", text: "前後座調成家人平常坐姿，用實際需要的座位狀態試放最大件物品，再安排其他行李與固定位置。" },
        { label: "尾門：關得上也拿得到", text: "確認物品不干涉尾門與關閉路徑，保留隨手要拿的物品位置；行李要妥善固定，並留意後方視線。" },
      ],
    }],
    preparation: "把平常同行人數、最大件行李的長寬高，以及嬰兒車收折照片傳給鈺漣；需要攜帶實物試放時，先確認展示車與現場安排。",
    reviewedAt: "2026-09-27",
    sources: [{ label: "台灣 Suzuki S-CROSS 官方介紹", href: "https://www.taiwansuzuki.com.tw/cars/s-cross" }],
  },
  jimny: {
    label: "日常用車",
    title: "Jimny 適合你的日常嗎？先試人、行李與車位",
    introduction: "喜歡 Jimny 的外型，也要把平日生活放進來想。台灣現行三門四人座，選購時最值得一起確認的是：後座多久坐人、行李怎麼放，以及每天停在哪裡。",
    image: {
      src: "/images/usage/jimny-seating.svg",
      alt: "Jimny 座位與載物概念圖：兩人用車可利用後座傾倒區域；四人乘坐時，行李需放在後座後方。非比例繪製。",
      caption: "綠色為載物區域概念。座椅與行李空間未按比例繪製，不代表特定行李一定放得下。",
      width: 640,
      height: 480,
    },
    topics: [
      {
        title: "兩人出遊與四人同行，要用不同方式試放",
        answer: "後座傾倒能挪出載物空間，但需要坐人的座位就必須保持可乘坐狀態。先排好同行人數，再拿平常會帶的東西試放。",
        checks: [
          { label: "常用兩個座位", text: "帶旅行袋、收納箱或露營裝備的尺寸，確認後座傾倒後的底面、開口與固定位置；也要留意行李是否遮住後方視線。" },
          { label: "經常三、四人同行", text: "以實際需要的後座直立狀態試放。若還要帶嬰兒車或多人行李，請把最占空間的物品列為第一個檢查項目。" },
        ],
      },
      {
        title: "後座好不好用？讓常同行的人自己進出一次",
        answer: "三門車的後座需經前門進出。只看坐進去的空間，容易漏掉接送家人時反覆上下車的需求。",
        checks: [
          { label: "先固定前座", text: "駕駛與前座乘客調好平常坐姿，再讓家人進入後座，確認腳部、頭部空間和進出動作。" },
          { label: "把接送情境帶進來", text: "需要兒童座椅時，先確認座椅型號與安裝方式，再試抱孩子進出及扣安全帶的動作；不要只確認有固定扣就下決定。" },
        ],
      },
      {
        title: "車身小，停車與通勤還要試哪些事？",
        answer: "停得進車格，和每天使用順不順手是兩件事。除了車位限制，也要一起看車門、尾門和日常路線。",
        checks: [
          { label: "留出開門空間", text: "拍下車位後方的牆面、柱子和相鄰車格，確認側開尾門能開到方便拿行李；機械車位另核對長、寬、高與載重限制。" },
          { label: "試平常會走的路", text: "在可安排的路線留意停走、轉向、路面起伏與噪音；若常跑長途，讓常同行的人一起評估。空間或舒適度不合用時，可同場比較 VITARA。" },
        ],
      },
    ],
    preparation: "告訴鈺漣平常坐幾人，準備最大件行李的長寬高、車位限制與希望試乘的日期；需要實物試放，請先確認展示車與現場安排。",
    reviewedAt: "2026-09-27",
    sources: [
      { label: "台灣 Suzuki Jimny 官方介紹", href: "https://www.taiwansuzuki.com.tw/cars/jimny" },
      { label: "延伸閱讀：Mobile01 新年式試駕", href: "https://www.mobile01.com/topicdetail.php?f=277&t=7277644" },
    ],
  },
  carry: {
    label: "工作用車",
    title: "CARRY 能不能接你的工作？先看貨物與裝卸現場",
    introduction: "選工作車，先記下一趟最忙時要載什麼。箱子尺寸、整批重量、固定設備和卸貨位置都會影響選擇，不能只比貨台看起來有多大。",
    image: {
      src: "/images/usage/carry-loading.svg",
      alt: "CARRY 貨台俯視示意：官方貨台長 2,565 mm、寬 1,660 mm，左、右與後方可開啟欄板，裝卸時需預留空間。非比例繪製。",
      caption: "貨台長寬依台灣官方資料標示；虛線為欄板開啟方向概念，未按比例繪製，也不表示所需空間的實際尺寸。",
      width: 640,
      height: 480,
    },
    topics: [
      {
        title: "貨台尺寸、載重與裝卸，分三次確認",
        answer: "台灣官方貨台長 2,565 × 寬 1,660 mm，載重資料為 915 kg，貨台離地高度 750 mm。這些數字適合初步篩選，實際裝載仍要核對實車與核定資料。",
        checks: [
          { label: "量最大的那件", text: "量貨物含包裝的長寬高，連同棧板、收納箱或推車一起確認；需保留固定與取物空間，不能只用貨台面積推算件數。" },
          { label: "秤最忙的那一趟", text: "整理貨物、工具和加裝設備的重量清單，確認實車可用載重與總重限制。接近上限時先調整趟次或車型，不用超載經驗判斷適用性。" },
          { label: "看人怎麼搬", text: "貨台欄板可三邊開啟，仍要看停車後哪一側能作業、搬運高度是否合適，以及人員和搬運設備有沒有活動空間。" },
        ],
      },
      {
        title: "做生意的方式不同，該帶的資料也不同",
        answer: "先拿一天的實際工作流程來對照，比單問「這台能載多少」更容易找到不合用的地方。",
        checks: [
          { label: "送貨、園藝與工具運送", text: "列出常用箱體和最長工具，標註取貨順序、防雨需求及固定方式；多站配送時，也要看是否每次都得搬開前面的物品。" },
          { label: "餐車或固定設備", text: "先提供設備配置、重量和施工需求，再請車商與合格施工單位確認可行性、車籍及保固影響。貨台放得下，不等於改裝後就能直接使用。" },
        ],
      },
      {
        title: "天天開的工作車，駕駛座與路線也要試",
        answer: "貨物核對完，記得把駕駛本人也放進選車條件。頻繁上下車、長時間坐姿與常走路線，都值得在下訂前確認。",
        checks: [
          { label: "穿工作時的鞋試坐", text: "調整座椅，確認踏板、排檔、後視鏡與上下車動作是否順手；也看看水壺、單據和常用小物要放哪裡。" },
          { label: "說明巷道、坡道與里程", text: "讓鈺漣先了解配送路線和停車限制。空車試乘不能代表載貨後的動力、煞車或油耗；展示、試乘及試放條件均需事先確認。" },
        ],
      },
    ],
    preparation: "傳給鈺漣：貨物含包裝的長寬高、最忙一趟的重量、加裝設備需求，以及常用裝卸位置的照片。先確認車輛與用途，再安排賞車或試放。",
    reviewedAt: "2026-09-27",
    sources: [
      { label: "台灣 Suzuki CARRY 貨台與載重資料", href: "https://www.taiwansuzuki.com.tw/cars/carry" },
      { label: "延伸閱讀：U-CAR 行動咖啡車示範（2020）", href: "https://roadtest.u-car.com.tw/tv/watch/61681" },
    ],
  },
};
