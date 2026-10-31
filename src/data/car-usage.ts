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
    title: "SWIFT 要多大的車位？直接用尺寸算給你看",
    introduction: "SWIFT 車長 3.860 m、車寬 1.735 m、車高 1.480 m，空車重 945 kg。平面車位看停好後還剩多少開門空間；機械車位則把這四個數字對上設備標示。",
    image: {
      src: "/images/usage/swift-parking.svg",
      alt: "SWIFT 停車檢查概念圖：俯視車位，標出左右開門及後方取物空間；另核對限長、限寬、限高與載重。",
      caption: "紅色虛線標示左右開門及後方取物的空間。",
      width: 640,
      height: 480,
    },
    topics: [{
      title: "寬 2.5 m、長 5 m 的車位，停好後還剩多少？",
      answer: "用這個尺寸作對照，扣掉 SWIFT 車身後，左右合計剩 76.5 cm，前後合計剩 114 cm。車停正中央時，左右各約 38 cm；兩側有牆或柱子時，開門會比隔壁是空車格更受限制。",
      checks: [
        { label: "常抱小孩，優先比較更寬的車位", text: "寬度從 2.5 m 增加到 2.7 m，左右合計多 20 cm，置中時每側多 10 cm。這是按車身寬度計算；後照鏡、柱位與車門開啟角度也會占用空間。" },
        { label: "機械車位限高 1.55 m，差額是 7 cm", text: "1.55 m 減去車高 1.48 m，名義高度差為 7 cm。有加裝車頂設備，就用加裝後的總高比較；升降設備的長、寬與承重也要同時符合。" },
        { label: "承重看公斤，進出看最窄處", text: "SWIFT 空車重 945 kg，車內物品及加裝設備另計。入口和轉角量的是牆柱間的淨寬；車格前方的止輪擋位置，則會影響後方能留下多少取物空間。" },
      ],
    }],
    preparation: "傳車位的淨寬、淨長、設備限高與承重標示給鈺漣，就能先算出尺寸差額；兩側有牆柱的話，再附一張照片。",
    reviewedAt: "2026-10-31",
    sources: [
      { label: "台灣 Suzuki SWIFT 官方規格表", href: "https://www.taiwansuzuki.com.tw/uploads/car_list/178781313014.pdf" },
      { label: "台灣 Suzuki SWIFT 官方介紹", href: "https://www.taiwansuzuki.com.tw/cars/swift" },
    ],
  },
  "e-vitara": {
    label: "充電安排",
    title: "e VITARA 怎麼充？接頭、時間與費用一次看",
    introduction: "台灣 e VITARA 的交流充電接頭是 Type 1，直流快充是 CCS1。家裡或公司長時間停車用 AC，旅途中需要補電則找相容的 DC 快充站。",
    image: {
      src: "/images/usage/e-vitara-charging.svg",
      alt: "e VITARA 充電安排：AC Type 1 交流充電與 DC CCS1 直流快充兩種介面，日常安排之外另準備備用站點。",
      caption: "先安排日常充電，再準備長途與備用站點。",
      width: 640,
      height: 480,
    },
    topics: [{
      title: "一晚慢充與途中快充，分別要留多久？",
      answer: "原廠室溫開發目標：AC 7 kW 從 10% 充到 100% 約 9 小時；DC 從 10% 充到 80% 約 45 分鐘。日常行程可用這兩種停留時間安排，現場再看充電設備與車上預估時間。",
      checks: [
        { label: "找站時，直接篩選 Type 1 或 CCS1", text: "先看站點的接頭種類，再看營業時間及車位是否開放。導航同時存一個備用站，遇到滿位或故障就能直接換站。" },
        { label: "固定車位，適合把充電排進停車時間", text: "晚上停到隔天早上，可優先規劃 AC 充電；安裝報價分成充電設備、配線工程與管理費三項。供電與配線由合格施工人員勘查。" },
        { label: "費用要把停車費加回來", text: "算法是充電度數 × 每度電價，再加停車或占位費。例如一次充 20 度、假設每度 8 元，加 30 元停車費，合計就是 190 元。" },
      ],
    }],
    preparation: "告訴鈺漣每天開幾公里、晚上停在哪裡，以及最常跑的長途路線，討論適合你的充電安排。",
    reviewedAt: "2026-10-31",
    sources: [{ label: "台灣 Suzuki e VITARA 充電資訊", href: "https://www.taiwansuzuki.com.tw/cars/eVITARA" }],
  },
  vitara: {
    label: "四驅用途",
    title: "VITARA 四種模式怎麼選？日常用 AUTO，其他模式各有用途",
    introduction: "ALLGRIP 會按模式與路況分配前後輪扭力。一般通勤可從 AUTO 開始；SPORT、SNOW、LOCK 分別對應較積極的操駕反應、濕滑路面與受困脫困。",
    image: {
      src: "/images/usage/vitara-modes.svg",
      alt: "VITARA ALLGRIP 模式用途概念圖：AUTO 日常行駛、SPORT 操駕反應、SNOW 雪地等濕滑路況、LOCK 受困脫困。",
      caption: "AUTO、SPORT、SNOW、LOCK 四種模式的使用情境。",
      width: 640,
      height: 480,
    },
    topics: [{
      title: "四種模式，差別在動力如何分配",
      answer: "AUTO 平時以二輪傳動節省燃油，需要時才加入四輪驅動；其他模式會改變扭力及牽引力控制的設定。試乘時，可比較油門反應與過彎感受。",
      checks: [
        { label: "AUTO：日常通勤", text: "重視油耗，以二輪傳動為主；系統偵測到需要額外抓地力時，再切入四輪傳動。" },
        { label: "SPORT：較積極的加速與彎道反應", text: "同樣的油門踩踏下，提供較積極的扭力反應，並利用四輪傳動調整過彎表現。" },
        { label: "SNOW：雪地等濕滑路面", text: "調整前後輪扭力與牽引力控制，協助車身穩定；遇到濕滑路面，仍要降低車速並拉長跟車距離。" },
        { label: "LOCK：泥濘等受困情境", text: "用於協助脫困。操作前先看隨車手冊的切換條件；日常柏油通勤使用 AUTO，不需要一直開著 LOCK。" },
      ],
    }],
    preparation: "想體驗模式差異，可預約一般道路試乘，由鈺漣示範模式介面，再比較起步、轉向與乘坐感受。",
    reviewedAt: "2026-10-31",
    sources: [{ label: "台灣 Suzuki VITARA ALLGRIP 說明", href: "https://www.taiwansuzuki.com.tw/cars/vitara" }],
  },
  "s-cross": {
    label: "家庭載物",
    title: "S-CROSS 家用空間：五人座與行李怎麼安排？",
    introduction: "S-CROSS 提供五人座，行李箱在後座椅背調整前為 430 L、調整後為 440 L，後座傾倒後最大 1,230 L。全家出門保留後座；少人、多行李時，再利用 6/4 分離傾倒配置。",
    image: {
      src: "/images/usage/s-cross-luggage.svg",
      alt: "S-CROSS 行李試放概念圖：先確認行李箱開口，再確認底面深度，最後檢查尾門能否正常關閉。",
      caption: "依開口、底面與尾門的順序，檢查行李擺放。",
      width: 640,
      height: 480,
    },
    topics: [{
      title: "嬰兒車試放：開口、底面、尾門三步驟",
      answer: "收折後的嬰兒車要把輪子、把手一起量；到店先讓最大件物品通過行李箱開口，再放進底面，最後緩慢關上尾門。這三步比只看公升數更容易知道每天好不好用。",
      checks: [
        { label: "四至五人出門：先放嬰兒車", text: "後座保持直立，把收折嬰兒車放在底面，再排旅行袋與隨身包。尿布包或雨具放在靠尾門處，臨時要拿時不用全部搬出來。" },
        { label: "少人多行李：利用 6/4 分離後座", text: "只放倒需要的一側，另一側保留給乘客。兒童安全座椅所在的位置必須保持直立，長件行李也要固定，避免滑向乘坐區。" },
        { label: "住家車位：車長 4.305 m、車高 1.585 m", text: "以長 5 m 的車格計算，扣除車身後前後共剩 69.5 cm。若機械車位限高 1.55 m，S-CROSS 的標示車高已超出 3.5 cm，應另找較高的車位。" },
      ],
    }],
    preparation: "預約賞車時可以說明要帶嬰兒車或行李箱試放，並讓平常坐後座的家人一起來。",
    reviewedAt: "2026-10-31",
    sources: [
      { label: "台灣 Suzuki S-CROSS 官方規格表", href: "https://www.taiwansuzuki.com.tw/uploads/car_list/178453550663.pdf" },
      { label: "台灣 Suzuki S-CROSS 官方介紹", href: "https://www.taiwansuzuki.com.tw/cars/s-cross" },
    ],
  },
  jimny: {
    label: "日常用車",
    title: "Jimny 日常好不好用？三門四座的空間取捨",
    introduction: "Jimny 是三門四人座，後座可 50/50 分離傾倒。兩人出遊可以把後座轉成載物區；四人同行則要讓行李回到後座後方。車身雖短，1.705 m 的車高仍會影響機械車位選擇。",
    image: {
      src: "/images/usage/jimny-seating.svg",
      alt: "Jimny 座位與載物概念圖：兩人用車可利用後座傾倒區域；四人乘坐時，行李需放在後座後方。",
      caption: "比較兩人用車與四人同行時的載物位置。",
      width: 640,
      height: 480,
    },
    topics: [
      {
        title: "兩人多行李、三人帶長件、四人輕裝",
        answer: "兩側後座放倒適合兩人載物；只倒一側可保留一個後座位置；四人出門則保留全部座位。常帶硬殼旅行箱的話，先試最大那一件，軟式旅行袋較容易利用周圍零碎空間。",
        checks: [
          { label: "露營裝備：先排最硬、最大的箱子", text: "收納箱與冰桶先放，再用旅行袋填補空間。重物放低並固定，後視鏡的視線也要留出來。" },
          { label: "四人同行：用後座直立狀態試放", text: "把四人的包、雨具與當天會買的東西一起列入。若必須放倒後座才能裝完，就要減少行李、分車，或改選行李空間較大的車款。" },
        ],
      },
      {
        title: "後座從前門進出，長輩與幼兒接送要試這個動作",
        answer: "先讓前座乘客下車、移動前座，再讓後座乘客進出。日常有長輩或幼兒接送時，這個動作會比座位數更影響便利性。",
        checks: [
          { label: "家人試坐：進去、坐好、再出來", text: "前座調回平常坐姿後，再看後座膝部與頭部空間。讓家人自己走完一次進出動作，比只從外面看座艙更準。" },
          { label: "幼兒接送：試抱入與扣安全帶", text: "帶正在使用的兒童安全座椅到場，依座椅與車輛手冊試裝，再試抱孩子進出和扣帶的角度。" },
        ],
      },
      {
        title: "長 3.650 m，但限高 1.55 m 的機械位停不進",
        answer: "Jimny 車長 3.650 m、寬 1.645 m、高 1.705 m。車高比 1.55 m 的限高多 15.5 cm；選車位時也要留意側開尾門，後方緊貼牆面會影響拿行李。",
        checks: [
          { label: "尾門：停好後還要能打開", text: "賞車時把尾門打開，模擬搬出常用行李的動作。住家後方有牆柱時，將車格深度和止輪擋位置一起量出來。" },
          { label: "通勤：讓常同行的人坐後座試乘", text: "路線可包含一般停走、轉彎及路面起伏，留意身體晃動、噪音與坐姿。常跑長途時，可同場比較 VITARA 的乘坐感受。" },
        ],
      },
    ],
    preparation: "預約時告訴鈺漣平常坐幾人，並帶最大件行李或兒童安全座椅，直接體驗三門車的日常用法。",
    reviewedAt: "2026-10-31",
    sources: [
      { label: "台灣 Suzuki Jimny 官方規格表", href: "https://www.taiwansuzuki.com.tw/uploads/car_list/178382615010.pdf" },
      { label: "台灣 Suzuki Jimny 官方介紹", href: "https://www.taiwansuzuki.com.tw/cars/jimny" },
      { label: "延伸閱讀：Mobile01 新年式試駕", href: "https://www.mobile01.com/topicdetail.php?f=277&t=7277644" },
    ],
  },
  carry: {
    label: "工作用車",
    title: "CARRY 能載多少？貨台尺寸與一趟貨量怎麼算",
    introduction: "CARRY 貨台長 2,565 mm、寬 1,660 mm，官方酬載為 915 kg，貨台離地 750 mm。尺寸決定放不放得下，重量決定一趟可以帶多少，裝卸位置則決定每天搬貨是否順手。",
    image: {
      src: "/images/usage/carry-loading.svg",
      alt: "CARRY 貨台俯視示意：貨台長 2,565 mm、寬 1,660 mm，左、右與後方可開啟欄板。",
      caption: "虛線標示左、右與後方欄板的開啟方向。",
      width: 640,
      height: 480,
    },
    topics: [
      {
        title: "2 m 長、1.2 m 寬的物品，平放還剩多少？",
        answer: "用 2,000 × 1,200 mm 的包裝外尺寸計算，扣掉物品後，貨台長度剩 565 mm、寬度剩 460 mm。這些空間還要分配給固定帶、護角與取放動作。",
        checks: [
          { label: "算貨重：箱數 × 每箱公斤數", text: "例如 30 箱、每箱 20 kg，就是 600 kg。再加包材、棧板、工具及設備重量；加裝車體或固定設備後，可載貨量也會受到影響。" },
          { label: "選卸貨側：左、右、後方都可開", text: "停靠時選遠離車流的一側卸貨，保留行人通道；倉庫則對準搬運設備。把欄板開啟的位置與人員走道留出來。" },
          { label: "搬貨高度：貨台離地 75 cm", text: "可拿平常的箱子比對這個高度，想像一天搬幾十次的動作。重件搭配合適的搬運設備，比分次徒手抬更適合長期作業。" },
        ],
      },
      {
        title: "多站配送與固定設備，裝車順序不同",
        answer: "多站配送把先送的貨放在容易取出的位置；餐車或固定設備則要先把設備自重、固定方式及工作動線畫出來。",
        checks: [
          { label: "配送：按卸貨順序排箱子", text: "把第一站要送的貨留在開口附近，易碎品加防護，工具另外固定。雨天需要取出的物品，放在掀開防雨覆蓋後就能拿到的位置。" },
          { label: "設備：把重量與施工一起估", text: "報價清單列出設備、支架、水箱與電源的重量，交由車商與合格施工單位安排固定方式、車籍及保固事項。" },
        ],
      },
      {
        title: "一天上下車很多次，鞋子和隨身工具也帶來",
        answer: "工作車除了載貨，還會反覆停靠、拿單據和上下車。穿平常工作的鞋試坐，最容易發現踏板、坐姿與取物是否順手。",
        checks: [
          { label: "駕駛座：調好再試上下車", text: "將座椅移到踩踏板順手的位置，調整後視鏡，再做幾次上下車動作；水壺、單據和常用工具也找好固定位置。" },
          { label: "配送路線：挑最窄、最陡的地方討論", text: "把常去巷弄、停靠點及坡道照片帶來，連同一趟貨重一起討論車型。重載需求優先看核定載重與總重，超過就分趟或選更大車型。" },
        ],
      },
    ],
    preparation: "傳最大件貨物的包裝尺寸、每箱重量與一趟箱數給鈺漣，有固定設備再附配置圖，就能直接討論裝載方式。",
    reviewedAt: "2026-10-31",
    sources: [
      { label: "台灣 Suzuki CARRY 貨台與載重資料", href: "https://www.taiwansuzuki.com.tw/cars/carry" },
      { label: "延伸閱讀：U-CAR 行動咖啡車示範（2020）", href: "https://roadtest.u-car.com.tw/tv/watch/61681" },
    ],
  },
};
