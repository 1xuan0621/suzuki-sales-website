import type { ContentSourceId } from "./content-sources";
import type { CarId } from "./site";

export interface GuidePoint { label: string; text: string }

export interface GuideCalculation {
  title: string;
  context: string;
  assumptions?: GuidePoint[];
  steps: {
    title: string;
    description?: string;
    rows: { label: string; value: string; operation?: "add" | "subtract" | "divide" }[];
    result: { label: string; value: string };
    explanation?: string;
  }[];
  notice?: { title: string; text: string };
}

export interface Guide {
  slug: string;
  category: "process" | "selection" | "ownership";
  audience: string;
  title: string;
  description: string;
  introduction: string;
  updatedAt: string;
  reviewedAt: string;
  sourceIds: ContentSourceId[];
  sourceNote?: string;
  relatedSlugs: string[];
  relatedCars?: CarId[];
  conversation: string;
  sections: {
    id: string;
    step: string;
    action: string;
    title: string;
    paragraphs: string[];
    points?: GuidePoint[];
    options?: { title: string; answer: string; facts: GuidePoint[] }[];
    calculation?: GuideCalculation;
    details?: { title: string; paragraphs: string[]; points?: GuidePoint[] };
    note?: string;
    link?: { href: string; label: string };
  }[];
}

const guideReviewedAt = "2026-09-09";
export const guideIndex = {
  updatedAt: "2026-09-20",
  title: "Suzuki 購車指南｜選車比較、購車流程與保養｜張鈺漣",
  description: "從第一次買車、舊車換新車、車牌選號與領牌，到家庭休旅選擇、汽油與油電比較、交車後保養，依你的用車問題找到指南與實用清單。",
};

export const guideCategories = [
  { id: "process", title: "準備買車與換車", description: "從預算、報價到交車，先把購車這件事安排好。" },
  { id: "selection", title: "找到適合自己的車", description: "用家人、停車位與日常路線，決定空間和動力怎麼選。" },
  { id: "ownership", title: "交車後的保養與使用", description: "知道何時回廠、工單怎麼看，慢慢熟悉照顧愛車的方法。" },
] as const;

export const firstCarGuide: Guide = {
  slug: "first-car",
  category: "process",
  audience: "第一次買車",
  title: "第一次買 Suzuki，從看車到開回家",
  description: "第一次買車不用先背熟規格。鈺漣陪你從用車需求與預算開始，弄懂 Suzuki 試乘、購車菜單、訂金、貸款保險和交車當天要確認的事。",
  introduction: "先決定自己能負擔多少，再看車、談報價。照下面六步走，每次只處理眼前這一步。",
  updatedAt: "2026-09-22",
  reviewedAt: guideReviewedAt,
  sourceIds: ["consumer", "loan", "insurance", "registration", "service", "swift", "jimny", "eVitara"],
  relatedSlugs: ["suv-selection", "car-maintenance"],
  conversation: "鈺漣你好，我第一次買車，平常坐＿＿人、車停＿＿，交車前預算＿＿，想了解＿＿。",
  sections: [
    {
      id: "budget", step: "需求與預算", title: "買車前，要準備哪兩筆錢？",
      paragraphs: [
        "先留好生活預備金，再把購車預算分成兩筆。"
      ],
      link: { href: "/#loan-calculator", label: "用貸款試算抓每月支出" },
      action: "分開算買車與養車",
      options: [
        {
          title: "買車時要付的錢",
          answer: "一次準備",
          facts: [
            {
              label: "包含什麼",
              text: "自己出的車款、保險、領牌及另購配件。貸款支付的部分不用再算一次。"
            }
          ]
        },
        {
          title: "交車後的養車費",
          answer: "每月預留",
          facts: [
            {
              label: "包含什麼",
              text: "月付、停車、油電費，另預留每年的保險、稅費和保養費。"
            }
          ]
        }
      ],
      calculation: {
        title: "買一台 80 萬的車，要自己出多少？",
        context: "把車價、貸款與其他費用分開，依序加減。實際金額請用你的報價明細替換。",
        steps: [
          {
            title: "先算自己需要支付的總額",
            rows: [
              {
                label: "成交車價",
                value: "80 萬元"
              },
              {
                label: "貸款支付的部分",
                value: "50 萬元",
                operation: "subtract"
              },
              {
                label: "保險、領牌與配件",
                value: "6 萬元",
                operation: "add"
              }
            ],
            result: {
              label: "自己共要出",
              value: "36 萬元"
            }
          },
          {
            title: "如果已經付了 2 萬訂金",
            rows: [
              {
                label: "自己共要出的錢",
                value: "36 萬元"
              },
              {
                label: "已付訂金",
                value: "2 萬元",
                operation: "subtract"
              }
            ],
            result: {
              label: "接下來還要付",
              value: "34 萬元"
            },
            explanation: "訂金是先付的一部分車款，所以要扣掉，不是再加一次。"
          }
        ]
      },
    },
    {
      id: "test-drive", step: "看車與試乘", title: "試乘時，先確認這三件事",
      paragraphs: [
        "帶著平常會坐車的人一起來，按日常使用方式試。"
      ],
      note: "出發前先確認車款、展示或試乘車、時段。需要試駕時，另確認駕照與相關安排。",
      link: { href: "/visit/beitou", label: "查看北投所位置與到店資訊" },
      action: "帶家人與常用行李",
      points: [
        {
          label: "坐得舒服嗎？",
          text: "前座調成正常坐姿，再試後座與上下車。"
        },
        {
          label: "東西放得下嗎？",
          text: "帶嬰兒車或常用行李試放；也帶車位限長、寬、高及載重資料核對。"
        },
        {
          label: "開起來習慣嗎？",
          text: "感受起步、煞車、震動與停車視野。考慮純電車，再確認平常在哪裡充電。"
        }
      ],
    },
    {
      id: "contract", step: "報價與訂車", title: "拿到報價，先看清楚買到什麼",
      paragraphs: [
        "購車「菜單」就是報價明細。比較兩張報價時，車款版本與付款方式要一致。"
      ],
      points: [
        {
          label: "車輛資料",
          text: "車款、版本、車色、年式、出廠年月，及是否已領牌。"
        },
        {
          label: "配件明細",
          text: "寫出品牌、型號、價格及保固窗口；「送隔熱紙」還不夠明確。"
        },
        {
          label: "最後總額",
          text: "車價、配件、保險、領牌稅費分開列，問清優惠與減稅是否已算進去。"
        }
      ],
      note: "下訂前審閱完整契約，寫清交期、付款、退訂與貸款未過的處理。匯款核對車商指定帳戶並留收據；契約審閱不等於簽約後可隨時無條件退款。",
      action: "把車、配件、費用寫清楚",
    },
    {
      id: "payment", step: "貸款與保險", title: "貸款與保險，各問一個核心問題",
      paragraphs: [],
      link: { href: "/faq#insurance-coverage", label: "看常見車險問題" },
      action: "貸款看總額，保險看保障",
      options: [
        {
          title: "貸款",
          answer: "全部付完，要花多少？",
          facts: [
            {
              label: "請業務列出",
              text: "頭款、全部期款、尾期款及另收費用，再和現金方案比較。"
            },
            {
              label: "再確認",
              text: "總費用年百分率、提前清償條件。試算只供抓預算，實際貸款須審核。"
            }
          ]
        },
        {
          title: "保險",
          answer: "出事時，哪些損失有賠？",
          facts: [
            {
              label: "先分清楚",
              text: "強制險不賠修車費。對方財物與自己的車損，要分別看第三人責任險、車體險等保障。"
            },
            {
              label: "再確認",
              text: "保額、自負額與不賠的情況，不能只問有沒有「全險」。"
            }
          ]
        }
      ],
    },
    {
      id: "paperwork", step: "領牌與安排", title: "訂車後，把時間表排好",
      paragraphs: [
        "看車、付款、保險生效、領牌與配件施工，先和業務約定順序。"
      ],
      note: "查進度可以問：「目前完成哪一步？下一步需要我做什麼？」證件另按約定管道交付，本站諮詢表單不收證件或銀行資料。",
      link: { href: "/guides/license-plate", label: "想自己挑車牌？先看選號、競標與領牌期限" },
      action: "約定每一步的日期",
      points: [
        {
          label: "希望領牌前看車",
          text: "簽約時就提出，安排查看指定實車及付款的時間。"
        },
        {
          label: "準備領牌文件",
          text: "請承辦人按個人、公司或委託代辦身分提供清單。"
        },
        {
          label: "有指定用車日",
          text: "提早告知；供車、核貸及領牌進度都會影響交期。"
        }
      ],
      details: {
        title: "住外縣市，交車怎麼安排？",
        paragraphs: [
          "可以先遠端詢價，再安排必要的到店行程。若希望在其他地點交車，請先確認運送方式、費用、保險與驗收安排。"
        ]
      },
    },
    {
      id: "delivery", step: "交車與上路", title: "交車當天，照清單一項一項看",
      paragraphs: [
        "帶著契約與配件明細，預留不趕時間的空檔。"
      ],
      points: [
        {
          label: "看車況",
          text: "核對車色與車身識別資料，查看漆面、玻璃、輪圈、內裝，記下里程與油量／電量。"
        },
        {
          label: "自己操作一次",
          text: "試燈光、車窗、空調、手機連線與加裝配件；請業務說明駕駛輔助限制。純電車另練習充電。"
        },
        {
          label: "收好物品與單據",
          text: "點收鑰匙、行照、發票、保險及結算資料，確認保固、首次保養與聯絡窗口。"
        }
      ],
      note: "有刮傷、操作問題或未裝好的配件，當場拍照，寫下由誰處理、何時完成，雙方各留一份。",
      action: "看車況、試操作、收單據",
    },
  ],
};

export const tradeInGuide: Guide = {
  slug: "trade-in",
  category: "process",
  audience: "舊車換新車",
  title: "換一台 Suzuki，舊車和新車怎麼接上？",
  description: "舊車還能開，現在換 Suzuki 值不值得？鈺漣帶你分開看舊車估價、新車報價與減稅，算出要補的錢，再安排交車和舊車交接。",
  introduction: "換車先弄清楚兩件事：還要準備多少錢、哪天交出舊車。先估價、再決定賣車或報廢，最後安排新舊車交接。",
  updatedAt: "2026-09-22",
  reviewedAt: guideReviewedAt,
  sourceIds: ["consumer", "tradeInTax", "registration", "service", "eVitara"],
  relatedSlugs: ["first-car", "powertrain-choice"],
  conversation: "鈺漣你好，我的舊車是＿＿、＿＿年、＿＿公里，還有／沒有貸款，想換＿＿，希望＿＿前交車。",
  sections: [
    {
      id: "needs", step: "確認換車原因", title: "這次換車，最想改善什麼？",
      paragraphs: [
        "先挑一至兩個最在意的問題，試乘時才知道新車有沒有解決。"
      ],
      link: { href: "/#cars", label: "看看 Suzuki 車款與比較" },
      action: "選出最想改善的問題",
      points: [
        {
          label: "空間不夠",
          text: "帶家人與常用行李，實際試坐、試放。"
        },
        {
          label: "停車或通勤不方便",
          text: "帶車位限制與日常路線，比較視野、轉彎與操作。"
        },
        {
          label: "想改開純電車",
          text: "先確認充電位置與設備費，再試 e VITARA。"
        }
      ],
    },
    {
      id: "valuation", step: "舊車估價", title: "舊車賣掉後，能拿多少錢買新車？",
      paragraphs: [
        "舊車售價不一定全都能用。如果還有貸款，要先扣掉還清貸款所需的金額與費用。"
      ],
      action: "舊車款先扣掉未還貸款",
      calculation: {
        title: "還要另外準備多少？分兩步算",
        context: "以下都是假設金額。先算舊車留下的錢，再用這筆錢支付新車。",
        steps: [
          {
            title: "先看舊車能留下多少",
            rows: [
              {
                label: "舊車賣出收入",
                value: "25 萬元"
              },
              {
                label: "還清舊貸款及費用",
                value: "10 萬元",
                operation: "subtract"
              }
            ],
            result: {
              label: "可用的舊車款",
              value: "15 萬元"
            },
            explanation: "下一步，再把剩下的 15 萬拿來付新車。"
          },
          {
            title: "舊車款能抵新車時，還差多少？",
            rows: [
              {
                label: "新車要自己支付的錢",
                value: "36 萬元"
              },
              {
                label: "拿舊車款支付",
                value: "15 萬元",
                operation: "subtract"
              }
            ],
            result: {
              label: "另外要準備",
              value: "21 萬元"
            },
            description: "假設新車需自備 36 萬（已扣貸款、含其他費用），而舊車剩下的 15 萬已收到，或已書面約定能抵款。"
          }
        ],
        notice: {
          title: "還沒收到、也不能抵款：先備 36 萬",
          text: "舊車款之後才到手，就不能用來付眼前的新車款。先問清兩筆錢的日期，再安排付款。"
        }
      },
      details: {
        title: "估價前，準備哪些資料？",
        paragraphs: [
          "提供車型、年份、里程、保養及事故／改裝紀錄，安排看實車估價。問清估價有效期，以及交車前繼續使用是否影響價格。",
          "舊貸款的結清金額與費用，向原貸款機構確認。新車報價、舊車收購價與換購優惠要分開列。"
        ]
      },
    },
    {
      id: "tax", step: "賣車或報廢", title: "舊車要出售，還是報廢？",
      paragraphs: [
        "先拿到實車估價，再比較兩種方式。"
      ],
      note: "同一台舊車的出售收入，不能再加上這台車的報廢減稅。新購減稅是另一組條件，另行核對；未收到的退稅，先別當成交車當天可用的錢。",
      action: "比較兩種舊車處理方式",
      options: [
        {
          title: "出售舊車",
          answer: "看實際賣價",
          facts: [
            {
              label: "先確認",
              text: "收購價、貸款結清費用，以及何時收到車款。"
            }
          ]
        },
        {
          title: "報廢換購",
          answer: "看減稅資格",
          facts: [
            {
              label: "先確認",
              text: "能否申請、要備哪些文件，以及申請與退款時間。"
            }
          ]
        }
      ],
      details: {
        title: "報廢換購有哪些條件與文件？",
        paragraphs: [],
        points: [
          {
            label: "車齡與持有時間",
            text: "舊汽車車齡 10 年以上、持有滿 1 年，並核對新舊車主關係。"
          },
          {
            label: "新舊車時間",
            text: "購買新車及完成新領牌，須符合報廢前後 6 個月內的規定。"
          },
          {
            label: "文件與特殊身分",
            text: "車體回收、車籍報廢文件都要留；公司、純電車與工作用車另確認適用條件。辦理前請承辦人核對資格及送件方式。"
          }
        ]
      },
    },
    {
      id: "schedule", step: "銜接交車時間", title: "每天要用車，先排好交接日期",
      paragraphs: [
        "先告訴業務：「舊車每天還要用，不能提早交出去。」確認新車供應、核貸、領牌與施工進度後，再約舊車交付日。"
      ],
      points: [
        {
          label: "新車延後時",
          text: "舊車能不能晚交？估價是否仍有效？"
        },
        {
          label: "新車要付款時",
          text: "舊車款能否及時入帳或抵款？誰負責結清舊貸款？"
        },
        {
          label: "中間沒車用時",
          text: "先安排租車、家人接送等交通，把天數與費用一起算進去。"
        }
      ],
      action: "新車可交，再安排舊車交付",
      details: {
        title: "新舊車在不同縣市交接",
        paragraphs: [
          "先約定兩台車各自的交付地點、運送費、保險與驗收方式。"
        ]
      },
    },
    {
      id: "handover", step: "交接與後續", title: "交出舊車前，做完這三件事",
      paragraphs: [],
      link: { href: "/guides/first-car#delivery", label: "打開新車交車檢查清單" },
      action: "清資料，留交接紀錄",
      points: [
        {
          label: "取走個人物品",
          text: "檢查車內置物空間，取走行車紀錄器記憶卡。"
        },
        {
          label: "清除及移轉服務",
          text: "刪除車機配對、通訊錄、導航住址；向各單位確認停車場辨識、eTag 與保險異動。"
        },
        {
          label: "留下交接證明",
          text: "出售留交付時間、里程、款項及過戶紀錄；報廢留回收與車籍文件。另追蹤貸款結清與減稅入帳。"
        }
      ],
    },
  ],
};

const suvSelectionGuide: Guide = {
  slug: "suv-selection",
  category: "selection",
  audience: "家庭休旅怎麼選",
  title: "家庭休旅怎麼選？先試家人、行李和停車位",
  description: "小家庭一定需要休旅車嗎？從安全座椅、嬰兒車、長輩上下車、後座舒適度到停車條件，用五個步驟縮小選擇。",
  introduction: "先確認全家坐得下、行李放得進、家裡停得了。這三件事都過關，再比較配備與價格。",
  updatedAt: "2026-09-22", reviewedAt: "2026-09-11",
  sourceIds: ["swift", "vitara", "sCross", "jimny", "eVitara"],
  sourceNote: "試坐與比較清單為本站依用車需求整理；乘坐舒適度沒有統一排名，車型配置以台灣版本為準。",
  relatedSlugs: ["powertrain-choice", "first-car"],
  relatedCars: ["vitara", "s-cross"],
  conversation: "鈺漣你好，平常坐＿＿人、有＿＿張安全座椅，常帶＿＿，車位限制＿＿，想比較＿＿。",
  sections: [
    {
      id: "needs", step: "列出乘坐情境", title: "先列出最常遇到的用車情境",
      paragraphs: [
        "以每週會發生的需求為主；偶爾一次的大量載物，先放在後面考慮。"
      ],
      points: [
        {
          label: "平日坐誰",
          text: "幾位大人、小孩？有幾張安全座椅？"
        },
        {
          label: "假日帶什麼",
          text: "嬰兒車、旅行箱、露營裝備，哪些要同時上車？"
        },
        {
          label: "未來會不會改變",
          text: "家中成員、通勤地點或照顧長輩的需求會改變嗎？"
        }
      ],
      action: "列出平常坐誰、帶什麼",
    },
    {
      id: "seating", step: "家人一起試坐", title: "座位夠，不代表你的組合坐得下",
      paragraphs: [
        "先調好駕駛座，再試後座。不要為了讓後座看起來寬敞，刻意把前座往前移。"
      ],
      note: "安全座椅試裝先和展間約定；依車輛及座椅手冊安裝，不任意移動固定點。",
      action: "全家一起試坐與上下車",
      points: [
        {
          label: "有安全座椅",
          text: "帶實際型號試裝，確認前座仍能正常使用。兩張裝好後，若中間要坐成人，也要實試空間與安全帶。"
        },
        {
          label: "常載長輩",
          text: "讓長輩自己走一次上車、坐入、轉身與下車，確認門檻、踏地及抓握位置。"
        }
      ],
    },
    {
      id: "luggage-parking", step: "試放與量車位", title: "行李與車位，分開檢查",
      paragraphs: [],
      action: "同一組行李，量同一個車位",
      options: [
        {
          title: "行李放得進？",
          answer: "後座保持直立",
          facts: [
            {
              label: "怎麼試",
              text: "用全家就座的狀態，放同一組嬰兒車、旅行箱與袋子。"
            },
            {
              label: "看哪裡",
              text: "開口、輪拱、尾門能否關閉，以及物品能否固定。"
            }
          ]
        },
        {
          title: "車位停得下？",
          answer: "帶尺寸核對",
          facts: [
            {
              label: "先量",
              text: "限長、限寬、限高、載重。"
            },
            {
              label: "再看",
              text: "坡道、轉彎、開門與尾門空間；機械車位請設備管理者確認。"
            }
          ]
        }
      ],
    },
    {
      id: "test-drive", step: "同條件試乘", title: "同一條件試乘，才容易比較",
      paragraphs: [
        "固定乘坐位置與相近路線。每個人記下一項最在意的感受，試完再討論。"
      ],
      link: { href: "/visit/beitou", label: "先確認可安排的展示與試乘車" },
      action: "用相近路線比較感受",
      points: [
        {
          label: "駕駛觀察",
          text: "起步、煞車、視野、轉彎與停車。"
        },
        {
          label: "乘客觀察",
          text: "座椅支撐、噪音、路面震動與上下車。"
        }
      ],
      details: {
        title: "試乘時想了解駕駛輔助",
        paragraphs: [
          "請顧問說明 ACC、車道輔助的作動速度、退出條件，以及停下後是否需自行起步。依車主手冊操作，駕駛仍須掌握車況。網友心得可提供觀察方向，不能代替家人的試乘。"
        ]
      },
    },
    {
      id: "shortlist", step: "留下兩三台", title: "先刪掉不合用的車，再比價格",
      paragraphs: [
        "乘坐、行李或車位有一項不合，就先排除。剩下的車再比較成交價、油電、保險、保養及輪胎費。"
      ],
      link: { href: "/cars/vitara#vitara-vs-s-cross", label: "核對 VITARA 與 S-CROSS 的台灣版本差異" },
      action: "留下合用的，再比花費",
      points: [
        {
          label: "VITARA、S-CROSS",
          text: "從家人乘坐、載物與是否需要四驅開始比較。"
        },
        {
          label: "Jimny",
          text: "確認能接受三門進出與載物取捨。"
        },
        {
          label: "e VITARA",
          text: "把每週充電位置與時間一起考慮。"
        }
      ],
      note: "四驅仍受路況、輪胎與操作方式限制，不代表所有道路都能通行。",
    },
  ],
};

const maintenanceGuide: Guide = {
  slug: "car-maintenance",
  category: "ownership",
  audience: "第一次保養怎麼準備",
  title: "第一次汽車保養怎麼準備？週期、工單與日常檢查",
  description: "里程少也要回廠嗎？第一次保養先準備車型與紀錄，分清定期項目、車況維修和自選服務，再確認費用與下次保養時間。",
  introduction: "先看自己的保養表，再把工單分成「到期定保、車況維修、自選服務」。問清楚這次為什麼做、要花多少，再同意施工。",
  updatedAt: "2026-09-22", reviewedAt: "2026-09-11",
  sourceIds: ["service", "maintenancePrinciples", "repairConsent", "tirePressure"],
  sourceNote: "保養表讀法參考台灣原廠公開說明；Toyota 頁面的公里數、月份與保固不適用於 Suzuki。本次未取得各年式 Suzuki 台灣隨車保養表，因此不列統一換油、換電池或更換耗材週期。請依自己的隨車文件確認。",
  relatedSlugs: ["powertrain-choice", "first-car"],
  conversation: "鈺漣你好，我的車是＿＿、＿＿年式，目前＿＿公里，上次保養＿＿，想確認＿＿。",
  sections: [
    {
      id: "schedule", step: "找到保養表", title: "里程少，也要看保養時間",
      paragraphs: [
        "找出自己車型、年式的保養表。若規定「時間或里程先到者為準」，時間到了就應安排相應保養。"
      ],
      note: "有疑問，請服務廠指出適用的手冊頁次；不要套用其他車款或海外版本的週期。",
      action: "按自己的手冊核對時間",
      points: [
        {
          label: "預約前準備",
          text: "車型年式、目前里程、上次工單、近期異常及需要取車的時間。"
        },
        {
          label: "把用車方式說清楚",
          text: "短程、久停或特殊使用環境，都告知服務廠。首次檢查與後續定保分開核對。"
        }
      ],
    },
    {
      id: "work-order", step: "看懂保養工單", title: "拿到工單，先把項目分成三類",
      paragraphs: [
        "不認識的品項，直接問接待人員：「這一項屬於哪一類？」"
      ],
      note: "先看材料、數量、工資與總額。約定有追加項目先通知，取得同意再做；取車時核對實際工單。",
      link: { href: "/faq#maintenance-extras", label: "保養加項可以怎麼問？" },
      action: "每個項目先分清楚用途",
      options: [
        {
          title: "到期定保",
          answer: "對照保養表",
          facts: [
            {
              label: "要問什麼",
              text: "這次到期的是檢查，還是更換？要求檢查不代表每次都要換。"
            }
          ]
        },
        {
          title: "車況維修",
          answer: "看檢查結果",
          facts: [
            {
              label: "要問什麼",
              text: "發現什麼磨耗、滲漏或異音？處理有多急？費用多少？"
            }
          ]
        },
        {
          title: "自選服務",
          answer: "了解用途再選",
          facts: [
            {
              label: "要問什麼",
              text: "美容、除臭或額外清潔的用途是什麼？是否屬於手冊要求？"
            }
          ]
        }
      ],
    },
    {
      id: "daily-checks", step: "平常看什麼", title: "平常先留意這三件事",
      paragraphs: [],
      link: { href: "/faq#tire-pressure", label: "胎壓要打多少？" },
      action: "看輪胎、燈光，記下異常",
      points: [
        {
          label: "輪胎",
          text: "每月及長途前查看狀態；冷胎時依車門標籤或手冊核對胎壓，留意前後輪、負載與單位。"
        },
        {
          label: "燈光與視線",
          text: "查看燈光、雨刷、玻璃是否正常。日常檢查不能取代定期保養。"
        },
        {
          label: "偶發異音",
          text: "停妥後記下冷車或熱車、車速、天候與發生頻率，提供技師判斷。"
        }
      ],
      note: "煞車、轉向異常或明顯輪胎損傷，先安全停車並聯絡專業協助，不等下次保養。",
    },
    {
      id: "powertrain", step: "分清動力系統", title: "油電與純電，都要按表保養",
      paragraphs: [],
      link: { href: "/guides/powertrain-choice#systems", label: "先弄懂汽油、輕油電、油電與純電的差別" },
      action: "有引擎、純電分開看",
      options: [
        {
          title: "輕油電／一般油電",
          answer: "仍要保養引擎",
          facts: [
            {
              label: "重點",
              text: "有汽油引擎，換油就按自己的保養表安排。"
            }
          ]
        },
        {
          title: "純電車",
          answer: "仍要檢查耗材",
          facts: [
            {
              label: "重點",
              text: "沒有引擎機油，但輪胎、煞車等仍需按表檢查。"
            }
          ]
        }
      ],
      details: {
        title: "問電池費用時，要說清楚哪一種",
        paragraphs: [
          "一般供電電瓶、輕油電電池與純電動力電池是不同零件。先看檢測結果，再核對報價和保固，別用其他車主的更換年限推定自己的車。"
        ]
      },
    },
    {
      id: "records", step: "留單據與預算", title: "取車時，把下次需要的資料帶走",
      paragraphs: [],
      link: { href: "/faq#local-service", label: "購車與保養可以在不同縣市嗎？" },
      action: "收工單，記下次時間",
      points: [
        {
          label: "收好工單",
          text: "日期、里程、零件規格、費用與檢查結果。"
        },
        {
          label: "問清後續",
          text: "下次保養時間，以及本次未完成項目的處理方式。"
        },
        {
          label: "預留耗材費",
          text: "除了定保，也預留輪胎、電瓶等較低頻率的支出。"
        }
      ],
      details: {
        title: "有贈送保養，另外確認什麼？",
        paragraphs: [
          "確認是否含材料、工資，限哪些據點、何時到期。預約不等於保證完工，有用車需求請先約好取車時間。"
        ]
      },
    },
  ],
};

const powertrainGuide: Guide = {
  slug: "powertrain-choice",
  category: "selection",
  audience: "汽油、油電與純電怎麼選",
  title: "汽油、輕油電、油電與純電怎麼選？從里程和充電開始",
  description: "一年開不多就不適合油電嗎？先分清輕油電、一般油電與純電，再用年里程、實際價差、能源費和充電時間評估。",
  introduction: "先確認怎麼補充能源，再比較花費。油電沒有固定的「划算里程」；純電則要先想好每週在哪裡充電。",
  updatedAt: "2026-09-22", reviewedAt: "2026-09-11",
  sourceIds: ["swift", "vitara", "sCross", "eVitara", "fit", "energyLabel"],
  sourceNote: "費用範例全部為假設值，展示計算方式；不是現行油價、電價、實測油耗或 Suzuki 報價。各車型的充電、保養與保固依台灣版本資料確認。",
  relatedSlugs: ["suv-selection", "car-maintenance"],
  relatedCars: ["swift", "e-vitara"],
  conversation: "鈺漣你好，我一年開＿＿公里，市區／高速約＿＿，預計開＿＿年，＿＿能充電，想比較＿＿。",
  sections: [
    {
      id: "systems", step: "先分清動力", title: "四種動力，日常使用差在哪？",
      paragraphs: [
        "先看補充能源的方式，英文縮寫只用來辨識系統。"
      ],
      action: "先看加油還是充電",
      options: [
        {
          title: "汽油車",
          answer: "加油",
          facts: [
            {
              label: "動力",
              text: "以汽油引擎驅動。"
            }
          ]
        },
        {
          title: "輕油電 MHEV",
          answer: "加油，不用插電",
          facts: [
            {
              label: "動力",
              text: "回收電能輔助引擎，例如 SWIFT、VITARA、S-CROSS。"
            }
          ]
        },
        {
          title: "一般油電 HEV",
          answer: "加油，不用插電",
          facts: [
            {
              label: "動力",
              text: "依條件切換馬達與引擎，例如 FIT e:HEV；純電運作有條件限制。"
            }
          ]
        },
        {
          title: "純電 BEV",
          answer: "需要充電",
          facts: [
            {
              label: "動力",
              text: "靠電池與馬達行駛，例如 e VITARA。"
            }
          ]
        }
      ],
      note: "PHEV 是另一類「插電式油電」。不要只看到 Hybrid，就認為都能純電行駛或都不用充電。",
    },
    {
      id: "routine", step: "記下一週路線", title: "先用自己的路線比較",
      paragraphs: [],
      action: "記下里程與常走路線",
      points: [
        {
          label: "一年大約開多少",
          text: "通勤加上假日行程，估出年里程。"
        },
        {
          label: "常走什麼路",
          text: "市區停走、高速巡航分開看；試乘時留意起步、引擎介入、再加速與煞車。"
        }
      ],
      note: "官方效率值須在相同測試標準下比較。實際還受冷氣、載重與路況影響，抓預算時另算保守情境。",
    },
    {
      id: "cost", step: "算持有成本", title: "多花的車價，能靠油費省回來嗎？",
      paragraphs: [
        "先看「每年省多少」，再看要花幾年。不要只比較一公升能跑多遠。"
      ],
      link: { href: "/guides/first-car#budget", label: "交車前現金需求，另看購車預算" },
      action: "看每年省多少、要花幾年",
      calculation: {
        title: "假設多花 6 萬買較省油的車",
        context: "先用相同的里程與油價比較兩台假設車，不代表任何兩款實車。",
        steps: [
          {
            title: "先看一年少付多少油錢",
            rows: [
              {
                label: "A 車一年油費",
                value: "24,000 元"
              },
              {
                label: "B 車一年油費",
                value: "18,000 元",
                operation: "subtract"
              }
            ],
            result: {
              label: "每年省下",
              value: "6,000 元"
            }
          },
          {
            title: "再看多久省回購車價差",
            rows: [
              {
                label: "買 B 車多花的錢",
                value: "60,000 元"
              },
              {
                label: "每年省下的油錢",
                value: "6,000 元",
                operation: "divide"
              }
            ],
            result: {
              label: "單靠油費約需",
              value: "10 年"
            },
            explanation: "每年省 6,000 元，累積 10 年才有 60,000 元。這還沒算其他費用差異。"
          }
        ],
        notice: {
          title: "省油，不代表總花費一定比較低",
          text: "保險、稅費、保養、融資及未來賣車的價差，也要一起比較。若每年沒有省下錢，就不能用這個除法估回本年限。"
        },
        assumptions: [
          {
            label: "兩車年里程",
            text: "12,000 公里"
          },
          {
            label: "假設油價",
            text: "30 元／公升"
          },
          {
            label: "A 車油耗",
            text: "15 公里／公升"
          },
          {
            label: "B 車油耗",
            text: "20 公里／公升"
          }
        ]
      },
      details: {
        title: "上面的油費怎麼來？自己要怎麼算？",
        paragraphs: [],
        points: [
          {
            label: "A 車：先算一年用多少油",
            text: "12,000 公里 ÷ 每公升 15 公里 = 800 公升。"
          },
          {
            label: "A 車：再算一年油費",
            text: "800 公升 × 每公升 30 元 = 24,000 元。"
          },
          {
            label: "B 車：先算一年用多少油",
            text: "12,000 公里 ÷ 每公升 20 公里 = 600 公升。"
          },
          {
            label: "B 車：再算一年油費",
            text: "600 公升 × 每公升 30 元 = 18,000 元。"
          },
          {
            label: "比較純電車",
            text: "先以年里程除以每度電可跑公里數，算出用電量，再乘每度電價。另加充電損耗、停車與其他收費；按分鐘計價須另估。"
          },
          {
            label: "避免重複加算",
            text: "已算完整車價，就不再加貸款本金，只另計利息與費用；已用車價扣出售收入，就不再另加折舊。"
          }
        ]
      },
    },
    {
      id: "charging", step: "實走充電安排", title: "買純電前，先確認怎麼充電",
      paragraphs: [],
      link: { href: "/cars/e-vitara#e-vitara-charging", label: "查 e VITARA 台灣充電接頭與準備事項" },
      action: "實走一次平常的補電安排",
      options: [
        {
          title: "想裝家用充電",
          answer: "先確認能不能裝",
          facts: [
            {
              label: "先做什麼",
              text: "確認社區同意，請合格專業人員勘查供電、配線與設備。"
            },
            {
              label: "再問什麼",
              text: "設備與施工總費用。車位有插座，不代表能直接使用。"
            }
          ]
        },
        {
          title: "主要用公共充電",
          answer: "實際去站點看看",
          facts: [
            {
              label: "先做什麼",
              text: "核對相容接頭、開放時間、收費及占用狀況。"
            },
            {
              label: "再問自己",
              text: "繞路、等待能否融入作息？準備第二個相容站點，長途另查目的地。"
            }
          ]
        }
      ],
    },
    {
      id: "decision", step: "試乘後決定", title: "最後，把費用與使用感受分開看",
      paragraphs: [
        "詢價時固定版本與配備，拿到完整報價、定保項目及電池保固，再做最後比較。"
      ],
      link: { href: "/guides/car-maintenance#powertrain", label: "不同動力的保養要留意什麼？" },
      action: "核對保固，再試乘決定",
      points: [
        {
          label: "錢的部分",
          text: "買車差額、年能源費、保險、稅費、保養及融資費。"
        },
        {
          label: "每天使用的部分",
          text: "自己與家人的試乘感受，以及補充能源所花的時間。"
        }
      ],
      note: "保固到期不等於電池必須更換。請分清故障與容量保障，核對年限、里程及除外事項。",
    },
  ],
};

export const licensePlateGuide: Guide = {
  slug: "license-plate",
  category: "process",
  audience: "選車牌與領牌",
  title: "新車車牌怎麼選？選號費用、競標與領牌期限",
  description: "順編、一般選號與競標差在哪？整理自用小型車選號費、英文與數字查詢、跨區領牌、委託代辦，以及付款前一定要確認的期限。",
  introduction: "先決定要不要挑號碼，再確認車輛何時能領牌。看到喜歡的號碼先別急著付錢，一般選號的領牌期限很短。",
  updatedAt: "2026-09-22",
  reviewedAt: "2026-09-20",
  sourceIds: ["platePortal", "plateRules", "plateSelection", "plateAuction", "plateCosts"],
  sourceNote: "本文以台灣自用小型車新領牌為主要情境；其他車種、已領牌車換號或有領牌限制者，需另向監理機關確認。選題參考公開買家討論，費用與期限依官方資料核對；付款前仍以當次系統及招標公告為準，不承諾指定號碼或交期。",
  relatedSlugs: ["first-car", "trade-in"],
  conversation: "鈺漣你好，我偏好車牌＿＿或＿＿，選號預算＿＿，希望＿＿前交車，想自己辦／請你協助。",
  sections: [
    {
      id: "options", step: "選方式與預算", title: "先選一種方式，再抓預算",
      paragraphs: [
        "以下以自用小型汽車新領牌為例。"
      ],
      note: "上面只比較挑號碼的費用。一般領牌規費、稅費、保險、系統／轉帳費與代辦費，另行核對；報價「含選號」也要問清包含哪些。",
      action: "先決定要不要指定號碼",
      options: [
        {
          title: "順編",
          answer: "不指定號碼",
          facts: [
            {
              label: "怎麼取得",
              text: "按監理機關順序領用。"
            },
            {
              label: "挑號碼的費用",
              text: "不另收選號費。"
            }
          ]
        },
        {
          title: "一般選號",
          answer: "基本 2,000 元",
          facts: [
            {
              label: "怎麼取得",
              text: "從當下開放清單挑選。"
            },
            {
              label: "費用例外",
              text: "特殊或流標號牌可能依公告底價計費。"
            }
          ]
        },
        {
          title: "競標",
          answer: "依得標價付費",
          facts: [
            {
              label: "怎麼取得",
              text: "按公告出價競標。"
            },
            {
              label: "先做什麼",
              text: "設定預算上限，熱門號碼可能加價。"
            }
          ]
        }
      ],
    },
    {
      id: "timing", step: "先確認領牌日", title: "付款後多久要領牌？兩種期限別混用",
      paragraphs: [
        "付款前，先請承辦人確認車輛資料、文件、保險和辦理日期都能配合。"
      ],
      note: "逾期領牌會失去號牌權利，已繳款不退。車還沒準備好時，可以先查號碼，先不要付款占號。",
      link: { href: "/guides/first-car#paperwork", label: "先把付款、保險與領牌順序排好" },
      action: "車與文件就緒，再付款",
      options: [
        {
          title: "一般網路選號",
          answer: "次一工作日截止前",
          facts: [
            {
              label: "從何時算",
              text: "選號轉帳成功後。"
            },
            {
              label: "要完成什麼",
              text: "在次一工作日收件截止前辦妥領牌。不是固定 24 小時，假日與受理時段另確認。"
            }
          ]
        },
        {
          title: "網路競標",
          answer: "領牌期限三個月",
          facts: [
            {
              label: "先繳款",
              text: "原則上決標後 24 小時內，以當次招標公告為準。"
            },
            {
              label: "再領牌",
              text: "須在決標次日起三個月內完成；繳款與領牌是兩個期限。"
            }
          ]
        }
      ],
    },
    {
      id: "find-number", step: "查號碼與備選", title: "查號碼時，英文與數字一起看",
      paragraphs: [
        "英文和數字是同一組號牌，不能拆開自由拼。"
      ],
      points: [
        {
          label: "到官方清單查詢",
          text: "監理服務網 → 選號標牌 → 網路選號 → 選號及轉帳。依管轄單位、領牌地點、車種及能源別查詢。"
        },
        {
          label: "準備三至五組候選",
          text: "註明是否指定英文、能否接受其他領牌地點。"
        },
        {
          label: "查到不等於保留",
          text: "收藏、截圖或傳給業務，都不代表已選號成功。第三方工具可能有時間差。"
        }
      ],
      link: { href: "https://www.mvdis.gov.tw/m3-emv-plate/webpickno/member/operatePickNo?keepQryData=y", label: "到監理服務網查詢可選號碼" },
      action: "列幾組候選，以官方為準",
      details: {
        title: "想要的號碼查不到？",
        paragraphs: [
          "可能還沒開放、已被選走，或另行標售，請以官方清單與公告確認。紀念日、好記的排列可依喜好挑選；吉凶評分不代表行車安全。"
        ]
      },
    },
    {
      id: "delegate", step: "確認誰辦與地點", title: "自己辦或請人代辦，先分清楚責任",
      paragraphs: [],
      note: "代辦不等於登記在代辦人名下。車主與車輛資料要正確，一般選號完成後不能任意移給別人或別台車。",
      link: { href: "/faq#registration-documents", label: "查看領牌文件與交付方式" },
      action: "約好誰查號、繳費、送件",
      options: [
        {
          title: "自己操作",
          answer: "先備好工具",
          facts: [
            {
              label: "核對項目",
              text: "會員、自然人憑證、讀卡機與付款方式。"
            }
          ]
        },
        {
          title: "委託操作",
          answer: "先問清楚分工",
          facts: [
            {
              label: "核對項目",
              text: "委託具會員資格者，約好誰查號、繳費、送件及提供證明，代辦費另確認。"
            }
          ]
        }
      ],
      details: {
        title: "想選外縣市的號碼",
        paragraphs: [
          "可以跨所、站查選，但須到該號牌管轄單位領牌，不能轉到另一站領。請先確認代辦費、文件與時間；特殊車種或車輛狀態另有限制。"
        ]
      },
    },
    {
      id: "before-payment", step: "付款前最後核對", title: "按下付款前，逐項確認",
      paragraphs: [],
      points: [
        {
          label: "號碼與登記資料",
          text: "英文、數字、車主及指定車輛，有沒有填錯？"
        },
        {
          label: "最後總額",
          text: "選號費或得標金、手續費、代辦費，是否已含在報價？"
        },
        {
          label: "辦理人與地點",
          text: "由誰到哪個監理單位領牌？"
        },
        {
          label: "繳款日與領牌日",
          text: "兩個期限分開記；車輛與文件趕得上嗎？"
        },
        {
          label: "完成紀錄",
          text: "保存官方繳費證明，領牌後核對車牌與行照。結果不明先查紀錄或聯絡承辦人。"
        }
      ],
      note: "證件按約定管道交付，本站諮詢表單不需身分證字號或銀行資料。",
      action: "核對資料、費用與期限",
    },
  ],
};

export const guides = [firstCarGuide, tradeInGuide, licensePlateGuide, suvSelectionGuide, powertrainGuide, maintenanceGuide];
export function getGuide(slug: string) { return guides.find((guide) => guide.slug === slug); }
export function guideTitle(guide: Guide) { return `${guide.title}｜張鈺漣購車指南`; }

// Keep published URLs useful; trade-in is restored as its own canonical article.
export const guideRedirects = [
  { source: "/guides/swift-buying-cost", destination: "/guides/first-car#budget", permanent: true },
  { source: "/guides/buying-cost", destination: "/guides/first-car#budget", permanent: true },
  { source: "/guides/quote-contract", destination: "/guides/first-car#contract", permanent: true },
  { source: "/guides/financing-insurance", destination: "/guides/first-car#payment", permanent: true },
  { source: "/guides/delivery-process", destination: "/guides/first-car#delivery", permanent: true },
  { source: "/guides/buying-process", destination: "/guides/first-car#paperwork", permanent: true },
  { source: "/guides/vitara-vs-s-cross", destination: "/cars/vitara#vitara-vs-s-cross", permanent: true },
  { source: "/guides/e-vitara-charging", destination: "/cars/e-vitara#e-vitara-charging", permanent: true },
];
