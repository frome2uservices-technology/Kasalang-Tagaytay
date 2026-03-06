export interface CmsRaffleComponents {
    data: CmsRaffleComponentsData;
}

export interface CmsRaffleComponentsData {
    RaffleTitle: string;
    RaffleSubtitle: string;
    RaffleHashtag: string;
    RaffleHashtagDescription: string;
    RafflePrizes: Prizes;
}

export interface Prizes {
    prizes: PrizeInfo[];
}

export interface PrizeInfo {
    description: string;
    prizeImageUrl: string;
}