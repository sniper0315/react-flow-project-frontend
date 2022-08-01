import {
    Typography,
    Box,
    DialogContent,
    TextField,
    Button,
    DialogActions,
    Divider,
    Drawer,
    FormControl,
    Select,
    SelectChangeEvent,
    MenuItem
} from '@mui/material';
import React, { memo, useState } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import copy from 'copy-to-clipboard';

import { ReactComponent as ArrowRightIcon } from 'assets/images/arrowRightCircle.svg';
import { ReactComponent as CloseIcon } from 'assets/images/close.svg';
import { ReactComponent as CopyIcon } from 'assets/images/copy.svg';
import { ReactComponent as AlertIcon } from 'assets/images/alert.svg';
import { ReactComponent as ChevronDownIcon } from 'assets/images/chevron-down.svg';
import ChevronUpIcon from '@mui/icons-material/ExpandLessOutlined';

const WebhookNode = memo(({ data, isConnectable }: any) => {
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
    const [copyText, setCopyText] = useState<string>(
        'https://www.figma.com/proto/2138&scaling=min -zoom&starting-point-node-id=81%3A2730&hide-ui=1'
    );
    const [savedParams, setSavedParams] = useState<boolean>(false);
    const [clickParamText, setClickParamText] = useState<string>('Set parameters');
    const [selectServiceValue, setSelectServiceValue] = useState<string>('none');

    const handleOpenDrawer = () => {
        setDrawerOpen(true);
    };

    const handleSelectServiceValueChange = (event: SelectChangeEvent) => {
        setSelectServiceValue(event.target.value as string);
    };

    const handleCloseDrawer = () => {
        setDrawerOpen(false);
    };

    const handleTextFieldOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCopyText(event.target.value);
    };

    const handleCopyText = () => {
        copy(copyText);
    };

    const handleSaveChanges = () => {
        handleCloseDrawer();
        setSavedParams(true);
        setClickParamText('View Parameter');
    };

    return (
        <Box
            sx={{
                width: '300px',
                borderRadius: '8px',
                padding: '24px 16px',
                gap: '24px',
                border: '1px solid #E0E0E0',
                backgroundColor: 'white',
                boxShadow: '0px 10px 16px rgba(0, 0, 0, 0.1)',
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
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <Typography sx={{ fontWeight: 500, fontSize: '14px', color: 'black' }}>Webhook received</Typography>
                <Box
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
                    onClick={handleOpenDrawer}
                >
                    <Typography sx={{ fontWeight: 400, fontSize: '14px', color: '#5A5A5A' }}>{clickParamText}</Typography>
                    <ArrowRightIcon style={{ width: '18px', height: '18px' }} />
                </Box>
            </Box>
            {savedParams && (
                <Box sx={{ height: '48px' }}>
                    <TextField fullWidth placeholder={copyText} />
                </Box>
            )}
            <Drawer anchor="right" open={drawerOpen} onClose={handleCloseDrawer} sx={{ zIndex: 1500 }}>
                <DialogContent style={{ width: '562px', padding: '20px 32px', overflowY: 'auto' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '21px' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography sx={{ fontWeight: 700, fontSize: '16px' }}>Webhook Configuration</Typography>
                            <CloseIcon onClick={handleCloseDrawer} style={{ cursor: 'pointer' }} />
                        </Box>
                        <Typography sx={{ fontWeight: 600, fontSize: '14px' }}>Setup</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <Typography sx={{ fontWeight: 500, fontSize: '14px' }}>1. Send an example webhook to:</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', height: '48px', gap: '8px' }}>
                                <TextField sx={{ flex: 1 }} onChange={handleTextFieldOnChange} value={copyText} />
                                <Button
                                    variant="outlined"
                                    startIcon={<CopyIcon style={{ width: '24px', height: '24px' }} />}
                                    sx={{
                                        width: '117px',
                                        height: '48px',
                                        borderRadius: '10px',
                                        backgroundColor: '#F9FAFB',
                                        border: '1px solid #F9FAFB',
                                        'svg path': {
                                            stroke: '#EE9A8F'
                                        }
                                    }}
                                    onClick={() => handleCopyText()}
                                >
                                    Copy
                                </Button>
                            </Box>
                            <Typography sx={{ fontWeight: 400, fontSize: '12px' }}>
                                If the request is successful, you should receive a response of
                                <br />
                                (success: true)
                            </Typography>
                            <Typography sx={{ fontWeight: 400, fontSize: '12px' }}>
                                If the automation is off, a test will automatically start for this trigger
                                <br />
                                If the automation is on, please manually test the trigger again.
                            </Typography>
                        </Box>
                        <Box sx={{ marginTop: '11px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <Typography sx={{ fontWeight: 500, fontSize: '14px' }}>2. Verify successful test</Typography>
                            <Typography sx={{ fontWeight: 400, fontSize: '12px' }}>
                                If Snikpic has received a valid example webhook, the test will pass. You`&#39;`ll then be able to use the
                                data sent in the example webhook in the rest of the automation.
                            </Typography>
                            <Box sx={{ borderRadius: '8px', padding: '16px', gap: '8px', backgroundColor: '#EFF2FA', display: 'flex' }}>
                                <AlertIcon />
                                <Typography sx={{ fontWeight: 400, fontSize: '12px', color: '#475467' }}>
                                    Remember that anyone who has the URL for your webhook trigger can trigger your automation. We recommend
                                    thinking carefully about how and where the URL might to shared
                                </Typography>
                            </Box>
                        </Box>
                        <Typography sx={{ fontWeight: 500, fontSize: '14px' }}>Test Step</Typography>
                        <Typography sx={{ fontWeight: 400, fontSize: '14px' }}>
                            Test this trigger to confirm its configuration is correct. The data from this test can be used in later steps.
                        </Typography>
                        <Button
                            sx={{
                                borderRadius: '10px',
                                backgroundColor: '#EE9A8F',
                                color: 'white',
                                width: '118px',
                                height: '42px',
                                '&:hover': {
                                    backgroundColor: '#EE9A8F'
                                }
                            }}
                        >
                            Test trigger
                        </Button>
                        <Typography sx={{ fontWeight: 600, fontSize: '14px' }}>Results</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <Typography sx={{ fontWeight: 400, fontSize: '14px', color: '#0D982B' }}>Step successful</Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <Typography sx={{ fontWeight: 400, fontSize: '14px' }}>Step run 2 days ago</Typography>
                                <FormControl fullWidth>
                                    <Select
                                        value={selectServiceValue}
                                        onChange={handleSelectServiceValueChange}
                                        IconComponent={ChevronDownIcon}
                                        sx={{ '& .MuiSelect-select': { fontWeight: 400, backgroundColor: 'white' } }}
                                    >
                                        <MenuItem value="none">Input</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <Typography sx={{ fontWeight: 400, fontSize: '14px' }}>Found 1 webhook</Typography>
                            <FormControl fullWidth>
                                <Select
                                    value={selectServiceValue}
                                    onChange={handleSelectServiceValueChange}
                                    IconComponent={ChevronDownIcon}
                                    sx={{ '& .MuiSelect-select': { fontWeight: 400, backgroundColor: 'white' } }}
                                >
                                    <MenuItem value="none">Webhook</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <Select
                                    value={selectServiceValue}
                                    onChange={handleSelectServiceValueChange}
                                    IconComponent={ChevronUpIcon}
                                    sx={{ '& .MuiSelect-select': { fontWeight: 400, backgroundColor: 'white' } }}
                                >
                                    <MenuItem value="none">body</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>
                </DialogContent>
                <Divider />
                <DialogActions style={{ padding: '24px 32px 12px', gap: '16px' }}>
                    <Button
                        sx={{ width: '87px', height: '42px', borderRadius: '10px', border: '2px solid #EE9A8F', color: '#EE9A8F' }}
                        onClick={handleCloseDrawer}
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
            </Drawer>
            <Handle
                type="source"
                position={Position.Bottom}
                isConnectable={isConnectable}
                style={{ width: '1px', height: '1px', background: 'transparent' }}
            />
        </Box>
    );
});

export default WebhookNode;
