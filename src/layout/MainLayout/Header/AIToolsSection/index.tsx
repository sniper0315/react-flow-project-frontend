import { Box, CardMedia } from '@mui/material';
import AIToolsDrawer from 'modules/ai-tools/AIToolsDrawer';
import React from 'react';
import brainIcon from '../../../../assets/images/brainAI.svg';

const AIToolsSection = () => {
    const [openDivider, setOpenDivider] = React.useState(false);

    const handleClickCloseDivider = () => {
        setOpenDivider(false);
    };
    const handleOpenDivider = () => {
        setOpenDivider(true);
    };

    return (
        <>
            <Box onClick={handleOpenDivider}>
                <CardMedia sx={{ objectFit: 'contain' }} component="img" image={brainIcon} alt="AI tools" />
            </Box>
            <AIToolsDrawer openDivider={openDivider} handleClickCloseDivider={handleClickCloseDivider} />
        </>
    );
};

export default AIToolsSection;
