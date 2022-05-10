export interface CalendarEvent<MetaType = any> {
    id?: string | number;
    start: Date;
    end?: Date;
    title?: string;
    icon?: string;
    color?: string;
    actions?: EventAction[];
    allDay?: boolean;
    cssClass?: string;
    resizable?: {
    beforeStart?: boolean;
    afterEnd?: boolean;
    };
    draggable?: boolean;
    meta?: MetaType;
    eventDetails?: any;
    eventType?: any;
}
export interface EventColor {
    primary: string;
    secondary: string;
}
export interface EventAction {
    id?: string | number;
    label: string;
    cssClass?: string;
    a11yLabel?: string;
    onClick({ event, sourceEvent, }: {
        event: CalendarEvent;
        sourceEvent: MouseEvent | KeyboardEvent;
    }): any;
}
