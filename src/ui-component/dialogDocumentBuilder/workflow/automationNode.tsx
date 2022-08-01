import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Divider,
    FormControl,
    FormControlLabel,
    InputAdornment,
    MenuItem,
    Popover,
    Radio,
    RadioGroup,
    Select,
    SelectChangeEvent,
    Slide,
    TextField,
    Typography
} from '@mui/material';
import { forwardRef, memo, ReactElement, Ref, useState } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { TransitionProps } from '@mui/material/transitions';
import { useFormikContext } from 'formik';

import CustomMenuItem from '../subcomponents/menuItem';
import { FormData } from '../types';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { ReactComponent as CopyIcon } from 'assets/images/copy.svg';
import { ReactComponent as DeleteIcon } from 'assets/images/trash.svg';
import { ReactComponent as ArrowRightCircleIcon } from 'assets/images/arrowRightCircle.svg';
import { ReactComponent as ChevronDownIcon } from 'assets/images/chevron-down.svg';
import { ReactComponent as CpuIcon } from 'assets/images/cpu.svg';
import TaskPageItem from '../subcomponents/taskItems';

const Transition = forwardRef((props: TransitionProps & { children: ReactElement<any, any> }, ref: Ref<unknown>) => (
    <Slide direction="down" ref={ref} {...props} />
));

interface CustomDialogItemProps {
    caption?: string;
    required?: boolean;
}

const CustomDialogItem = ({ caption, required = false }: CustomDialogItemProps) => {
    const [selectFieldAnchorEl, setSelectFieldAnchorEl] = useState(null);
    const selectFieldPopoverOpen = Boolean(selectFieldAnchorEl);
    const selectFieldPopoverId = selectFieldPopoverOpen ? 'simple-popover' : undefined;
    const { values, setValues } = useFormikContext<FormData>();

    const handleOpenSelectFieldPopupOver = (event: any) => {
        setSelectFieldAnchorEl(event.currentTarget);
    };

    const handleCloseSelectFieldPopupOver = () => {
        setSelectFieldAnchorEl(null);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Typography sx={{ fontWeight: 500, fontSize: '14px' }}>{caption}</Typography>
                {required && (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '84px',
                            height: '24px',
                            borderRadius: '16px',
                            background: '#EFF2FA'
                        }}
                    >
                        <Typography sx={{ fontWeight: 500, fontSize: '12px', color: '#344054' }}>Required</Typography>
                    </Box>
                )}
            </Box>
            <TextField
                sx={{ height: '48px', flex: 1 }}
                placeholder="Select Field"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <ChevronDownIcon style={{ cursor: 'pointer' }} onClick={(e) => handleOpenSelectFieldPopupOver(e)} />
                        </InputAdornment>
                    )
                }}
            />
            <Popover
                id={selectFieldPopoverId}
                open={selectFieldPopoverOpen}
                anchorEl={selectFieldAnchorEl}
                onClose={handleCloseSelectFieldPopupOver}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Box sx={{ width: '499px', border: '1px solid #D4DBEA', borderRadius: '8px' }}>
                    {values.pages.map((page, idx) => (
                        <TaskPageItem pIdx={idx} page={page} hasCheckbox={false} onClick={handleCloseSelectFieldPopupOver} />
                    ))}
                </Box>
            </Popover>
        </Box>
    );
};

export default memo(({ data, isConnectable }: any) => {
    const [open, setOpen] = useState<boolean>(false);
    const [moreAnchorEl, setMoreAnchorEl] = useState(null);
    const morePopoverOpen = Boolean(moreAnchorEl);
    const morePopoverId = morePopoverOpen ? 'simple-popover' : undefined;
    const [savedParams, setSavedParams] = useState<boolean>(false);
    const [selectServiceValue, setSelectServiceValue] = useState<string>('none');

    const { values } = useFormikContext<FormData>();

    const handleClose = () => {
        setOpen(false);
    };

    const handleSettingsOpen = () => {
        setOpen(true);
    };

    const handleSelectServiceValueChange = (event: SelectChangeEvent) => {
        setSelectServiceValue(event.target.value as string);
    };

    const handleClickMorePopupOver = (event: any) => {
        setMoreAnchorEl(event.currentTarget);
    };

    const handleCloseMorePopupOver = () => {
        setMoreAnchorEl(null);
    };

    const handleSaveChanges = () => {
        setOpen(false);
        setSavedParams(true);
    };

    return (
        <Box
            sx={{
                width: '300px',
                background: 'white',
                border: '1px solid #E0E0E0',
                borderRadius: '8px',
                boxShadow: '0 10px 16px rgba(0, 0, 0, 0.1)',
                padding: '24px 16px',
                gap: '16px',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <Handle
                type="target"
                position={Position.Top}
                isConnectable={isConnectable}
                style={{ width: '1px', height: '1px', background: 'transparent' }}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography sx={{ fontWeight: 500, fontSize: '14px' }}>Automation</Typography>
                <MoreHorizIcon sx={{ cursor: 'pointer' }} onClick={handleClickMorePopupOver} />
            </Box>
            <Box
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
                onClick={handleSettingsOpen}
            >
                <Typography sx={{ fontWeight: 400, fontSize: '14px', color: '#5A5A5A' }}>
                    {values.workflow.taskAssigned ? 'View' : 'Set'} parameters
                </Typography>
                <ArrowRightCircleIcon style={{ width: '18px', height: '18px' }} />
            </Box>
            {values.workflow.taskAssigned && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CpuIcon style={{ width: '18px', height: '18px' }} />
                    <Typography sx={{ fontWeight: 500, fontSize: '14px' }}>Automatically Publish Post</Typography>
                </Box>
            )}
            <Popover
                id={morePopoverId}
                open={morePopoverOpen}
                anchorEl={moreAnchorEl}
                onClose={handleCloseMorePopupOver}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Box sx={{ width: '142px' }}>
                    <CustomMenuItem icon={<CopyIcon />} name="Duplicate" onClick={handleCloseMorePopupOver} />
                    <CustomMenuItem icon={<DeleteIcon />} name="Delete" onClick={handleCloseMorePopupOver} />
                </Box>
            </Popover>
            <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={handleClose}>
                <DialogContent sx={{ padding: '20px 32px', width: '563px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <Typography sx={{ fontWeight: 600, fontSize: '16px' }}>Automation</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <Typography sx={{ fontWeight: 400, fontSize: '14px' }}>Select Automation</Typography>
                        <FormControl fullWidth>
                            <Select
                                value={selectServiceValue}
                                onChange={handleSelectServiceValueChange}
                                IconComponent={ChevronDownIcon}
                                sx={{ '& .MuiSelect-select': { fontWeight: 400, backgroundColor: 'white' } }}
                            >
                                <MenuItem value="none">Instagram Publication</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <Typography sx={{ fontWeight: 400, fontSize: '14px', color: '#677487' }}>Instagram Account</Typography>
                        <TextField fullWidth placeholder="Instagram Publication" />
                    </Box>
                    <Box
                        sx={{
                            borderRadius: '8px',
                            padding: '16px',
                            gap: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            height: '48px',
                            background: '#F6F7FC'
                        }}
                    >
                        <FormControl>
                            <RadioGroup row defaultValue="auto">
                                <FormControlLabel value="auto" control={<Radio />} label="Automated Publish" />
                                <FormControlLabel value="manual" control={<Radio />} label="Manual Publish" />
                            </RadioGroup>
                        </FormControl>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <Typography sx={{ fontWeight: 500, fontSize: '14px' }}>Assets</Typography>
                        <Divider sx={{ flex: 1 }} />
                    </Box>
                    <CustomDialogItem caption="Publication Date" required />
                    <CustomDialogItem caption="Publication Type" required />
                    <CustomDialogItem caption="Caption" required />
                    <CustomDialogItem caption="Images" required />
                    <CustomDialogItem caption="Location" />
                    <CustomDialogItem caption="Account to tag" />
                    <CustomDialogItem caption="Relevant IG Account" />
                </DialogContent>
                <Divider />
                <DialogActions style={{ padding: '24px 32px 12px', gap: '16px' }}>
                    <Button
                        sx={{ width: '87px', height: '42px', borderRadius: '10px', border: '2px solid #EE9A8F', color: '#EE9A8F' }}
                        onClick={handleClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        sx={{
                            width: '134px',
                            height: '42px',
                            borderRadius: '10px',
                            border: '2px solid #EE9A8F',
                            backgroundColor: '#EE9A8F',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: '#EE9A8F'
                            }
                        }}
                        onClick={handleSaveChanges}
                    >
                        Save changes
                    </Button>
                </DialogActions>
            </Dialog>
            <Handle
                type="source"
                position={Position.Bottom}
                isConnectable={isConnectable}
                style={{ width: '1px', height: '1px', background: 'transparent' }}
            />
        </Box>
    );
});
