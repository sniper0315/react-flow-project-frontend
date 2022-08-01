import { Box, Typography, CardMedia } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import moment from 'moment';
import calendar from '../../assets/images/calendar.svg';

interface ViewPastRunsProps {
    date: Date | null;
    handleDate: any;
    handleOpen: any;
    handleClose: any;
    open: boolean;
}

const DatePickerAiTool = ({ date, handleDate, handleOpen, open, handleClose }: ViewPastRunsProps) => {
    const theme = useTheme();

    return (
        <Box sx={{ display: 'flex' }}>
            <Box sx={{ p: '16px 0 0' }}>
                <Box
                    sx={{
                        background: theme.palette.grey[900],
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer',
                        borderRadius: '8px',
                        p: '8px'
                    }}
                    onClick={handleOpen}
                >
                    <Box sx={{ width: '20px' }}>
                        <CardMedia sx={{ objectFit: 'contain' }} component="img" width="18px" image={calendar} alt="alt image" />
                    </Box>
                    <Typography ml={1} sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 400, fontSize: '14px' }}>
                        {moment(date).format('MMMM YYYY')}
                    </Typography>
                    <KeyboardArrowDownIcon sx={{ fontSize: '25px', fill: theme.palette.grey[400], ml: '8px' }} />
                </Box>
                <Box>
                    {' '}
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            openTo="year"
                            views={['year', 'month']}
                            value={date}
                            open={open}
                            onClose={handleClose}
                            onChange={(newValue) => {
                                handleDate(newValue);
                            }}
                            renderInput={({ inputRef, inputProps, InputProps }) => <Box ref={inputRef}> </Box>}
                        />
                    </LocalizationProvider>
                </Box>
            </Box>
        </Box>
    );
};

export default DatePickerAiTool;
