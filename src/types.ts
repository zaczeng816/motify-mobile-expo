export interface User {
    id: string;
    username: string;
    email: string;
    profileImagePath: string | null;
}

export enum WorkloadType {
    Time = "time",
    Quantity = "quantity",
}

export interface Workload {
    type: WorkloadType;
    duration: string;
}

export interface Challenge {
    id: string | null;
    ownerUsername: string;
    ownerId: string;
    name: string;
    description: string;
    isPrivate: boolean;
    category: string;
    isOngoing: boolean;
    startDate: string | null;
    endDate: string | null;
    frequency: string | null;
    workload: Workload;
    createdAt: string | null;
}
