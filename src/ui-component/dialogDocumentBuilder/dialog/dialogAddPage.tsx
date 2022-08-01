import { Typography, Box, Divider, Dialog } from '@mui/material';
import { FormattedMessage, useIntl } from 'react-intl';
import { useTheme } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import DialogCreatePage from './dialogCreatePage';
import { useState } from 'react';

const DialogAddPage = ({ onClose }: any) => {
    const theme = useTheme();
    const [openCreateDialog, setOpenCreateDialog] = useState<boolean>(false);

    const handleCloseCreatePage = () => {
        setOpenCreateDialog(false);
        onClose();
    };
    return (
        <Box>
            <Box
                sx={{ display: 'flex', padding: '10px 20px', alignItems: 'center', cursor: 'pointer' }}
                onClick={() => setOpenCreateDialog(true)}
            >
                <AddIcon />
                <Typography ml={1} sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 500, fontSize: '14px' }}>
                    <FormattedMessage id="create_new_page" />
                </Typography>
            </Box>
            <Dialog
                sx={{ '.MuiDialog-paper': { minWidth: '562px' } }}
                open={openCreateDialog}
                onClose={handleCloseCreatePage}
                aria-labelledby="create-page-dialog-title2"
                aria-describedby="create-page-dialog-description2"
            >
                <DialogCreatePage onClose={handleCloseCreatePage} />
            </Dialog>
            <Divider />
            <Box
                sx={{
                    padding: '4px 24px',
                    textTransform: 'uppercase',
                    fontFamily: 'Inter',
                    fontSize: '10px',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    color: '#7A7A7A'
                }}
            >
                <FormattedMessage id="saved_pages" />
            </Box>
            <Divider />
        </Box>
    );
};

export default DialogAddPage;
