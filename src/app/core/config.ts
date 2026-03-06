export interface AppConfig {
    appName: string;
    webMaintenance: boolean;
    cmsService: CmsServiceConfig;
}

export interface CmsServiceConfig {
    baseURL: string;
    componentURL: CmsComponentURLConfig;
}

interface CmsComponentURLConfig {
    headerComponent: string;
    expoComponent: string;
    experienceComponent: string;
    recapComponent: string;
    faqComponent: string;
    perksComponent: string;
    raffleComponent: string;
}