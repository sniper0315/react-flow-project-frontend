import { Box, Button, Dialog } from '@mui/material';
import { useState } from 'react';
import DialogDocumentBuilder from 'ui-component/dialogDocumentBuilder';

const Settings = () => {
    const [openDialog, setOpenDialog] = useState<boolean>(false);

    const handleCloseDialogConfirm = () => {
        setOpenDialog(false);
    };

    const handleConfirmDialog = () => {
        console.log('handle Dialog Confirm');
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    return (
        <Box>
            <Button onClick={handleOpenDialog}>Document Builder</Button>
            <Dialog
                sx={{ '.MuiDialog-paper': { minWidth: { md: '100%', lg: '1444px' } } }}
                open={openDialog}
                onClose={handleCloseDialogConfirm}
                aria-labelledby="document-builder-dialog-title2"
                aria-describedby="document-builder-dialog-description2"
            >
                <DialogDocumentBuilder onConfirm={handleConfirmDialog} onClose={handleCloseDialogConfirm} />
            </Dialog>
        </Box>
    );
};

export default Settings;
