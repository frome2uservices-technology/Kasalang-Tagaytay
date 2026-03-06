import { PreviousEvents } from "./previous-events.model";

export interface CmsRecapComponents {
    data: CmsRecapComponentsData;
}

export interface CmsRecapComponentsData {
    RecapTitle: string;
    RecapBrowseSuppliersLabel: string;
    RecapPastEvents: PastEvents;
}

interface PastEvents {
    pastEvents: PreviousEvents[];
}
