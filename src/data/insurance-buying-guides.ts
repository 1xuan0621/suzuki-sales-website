import type { Guide } from "./guides";

const reviewedAt = "2026-10-17";
const sourceNote = "以台灣自用車投保為主，社群討論只用來整理常見問題，不作理賠依據。情境與金額均為教學假設，不是實際報價或個案承保承諾；各公司商品、附約與核保條件可能不同。純電車（如 e VITARA）須另核對電動車專屬條款。";

export const insuranceBasicsGuide: Guide = {
  slug: "car-insurance-basics",
  category: "insurance",
  audience: "第一次保車險：先分清保誰",
  title: "汽車保險怎麼保？先看懂強制險、第三人與超額",
  description: "強制險、第三人、超額、車體險差在哪？用對方、自己的車、駕駛與乘客四個角度，整理新車投保的保障缺口與需求。",
  introduction: "先問「出事時，這筆錢是要賠誰？」對方的損失、自己的車、自己與乘客的傷害，要分開確認。買了乙式或超額，都不代表全部包好。",
  updatedAt: reviewedAt, reviewedAt,
  sourceIds: ["insurance", "compulsoryCoverage", "carCoverage", "liabilityCoverage", "excessCoverage", "passengerCoverage", "driverCoverage"],
  sourceNote,
  relatedSlugs: ["car-damage-insurance", "car-insurance-quote", "car-accident-insurance"],
  conversation: "鈺漣你好，我想買＿＿，平常由＿＿開、會載＿＿，最擔心＿＿。想先整理保險需求，再請承保窗口確認保障與報價。",
  sections: [
    {
      id: "coverage-map", step: "保誰、賠什麼", action: "先分清四種損失",
      title: "一場事故，可能有四筆不同的費用",
      paragraphs: ["例如轉彎擦撞另一台車：對方受傷、對方修車、自己修車、車上家人受傷，看的可能是不同險種。"],
      comparison: {
        caption: "先找損失對象，再找保險名稱",
        columns: ["先看哪種保障", "最容易誤會的地方"],
        rows: [
          { label: "對方受傷", values: ["強制險；依法應負的超出部分再看第三人體傷與超額", "強制險有給付範圍與上限，不是所有賠償都包辦。"] },
          { label: "對方的車或財物受損", values: ["第三人財損責任險；超過額度再看超額", "強制險不賠修車費；第三人責任險也不是修自己的車。"] },
          { label: "自己的車受損", values: ["車體險；失竊另看竊盜險", "甲、乙、丙式保障事故不同，不能只看保額。"] },
          { label: "駕駛或車內乘客受傷", values: ["駕駛人傷害、乘客保障；乘客另有強制險法定保障", "自己開車與坐在車內，適用保障不同。"] },
        ],
        note: "強制險依法提供基本給付，不以加害人有無過失為限。第三人、乘客與超額責任保障則須核對依法應負賠償責任等條件；各項仍有承保範圍與不保事項。",
      },
    },
    {
      id: "compulsory", step: "強制險的界線", action: "人傷與車損分開",
      title: "只保強制險，最常漏掉什麼？",
      paragraphs: ["強制險是依法應投保的人身保障，依規定給付傷害醫療、失能或死亡保險金，不能拿來支付車輛或其他財物損失。"],
      points: [
        { label: "對方修車費，沒有包含", text: "撞壞他人的車、圍牆或其他財物，須另外看第三人財損等保障。" },
        { label: "自己單獨自撞受傷，沒有自動包含", text: "只有自己一台車的事故，駕駛自身不在該車強制險保障內；車內乘客則屬法定保障對象。兩車事故的駕駛受傷，可另依事故情況向對方強制險申請。" },
        { label: "有給付，不等於全部損失都補足", text: "強制險依給付標準處理；依法須賠的損失超出時，仍要看第三人責任等保障能否承接。" },
      ],
    },
    {
      id: "liability-excess", step: "第三人與超額", action: "額度與範圍一起看",
      title: "超額像多一層額度，不能取代第三人責任險",
      paragraphs: ["第三人責任險分體傷與財損。超額通常要搭配指定的基礎責任險及最低保額，符合承保條件、超過約定額度後才接續；不是看到一個大數字就什麼都賠。"],
      calculation: {
        title: "假設依法應賠對方修車 180 萬元",
        context: "只示範財損額度怎麼接，不是建議保額。假設事故屬承保範圍、沒有自負額，第三人財損可賠至 100 萬元。",
        steps: [{
          title: "先看基礎額度後，還剩多少",
          rows: [{ label: "依法應賠的財損", value: "180 萬元" }, { label: "第三人財損給付", value: "100 萬元", operation: "subtract" }],
          result: { label: "還需處理的差額", value: "80 萬元" },
          explanation: "這 80 萬是否能由超額承接，要看超額是否含財損、啟動條件及剩餘可用額度；沒有適用保障，就可能需要自己負擔。",
        }],
      },
      points: [
        { label: "不要只看「每人」", text: "同時看每人體傷、每次事故體傷總額、每次事故財損；超額再查每次事故與保險期間是否另有限額。" },
        { label: "乘客有沒有接上？", text: "有些超額方案包含乘客責任，有些沒有。各公司的甲式、乙式命名不一定相同，請看保障內容與搭配條件。" },
      ],
    },
    {
      id: "driver-passengers", step: "自己與家人", action: "駕駛、乘客分開問",
      title: "常載家人，要另外確認哪兩件事？",
      paragraphs: ["第三人責任險對車內乘客及部分親屬有不保約定，不能把家人一律當成一般第三人。請承保窗口依實際乘坐關係核對。"],
      options: [
        { title: "自己在開車", answer: "確認駕駛人傷害保障", facts: [
          { label: "問什麼", text: "只保單一車輛事故，還是也涵蓋兩車碰撞？限定誰駕駛？" },
          { label: "看什麼", text: "醫療、失能、死亡各有哪些給付；不要只看「有駕駛險」四個字。" },
        ] },
        { title: "家人或朋友坐車", answer: "確認乘客保障", facts: [
          { label: "問什麼", text: "乘客責任保障是否包含這些家人？須有賠償責任才啟動嗎？" },
          { label: "看什麼", text: "每人、每事故額度與承保人數；超額是否也涵蓋乘客。" },
        ] },
      ],
      note: "責任險與傷害險的啟動條件不同。已有個人意外或醫療保單，也請逐項比對給付項目，不能直接當成完全重複。",
    },
    {
      id: "your-needs", step: "整理你的需求", action: "帶三個答案去問",
      title: "預算有限，先說出自己承擔不起的損失",
      paragraphs: ["先維持有效強制險，再把對外賠償、駕乘傷害與自己修車的需求列出來。小刮傷能自行處理，不代表也能承擔大額賠償。"],
      points: [
        { label: "誰開、載誰", text: "自己開、夫妻輪流、偶爾借朋友，是否常載家人；有營業或工作用途也要如實說明。" },
        { label: "車停哪、最怕什麼", text: "停車場自撞、路邊不明刮傷、低窪積水，分別對應不同保障，沒有一個險名能概括全部。" },
        { label: "一次最多能自行負擔多少", text: "把可以承擔的修車費與年度保費分開想，再比較車體險範圍及自負額，不用照抄別人的保單。" },
      ],
      link: { href: "/guides/car-damage-insurance", label: "下一篇：用情境比較甲、乙、丙式" },
    },
  ],
};

export const carDamageGuide: Guide = {
  slug: "car-damage-insurance",
  category: "insurance",
  audience: "甲、乙、丙式：差在哪裡？",
  title: "車體險甲乙丙式怎麼選？自撞、刮傷與天災一次比較",
  description: "用車對車、自撞柱子、不明刮傷與淹水情境比較甲乙丙式，說明新車是否必須乙式、舊車何時調整，以及自負額與附加保障。",
  introduction: "甲、乙、丙式都是看「自己的車」。最關鍵的差別是事故原因：丙式以車對車碰撞為主，乙式多了自撞等列明事故，甲式再擴及惡意破壞、不明原因等；每一種都有不保事項。",
  updatedAt: reviewedAt, reviewedAt,
  sourceIds: ["carCoverage", "carDamageCoverage", "carDamageAddons", "carDamageTerms", "autoInsuranceCurrent", "carSalesContract"],
  sourceNote,
  relatedSlugs: ["car-insurance-basics", "car-insurance-quote", "car-accident-insurance"],
  conversation: "鈺漣你好，我想比較＿＿的乙式與丙式，平常停＿＿、由＿＿開。如果自撞修車，我能先負擔約＿＿，也想確認＿＿是否要另加保。",
  sections: [
    {
      id: "comparison", step: "甲乙丙差異", action: "用事故情境比較",
      title: "同一個刮傷，原因不同，適用保障就不同",
      paragraphs: ["下表比較一般車體主險範圍，尚未加附約。「屬保障範圍」仍須符合證據、事故原因與條款要求，不是保證給付。"],
      comparison: {
        caption: "甲、乙、丙式車體險：常見情境速查",
        columns: ["甲式", "乙式", "丙式"],
        rows: [
          { label: "與另一台車碰撞，能確認對方車輛", values: ["屬保障範圍", "屬保障範圍", "屬保障範圍"] },
          { label: "自己倒車撞到柱子", values: ["屬保障範圍", "屬保障範圍", "不在主險範圍"] },
          { label: "他人惡意刮車、原因不明的車損", values: ["可涵蓋，仍須查證", "不在主險範圍", "不在主險範圍"] },
          { label: "一般墜落物、火災等列明事故", values: ["屬保障範圍", "屬保障範圍", "不在主險範圍"] },
          { label: "颱風、洪水或因雨積水造成車損", values: ["須另核對天災附約", "須另核對天災附約", "須另詢可加保方案"] },
          { label: "整台車失竊", values: ["另看竊盜險", "另看竊盜險", "另看竊盜險"] },
        ],
        note: "若墜落物等損害由除外天災引起，仍要看天災附約。自然耗損、機械故障也不能直接當成車體險事故。",
      },
    },
    {
      id: "unknown-damage", step: "停車被刮撞", action: "釐清原因與證據",
      title: "停好車回來看到刮痕，乙式或丙式會賠嗎？",
      paragraphs: ["不能只憑「停車被撞」判定。如果能證明是承保的碰撞，與完全不知道原因的車損，處理會不同。"],
      points: [
        { label: "有影像或找到對方", text: "保留行車紀錄器、現場照片及對方車輛資料，通知警方與保險公司；丙式要符合車對車碰撞及確認事故的要求。" },
        { label: "對方逃逸", text: "不等於一律不賠，也不等於報警就一定賠。依條款，由警方處理、查證事故或保險公司確認後判斷。" },
        { label: "沒有證據、原因不明", text: "不要把不明刮傷說成自撞。先如實通報，核對甲式或特定不明損失附約是否適用；乙、丙式主險不能直接當成有保。" },
      ],
      link: { href: "/guides/car-accident-insurance", label: "已經發生事故：看報案、出險與回廠流程" },
    },
    {
      id: "new-or-used", step: "新車與舊車", action: "看承擔能力選擇",
      title: "新車一定乙式、滿三年就改丙式嗎？",
      paragraphs: ["沒有適合所有人的固定年限。新車是否選乙式，核心是你要不要把自撞等風險交給保險承擔；車齡增加後，也要看目前車值、修車負擔與保費差。"],
      options: [
        { title: "比較乙式或甲式時", answer: "確認想多保的原因", facts: [
          { label: "乙式的差別", text: "若自己撞到柱子就會影響生活預備金，可把乙式納入比較。" },
          { label: "甲式的差別", text: "在意惡意破壞、不明車損，再評估甲式多出的範圍與保費是否符合需求。" },
        ] },
        { title: "考慮改丙式時", answer: "先接受少掉的保障", facts: [
          { label: "自己吸收的風險", text: "自撞、不明車損等不在丙式主險範圍，不能只看一年省多少。" },
          { label: "再核對保額", text: "「限額車對車」可能另有較低約定額度，不要與一般丙式只比名字。" },
        ] },
      ],
      note: "汽車買賣契約不得排除或限制自由投保。若有貸款，另外閱讀融資契約的保險要求與受益安排；請對方把條件寫清楚，不把口頭說法當成所有新車的規定。",
    },
    {
      id: "deductible", step: "自負額與車值", action: "分清自己付多少",
      title: "保費、自負額、保額，是三個不同的數字",
      paragraphs: ["保費是買保障的費用；自負額是符合承保事故後，依約由自己負擔的部分；保額是契約約定的額度，不代表每次都領得到這筆錢。"],
      calculation: {
        title: "假設核定修復費 3 萬元、自負額 5,000 元",
        context: "只示範固定自負額，假設全數修復項目均承保，沒有其他扣減，且未超過可賠額度。",
        steps: [{ title: "扣除約定由自己負擔的部分", rows: [{ label: "核定承保修復費", value: "30,000 元" }, { label: "自負額", value: "5,000 元", operation: "subtract" }], result: { label: "示意給付", value: "25,000 元" } }],
      },
      points: [
        { label: "自負額可能不只一種算法", text: "有固定金額、按出險次數或其他約定，也可能另約免自負額；比較報價時要寫出實際內容。" },
        { label: "修復與全損分開看", text: "全損、折舊與賠付方式另有約定。「全損免折舊」要確認是否附加，不能把保單上的車價當成一定領到的現金。" },
      ],
    },
    {
      id: "add-ons", step: "容易漏掉的附約", action: "按使用情境補問",
      title: "有車體險後，這三件事還要另問",
      paragraphs: [],
      points: [
        { label: "停在低窪、地下室或戶外", text: "核對颱風、洪水、因雨積水等附約承保哪些原因、自負額及限制；甲式不代表自動含天災。" },
        { label: "會借朋友、多人輪流開", text: "確認約定駕駛人名單及限制。「許可使用免追償」與「約定駕駛」是不同約定，有免追償不代表任何駕駛都自動承保。" },
        { label: "擔心失竊或修車期間沒車用", text: "分別確認竊盜、代車費用與道路救援的事故原因、天數、額度及啟動條件，不預設買車體險就全部附送。" },
      ],
      link: { href: "/guides/car-insurance-quote", label: "下一篇：拿到報價，逐項看懂保費與條件" },
    },
  ],
};

export const insuranceQuoteGuide: Guide = {
  slug: "car-insurance-quote",
  category: "insurance",
  audience: "看懂報價：保費、出險與續保",
  title: "車險報價怎麼看？比價、出險與續保的五個重點",
  description: "同款車保費為什麼不同？業務和網路投保怎麼比？用報價核對清單看懂保額、自負額、約定駕駛，以及小刮傷出險與隔年續保的考量。",
  introduction: "先把保障與條件排成同一張清單，再比較保費。報價比較便宜，可能是通路不同，也可能是保額、自負額或駕駛限制不同。",
  updatedAt: reviewedAt, reviewedAt,
  sourceIds: ["carPremiumFactors", "carDamageCoverage", "carDamageAddons", "carRenewalClaims", "autoInsuranceCurrent", "carSalesContract", "onlineCarInsurance", "carClaimProcess"],
  sourceNote,
  relatedSlugs: ["car-insurance-basics", "car-damage-insurance", "car-accident-insurance"],
  conversation: "鈺漣你好，我在比較＿＿的保險，想確認兩份報價的保障、自負額與駕駛限制是否相同，也想知道出險時各由誰協助。",
  sections: [
    {
      id: "same-conditions", step: "先對齊條件", action: "逐項比較兩份報價",
      title: "兩張都寫乙式，為什麼還不能直接比價格？",
      paragraphs: ["把下面項目在兩張報價上逐一圈出來。有缺項就先請對方補齊，別只比最後總額。"],
      comparison: {
        caption: "車險報價核對清單",
        columns: ["核對內容", "漏看的影響"],
        rows: [
          { label: "車輛與被保險人", values: ["相同車型、年份、用途及被保險人資料", "不同條件算出的保費，不能當成同一份保障的價差。"] },
          { label: "第三人與超額", values: ["體傷、財損、每人／每事故／期間額度與乘客範圍", "總額看起來高，某一項可能仍有缺口。"] },
          { label: "車體與竊盜", values: ["險種、保額、自負額、全損與折舊約定", "相同乙式名稱，自己須付的錢可能不同。"] },
          { label: "駕駛與附約", values: ["約定駕駛、免追償、天災、駕乘保障與救援", "省下的保費可能來自少保一項或限縮誰能開。"] },
          { label: "保險期間與費用", values: ["生效／到期日期時間、各項保費與合計", "只看繳費日，可能忽略保障空窗或期間不同。"] },
        ],
      },
    },
    {
      id: "premium", step: "保費為何不同", action: "別套用網友總價",
      title: "同一款車，別人的保費可以直接當標準嗎？",
      paragraphs: ["不行。車體險保費會受車型、車價、被保險人年齡與性別、投保及賠款紀錄等因素影響，選擇的保障與自負額也會造成差異。"],
      points: [
        { label: "看網友保單，借用的是核對方法", text: "先看有哪些保障與限制，不把網友的總保費當成自己一定能買到的價格。" },
        { label: "沒有出險，不代表已有連續投保優惠", text: "過去沒買過或曾中斷投保，與連續投保且無賠款的紀錄可能不同，請保險公司核對適用係數。" },
        { label: "車變舊，保費不一定按車價同比例下降", text: "保額與費率計算並非同一件事；續保請重新看保障、係數與報價明細。" },
      ],
    },
    {
      id: "buying-channel", step: "業務或網路", action: "比保障也比協助",
      title: "一定要跟汽車業務買？自己網路保可以嗎？",
      paragraphs: ["汽車買賣契約不得排除或限制消費者自由投保。可以詢問不同通路；網路平台的可投保車型、險種與條件仍以各公司規定為準。"],
      options: [
        { title: "由窗口協助投保", answer: "問清楚協助到哪裡", facts: [
          { label: "確認服務", text: "由誰解釋保障、辦理更改與追蹤理賠？事故時應直接聯絡哪家保險公司？" },
          { label: "確認價格", text: "保費與車價分開列；若涉及方案或貸款條件，取得書面說明。" },
        ] },
        { title: "自己網路投保", answer: "逐項核對再送出", facts: [
          { label: "確認內容", text: "不要直接沿用預設組合。檢查額度、自負額、駕駛限制及有沒有漏掉需要的附約。" },
          { label: "確認銜接", text: "自行投保先和領牌承辦人確認資料、生效時間與文件；保存保單、繳費及承保確認。" },
        ] },
      ],
      note: "購買通路不能保證事故一定理賠。保險公司依契約與事故資料審核，顧問可以協助聯繫及回廠安排，不能代替承保或理賠決定。",
    },
    {
      id: "claim-renewal", step: "小傷要出險嗎", action: "先估損再問影響",
      title: "小刮傷要不要出險？先確認這三件事",
      paragraphs: ["不要只因為「今年保費已經付了」就決定出險。先依規定通報事故、保留證據，再確認承保範圍、修復費及賠款紀錄影響。"],
      points: [
        { label: "這次實際能賠多少", text: "請承保窗口確認事故是否承保、估價與自負額；車損小於自負額時，可能沒有給付差額。" },
        { label: "會怎麼影響往後報價", text: "賠款紀錄可能影響後續保費與核保。請依你的險種、紀錄、事故責任及追償結果說明，不套用「出險一次固定漲幾％」。" },
        { label: "有沒有對方損失或人傷", text: "涉及第三人、傷勢或責任未明，不要為了省續保費就自行私了或不通知保險公司。修車、和解前先確認程序。" },
      ],
      details: {
        title: "換一家保險公司，紀錄就會消失嗎？",
        paragraphs: ["換公司不會自動清除既有賠款紀錄，仍可能影響新公司的報價與承保，請新公司核對適用紀錄與條件。社群上的拒保經驗，不代表每個人出險相同次數就會得到同一結果。"],
      },
      link: { href: "/guides/car-accident-insurance", label: "事故發生後，報案、估價與和解怎麼安排" },
    },
    {
      id: "before-payment", step: "付款與續保前", action: "把最後四件事問完",
      title: "最後，請窗口用你的生活情境回答一次",
      paragraphs: ["把保單拿出來，直接問：「如果發生下面這件事，會用到哪一項？哪些要我自己出？」比只問是不是全險，更容易發現缺口。"],
      points: [
        { label: "倒車撞柱子，或停車被不明刮傷", text: "對照車體險型別、自負額與證據要求。" },
        { label: "撞到別人的車，車上家人也受傷", text: "分別對照對外財損、乘客保障與超額承接條件。" },
        { label: "臨時借朋友開，或用途改變", text: "確認駕駛限制、免追償及是否需要通知保險公司變更。" },
        { label: "交車或舊保單快到期", text: "核對新保單生效日期及時間、承保完成狀態與聯絡方式；不要把收到報價或付款畫面直接當成所有險種已生效。" },
      ],
      link: { href: "/guides#insurance", label: "返回保險專區，找需要的指南" },
    },
  ],
};

export const insuranceBuyingGuides = [insuranceBasicsGuide, carDamageGuide, insuranceQuoteGuide];
