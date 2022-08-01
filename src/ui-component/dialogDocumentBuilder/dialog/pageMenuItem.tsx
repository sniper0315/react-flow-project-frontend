import { Box, Dialog, Divider, Popover } from '@mui/material';
import { ReactComponent as BranchIcon } from 'assets/images/branch.svg';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import update from 'immutability-helper';
import { useContext, useState } from 'react';
import { ReactComponent as SquareIcon } from 'assets/images/square.svg';
import { ReactComponent as SaveIcon } from 'assets/images/save.svg';
import { ReactComponent as TextIcon } from 'assets/images/Text.svg';
import { ReactComponent as CopyIcon } from 'assets/images/copy.svg';
import { ReactComponent as DeleteIcon } from 'assets/images/deleteIcon.svg';
import { ReactComponent as VectorIcon } from 'assets/images/vector.svg';
import MenuItem from '../subcomponents/menuItem';
import { useFormikContext } from 'formik';
import { DocumentBuilderContext, Page, FormData } from '../types';
import DialogEditPage from './dialogEditPage';
import DIalogCongirm from 'ui-component/dialogConfirm';

interface PageItemProps {
    name?: string;
    onClick: () => void;
    pageIndex: number;
}

const PageItem = ({ name = '', onClick, pageIndex }: PageItemProps) => {
    const [anchorEl, setAnchorEl] = useState<any>(null);
    const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
    const [openDialogConfirm, setOpenDialogConfirm] = useState<boolean>(false);
    const { setPageIndex } = useContext(DocumentBuilderContext);
    const { values, setValues } = useFormikContext<FormData>();
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const handleClickPopover = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleCloseDialogConfirm = () => {
        setOpenDialogConfirm(false);
    };
    const handleDeletePage = () => {
        if (values.pages.length < 2) return;
        setPageIndex(pageIndex - 1);
        setValues(update(values, { pages: { $splice: [[pageIndex, 1]] } }));
        handleClose();
        handleCloseDialogConfirm();
    };
    const handleDuplicatePage = () => {
        const newData = { ...values.pages[pageIndex], pageName: `${values.pages[pageIndex].pageName} (Duplicated)` };
        const newValues = [...values.pages.slice(0, pageIndex + 1), newData, ...values.pages.slice(pageIndex + 1)];
        setValues(update(values, { pages: { $set: newValues } }));
        handleClose();
    };
    const handleDeclareVariable = () => {
        const oldValue = values.pages[pageIndex].pageVariable;
        setValues(update(values, { pages: { [pageIndex]: { pageVariable: { $set: !oldValue } } } }));
        handleClose();
    };
    const handleRename = () => {
        setOpenEditDialog(true);
        handleClose();
    };

    const handleOpenDialogConfirm = () => {
        if (values.pages.length < 2) return;
        setOpenDialogConfirm(true);
    };
    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
    };

    return (
        <>
            <Box
                sx={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '4px 20px',
                    marginLeft: '8px',
                    cursor: 'pointer'
                }}
                onClick={onClick}
            >
                <BranchIcon style={{ position: 'absolute', top: '-14px', left: '6px', zIndex: 0 }} />
                {values.pages[pageIndex].pageVariable && <SquareIcon />}
                <Box>{name}</Box>
                <MoreHorizIcon sx={{ marginLeft: 'auto', cursor: 'pointer' }} onClick={handleClickPopover} />
            </Box>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left'
                }}
            >
                <Box sx={{ width: '300px' }}>
                    <MenuItem icon={<SaveIcon />} name="Save (Make reuseable)" />
                    <Divider />
                    <MenuItem
                        icon={<VectorIcon />}
                        name={values.pages[pageIndex].pageVariable ? 'Remove variable' : 'Declare variable'}
                        onClick={handleDeclareVariable}
                    />
                    <Divider />
                    <MenuItem icon={<TextIcon />} name="Rename" onClick={handleRename} />
                    <Divider />
                    <MenuItem icon={<CopyIcon />} name="Duplicate" onClick={handleDuplicatePage} />
                    <Divider />
                    <MenuItem icon={<DeleteIcon />} name="Delete" onClick={handleOpenDialogConfirm} />
                </Box>
            </Popover>
            <Dialog
                sx={{ '.MuiDialog-paper': { minWidth: '562px' } }}
                open={openEditDialog}
                onClose={handleCloseEditDialog}
                aria-labelledby="edit-page-dialog-title2"
                aria-describedby="edit-page-dialog-description2"
            >
                <DialogEditPage onClose={handleCloseEditDialog} value={values.pages[pageIndex].pageName} pageIndex={pageIndex} />
            </Dialog>
            <Dialog
                sx={{ '.MuiDialog-paper': { minWidth: { xs: '350px', sm: '562px' } } }}
                open={openDialogConfirm}
                onClose={handleCloseDialogConfirm}
                aria-labelledby="alert-dialog-title2"
                aria-describedby="alert-dialog-description2"
            >
                <DIalogCongirm onConfirm={handleDeletePage} onClose={handleCloseDialogConfirm} />
            </Dialog>
        </>
    );
};

export default PageItem;
