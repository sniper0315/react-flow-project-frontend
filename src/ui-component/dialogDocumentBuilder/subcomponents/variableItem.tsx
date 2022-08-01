import { Box } from '@mui/material';
import { ReactElement } from 'react';
import { ReactComponent as GridFourIcon } from 'assets/images/grid-four.svg';

interface VariableItemProps {
    icon?: ReactElement;
    name?: string;
}

const VariableItem = ({ icon, name = '' }: VariableItemProps) => (
    <Box
        sx={{
            display: 'flex',
            position: 'relative',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '8px',
            gap: '12px',
            height: '136px',
            maxWidth: '144px',
            padding: '8px',
            fontSize: '12px',
            border: '1px solid #D220FF'
        }}
    >
        <GridFourIcon style={{ position: 'absolute', left: 'calc(50% - 11px)', top: '-13px' }} />
        {icon}
        {name}
    </Box>
);

export default VariableItem;
