import { Box, Typography } from '@mui/material';
import { WorkFlowTriggerType } from '../types';
import ClockIcon from 'assets/images/clock.svg';
import WebhookIcon from 'assets/images/webhook.svg';
import PlusIcon from 'assets/images/plus.svg';

interface TriggerItemProps {
    type?: WorkFlowTriggerType;
    onClick?: (e: any) => void;
}

const TriggerItem = ({ type, onClick }: TriggerItemProps) => {
    console.log('TriggerItem');

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 8px',
                cursor: 'pointer',
                borderRadius: '8px',
                backgroundColor: type !== undefined ? '#EFF2FA' : 'white'
            }}
            onClick={onClick}
        >
            {type === undefined && <img src={PlusIcon} style={{ width: '18px', height: '18px' }} />}
            {type === WorkFlowTriggerType.SCHEDULE && <img src={ClockIcon} style={{ width: '18px', height: '18px' }} />}
            {type === WorkFlowTriggerType.WEBHOOK && <img src={WebhookIcon} style={{ width: '18px', height: '18px' }} />}
            {type === undefined && <Typography sx={{ fontSize: '12px', fontWeight: 500 }}>Add Trigger</Typography>}
            {type === WorkFlowTriggerType.SCHEDULE && (
                <Typography sx={{ fontSize: '12px', fontWeight: 500 }}>At a scheduled time</Typography>
            )}
            {type === WorkFlowTriggerType.WEBHOOK && (
                <Typography sx={{ fontSize: '12px', fontWeight: 500 }}>When webhook received</Typography>
            )}
        </Box>
    );
};

export default TriggerItem;
