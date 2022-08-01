import {
    Box,
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    Divider,
    IconButton,
    MenuItem,
    Popover,
    Select,
    SelectChangeEvent,
    Slide,
    TextField,
    Typography
} from '@mui/material';
import React, { forwardRef, memo, ReactElement, Ref, useState } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { TransitionProps } from '@mui/material/transitions';
import { useFormikContext } from 'formik';
import update from 'immutability-helper';

import CustomMenuItem from '../subcomponents/menuItem';
import { FormData } from '../types';
import TaskPageItem from '../subcomponents/taskItems';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { ReactComponent as ArrowRightCircleIcon } from 'assets/images/arrowRightCircle.svg';
import { ReactComponent as PlusIcon } from 'assets/images/plus.svg';
import { ReactComponent as SearchIcon } from 'assets/images/search.svg';
import { ReactComponent as CopyIcon } from 'assets/images/copy.svg';
import { ReactComponent as DeleteIcon } from 'assets/images/trash.svg';
import { ReactComponent as ChevronDownIcon } from 'assets/images/chevron-down.svg';
import UserIcon from 'assets/images/users/user.png';

const Transition = forwardRef((props: TransitionProps & { children: ReactElement<any, any> }, ref: Ref<unknown>) => (
    <Slide direction="down" ref={ref} {...props} />
));

export default memo(({ data, isConnectable }: any) => {
    const [open, setOpen] = useState<boolean>(false);
    const [addCheckValue, setAddCheckValue] = useState<boolean>(false);
    const [selectValue, setSelectValue] = useState<string>('5');
    const [searchAnchorEl, setSearchAnchorEl] = useState(null);
    const searchPopoverOpen = Boolean(searchAnchorEl);
    const searchPopoverId = searchPopoverOpen ? 'simple-popover' : undefined;
    const [moreAnchorEl, setMoreAnchorEl] = useState(null);
    const morePopoverOpen = Boolean(moreAnchorEl);
    const morePopoverId = morePopoverOpen ? 'simple-popover' : undefined;
    const { values, setValues } = useFormikContext<FormData>();
    const [selectPeriodValue, setSelectPeriodValue] = useState<string>('2');
    const [allCheckValue, setAllCheckValue] = useState<boolean>(false);

    let checkStatus: number = 0;

    const handleClose = () => {
        setOpen(false);
    };

    const handleSettingsOpen = () => {
        setOpen(true);
    };

    const handleSelectChange = (event: SelectChangeEvent) => {
        setSelectValue(event.target.value as string);
    };

    const handleAddCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddCheckValue(event.target.checked);
    };

    const handleAllCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAllCheckValue(event.target.checked);
        values.pages.map((page) => {
            page.pageSections.map((section) => {
                section.sectionChecked = true;
                checkStatus += 1;

                return section;
            });

            return page;
        });
        setValues(update(values, { $set: values }));
    };

    const handleSaveChanges = () => {
        setOpen(false);
        values.pages.map((page) => {
            page.pageSections.map((section) => {
                section.sectionChecked = true;
                checkStatus += 1;

                return section;
            });

            return page;
        });

        if (checkStatus > 0) setValues(update(values, { workflow: { taskAssigned: { $set: true } } }));
    };

    const handleClickSearchPopupOver = (event: any) => {
        setSearchAnchorEl(event.currentTarget);
    };

    const handleCloseSearchPopupOver = () => {
        setSearchAnchorEl(null);
    };

    const handleClickMorePopupOver = (event: any) => {
        setMoreAnchorEl(event.currentTarget);
    };

    const handleCloseMorePopupOver = () => {
        setMoreAnchorEl(null);
    };

    const handleSelectPeriodValue = (event: SelectChangeEvent) => {
        setSelectPeriodValue(event.target.value as string);
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
                <Typography sx={{ fontWeight: 500, fontSize: '14px' }}>Task</Typography>
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
                <>
                    <Typography sx={{ fontWeight: 600, fontSize: '14px' }}>Task assigned to</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <img src={UserIcon} style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
                        <Typography sx={{ fontWeight: 500, fontSize: '14px' }}>James Hall</Typography>
                    </Box>
                    <Select
                        value={selectPeriodValue}
                        onChange={handleSelectPeriodValue}
                        IconComponent={ChevronDownIcon}
                        sx={{ '& .MuiSelect-select': { fontWeight: 700, backgroundColor: 'white', textAlign: 'right' } }}
                        renderValue={(value) => (
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontWeight: 400 }}>Task Duration</span>
                                <span>{value} weeks</span>
                            </div>
                        )}
                    >
                        <MenuItem value={2}>2 weeks</MenuItem>
                        <MenuItem value={3}>3 weeks</MenuItem>
                    </Select>
                </>
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
                <DialogContent
                    sx={{ padding: '20px 32px', width: '563px', display: 'flex', flexDirection: 'column', gap: '24px', overflowY: 'auto' }}
                >
                    <Typography sx={{ fontWeight: 600, fontSize: '16px' }}>Task</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <Typography sx={{ fontWeight: 600, fontSize: '14px' }}>Task assigned to</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <IconButton sx={{ backgroundColor: '#F6F7FC' }} onClick={handleClickSearchPopupOver}>
                                <PlusIcon />
                            </IconButton>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    paddingLeft: '16px',
                                    borderLeft: '1px solid #D4DBEA',
                                    gap: '8px'
                                }}
                            >
                                <img style={{ borderRadius: '50%' }} src={UserIcon} />
                                <Typography sx={{ fontWeight: 500, fontSize: '14px' }}>Dennis Callis</Typography>
                            </Box>
                        </Box>
                        <Popover
                            id={searchPopoverId}
                            open={searchPopoverOpen}
                            anchorEl={searchAnchorEl}
                            onClose={handleCloseSearchPopupOver}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                        >
                            <Box sx={{ width: '359px' }}>
                                <Box sx={{ padding: '16px 24px', gap: '8px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                    <SearchIcon />
                                    <Typography sx={{ fontWeight: 500, fontSize: '14px', color: '#7A7A7A' }}>
                                        Start typing team member name
                                    </Typography>
                                </Box>
                                <Divider />
                                <Box
                                    sx={{ gap: '12px', padding: '16px 24px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                                    onClick={handleCloseSearchPopupOver}
                                >
                                    <img src={UserIcon} style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                                    <Typography sx={{ fontWeight: 500, fontSize: '14px' }}>Devon Lane</Typography>
                                </Box>
                                <Divider />
                                <Box
                                    sx={{ gap: '12px', padding: '16px 24px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                                    onClick={handleCloseSearchPopupOver}
                                >
                                    <img src={UserIcon} style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                                    <Typography sx={{ fontWeight: 500, fontSize: '14px' }}>Darrell Steward</Typography>
                                </Box>
                            </Box>
                        </Popover>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <Select
                            value={selectValue}
                            onChange={handleSelectChange}
                            IconComponent={ChevronDownIcon}
                            sx={{ '& .MuiSelect-select': { fontWeight: 700, backgroundColor: 'white', textAlign: 'right' } }}
                            renderValue={(value) => (
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ fontWeight: 400 }}>Task Duration</span>
                                    <span>{value} days</span>
                                </div>
                            )}
                        >
                            <MenuItem value={5}>5 days</MenuItem>
                            <MenuItem value={10}>10 days</MenuItem>
                        </Select>
                        <TextField fullWidth placeholder="Role" />
                        <TextField fullWidth multiline rows={4} placeholder="Description" />
                    </Box>
                    <Box
                        sx={{
                            height: '48px',
                            background: '#F6F7FC',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px'
                        }}
                    >
                        <Checkbox value={addCheckValue} onChange={handleAddCheckboxChange} />
                        <Typography sx={{ fontWeight: 500, fontSize: '14px' }}>Add Document to task</Typography>
                    </Box>
                    {addCheckValue && (
                        <Box>
                            <Box sx={{ height: '48px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <Checkbox value={allCheckValue} onChange={handleAllCheckboxChange} />
                                <Typography sx={{ fontWeight: 500, fontSize: '14px' }}>Select all pages</Typography>
                            </Box>
                            {values.pages.map((page, pIdx) => (
                                <TaskPageItem pIdx={pIdx} page={page} />
                            ))}
                        </Box>
                    )}
                </DialogContent>
                <Divider />
                <DialogActions style={{ padding: '24px 32px 12px', gap: '16px' }}>
                    <Button
                        sx={{ padding: '12px 20px', borderRadius: '10px', border: '2px solid #EE9A8F', color: '#EE9A8F' }}
                        onClick={handleClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        sx={{
                            padding: '12px 20px',
                            borderRadius: '10px',
                            border: '2px solid #EE9A8F',
                            background: '#EE9A8F',
                            color: 'white',
                            '&:hover': {
                                background: '#EE9A8F'
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
