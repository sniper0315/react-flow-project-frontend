import { Box, Typography, CardMedia } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { useTheme } from '@mui/material/styles';
import ClearIcon from '@mui/icons-material/Clear';
import download from '../../../assets/images/download.svg';
import React from 'react';

const DIalogImage = ({ handleClose, image }: any) => {
    const theme = useTheme();

    return (
        <Box sx={{ position: 'relative' }}>
            <CardMedia
                sx={{ objectFit: 'cover', borderRadius: '5px', cursor: 'pointer' }}
                component="img"
                width="100%"
                height="100%"
                image={image}
                alt="alt image"
            />
            <Box
                onClick={handleClose}
                sx={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    background: theme.palette.background.paper,
                    cursor: 'pointer'
                }}
            >
                <ClearIcon sx={{ m: '8px' }} />
            </Box>
            <Box mt={3} sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '24px', ml: '10px' }}>
                    <CardMedia sx={{ objectFit: 'cover' }} component="img" width="100%" height="100%" image={download} alt="alt image" />
                </Box>
                <Typography
                    pb={2}
                    sx={{
                        color: theme.palette.grey[400],
                        fontFamily: 'Inter',
                        fontWeight: 500,
                        fontSize: '14px'
                    }}
                >
                    <FormattedMessage id="download" />
                </Typography>
            </Box>
        </Box>
    );
};

export default DIalogImage;
