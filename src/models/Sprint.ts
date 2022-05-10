export interface Sprint {
    id: number;
    capabilityId: number;
    defaultLength: string;
    description: string;
    ic: boolean;
    instruction: string;
    label: string;
    mm: boolean;
    pm: boolean;
    recommended: boolean;
    createdAt?: string;
    updatedAt?: string;
    // extra
    icon?: string;
    color?: string;
    iconclass?: string;
    bgclass?: string;
    theme1?: string;
}
