import {
    Box,
    Checkbox,
    Typography,
    TextField,
    InputAdornment,
    MenuItem,
    Select,
    FormControl,
    SelectChangeEvent,
    InputLabel
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import React, { memo, useState } from 'react';
import { Handle, Position } from 'react-flow-renderer';

import { ReactComponent as CalendarIcon } from 'assets/images/calendar.svg';
import { ReactComponent as ChevronDownIcon } from 'assets/images/chevron-down.svg';

export default memo(({ data, isConnectable }: any) => {
    const [newDate, setNewDate] = useState<Date | null>(new Date());
    const [checkValue, setCheckValue] = useState<boolean>(false);
    const [selectValue, setSelectValue] = useState<string>('2');

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCheckValue(event.target.checked);
    };

    const handleSelectChange = (event: SelectChangeEvent) => {
        setSelectValue(event.target.value as string);
    };

    return (
        <Box
            sx={{
                width: '300px',
                padding: '24px 16px',
                borderRadius: '8px',
                border: '1px solid #E0E0E0',
                backgroundColor: 'white',
                gap: '24px',
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
                <Typography sx={{ fontWeight: 500, fontSize: '14px', color: 'black' }}>Scheduling for workflow</Typography>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                        renderInput={(props) => (
                            <TextField
                                {...props}
                                sx={{
                                    '& .MuiInputBase-input': { padding: '8px 0' },
                                    width: '260px',
                                    height: '36px',
                                    background: '#EFF2FA'
                                }}
                            />
                        )}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <CalendarIcon />
                                </InputAdornment>
                            )
                        }}
                        label=""
                        value={newDate}
                        onChange={(newValue) => {
                            setNewDate(newValue);
                        }}
                        components={{
                            OpenPickerIcon: ChevronDownIcon
                        }}
                    />
                </LocalizationProvider>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Checkbox value={checkValue} sx={{ width: '16px', height: '16px' }} onChange={handleCheckboxChange} />
                <Typography sx={{ fontSize: '12px', fontWeight: 600, color: '#677487' }}>This is a recurring event</Typography>
            </Box>
            {checkValue && (
                <FormControl fullWidth>
                    <Select
                        value={selectValue}
                        onChange={handleSelectChange}
                        IconComponent={ChevronDownIcon}
                        sx={{ '& .MuiSelect-select': { fontWeight: 700, backgroundColor: 'white', textAlign: 'right' } }}
                        renderValue={(value) => (
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontWeight: 400 }}>Occurs every</span>
                                <span>{value} weeks</span>
                            </div>
                        )}
                    >
                        <MenuItem value={2}>2 weeks</MenuItem>
                        <MenuItem value={3}>3 weeks</MenuItem>
                    </Select>
                </FormControl>
            )}
            <Handle
                type="source"
                position={Position.Bottom}
                isConnectable={isConnectable}
                style={{ width: '1px', height: '1px', background: 'transparent' }}
            />
        </Box>
    );
});
