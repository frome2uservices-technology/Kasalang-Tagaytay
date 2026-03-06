import { NavigationTab } from "./navigation-tab.model";

export interface CmsHeaderComponents {
    data: CmsHeaderComponentsData;
}

export interface CmsHeaderComponentsData {
    HeaderRegisterNowLabel: string;
    HeaderMyReservationLabel: string;
    HeaderEventExpoDate: string;
    HeaderNavigationTabs: NavTabs;
}

interface NavTabs {
    navigationTabs: NavigationTab[];
}