import { Box, Typography, Avatar } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { useTheme } from '@mui/material/styles';
import React from 'react';
import moment from 'moment';
import AddTask from './AddTask';

const TaskMobile = ({ task, time }: any) => {
    const theme = useTheme();
    const [openDivider, setOpenDivider] = React.useState(false);
    const handleClickCloseDivider = () => {
        setOpenDivider(false);
    };
    const handleOpenDivider = () => {
        setOpenDivider(true);
    };
    const background = (status: string) => {
        let color: string;
        if (status === 'Done') {
            color = theme.palette.primary[100];
        } else if (status === 'To Do') {
            color = theme.palette.primary[300];
        } else if (status === 'Rework Required') {
            color = theme.palette.primary[400];
        } else if (status === 'In Progress') {
            color = theme.palette.primary[500];
        } else color = theme.palette.grey[900];
        return color;
    };
    const fontColor = (status: string) => {
        let color: string;
        if (status === 'Done') {
            color = theme.palette.primary[600];
        } else if (status === 'To Do') {
            color = theme.palette.primary[700];
        } else if (status === 'Rework Required') {
            color = theme.palette.primary[900];
        } else if (status === 'In Progress') {
            color = theme.palette.secondary[400];
        } else color = theme.palette.secondary[300];
        return color;
    };
    return (
        <Box onClick={handleOpenDivider} sx={{ cursor: 'pointer' }}>
            <Box
                sx={{
                    background: theme.palette.grey[700],
                    border: `1px solid ${theme.palette.grey[500]}`,
                    borderRadius: '8px',
                    p: '20px',
                    width: '100%',
                    m: '20px auto'
                }}
            >
                <Box sx={{ background: theme.palette.secondary[500], p: '3px 10px', borderRadius: '4px', width: '200px' }}>
                    <Typography
                        sx={{
                            color: theme.palette.background.paper,
                            fontFamily: 'Inter',
                            fontWeight: 500,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            fontSize: '12px',
                            cursor: 'pointer'
                        }}
                    >
                        (12 Jun - 17 Jun) [Instagram Content Creation]
                    </Typography>
                </Box>
                <Typography mt={1} sx={{ color: theme.palette.common.black, fontFamily: 'Inter', fontWeight: 500, fontSize: '14px' }}>
                    {task.taskName}
                </Typography>
                <Box mt={2} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ width: '32px' }}>
                        <Avatar sx={{ width: '32px', height: '32px' }} alt="Remy Sharp" src={task.assigneeUrl} />
                    </Box>
                    <Typography sx={{ color: theme.palette.common.black, fontFamily: 'Inter', fontWeight: 500, fontSize: '14px' }}>
                        {moment(task.dueDate).format('DD MMMM, YYYY')}
                    </Typography>
                </Box>
                <Box mt={2} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box
                        sx={{
                            background: time ? theme.palette.secondary[600] : theme.palette.primary[500],
                            borderRadius: '16px',
                            p: '4px 12px'
                        }}
                    >
                        <Typography
                            sx={{
                                color: time ? theme.palette.secondary[700] : theme.palette.secondary[400],
                                fontFamily: 'Inter',
                                fontWeight: 500,
                                fontSize: '12px'
                            }}
                        >
                            <FormattedMessage id={time ? 'overdue' : 'due_soon'} />
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            p: '4px 12px',
                            borderRadius: '100px',
                            background: background(task.status)
                        }}
                    >
                        <Typography sx={{ color: fontColor(task.status), fontFamily: 'Inter', fontWeight: 500, textAlign: 'center' }}>
                            {task.status}
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <AddTask openDivider={openDivider} handleClickCloseDivider={handleClickCloseDivider} selectedTask={task} />
        </Box>
    );
};

export default TaskMobile;
