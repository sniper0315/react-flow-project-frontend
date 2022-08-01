import { Box } from '@mui/material';
import { ReactElement } from 'react';

interface MenuItemProps {
    icon?: ReactElement;
    name?: string;
    onClick?: () => void;
}

const CustomMenuItem = ({ icon, name = '', onClick }: MenuItemProps) => (
    <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            height: '50px',
            padding: '0px 20px',
            fontSize: '14px',
            fontWeight: 500,
            cursor: 'pointer'
        }}
        onClick={onClick}
    >
        {icon}
        {name}
    </Box>
);

export default CustomMenuItem;
