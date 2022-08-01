import { Box } from '@mui/material';
import { ReactElement } from 'react';
import { ReactComponent as PhRowIcon } from 'assets/images/ph_rows.svg';

interface SavedSectionItemProps {
    name?: string;
}

const SavedSectionItem = ({ name = '' }: SavedSectionItemProps) => (
    <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '8px',
            backgroundColor: '#EFF2FA',
            gap: '12px',
            height: '136px',
            maxWidth: '144px',
            padding: '8px',
            fontSize: '12px'
        }}
    >
        <PhRowIcon />
        {name}
    </Box>
);

export default SavedSectionItem;
