import { Box, Popover, Typography } from '@mui/material';
import { memo, ReactElement, useState } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { useFormikContext } from 'formik';
import update from 'immutability-helper';

import { ReactComponent as CheckIcon } from 'assets/images/check.svg';
import { ReactComponent as RobotIcon } from 'assets/images/robot.svg';
import { ReactComponent as FileIcon } from 'assets/images/fileText.svg';
import { ReactComponent as CircleButtonIcon } from 'assets/images/buttonC.svg';
import { ReactComponent as SquareButtonIcon } from 'assets/images/buttonS.svg';
import { ReactComponent as NoPlusButtonIcon } from 'assets/images/buttonSF.svg';

import { WorkFlowNodeConnectStyle, FormData, CustomNodeType } from '../types';

enum Action {
    APPROVAL = 'approval',
    TASK = 'task',
    AUTOMATION = 'automation'
}

type ActionMemu = {
    type: Action;
    label: string;
    icon: ReactElement;
};

const actionMenus = [
    {
        type: Action.TASK,
        label: 'Task',
        icon: <FileIcon />
    },
    {
        type: Action.AUTOMATION,
        label: 'Automation',
        icon: <RobotIcon />
    }
];
export default memo(({ data, isConnectable }: any) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const [hoverIndex, setHoverIndex] = useState<number>();
    const { values, setValues } = useFormikContext<FormData>();

    const handleClickPopupOver = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClickAction = (type: Action) => {
        const newFlowNodes = [...values.workflow.flowNodes];

        if (type === Action.TASK || type === Action.AUTOMATION) {
            const filtedNodes = newFlowNodes.filter(
                (node) => node.nodeType === CustomNodeType.TASKNODE || node.nodeType === CustomNodeType.AUTOMATIONNODE
            );

            if (filtedNodes.length === 0) {
                const index = newFlowNodes.findIndex((node) => node.nodeType === CustomNodeType.CONNECTNODE);
                const prevNodes = [...newFlowNodes.slice(0, index)];
                let level = prevNodes[prevNodes.length - 1].floor + 1;
                const footNodes = [
                    {
                        nodeType: CustomNodeType.CONNECTNODE,
                        connect: WorkFlowNodeConnectStyle.SQUARE,
                        floor: level,
                        which: 1,
                        width: 32
                    },
                    {
                        nodeType: type === Action.TASK ? CustomNodeType.TASKNODE : CustomNodeType.AUTOMATIONNODE,
                        floor: (level += 1),
                        which: 1,
                        width: 300
                    },
                    {
                        nodeType: CustomNodeType.CONNECTNODE,
                        connect: WorkFlowNodeConnectStyle.CIRCLE,
                        floor: (level += 1),
                        which: 1,
                        width: 32
                    },
                    {
                        nodeType: CustomNodeType.ENDNODE,
                        floor: (level += 1),
                        which: 1,
                        width: 40
                    }
                ];

                setValues(update(values, { workflow: { flowNodes: { $set: update(prevNodes, { $push: footNodes }) } } }));
            } else {
                const index = newFlowNodes.findIndex(
                    (node) => node.nodeType === CustomNodeType.TASKNODE || node.nodeType === CustomNodeType.AUTOMATIONNODE
                );
                const prevNodes = [...newFlowNodes.slice(0, index)];
                let level = newFlowNodes[index].floor;
                const footNodes = [
                    {
                        nodeType: CustomNodeType.TASKNODE,
                        floor: (level += 1),
                        which: 0,
                        width: 300
                    },
                    {
                        nodeType: CustomNodeType.AUTOMATIONNODE,
                        floor: level,
                        which: 2,
                        width: 300
                    },
                    {
                        nodeType: CustomNodeType.CONNECTNODE,
                        connect: WorkFlowNodeConnectStyle.CIRCLE,
                        floor: (level += 1),
                        which: 0,
                        width: 32
                    },
                    {
                        nodeType: CustomNodeType.CONNECTNODE,
                        connect: WorkFlowNodeConnectStyle.CIRCLE,
                        floor: level,
                        which: 2,
                        width: 32
                    },
                    {
                        nodeType: CustomNodeType.CONNECTNODE,
                        connect: WorkFlowNodeConnectStyle.CIRCLE,
                        floor: (level += 1),
                        which: 1,
                        width: 32
                    },
                    {
                        nodeType: CustomNodeType.ENDNODE,
                        floor: (level += 1),
                        which: 1,
                        width: 40
                    }
                ];

                setValues(update(values, { workflow: { flowNodes: { $set: update(prevNodes, { $push: footNodes }) } } }));
            }
        } else if (type === Action.APPROVAL) {
            const filtedNodes = newFlowNodes.filter((node) => node.nodeType === CustomNodeType.TASKNODE);
            const filtedNodes1 = newFlowNodes.filter((node) => node.nodeType === CustomNodeType.AUTOMATIONNODE);
            const filtedNodes2 = newFlowNodes.filter((node) => node.nodeType === CustomNodeType.APPROVALNODE);

            if (filtedNodes.length > 0 && filtedNodes1.length > 0 && filtedNodes2.length === 0 && values.workflow.taskAssigned) {
                const prevNodes = [...newFlowNodes.slice(0, newFlowNodes.length - 2)];
                let level = newFlowNodes[newFlowNodes.length - 2].floor;
                const footNodes = [
                    {
                        nodeType: CustomNodeType.APPROVALNODE,
                        floor: level,
                        which: 1,
                        width: 300
                    },
                    {
                        nodeType: CustomNodeType.CONNECTNODE,
                        connect: WorkFlowNodeConnectStyle.CIRCLE,
                        floor: (level += 1),
                        which: 1,
                        width: 32
                    },
                    {
                        nodeType: CustomNodeType.ENDNODE,
                        floor: (level += 1),
                        which: 1,
                        width: 40
                    }
                ];

                setValues(update(values, { workflow: { flowNodes: { $set: update(prevNodes, { $push: footNodes }) } } }));
            }
        }

        handleClose();
    };

    const handleMouseEnter = (idx: number) => {
        setHoverIndex(idx);
    };

    const handleMouseOut = () => {
        setHoverIndex(undefined);
    };

    return (
        <>
            <Handle
                type="target"
                position={Position.Top}
                isConnectable={isConnectable}
                id="a"
                style={{ width: '1px', height: '1px', background: 'transparent' }}
            />
            <Handle
                type="target"
                position={Position.Left}
                isConnectable={isConnectable}
                id="b"
                style={{ width: '1px', height: '1px', background: 'transparent' }}
            />
            <Handle
                type="target"
                position={Position.Right}
                isConnectable={isConnectable}
                id="c"
                style={{ width: '1px', height: '1px', background: 'transparent' }}
            />
            <Box onClick={handleClickPopupOver} sx={{ background: 'transparent', width: '32px', height: '32px', cursor: 'pointer' }}>
                {data.conType === WorkFlowNodeConnectStyle.CIRCLE && <CircleButtonIcon />}
                {data.conType === WorkFlowNodeConnectStyle.SQUARE && <SquareButtonIcon />}
                {data.conType === WorkFlowNodeConnectStyle.NOICON && <NoPlusButtonIcon />}
            </Box>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                sx={{ '& .MuiPopover-paper': { background: 'transparent', boxShadow: 'none' } }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {values.workflow.taskAssigned && (
                        <Box
                            onMouseEnter={() => handleMouseEnter(0)}
                            onMouseLeave={handleMouseOut}
                            key={0}
                            sx={{
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                borderRadius: '16px',
                                background: '#EFF2FA',
                                gap: '4px',
                                padding: '8px',
                                width: 'fit-content'
                            }}
                            onClick={() => handleClickAction(Action.APPROVAL)}
                        >
                            <CheckIcon />
                            {hoverIndex === 0 && (
                                <Typography sx={{ fontWeight: 500, fontSize: '12px', color: '#344054' }}>Approval</Typography>
                            )}
                        </Box>
                    )}
                    {actionMenus.map((actionMenu, idx: number) => (
                        <Box
                            onMouseEnter={() => handleMouseEnter(idx + 1)}
                            onMouseLeave={handleMouseOut}
                            key={idx}
                            sx={{
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                borderRadius: '16px',
                                background: '#EFF2FA',
                                gap: '4px',
                                padding: '8px',
                                width: 'fit-content'
                            }}
                            onClick={() => handleClickAction(actionMenu.type)}
                        >
                            {actionMenu.icon}
                            {hoverIndex === idx + 1 && (
                                <Typography sx={{ fontWeight: 500, fontSize: '12px', color: '#344054' }}>{actionMenu.label}</Typography>
                            )}
                        </Box>
                    ))}
                </Box>
            </Popover>
            <Handle
                type="source"
                position={Position.Left}
                isConnectable={isConnectable}
                id="a"
                style={{ width: '1px', height: '1px', background: 'transparent' }}
            />
            <Handle
                type="source"
                position={Position.Right}
                isConnectable={isConnectable}
                id="b"
                style={{ width: '1px', height: '1px', background: 'transparent' }}
            />
            <Handle
                type="source"
                position={Position.Bottom}
                isConnectable={isConnectable}
                id="c"
                style={{ width: '1px', height: '1px', background: 'transparent' }}
            />
        </>
    );
});
