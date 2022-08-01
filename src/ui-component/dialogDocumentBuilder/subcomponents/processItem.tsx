import { Box, Typography } from '@mui/material';
import { ReactElement } from 'react';
import { FormattedMessage } from 'react-intl';

interface ProcessItemProps {
    active?: boolean;
    icon?: ReactElement;
    titleId?: string;
    onClick?: () => void;
}

const ProcessItem = ({ active = false, icon, titleId, onClick }: ProcessItemProps) => (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }} onClick={onClick}>
        <Box
            sx={{
                borderRadius: '50%',
                backgroundColor: active ? '#EE9A8F' : '#EAECF0',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                'svg path': {
                    stroke: active ? 'white' : '#7A7A7A'
                }
            }}
        >
            {icon}
        </Box>
        <Typography variant="caption" sx={{ color: active ? '#EE9A8F' : '#7A7A7A' }}>
            <FormattedMessage id={titleId} />
        </Typography>
    </Box>
);
export default ProcessItem;
