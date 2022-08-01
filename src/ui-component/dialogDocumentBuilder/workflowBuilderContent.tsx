import { FormattedMessage } from 'react-intl';
import { Box } from '@mui/material';
import { useEffect } from 'react';
import ReactFlow, { useNodesState, useEdgesState, Edge, BackgroundVariant, Background, MarkerType, Node } from 'react-flow-renderer';

import { ColumnHeader, NextButton } from './ui';
import TriggerNode from './workflow/triggerNode';
import ScheduleNode from './workflow/scheduleNode';
import WebhookNode from './workflow/webhookNode';
import TaskNode from './workflow/taskNode';
import AutomationNode from './workflow/automationNode';
import ApprovalNode from './workflow/approvalNode';
import ConnectNode from './workflow/connectNode';
import BranchNode from './workflow/branchNode';
import EndNode from './workflow/endNode';
import { CustomNodeType, FormData, WorkFlowNode } from './types';
import { useFormikContext } from 'formik';

interface WorkflowBuilderContentProps {
    onNext?: () => void;
}

const nodeTypes = {
    triggerNode: TriggerNode,
    scheduleNode: ScheduleNode,
    webhookNode: WebhookNode,
    taskNode: TaskNode,
    automationNode: AutomationNode,
    approvalNode: ApprovalNode,
    connectNode: ConnectNode,
    branchNode: BranchNode,
    endNode: EndNode
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

const WorkflowBuilderContent = ({ onNext }: WorkflowBuilderContentProps) => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const { values } = useFormikContext<FormData>();
    const flowPosX = 450;
    const flowPosY = 39;

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
                data: nodeData,
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

    console.log('delete', nodes);

    return (
        <Box sx={{ borderTop: '1px solid #D4DBEA', borderBottom: '1px solid #E0E0E0', height: '750px' }}>
            <ColumnHeader sx={{ justifyContent: 'flex-end', gap: '12px' }}>
                <FormattedMessage id="change_saved" />
                <NextButton onClick={onNext}>
                    <FormattedMessage id="save_and_close" />
                </NextButton>
            </ColumnHeader>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodesDraggable={false}
                defaultZoom={0.8}
            >
                <Background variant={BackgroundVariant.Lines} />
            </ReactFlow>
        </Box>
    );
};

export default WorkflowBuilderContent;
