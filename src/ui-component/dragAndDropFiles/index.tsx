import { Box, Drawer, Typography, Grid, CardMedia, Dialog } from '@mui/material';
import { FormattedMessage, useIntl } from 'react-intl';
import { useTheme } from '@mui/material/styles';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useDropzone } from 'react-dropzone';
import React from 'react';
import DIalogImage from 'views/pages/tasks/DIalogImage';
import clip from '../../assets/images/clip.svg';
import ph_trash from '../../assets/images/ph_trash.svg';

interface DrugAndDropFileseProps {
    files: any;
    setFiles: any;
    deleteImg: any;
}

const DrugAndDropFiles = ({ files, setFiles, deleteImg }: DrugAndDropFileseProps) => {
    const theme = useTheme();
    const [dialogImage, setDialogImage] = React.useState(false);
    const [imageView, setImageView] = React.useState('');
    const { getRootProps, getInputProps, open } = useDropzone({
        noClick: true,
        noKeyboard: true,
        onDrop: (acceptedFiles) => {
            setFiles(
                acceptedFiles.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file)
                    })
                )
            );
        }
    });
    const handleOpenDialogImage = (url: string) => {
        setImageView(url);
        setDialogImage(true);
    };
    const handleCloseDialogImage = () => {
        setDialogImage(false);
    };
    return (
        <Box>
            <div {...getRootProps({ className: 'dropzon dropzone' })}>
                <input {...getInputProps()} />
                <Box sx={{ display: 'flex', alignItem: 'center' }}>
                    <Box mr={1} sx={{ width: '24px', height: '24px' }}>
                        <CardMedia sx={{ objectFit: 'contain' }} component="img" width="18px" image={clip} alt="alt image" />
                    </Box>
                    <Typography
                        sx={{
                            color: theme.palette.grey[400],
                            fontFamily: 'Inter',
                            fontWeight: 400,
                            fontSize: '14px',
                            fontStyle: 'italic',
                            mt: '4px'
                        }}
                    >
                        <FormattedMessage id="drag_and_drop_files_to_attach_or" />
                    </Typography>
                    <Typography
                        onClick={open}
                        sx={{
                            color: theme.palette.grey[400],
                            fontFamily: 'Inter',
                            fontWeight: 700,
                            fontSize: '14px',
                            textDecoration: 'underline',
                            mt: '4px',
                            ml: '8px',
                            cursor: 'pointer'
                        }}
                    >
                        <FormattedMessage id="browse" />
                    </Typography>
                </Box>
            </div>
            <Grid container spacing={3} mt={2}>
                {files &&
                    files.map((file: any) => (
                        <Grid item xs={6} sm={4} key={file.preview}>
                            <Box sx={{ position: 'relative' }}>
                                <CardMedia
                                    sx={{ objectFit: 'cover', borderRadius: '5px', cursor: 'pointer' }}
                                    component="img"
                                    onClick={() => handleOpenDialogImage(file.preview)}
                                    width="100%"
                                    height="100%"
                                    image={file.preview}
                                    alt="alt image"
                                />
                                <Box
                                    onClick={() => deleteImg(file.preview)}
                                    sx={{
                                        position: 'absolute',
                                        bottom: '10px',
                                        right: '10px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <CardMedia
                                        sx={{ objectFit: 'cover', borderRadius: '5px', cursor: 'pointer' }}
                                        component="img"
                                        width="100%"
                                        height="100%"
                                        image={ph_trash}
                                        alt="alt image"
                                    />
                                </Box>
                            </Box>
                        </Grid>
                    ))}
            </Grid>
            <Dialog sx={{ '.MuiDialog-paper': { p: 0 } }} onClose={handleCloseDialogImage} open={dialogImage}>
                <DIalogImage handleClose={handleCloseDialogImage} image={imageView} />
            </Dialog>
        </Box>
    );
};

export default DrugAndDropFiles;
