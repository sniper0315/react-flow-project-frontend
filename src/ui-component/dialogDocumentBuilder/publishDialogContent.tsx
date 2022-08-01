import {
    Box,
    Checkbox,
    FormControl,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ReactFlow, { Background, BackgroundVariant, useEdgesState, useNodesState, Node, Edge, MarkerType } from 'react-flow-renderer';
import { useFormikContext } from 'formik';

import { NextButton } from './ui';
import TriggerNode from './workflow/triggerNode';
import ScheduleNode from './workflow/scheduleNode';
import WebhookNode from './workflow/webhookNode';
import TaskNode from './workflow/taskNode';
import AutomationNode from './workflow/automationNode';
import ApprovalNode from './workflow/approvalNode';
import ConnectNode from './workflow/connectNode';
import BranchNode from './workflow/branchNode';
import EndNode from './workflow/endNode';
import { CustomNodeType, WorkFlowNode, FormData } from './types';

import { ReactComponent as LeftArrowIcon } from 'assets/images/arrow-left.svg';
import IBMIcon from 'assets/images/icons/ibm.png';
import { ReactComponent as CalendarIcon } from 'assets/images/calendar.svg';
import { ReactComponent as ChevronDownIcon } from 'assets/images/chevron-down.svg';

interface PublishDocumentProps {
    onBack?: () => void;
}

const nodeTypes = {
    triggerNode: TriggerNode,
    scheduleNode: ScheduleNode,
    webhookNode: WebhookNode,
    taskNode: TaskNode,
    automationNode: AutomationNode,
    approvalNode: ApprovalNode,
    connectNode: ConnectNode,
    endNode: EndNode,
    branchNode: BranchNode
};

const initialNodes: Node[] = [
    {
        id: CustomNodeType.TRIGGERNODE,
        type: `${CustomNodeType.TRIGGERNODE}Node`,
        data: {},
        position: { x: 800, y: 39 }
    }
];

const initialEdges: Edge[] = [];

const PublishDocument = ({ onBack }: PublishDocumentProps) => {
    const [selectServiceValue, setSelectServiceValue] = useState<string>('1');
    const [selectPostValue, setSelectPostValue] = useState<string>('5');
    const [selectStoryValue, setSelectStoryValue] = useState<string>('5');
    const [selectPeriodValue, setSelectPeriodValue] = useState<string>('2');
    const [dueDate, setDueDate] = useState<Date | null>(new Date());
    const [checkValue, setCheckValue] = useState<boolean>(false);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const { values } = useFormikContext<FormData>();
    const flowPosX = 100;
    const flowPosY = 39;

    const handleSelectServiceValueChange = (event: SelectChangeEvent) => {
        setSelectServiceValue(event.target.value as string);
    };

    const handleSelectPostValue = (event: SelectChangeEvent) => {
        setSelectPostValue(event.target.value as string);
    };

    const handleSelectStoryValue = (event: SelectChangeEvent) => {
        setSelectStoryValue(event.target.value as string);
    };

    const handleSelectPeriodValue = (event: SelectChangeEvent) => {
        setSelectPeriodValue(event.target.value as string);
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCheckValue(event.target.checked);
    };

    useEffect(() => {
        const newNodes: Node[] = [];
        const newEdges: Edge[] = [];
        const newFlowNodes: WorkFlowNode[] = [...values.workflow.flowNodes];

        for (let i = 0; i < newFlowNodes.length; i += 1) {
            const posX =
                flowPosX +
                values.workflow.flowStyle.colWidth * values.workflow.flowNodes[i].which +
                (values.workflow.flowStyle.colWidth - newFlowNodes[i].width) / 2;
            let posY = flowPosY;
            let nodeData: any = {};

            if (i !== 0) {
                posY = newNodes[newNodes.length - 1].position.y;

                if (newFlowNodes[i - 1].floor !== newFlowNodes[i].floor) {
                    if (
                        newFlowNodes[i - 1].nodeType === CustomNodeType.SCHEDULENODE ||
                        newFlowNodes[i - 1].nodeType === CustomNodeType.TASKNODE ||
                        newFlowNodes[i - 1].nodeType === CustomNodeType.APPROVALNODE ||
                        newFlowNodes[i - 1].nodeType === CustomNodeType.AUTOMATIONNODE ||
                        newFlowNodes[i - 1].nodeType === CustomNodeType.WEBHOOKNODE
                    )
                        posY += values.workflow.flowStyle.rowHeight * 1.7;
                    else if (newFlowNodes[i - 1].nodeType === CustomNodeType.CONNECTNODE) posY += values.workflow.flowStyle.rowHeight * 0.8;
                    else posY += values.workflow.flowStyle.rowHeight;
                }
            }

            if (newFlowNodes[i].nodeType === CustomNodeType.CONNECTNODE) nodeData = { conType: newFlowNodes[i].connect };
            else if (newFlowNodes[i].nodeType === CustomNodeType.BRANCHNODE) nodeData = { branchType: newFlowNodes[i].branch };

            newNodes.push({
                id:
                    newFlowNodes[i].nodeType === CustomNodeType.CONNECTNODE || newFlowNodes[i].nodeType === CustomNodeType.BRANCHNODE
                        ? `${newFlowNodes[i].nodeType}${newFlowNodes[i].floor}${newFlowNodes[i].which}`
                        : newFlowNodes[i].nodeType,
                type: `${newFlowNodes[i].nodeType}Node`,
                data: newFlowNodes[i].nodeType === CustomNodeType.CONNECTNODE ? { conType: newFlowNodes[i].connect } : {},
                position: { x: posX, y: posY }
            });
        }

        if (newFlowNodes.length === newNodes.length) {
            for (let i = 1; i < newNodes.length; i += 1) {
                const newEdge: Edge = {
                    id:
                        newFlowNodes[i - 1].floor !== newFlowNodes[i].floor
                            ? `${newNodes[i - 1].id}-${newNodes[i].id}`
                            : `${newNodes[i - 2].id}-${newNodes[i].id}`,
                    source: newFlowNodes[i - 1].floor !== newFlowNodes[i].floor ? newNodes[i - 1].id : newNodes[i - 2].id,
                    target: newNodes[i].id,
                    type: 'smoothstep',
                    markerEnd: {
                        type: MarkerType.Arrow
                    }
                };

                if (newFlowNodes[i - 1].nodeType === CustomNodeType.CONNECTNODE) {
                    newEdge.sourceHandle = 'c';

                    if (newFlowNodes[i - 1].which === 1) {
                        if (newFlowNodes[i].which === 0) newEdge.sourceHandle = 'a';
                        else if (newFlowNodes[i].which === 2) newEdge.sourceHandle = 'b';
                    }
                }

                if (newFlowNodes[i].nodeType === CustomNodeType.CONNECTNODE) {
                    if (newFlowNodes[i - 1].nodeType !== CustomNodeType.CONNECTNODE) newEdge.targetHandle = 'a';
                    else {
                        if (newFlowNodes[i].which < newFlowNodes[i - 1].which) newEdge.targetHandle = 'c';

                        if (newFlowNodes[i].which > newFlowNodes[i - 1].which) newEdge.targetHandle = 'b';
                    }
                }

                if (i >= 2 && newFlowNodes[i - 1].floor === newFlowNodes[i].floor) {
                    if (newFlowNodes[i - 2].nodeType === CustomNodeType.CONNECTNODE) {
                        if (newFlowNodes[i].which === 0) newEdge.sourceHandle = 'a';
                        else if (newFlowNodes[i].which === 2) newEdge.sourceHandle = 'b';
                    } else if (newFlowNodes[i].which === newFlowNodes[i - 2].which) newEdge.targetHandle = 'a';
                }

                if (i >= 2 && newFlowNodes[i - 1].floor !== newFlowNodes[i].floor) {
                    if (newFlowNodes[i - 2].floor === newFlowNodes[i - 1].floor) {
                        if (newFlowNodes[i - 2].which === newFlowNodes[i].which) {
                            newEdge.source = newNodes[i - 2].id;
                            newEdge.id = `${newNodes[i - 2].id}-${newNodes[i].id}`;
                        } else {
                            const newEdge1: Edge = {
                                id: `${newNodes[i - 2].id}-${newNodes[i].id}`,
                                source: newNodes[i - 2].id,
                                target: newNodes[i].id,
                                type: 'smoothstep',
                                markerEnd: {
                                    type: MarkerType.Arrow
                                }
                            };

                            if (newFlowNodes[i].nodeType === CustomNodeType.CONNECTNODE) {
                                if (newFlowNodes[i].which > newFlowNodes[i - 2].which) newEdge1.targetHandle = 'b';
                                else if (newFlowNodes[i].which < newFlowNodes[i - 2].which) newEdge1.targetHandle = 'c';
                            }

                            if (newFlowNodes[i - 2].nodeType === CustomNodeType.CONNECTNODE) newEdge1.sourceHandle = 'c';

                            newEdges.push(newEdge1);
                        }
                    }
                }

                newEdges.push(newEdge);
            }

            setNodes(newNodes);
            setEdges(newEdges);
        }
    }, [values]);

    return (
        <Box sx={{ display: 'flex' }}>
            <Box sx={{ flex: 9 }}>
                <Box
                    sx={{
                        height: '56px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        border: '1px solid #D4DBEA',
                        padding: '16px 24px',
                        borderRight: 'none'
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={onBack}>
                        <LeftArrowIcon />
                        <Typography sx={{ fontWeight: 500, fontSize: '14px' }}>Customization</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Typography sx={{ fontWeight: 500, fontSize: '10px', color: '#7A7A7A' }}>TOTAL TASK DURATION</Typography>
                        <Typography sx={{ fontWeight: 700, fontSize: '14px' }}>20 days</Typography>
                    </Box>
                </Box>
                <Box sx={{ border: '1px dashed #D4DBEA', borderRadius: '8px', height: '850px', margin: '24px', padding: '24px' }}>
                    <Typography sx={{ fontWeight: 500, fontSize: '16px' }}>Steps</Typography>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        nodeTypes={nodeTypes}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        nodesDraggable={false}
                        defaultZoom={0.8}
                    />
                </Box>
            </Box>
            <Box sx={{ flex: 5 }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        height: '56px',
                        padding: '16px',
                        border: '1px solid #D4DBEA'
                    }}
                >
                    <Typography sx={{ fontWeight: 500, fontSize: '14px' }}>Template Settings</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Typography sx={{ color: '#AAAAAA', fontSize: '14px', fontWeight: 400 }}>Changes Saved</Typography>
                        <NextButton>Save & close</NextButton>
                    </Box>
                </Box>
                <Box sx={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '32px', borderLeft: '1px solid #D4DBEA' }}>
                    <Typography sx={{ fontWeight: 400, fontSize: '14px', color: '#677487' }}>
                        Cursus neque viverra tellus felis ac, in arcu. Tincidunt non nullam id justo. Ornare amet et pellentesque quis
                        egestas.
                    </Typography>
                    <Box sx={{ gap: '16px', display: 'flex', flexDirection: 'column' }}>
                        <Typography sx={{ fontWeight: 500, fontSize: '14px' }}>Client</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <img src={IBMIcon} style={{ width: '32px', height: '32px' }} />
                            <Typography sx={{ fontSize: '16px', fontWeight: 700 }}>IBM</Typography>
                        </Box>
                    </Box>
                    <Select
                        value={selectServiceValue}
                        onChange={handleSelectServiceValueChange}
                        IconComponent={ChevronDownIcon}
                        sx={{ '& .MuiSelect-select': { fontWeight: 400, backgroundColor: 'white' } }}
                    >
                        <MenuItem value={1}>My Service #1</MenuItem>
                        <MenuItem value={2}>My Service #2</MenuItem>
                    </Select>
                    <Box sx={{ gap: '16px', display: 'flex', flexDirection: 'column' }}>
                        <Typography sx={{ fontWeight: 500, fontSize: '14px', color: 'black' }}>Variable</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <FormControl sx={{ flex: 1 }}>
                                <Select
                                    value={selectPostValue}
                                    onChange={handleSelectPostValue}
                                    IconComponent={ChevronDownIcon}
                                    sx={{
                                        '& .MuiSelect-select': { fontWeight: 700, backgroundColor: 'white', textAlign: 'right' }
                                    }}
                                    renderValue={(value) => (
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span style={{ fontWeight: 400 }}>Post</span>
                                            <span>{value}</span>
                                        </div>
                                    )}
                                >
                                    <MenuItem value={5}>5</MenuItem>
                                    <MenuItem value={10}>10</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl sx={{ flex: 1 }}>
                                <Select
                                    value={selectStoryValue}
                                    onChange={handleSelectStoryValue}
                                    IconComponent={ChevronDownIcon}
                                    sx={{
                                        '& .MuiSelect-select': { fontWeight: 700, backgroundColor: 'white', textAlign: 'right' }
                                    }}
                                    renderValue={(value) => (
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span style={{ fontWeight: 400 }}>Stories</span>
                                            <span>{value}</span>
                                        </div>
                                    )}
                                >
                                    <MenuItem value={5}>5</MenuItem>
                                    <MenuItem value={10}>10</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <Typography sx={{ fontSize: '14px', fontWeight: 500, color: 'black' }}>Scheduling</Typography>
                        <Select
                            value={selectPeriodValue}
                            onChange={handleSelectPeriodValue}
                            IconComponent={ChevronDownIcon}
                            sx={{ '& .MuiSelect-select': { fontWeight: 700, backgroundColor: 'white', textAlign: 'right' } }}
                            renderValue={(value) => (
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ fontWeight: 400 }}>Publication occurs every</span>
                                    <span>{value} weeks</span>
                                </div>
                            )}
                        >
                            <MenuItem value={2}>2 weeks</MenuItem>
                            <MenuItem value={3}>3 weeks</MenuItem>
                        </Select>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <Typography sx={{ fontSize: '14px', fontWeight: 500, color: 'black' }}>First Due Date</Typography>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateTimePicker
                                renderInput={(props) => (
                                    <TextField
                                        {...props}
                                        sx={{
                                            '& .MuiInputBase-input': { padding: '8px 0' },
                                            width: '260px',
                                            height: '36px',
                                            background: '#EFF2FA'
                                        }}
                                    />
                                )}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <CalendarIcon />
                                        </InputAdornment>
                                    )
                                }}
                                label=""
                                value={dueDate}
                                onChange={(newValue) => {
                                    setDueDate(newValue);
                                }}
                                components={{
                                    OpenPickerIcon: ChevronDownIcon
                                }}
                            />
                        </LocalizationProvider>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                            height: '48px',
                            background: '#F6F7FC',
                            borderRadius: '8px'
                        }}
                    >
                        <Checkbox value={checkValue} onChange={handleCheckboxChange} />
                        <Typography sx={{ fontWeight: 500, fontSize: '14px' }}>Save as Template</Typography>
                    </Box>
                    <TextField multiline rows="8" placeholder="Description" />
                </Box>
            </Box>
        </Box>
    );
};

export default PublishDocument;
