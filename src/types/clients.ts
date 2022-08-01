export type RelevantLink = {
    id: string;
    title: string;
    url: string;
};

export type ProjectMemberType = {
    projectId?: string;
    orgMemberId: string;
    icon: string;
    firstName: string;
};

export type ProjectType = {
    id: string;
    name: string;
    description: string;
    clients: any[];
    src: string;
    status: boolean;
    date: string;
    teamMembers: ProjectMemberType[];
};

export type ClientType = {
    id: string;
    agencyId?: string;
    name: { title: string };
    email: string;
    contactName: string;
    phoneNumber: string;
    date: string;
    lang?: string;
    description?: string;
    links?: RelevantLink[];
    providedServices?: ProjectType[];
};

export interface ClientsProps {
    currentClient: ClientType;
    clientList: ClientType[];
}

export type RelevantLinkType = {
    id: string;
    agency_id: string;
    client_id: string;
    url: string;
    title: string;
    icon: string;
    created_at: string;
    updated_at: string;
};
