export interface CmsFaqComponents {
    data: CmsFaqComponentsData;
}

export interface CmsFaqComponentsData {
    FaqTitle: string;
    FaqSubtitle: string;
    FaqAddressText: string;
    FaqLocationText: string;
    FaqAskPersonalQuestionText: string;
    FaqEmailAddress: string;
    FaqPhoneNumber: string;
    FaqFrequentlyAskedQuestions: FrequentlyAsked;
}

export interface FrequentlyAsked {
    frequentlyAsked: FaqContent[]
}

export interface FaqContent {
    description: string;
    question: string;
    answers: string[]
}