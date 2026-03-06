export interface CmsPerksComponents {
    data: CmsPerksComponentsData;
}

export interface CmsPerksComponentsData {
    PerkTitle: string;
    PerkSubtitle: string;
    PerkPerkList: Perks;
    PerkReminder: string;
    PerkRegisterNowLabel: string;
    PerkRegistrationLink: string;
    PerkFeaturedImages: FeaturedImage;
}

export interface Perks {
    perks: PerkInfo[];
}

export interface PerkInfo {
    perkIcon: string;
    perkDescription: string;
}

export interface FeaturedImage {
    perkFeaturedImages: string[];
}