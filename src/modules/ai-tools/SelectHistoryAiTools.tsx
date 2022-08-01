import { Box, Popover, Typography, RadioGroup, FormControlLabel, CardMedia, Radio } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CheckIcon from '@mui/icons-material/Check';
import { useTheme } from '@mui/material/styles';
import React from 'react';
import calendar from '../../assets/images/calendar.svg';
import moment from 'moment';

interface SelectHistoryAiToolsProps {
    labels: any;
    state: string;
    setState: any;
}

export default function SelectHistoryAiTools({ labels, state, setState }: SelectHistoryAiToolsProps) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const theme = useTheme();
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <Box
            sx={{
                background: theme.palette.grey[900],
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                borderRadius: '8px',
                p: '8px'
            }}
            aria-describedby={id}
            onClick={handleClick}
        >
            <Box sx={{ width: '20px' }}>
                <CardMedia sx={{ objectFit: 'contain' }} component="img" width="18px" image={calendar} alt="alt image" />
            </Box>
            <Typography ml={1} sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 400, fontSize: '14px' }}>
                {moment(state).format('DD MMMM, YYYY')}
            </Typography>
            <KeyboardArrowDownIcon sx={{ fontSize: '25px', fill: theme.palette.grey[400], ml: '8px' }} />
            <Popover
                sx={{
                    zIndex: '2222222',
                    '.MuiPopover-paper': {
                        boxShadow: '0px 10px 16px rgba(0, 0, 0, 0.1)',
                        borderRadius: '8px',
                        border: `1px solid ${theme.palette.grey[500]}`
                    }
                }}
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                }}
            >
                <Box sx={{ width: '190px' }}>
                    <RadioGroup
                        value={state}
                        onChange={(e) => {
                            setState(e.target.value);
                            setAnchorEl(null);
                        }}
                        aria-label="position"
                        name="position"
                        defaultValue="top"
                        sx={{ display: 'flex', alignItems: 'start' }}
                    >
                        {labels &&
                            labels.map((label: string, index: string) => (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: state === label ? '10px 10px' : '10px 30px',
                                        borderBottom: index + 1 !== labels.length ? `1px solid ${theme.palette.grey[500]}` : '',
                                        width: '100%',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {state === label && <CheckIcon sx={{ fill: theme.palette.grey[400], fontSize: '20px' }} />}
                                    <FormControlLabel
                                        sx={{
                                            '.MuiFormControlLabel-label': {
                                                color: theme.palette.grey[400],
                                                fontFamily: 'Inter',
                                                fontWeight: 500,
                                                fontSize: '14px'
                                            }
                                        }}
                                        value="top"
                                        control={<Radio value={label} sx={{ display: 'none' }} />}
                                        label={moment(label).format('DD MMMM, YYYY')}
                                        labelPlacement="start"
                                    />
                                </Box>
                            ))}
                    </RadioGroup>
                </Box>
            </Popover>
        </Box>
    );
}
