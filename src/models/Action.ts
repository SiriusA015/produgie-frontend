export interface Action {
    id: number;
    sprintId: number;
    description: string;
    label: string;    
    createdAt?: string;
    updatedAt?: string;
    // extra
    icon?: string;
    color?: string;
    iconclass?: string;
    tbclass?: string;
    bgclass?: string;
    actionStakeHolder?: StakeHolder[];
    status?: string;
    activedays?: number[];
    activities?: any;
    commencedDay?: any;
    selectedActionId?: number;
    isCustom?: boolean;
    theme1?: string;  
    actionId?:number;  
}

interface StakeHolder {
    name?: string;
    email?: string;
    actionId?: number;
    assessmentId?: number;
    isAccept?: boolean;
}
