export interface Behaviour {
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
    selectedActionId?: number;
    isCustom?: boolean;
    theme1?: string;
    behaviourId?: number;
}
