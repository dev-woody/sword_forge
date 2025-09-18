export const BALANCE_VERSION = "v0.2.0"; // 변경 시 저장 초기화 권장
export const MODE = "EASY"; // "HARD"로 전환 가능
// 상점(워프/방지권) — 모드별 가격(요청값)
export const SHOP_PRICE = {
    HARD: {
        WARP_9: 800_000, WARP_13: 5_000_000, WARP_14: 7_500_000, WARP_15: 10_000_000,
        PROTECT_1: 2_100_000, PROTECT_3: 6_000_000,
    },
    EASY: {
        WARP_9: 1_000_000, WARP_13: 7_000_000, WARP_14: 10_000_000, WARP_15: 15_000_000,
        PROTECT_1: 1_000_000, PROTECT_3: 2_500_000,
    }
};
export const WARP_PROB = { "+9": 0.30, "+13": 0.25, "+14": 0.20, "+15": 0.15 };
// 교환소(조합소) — 모드별 재료 요구(요청값)
export const EXCHANGE = {
    HARD: [
        { in: { "국적불분명 철조각": 8 }, out: { "깨짐 방지권": 1 } },
        { in: { "타우의 뼈 부스러기": 5 }, out: { "깨짐 방지권": 1 } },
        { in: { "빛 바랜 형광물질": 3 }, out: { "불꽃 마검": 1 } },
        { in: { "스위스산 철조각": 5 }, out: { "깨짐 방지권": 2 } },
        { in: { "불꽃마검 손잡이": 2 }, out: { "+16강 투명 검": 1 } },
        { in: { "사악한 영혼": 4 }, out: { "깨짐 방지권": 4 } },
        { in: { "사악한 영혼": 4 }, out: { "+19강 왕푸야샤": 1 } },
        { in: { "도끼 가루": 6 }, out: { "깨짐 방지권": 10 } },
        { in: { "투명 물질": 4 }, out: { "깨짐 방지권": 11 } },
    ],
    EASY: [
        { in: { "국적불분명 철조각": 5 }, out: { "깨짐 방지권": 1 } },
        { in: { "타우의 뼈 부스러기": 3 }, out: { "깨짐 방지권": 1 } },
        { in: { "빛 바랜 형광물질": 2 }, out: { "불꽃 마검": 1 } },
        { in: { "스위스산 철조각": 3 }, out: { "깨짐 방지권": 2 } },
        { in: { "불꽃마검 손잡이": 2 }, out: { "+16강 투명 검": 1 } },
        { in: { "사악한 영혼": 6 }, out: { "+19강 왕푸야샤": 1 } },
        { in: { "도끼 가루": 6 }, out: { "깨짐 방지권": 10 } },
        { in: { "투명 물질": 3 }, out: { "깨짐 방지권": 9 } },
    ],
};
// 단계 테이블
export const STAGES = {
    // STAGES 객체 내 HARD 부분만 교체
    HARD: {
        0: { name: "낡은 단검", costGold: 500, prob: 1.00, sellGold: "-", protect: "-", drop: "-" },
        1: { name: "쓸만한 단검", costGold: 500, prob: 0.98, sellGold: 200, protect: "-", drop: "-" },
        2: { name: "견고한 단검", costGold: 1_000, prob: 0.95, sellGold: 500, protect: "-", drop: "-" },
        3: { name: "바이킹 소드", costGold: 2_000, prob: 0.93, sellGold: 1_000, protect: "-", drop: "-" },
        4: { name: "불타는 검", costGold: 4_000, prob: 0.90, sellGold: 2_000, protect: 1, drop: "-" },
        5: { name: "냉기의 소드", costGold: 7_000, prob: 0.86, sellGold: 6_000, protect: 1, drop: "-" },
        6: { name: "양날 검", costGold: 10_000, prob: 0.81, sellGold: 15_000, protect: 1, drop: "국적불분명 철조각" },
        7: { name: "심판자의 대검", costGold: 15_000, prob: 0.75, sellGold: 25_000, protect: 1, drop: "국적불분명 철조각" },
        8: { name: "마력의 검", costGold: 22_000, prob: 0.70, sellGold: 50_000, protect: 1, drop: "국적불분명 철조각" },
        9: { name: "타우 스워드", costGold: 30_000, prob: 0.66, sellGold: 90_000, protect: 1, drop: "타우의 뼈 부스러기" },
        10: { name: "형광검", costGold: 30_000, prob: 0.62, sellGold: 180_000, protect: 1, drop: "빛 바랜 형광물질" },
        11: { name: "피묻은 검", costGold: 51_000, prob: 0.61, sellGold: 500_000, protect: 1, drop: "스위스산 철조각" },
        12: { name: "화염의 쌍검", costGold: 70_000, prob: 0.54, sellGold: 1_000_000, protect: 1, drop: "스위스산 철조각" },
        13: { name: "불꽃 마검", costGold: 800_000, prob: 0.50, sellGold: 2_000_000, protect: 2, drop: "불꽃마검 손잡이" },
        14: { name: "마검 아포피스", costGold: 100_000, prob: 0.49, sellGold: 5_000_000, protect: 3, drop: "사악한 영혼" },
        15: { name: "데몬 배틀 엑스", costGold: 130_000, prob: 0.46, sellGold: 10_000_000, protect: 4, drop: "도끼 가루" },
        16: { name: "투명 검", costGold: 170_000, prob: 0.44, sellGold: 20_000_000, protect: 7, drop: "투명 물질" },
        17: { name: "날렵한 용검", costGold: 220_000, prob: 0.40, sellGold: 44_500_000, protect: 9, drop: "-" },
        18: { name: "샤이니 소드", costGold: 300_000, prob: 0.38, sellGold: 72_000_000, protect: 10, drop: "-" },
        19: { name: "왕푸야샤", costGold: 400_000, prob: 0.35, sellGold: 120_000_000, protect: 12, drop: "-", note: "[보관필요]" },
        20: { name: "다색검", costGold: 650_000, prob: 0.33, sellGold: 240_000_000, protect: 15, drop: "-" },
        21: { name: "템페스트 골드", prob: 0.30, sellGold: 300_000_000, protect: 17, requires: { "왕푸야샤": 1 }, note: "[보관필요]" },
        22: { name: "샤프 워커", prob: 0.27, sellGold: 400_000_000, protect: 20, requires: { "템페스트 골드": 2 }, note: "[보관필요]" },
        23: { name: "피에로의 쌍검", prob: 0.27, sellGold: 550_000_000, protect: 22, requires: { "사악한 영혼": 12 } },
        24: { name: "도룡도", prob: 0.25, sellGold: 750_000_000, protect: 23, requires: { "샤프 워커": 1 } },
        25: { name: "안 강해보이는 검", prob: 0.35, sellGold: 400_000_000, protect: 23, requires: { "도끼 가루": 15 }, note: "[하드버그]" },
        26: { name: "메두사", costGold: 5_000_000, prob: 0.50, sellGold: 1_800_000_000, protect: "FORBIDDEN", note: "[방지권불가]" },
        27: { name: "오딧세이 소드", prob: 0.40, sellGold: 2_500_000_000, protect: "FORBIDDEN", requires: { "투명 물질": 2 }, note: "[방지권불가]" },
        28: { name: "모자이칼", costGold: 0, prob: 0.15, sellGold: null, protect: "FORBIDDEN", note: "[방지권불가]" },
        29: {
            name: "화염에 달군 검",
            costGold: 3_500_000,
            prob: 0.32,
            sellGold: 4_800_000_000,
            protect: "FORBIDDEN", note: "[방지권불가]"
        },
        30: {
            name: "종결검: 무극검",
            costGold: 5_000_000_000,
            prob: 0.12,
            sellGold: 12_000_000_000,
            protect: "FORBIDDEN",
            requires: {
                "샤프 워커": 1,
                "투명 물질": 5,
                "사악한 영혼": 20,
                "도끼 가루": 20
            },
            note: "[종결][방지권불가]"
        }
    },
    EASY: {
        0: { name: "낡은 단검", costGold: 300, prob: 1.00, sellGold: "-", protect: "-", drop: "-" },
        1: { name: "쓸만한 단검", costGold: 300, prob: 1.00, sellGold: 150, protect: "-", drop: "-" },
        2: { name: "견고한 단검", costGold: 500, prob: 1.00, sellGold: 400, protect: "-", drop: "-" },
        3: { name: "바이킹 소드", costGold: 500, prob: 0.95, sellGold: 600, protect: "-", drop: "-" },
        4: { name: "불타는 검", costGold: 1_000, prob: 0.95, sellGold: 800, protect: "-", drop: "-" },
        5: { name: "냉기의 소드", costGold: 1_500, prob: 0.90, sellGold: 1_600, protect: "-", drop: "-" },
        6: { name: "양날 검", costGold: 2_000, prob: 0.90, sellGold: 3_500, protect: 1, drop: "국적불분명 철조각" },
        7: { name: "심판자의 대검", costGold: 2_000, prob: 0.90, sellGold: 6_100, protect: 1, drop: "국적불분명 철조각" },
        8: { name: "마력의 검", costGold: 3_000, prob: 0.85, sellGold: 10_000, protect: 1, drop: "국적불분명 철조각" },
        9: { name: "타우 스워드", costGold: 5_000, prob: 0.80, sellGold: 20_000, protect: 1, drop: "타우의 뼈 부스러기" },
        10: { name: "형광검", costGold: 10_900, prob: 0.80, sellGold: 35_100, protect: 1, drop: "빛 바랜 형광물질" },
        11: { name: "피묻은 검", costGold: 20_000, prob: 0.75, sellGold: 160_000, protect: 1, drop: "스위스산 철조각" },
        12: { name: "화염의 쌍검", costGold: 35_000, prob: 0.70, sellGold: 350_000, protect: 1, drop: "스위스산 철조각" },
        13: { name: "불꽃 마검", costGold: 55_000, prob: 0.70, sellGold: 1_000_000, protect: 2, drop: "불꽃마검 손잡이" },
        14: { name: "마검 아포피스", costGold: 100_000, prob: 0.65, sellGold: 3_000_000, protect: 3, drop: "사악한 영혼" },
        15: { name: "데몬 배틀 엑스", costGold: 180_000, prob: 0.60, sellGold: 7_500_000, protect: 4, drop: "도끼 가루" },
        16: { name: "투명 검", costGold: 300_000, prob: 0.60, sellGold: 14_200_000, protect: 7, drop: "투명 물질" },
        17: { name: "날렵한 용검", costGold: 300_000, prob: 0.55, sellGold: 20_000_000, protect: 9, drop: "-" },
        18: { name: "샤이니 소드", costGold: 500_000, prob: 0.50, sellGold: 30_000_000, protect: 10, drop: "-" },
        19: { name: "왕푸야샤", costGold: 800_000, prob: 0.50, sellGold: 47_500_000, protect: 12, drop: "-", note: "[보관필요]" },
        20: { name: "다색검", costGold: 1_500_000, prob: 0.45, sellGold: 68_300_000, protect: 15, drop: "-" },
        21: { name: "템페스트 골드", prob: 0.40, sellGold: 101_000_000, protect: 17, requires: { "왕푸야샤": 1 }, note: "[보관필요]" },
        22: { name: "샤프 워커", prob: 0.40, sellGold: 160_000_000, protect: 20, requires: { "템페스트 골드": 2 }, note: "[보관필요]" },
        23: { name: "피에로의 쌍검", prob: 0.40, sellGold: 230_000_000, protect: 22, requires: { "사악한 영혼": 8 } },
        24: { name: "도룡도", prob: 0.40, sellGold: 300_000_000, protect: 23, requires: { "샤프 워커": 1 } },
        25: { name: "안 강해보이는 검", prob: 0.35, sellGold: 400_000_000, protect: 23, requires: { "도끼 가루": 15 } },
        26: { name: "메두사", costGold: 5_000_000, prob: 0.50, sellGold: 1_800_000_000, protect: "FORBIDDEN", note: "[방지권불가]" },
        27: { name: "오딧세이 소드", prob: 0.40, sellGold: 2_500_000_000, protect: "FORBIDDEN", requires: { "투명 물질": 2 }, note: "[방지권불가]" },
        28: { name: "모자이칼", costGold: 0, prob: 0.15, sellGold: null, protect: "FORBIDDEN", note: "[방지권불가]" },
        29: {
            name: "화염에 달군 검",
            costGold: 2_000_000,
            prob: 0.35,
            sellGold: 3_500_000_000,
            protect: "FORBIDDEN", note: "[방지권불가]"
        },
        30: {
            name: "종결검: 무극검",
            costGold: 4_000_000_000,
            prob: 0.14,
            sellGold: 8_500_000_000,
            protect: "FORBIDDEN",
            requires: {
                "샤프 워커": 1,
                "투명 물질": 4,
                "사악한 영혼": 16,
                "도끼 가루": 16
            },
            note: "[종결][방지권불가]"
        }
    }
};
