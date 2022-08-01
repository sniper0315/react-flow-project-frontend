import {
    Box,
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    Divider,
    FormControl,
    IconButton,
    InputLabel,
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
import { CustomNodeType, FormData, WorkFlowNode, WorkFlowNodeBranchStyle, WorkFlowNodeConnectStyle } from '../types';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { ReactComponent as ArrowRightCircleIcon } from 'assets/images/arrowRightCircle.svg';
import { ReactComponent as PlusIcon } from 'assets/images/plus.svg';
import { ReactComponent as CopyIcon } from 'assets/images/copy.svg';
import { ReactComponent as DeleteIcon } from 'assets/images/trash.svg';
import { ReactComponent as ChevronDownIcon } from 'assets/images/chevron-down.svg';
import { ReactComponent as SearchIcon } from 'assets/images/search.svg';
import UserIcon from 'assets/images/users/user.png';

const Transition = forwardRef((props: TransitionProps & { children: ReactElement<any, any> }, ref: Ref<unknown>) => (
    <Slide direction="down" ref={ref} {...props} />
));

export default memo(({ data, isConnectable }: any) => {
    const [open, setOpen] = useState<boolean>(false);
    const [checkValue, setCheckValue] = useState<boolean>(false);
    const [searchAnchorEl, setSearchAnchorEl] = useState(null);
    const searchPopoverOpen = Boolean(searchAnchorEl);
    const searchPopoverId = searchPopoverOpen ? 'simple-popover' : undefined;
    const [moreAnchorEl, setMoreAnchorEl] = useState(null);
    const morePopoverOpen = Boolean(moreAnchorEl);
    const morePopoverId = morePopoverOpen ? 'simple-popover' : undefined;
    const [stepAnchorEl, setStepAnchorEl] = useState(null);
    const stepPopoverOpen = Boolean(stepAnchorEl);
    const stepPopoverId = stepPopoverOpen ? 'simple-popover' : undefined;
    const { values, setValues } = useFormikContext<FormData>();
    const [selectPeriodValue, setSelectPeriodValue] = useState<string>('5');

    const handleClose = () => {
        setOpen(false);
    };

    const handleSettingsOpen = () => {
        setOpen(true);
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCheckValue(event.target.checked);
        setValues(update(values, { workflow: { taskApproved: { $set: event.target.checked } } }));
    };

    const handleSaveChanges = () => {
        setOpen(false);

        if (values.workflow.taskAssigned && checkValue) {
            const filtered = values.workflow.flowNodes.filter((node) => node.nodeType === CustomNodeType.BRANCHNODE);

            if (filtered.length === 0) {
                const prevNodes: WorkFlowNode[] = [...values.workflow.flowNodes.slice(0, values.workflow.flowNodes.length - 2)];
                let level = prevNodes[prevNodes.length - 1].floor + 1;
                const footNodes: WorkFlowNode[] = [
                    {
                        nodeType: CustomNodeType.CONNECTNODE,
                        connect: WorkFlowNodeConnectStyle.NOICON,
                        floor: level,
                        which: 1,
                        width: 32
                    },
                    {
                        nodeType: CustomNodeType.BRANCHNODE,
                        branch: WorkFlowNodeBranchStyle.APPROVED,
                        floor: (level += 1),
                        which: 0,
                        width: 124
                    },
                    {
                        nodeType: CustomNodeType.BRANCHNODE,
                        branch: WorkFlowNodeBranchStyle.NOT_APPROVED,
                        floor: level,
                        which: 2,
                        width: 124
                    },
                    {
                        nodeType: CustomNodeType.CONNECTNODE,
                        connect: WorkFlowNodeConnectStyle.CIRCLE,
                        floor: (level += 1),
                        which: 0,
                        width: 32
                    },
                    {
                        nodeType: CustomNodeType.CONNECTNODE,
                        connect: WorkFlowNodeConnectStyle.CIRCLE,
                        floor: level,
                        which: 2,
                        width: 32
                    },
                    {
                        nodeType: CustomNodeType.CONNECTNODE,
                        connect: WorkFlowNodeConnectStyle.CIRCLE,
                        floor: (level += 1),
                        which: 1,
                        width: 32
                    },
                    {
                        nodeType: CustomNodeType.ENDNODE,
                        floor: (level += 1),
                        which: 1,
                        width: 40
                    }
                ];

                setValues(update(values, { workflow: { flowNodes: { $set: update(prevNodes, { $push: footNodes }) } } }));
            }
        }
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

    const handleClickStepPopupOver = (event: any) => {
        setStepAnchorEl(event.currentTarget);
    };

    const handleCloseStepPopupOver = () => {
        setStepAnchorEl(null);
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
                <Typography sx={{ fontWeight: 500, fontSize: '14px' }}>Approval Task</Typography>
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
            {values.workflow.taskAssigned && values.workflow.taskApproved && (
                <>
                    <Typography sx={{ fontWeight: 600, fontSize: '14px' }}>Task assigned to</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <img src={UserIcon} style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
                        <Typography sx={{ fontWeight: 500, fontSize: '14px' }}>James Hall</Typography>
                    </Box>
                    <FormControl fullWidth>
                        <Select
                            value={selectPeriodValue}
                            onChange={handleSelectPeriodValue}
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
                    </FormControl>
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
                <DialogContent sx={{ padding: '20px 32px', width: '563px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
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
                                <img src={UserIcon} style={{ borderRadius: '50%' }} />
                                <Typography sx={{ fontWeight: 500, fontSize: '14px' }}>Dennis Callis</Typography>
                            </Box>
                        </Box>
                        <Popover
                            id={stepPopoverId}
                            open={stepPopoverOpen}
                            anchorEl={stepAnchorEl}
                            onClose={handleCloseStepPopupOver}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                        >
                            <Box sx={{ width: '379px' }}>
                                <Box sx={{ padding: '16px 24px', gap: '8px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                    <PlusIcon />
                                    <Typography sx={{ fontWeight: 500, fontSize: '14px' }}>Create New Branch</Typography>
                                </Box>
                                <Divider />
                                <Box sx={{ padding: '8px 24px' }}>
                                    <Typography sx={{ fontWeight: 600, fontSize: '10px', color: '#7A7A7A' }}>EXISTING BRANCHES</Typography>
                                </Box>
                                <Divider />
                                <Box sx={{ padding: '16px 24px', cursor: 'pointer' }} onClick={handleCloseStepPopupOver}>
                                    <Typography sx={{ fontWeight: 500, fontSize: '14px' }}>Block name</Typography>
                                </Box>
                                <Divider />
                                <Box sx={{ padding: '16px 24px', cursor: 'pointer' }} onClick={handleCloseStepPopupOver}>
                                    <Typography sx={{ fontWeight: 500, fontSize: '14px' }}>Block name</Typography>
                                </Box>
                            </Box>
                        </Popover>
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
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <FormControl fullWidth>
                                <Select
                                    value={selectPeriodValue}
                                    onChange={handleSelectPeriodValue}
                                    IconComponent={ChevronDownIcon}
                                    sx={{ '& .MuiSelect-select': { fontWeight: 700, backgroundColor: 'white', textAlign: 'right' } }}
                                    renderValue={(value) => (
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span style={{ fontWeight: 400 }}>Task Duration</span>
                                            <span>{value} days</span>
                                        </div>
                                    )}
                                >
                                    <MenuItem value={5}>5 Days</MenuItem>
                                    <MenuItem value={10}>10 Days</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField fullWidth placeholder="Role" />
                            <TextField fullWidth multiline rows={4} placeholder="Description" />
                        </Box>
                        <Typography sx={{ fontWeight: 600, fontSize: '14px' }}>Aproval Logic</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <Typography sx={{ fontWeight: 500, fontSize: '14px', color: '#677487' }}>If</Typography>
                            <Box
                                sx={{
                                    width: '280px',
                                    height: '25px',
                                    borderRadius: '4px',
                                    padding: '4px 8px',
                                    border: '1px solid #D4DBEA',
                                    background: '#F6F7FC',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                            >
                                <Typography sx={{ fontWeight: 500, fontSize: '14px' }}>Approval Task</Typography>
                            </Box>
                            <Box
                                sx={{
                                    width: '32px',
                                    height: '25px',
                                    borderRadius: '4px',
                                    padding: '4px 8px',
                                    border: '1px solid #D4DBEA',
                                    background: '#F6F7FC',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <Typography sx={{ fontWeight: 500, fontSize: '14px' }}>is</Typography>
                            </Box>
                            <Box
                                sx={{
                                    height: '25px',
                                    borderRadius: '4px',
                                    padding: '4px 8px',
                                    border: '1px solid #D4DBEA',
                                    background: '#F6F7FC',
                                    flex: 1,
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                            >
                                <Typography sx={{ fontWeight: 500, fontSize: '14px' }}>Not Approved</Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <Typography sx={{ fontWeight: 500, fontSize: '14px', color: '#677487' }}>Then</Typography>
                            <Box
                                sx={{
                                    width: '64px',
                                    height: '25px',
                                    borderRadius: '4px',
                                    padding: '4px 8px',
                                    border: '1px solid #D4DBEA',
                                    background: '#F6F7FC',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <Typography sx={{ fontWeight: 500, fontSize: '14px' }}>Go to</Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '4px 8px',
                                    cursor: 'pointer',
                                    backgroundColor: '#F6F7FC',
                                    border: '1px solid #D4DBEA',
                                    borderRadius: '4px',
                                    flex: 1,
                                    height: '25px'
                                }}
                                onClick={handleClickStepPopupOver}
                            >
                                <Typography sx={{ fontWeight: 500, fontSize: '14px' }}>Select Step</Typography>
                                <ChevronDownIcon style={{ width: '14px', height: '14px' }} />
                            </Box>
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
                            <Checkbox value={checkValue} onChange={handleCheckboxChange} />
                            <Typography sx={{ fontWeight: 500, fontSize: '14px' }}> Add Document to task </Typography>
                        </Box>
                    </Box>
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
