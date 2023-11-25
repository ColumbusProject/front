import { TradeLatestList } from "types";


const tradeLatestList: TradeLatestList[] = [
    {
        boardNumber: 1,
        tradeImage: '{blanket.jpg}',
        title: '훔친 비치 타올 팝니다.',
        currencyType : "KRW",
        itemType: "비치타올",
        price : 3000,
        location : "부산 서면역 근처",
        viewCount: 0,
        writeDatetime: '2023. 08. 24', 
    },

    {
        boardNumber: 2,
        tradeImage:'{swimming suit.jpg}',
        title: "수영복 무료 나눔.",
        currencyType : "USD",
        itemType: "수영복",
        price: 9.5,
        location: "부산 서면역 근처",
        viewCount: 999,
        writeDatetime: '2023. 08. 24',
    },

];

export default tradeLatestList;