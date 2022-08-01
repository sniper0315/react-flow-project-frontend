import { Box, Divider, Popover, Typography } from '@mui/material';
import { useState, memo } from 'react';
import { Handle, Position } from 'react-flow-renderer';

import ClockIcon from 'assets/images/clock.svg';
import WebhookIcon from 'assets/images/webhook.svg';

import MenuItem from '../subcomponents/menuItem';
import TriggerItem from '../subcomponents/triggerItem';
import { WorkFlowTriggerType, FormData, CustomNodeType, WorkFlowNodeConnectStyle, WorkFlowNode, WorkFlow } from '../types';
import { useFormikContext } from 'formik';
import update from 'immutability-helper';

export default memo(({ data, isConnectable }: any) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const { values, setValues } = useFormikContext<FormData>();
    let index = values.workflow.flowNodes.findIndex((node) => node.nodeType === CustomNodeType.TRIGGERNODE);

    const handleClickPopupOver = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const addTriggerNode = (type: WorkFlowTriggerType) => [
        {
            nodeType: type === WorkFlowTriggerType.SCHEDULE ? CustomNodeType.SCHEDULENODE : CustomNodeType.WEBHOOKNODE,
            floor: 1,
            which: 1,
            width: 300
        }
    ];

    const addFooterNodes = () => [
        {
            nodeType: CustomNodeType.CONNECTNODE,
            connect: WorkFlowNodeConnectStyle.CIRCLE,
            floor: 2,
            which: 1,
            width: 32
        },
        {
            nodeType: CustomNodeType.ENDNODE,
            floor: 3,
            which: 1,
            width: 40
        }
    ];

    const handelMenuClick = (type: WorkFlowTriggerType) => {
        const newWorkFlow: WorkFlow = { ...values.workflow };

        if (type !== undefined) {
            index = newWorkFlow.flowNodes.findIndex((node) => node.nodeType === CustomNodeType.TRIGGERNODE);
            const filtedNodes = newWorkFlow.flowNodes.filter(
                (node) =>
                    node.nodeType ===
                    (newWorkFlow.flowNodes[index].trigger === WorkFlowTriggerType.SCHEDULE
                        ? CustomNodeType.SCHEDULENODE
                        : CustomNodeType.WEBHOOKNODE)
            );

            if (filtedNodes.length === 0) newWorkFlow.flowNodes = update(newWorkFlow.flowNodes, { $push: addTriggerNode(type) });
            else newWorkFlow.flowNodes = update(newWorkFlow.flowNodes.slice(0, 1), { $push: addTriggerNode(type) });

            newWorkFlow.flowNodes = update(newWorkFlow.flowNodes, { $push: addFooterNodes() });
        }

        newWorkFlow.flowNodes[index].trigger = type;
        newWorkFlow.taskAssigned = false;
        newWorkFlow.taskApproved = false;
        setValues(update(values, { workflow: { $set: newWorkFlow } }));
        handleClose();
    };

    return (
        <Box
            sx={{
                width: '300px',
                border: '1px dashed #AAAAAA',
                borderRadius: '8px',
                padding: '24px 16px',
                backgroundColor: 'white',
                boxShadow: '0px 10px 16px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
            }}
        >
            <Typography sx={{ fontSize: '14px', fontWeight: 600, color: 'black', padding: '0 8px' }}>Trigger</Typography>
            <TriggerItem type={values.workflow.flowNodes[index].trigger} onClick={handleClickPopupOver} />
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Box sx={{ width: '245px' }}>
                    <Typography sx={{ fontWeight: 500, fontSize: '10px', textTransform: 'uppercase', padding: '16px' }}>
                        Triggers
                    </Typography>
                    <Divider />
                    <MenuItem
                        icon={<img src={ClockIcon} />}
                        name="At a Scheduled time"
                        onClick={() => handelMenuClick(WorkFlowTriggerType.SCHEDULE)}
                    />
                    <Divider />
                    <MenuItem
                        icon={<img src={WebhookIcon} />}
                        name="When webhook received"
                        onClick={() => handelMenuClick(WorkFlowTriggerType.WEBHOOK)}
                    />
                </Box>
            </Popover>
            <Handle
                type="source"
                position={Position.Bottom}
                isConnectable={isConnectable}
                style={{ width: '1px', height: '1px', background: 'transparent' }}
            />
        </Box>
    );
});
