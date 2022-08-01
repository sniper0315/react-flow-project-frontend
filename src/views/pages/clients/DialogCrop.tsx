import { Typography, Box, Grid, TextField, CardMedia } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import React from 'react';
import { useTheme } from '@mui/material/styles';
import ButtonCustom from 'ui-component/extended/Button';
import CloseIcon from '@mui/icons-material/Close';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import cropImg from '../../../assets/images/crop.png';

const DialogCrop = ({ handleCloseDialogCrop, url }: any) => {
    const theme = useTheme();
    const [crop, setCrop] = React.useState<any>({
        aspect: 16 / 9,
        unit: '%',
        width: 50,
        height: 50,
        x: 25,
        y: 25
    });
    return (
        <Box sx={{ p: '5px 20px', borderRadius: '16px', width: { xs: '280px', sm: '364px' } }}>
            <Grid container justifyContent="space-between" alignItems="center">
                <Grid item xs={6}>
                    <Typography ml={1} sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 500, fontSize: '16px' }}>
                        <FormattedMessage id="crop" />
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        {' '}
                        <CloseIcon onClick={handleCloseDialogCrop} sx={{ fontSize: '20px', fill: '#9197AE', cursor: 'pointer' }} />
                    </Box>
                </Grid>
            </Grid>
            <Box mt={3}>
                <ReactCrop
                    className="crop"
                    // circularCrop={true}
                    crop={crop}
                    // onImageLoaded={onImageLoaded}
                    // onComplete={(c) => setCompletedCrop(c)}
                    onChange={(c: any) => setCrop(c)}
                    style={{ maxWidth: '600px', maxHeight: '800px' }}
                >
                    <img width="100%" src={url} />
                </ReactCrop>
            </Box>
            <Box mt={3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Box sx={{ width: '120px' }}>
                    <ButtonCustom onClick={handleCloseDialogCrop} colorBtn="red" titleBtn={<FormattedMessage id="crop_image" />} />
                </Box>
            </Box>
        </Box>
    );
};

export default DialogCrop;
