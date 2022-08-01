import { createContext } from 'react';

export enum FIELD_TYPE {
    TEXT = 'Text',
    TEXTAREA = 'Textarea',
    DROPDOWN = 'Dropdown',
    TICKBOX = 'Tickbox',
    FILE_UPLOADER = 'File uploader',
    TABLE = 'Table'
}

export type Field = {
    fieldType: FIELD_TYPE;
    fieldName: string;
    fieldValue: number | string | File;
    fieldItems?: string[];
    fieldTime: number;
    fieldRequired?: boolean;
    fieldEditable?: boolean;
    fieldHidden?: boolean;
};

export type Section = {
    sectionName: string;
    sectionVariable: boolean;
    sectionFields: Field[];
    sectionChecked?: boolean;
    sectionClicked?: boolean;
};

export type Page = {
    pageName: string;
    pageVariable: boolean;
    pageSections: Section[];
    pageChecked?: boolean;
    pageClicked?: boolean;
};

export enum WorkFlowTriggerType {
    SCHEDULE,
    WEBHOOK
}

export type WorkFlowNodeSchedule = {
    date?: Date;
    eventCheck?: boolean;
    week?: number;
};

export type WorkFlowNodeTask = {
    name?: string;
    icon?: string;
    duration?: number;
};

export enum WorkFlowNodeConnectStyle {
    CIRCLE,
    SQUARE,
    NOICON
}

export enum WorkFlowNodeBranchStyle {
    APPROVED,
    NOT_APPROVED
}

export type WorkFlowNode = {
    nodeType: CustomNodeType;
    floor: number;
    which: number;
    width: number;
    trigger?: WorkFlowTriggerType;
    schedule?: WorkFlowNodeSchedule;
    task?: WorkFlowNodeTask;
    automation?: WorkFlowNodeTask;
    approval?: WorkFlowNodeTask;
    connect?: WorkFlowNodeConnectStyle;
    branch?: WorkFlowNodeBranchStyle;
};

export type WorkFlowStyle = {
    rowHeight: number;
    colWidth: number;
    floorSpace: number;
};

export type WorkFlow = {
    flowStyle: WorkFlowStyle;
    flowNodes: WorkFlowNode[];
    taskAssigned: boolean;
    taskApproved: boolean;
};

export type FormData = {
    pages: Page[];
    workflow: WorkFlow;
};

export enum CustomNodeType {
    TRIGGERNODE = 'trigger',
    SCHEDULENODE = 'schedule',
    WEBHOOKNODE = 'webhook',
    TASKNODE = 'task',
    AUTOMATIONNODE = 'automation',
    APPROVALNODE = 'approval',
    CONNECTNODE = 'connect',
    BRANCHNODE = 'branch',
    ENDNODE = 'end'
}

export const defaultValue: FormData = {
    pages: [
        {
            pageName: 'Untitled Page 1',
            pageVariable: false,
            pageSections: [
                {
                    sectionName: 'Untitled Section 1',
                    sectionVariable: false,
                    sectionFields: [],
                    sectionChecked: false,
                    sectionClicked: false
                }
            ],
            pageChecked: false,
            pageClicked: false
        }
    ],
    workflow: {
        flowStyle: {
            rowHeight: 180,
            colWidth: 300,
            floorSpace: 20
        },
        flowNodes: [
            {
                nodeType: CustomNodeType.TRIGGERNODE,
                floor: 0,
                which: 1,
                width: 300
            }
        ],
        taskAssigned: false,
        taskApproved: false
    }
};

export const DocumentBuilderContext = createContext<{
    form: FormData;
    pageIndex: number;
    setPageIndex: (step: number) => void;
}>({
    form: defaultValue,
    pageIndex: 0,
    setPageIndex: console.log
});
export const ItemTypes = {
    SECTION: 'section',
    FIELD: 'field',
    FIELD_NEW: 'field_new',
    TABLE_ITEM: 'tableitem',
    DROPDOWN_ITEM: 'dropdownitem'
};

export enum ContentType {
    DOCUMENT_BUILDER,
    WORKFLOW_BUILDER,
    PUBLISH
}
