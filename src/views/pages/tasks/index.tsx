import {
    Typography,
    Box,
    Breadcrumbs,
    Grid,
    CardMedia,
    RadioGroup,
    Popover,
    Radio,
    FormControlLabel,
    Checkbox,
    Divider
} from '@mui/material';
import { FormattedMessage } from 'react-intl';
import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import ButtonCustom from 'ui-component/extended/Button';
import NotFoundImg from 'ui-component/Offer';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import shuffle from '../../../assets/images/shuffle.svg';
import TasksTable from './TasksTable';
import AddTask from './AddTask';
import Filters from './Filters';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import TaskMobile from './TaskMobile';
import moment from 'moment';

const itemsTasksTable = [
    {
        id: '111111',
        taskName: 'Monthly Calendar Conception',
        status: 'Done',
        dueDate: '2022-06-28T08:01:36.480824',
        assigneeUrl: '',
        brand: { title: 'Sony', src: '' }
    },
    {
        id: '22222',
        taskName: 'Monthly Calendar Conception2',
        status: 'To Do',
        dueDate: '2022-06-28T08:01:36.480824',
        assigneeUrl: '',
        brand: { title: 'Sony', src: '' }
    },
    {
        id: '3333',
        taskName: 'Monthly Calendar Conception3',
        status: 'Rework Required',
        dueDate: '2022-06-28T08:01:36.480824',
        assigneeUrl: '',
        brand: { title: 'Sony', src: '' }
    },
    {
        id: '44444',
        taskName: 'Monthly Calendar Conception4',
        status: 'Not open yet',
        dueDate: '2022-06-28T08:01:36.480824',
        assigneeUrl: '',
        brand: { title: 'Sony', src: '' }
    },
    {
        id: '5555',
        taskName: 'Monthly Calendar Conception5',
        status: 'In Progress',
        dueDate: '2022-06-28T08:01:36.480824',
        assigneeUrl: '',
        brand: { title: 'Sony', src: '' }
    }
];

const Tasks = () => {
    const theme = useTheme();
    const [tasks, setTasks] = React.useState<any>();
    const [openDivider, setOpenDivider] = React.useState(false);
    const [valSelecSort, setValSelecSort] = React.useState('Ascending');
    const [valOrderBy, setValOrderBy] = React.useState(false);
    const [openDividerFilter, setOpenDividerFilter] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<any>(null);
    const openPopover = Boolean(anchorEl);
    const id = openPopover ? 'simple-popover' : undefined;
    const [dateNow, setDateNow] = React.useState<any>();

    const handleTimeIsAfter = (time: any) => {
        if (dateNow) {
            time = moment(time);
            return dateNow.isAfter(time);
        }
        return null;
    };
    const handleClosePopover = () => {
        setAnchorEl(null);
    };
    const handleClickPopover = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    React.useEffect(() => {
        setDateNow(moment());
        setTasks(itemsTasksTable);
    }, []);
    const handleClickCloseDivider = () => {
        setOpenDivider(false);
    };
    const handleOpenDivider = () => {
        setOpenDivider(true);
    };
    const handleClickCloseDividerFilter = () => {
        setOpenDividerFilter(false);
    };
    const handleOpenDividerFilter = () => {
        setOpenDividerFilter(true);
    };
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValOrderBy(event.target.checked);
    };
    return (
        <Box>
            <Breadcrumbs aria-label="breadcrumb">
                <Link className="link" to="/">
                    <FormattedMessage id="venly" />
                </Link>
                <Typography sx={{ textTransform: 'capitalize', color: theme.palette.grey[300], fontFamily: 'Inter', fontWeight: 500 }}>
                    <FormattedMessage id="tasks" />
                </Typography>
            </Breadcrumbs>
            <Grid mt={2} container alignItems="center">
                <Grid item xs={6}>
                    <Typography
                        sx={{
                            textTransform: 'capitalize',
                            color: theme.palette.grey[400],
                            fontSize: '24px',
                            fontWeight: 500,
                            fontFamily: 'Inter'
                        }}
                    >
                        <FormattedMessage id="tasks" />
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Box sx={{ width: '146px' }}>
                            <ButtonCustom
                                onClick={handleOpenDivider}
                                titleBtn={
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Typography
                                            sx={{
                                                color: theme.palette.background.paper,
                                                fontWeight: 500,
                                                fontFamily: 'Inter',
                                                fontSize: '20px',
                                                m: '-3px 5px 0 0'
                                            }}
                                        >
                                            +
                                        </Typography>
                                        <Typography sx={{ fontWeight: 500, fontFamily: 'Inter' }}>
                                            <FormattedMessage id="add_task" />
                                        </Typography>
                                    </Box>
                                }
                                colorBtn="red"
                            />
                        </Box>
                    </Box>
                </Grid>
                <Grid mt={3} mb={3} container justifyContent="space-between" alignItems="center">
                    <Grid item xs={5}>
                        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                            <SearchSharpIcon sx={{ fill: theme.palette.grey[600] }} />
                            <Typography sx={{ color: theme.palette.grey[600], fontFamily: 'Inter', fontWeight: 500 }}>
                                <FormattedMessage id="search" />
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={7}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Box
                                onClick={handleOpenDividerFilter}
                                mr={2}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    border: `1px solid ${theme.palette.dark[700]}`,
                                    borderRadius: '8px',
                                    p: '8px 16px 8px 8px',
                                    cursor: 'pointer'
                                }}
                            >
                                <FilterAltOutlinedIcon sx={{ fill: theme.palette.grey[600], fontSize: '20px', mt: '-1px' }} />
                                <Typography ml={1} sx={{ color: theme.palette.grey[600], fontFamily: 'Inter', fontWeight: 500 }}>
                                    <FormattedMessage id="filter" />
                                </Typography>
                            </Box>
                            <Box
                                onClick={handleClickPopover}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    border: `1px solid ${theme.palette.dark[700]}`,
                                    borderRadius: '8px',
                                    p: '8px 16px 8px 8px',
                                    cursor: 'pointer'
                                }}
                            >
                                <CardMedia sx={{ objectFit: 'contain' }} component="img" width="18px" image={shuffle} alt="alt image" />
                                <Typography ml={1} sx={{ color: theme.palette.grey[600], fontFamily: 'Inter', fontWeight: 500 }}>
                                    <FormattedMessage id="sort" />
                                </Typography>
                            </Box>
                            <Popover
                                id={id}
                                open={openPopover}
                                anchorEl={anchorEl}
                                onClose={handleClosePopover}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right'
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right'
                                }}
                            >
                                <Box sx={{ width: '237px' }}>
                                    <Box sx={{ p: '24px 28px 10px 24px' }}>
                                        <Typography mb={1} sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 500 }}>
                                            <FormattedMessage id="order_by" />
                                        </Typography>
                                        <FormControlLabel
                                            sx={{
                                                '.MuiFormControlLabel-label': { fontFamily: 'Inter', fontSize: '14px', mt: '2px' }
                                            }}
                                            control={
                                                <Checkbox
                                                    checkedIcon={<CheckBoxOutlinedIcon />}
                                                    sx={{ '& .MuiSvgIcon-root': { fontSize: 22 } }}
                                                    checked={valOrderBy}
                                                    onChange={handleChange}
                                                    name="valOrderBy"
                                                />
                                            }
                                            label={<FormattedMessage id="due_date" />}
                                        />
                                    </Box>
                                    <Divider sx={{ background: theme.palette.grey[500] }} />
                                    <Box sx={{ p: '16px 24px' }}>
                                        <Typography mb={1} sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 500 }}>
                                            <FormattedMessage id="sort" />
                                        </Typography>
                                        <RadioGroup
                                            aria-labelledby="status"
                                            name="status"
                                            value={valSelecSort}
                                            onChange={(e) => setValSelecSort(e.target.value)}
                                        >
                                            <FormControlLabel
                                                value="Ascending"
                                                control={<Radio />}
                                                label={<FormattedMessage id="ascending" />}
                                            />
                                            <FormControlLabel
                                                value="Descending"
                                                control={<Radio />}
                                                label={<FormattedMessage id="descending" />}
                                            />
                                        </RadioGroup>
                                    </Box>
                                    <Divider sx={{ background: theme.palette.grey[500] }} />
                                    <Box pb={2} sx={{ display: 'flex', width: '82%', m: '16px auto 0', justifyContent: 'space-between' }}>
                                        <Box sx={{ width: '87px' }}>
                                            <ButtonCustom
                                                onClick={handleClosePopover}
                                                colorBtn="white"
                                                titleBtn={<FormattedMessage id="cancel" />}
                                            />
                                        </Box>
                                        <Box sx={{ width: '87px' }}>
                                            <ButtonCustom
                                                onClick={handleClosePopover}
                                                colorBtn="red"
                                                titleBtn={<FormattedMessage id="apply" />}
                                            />
                                        </Box>
                                    </Box>
                                </Box>
                            </Popover>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
            {tasks?.length ? (
                <Box>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <TasksTable item={tasks} />
                        <Typography
                            mt={4}
                            sx={{
                                color: theme.palette.grey[600],
                                fontFamily: 'Inter',
                                fontWeight: 600,
                                fontSize: '10px',
                                textTransform: 'uppercase',
                                letterSpacing: '0.12em',
                                textAlign: 'center'
                            }}
                        >
                            <FormattedMessage id="end_of_page" /> - {tasks?.length} <FormattedMessage id="results" />
                        </Typography>
                    </Box>
                    <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                        {tasks &&
                            tasks.map((task: any) => {
                                const time = handleTimeIsAfter(task.dueDate);
                                return (
                                    <Box key={task.taskName}>
                                        <TaskMobile task={task} time={time} />
                                    </Box>
                                );
                            })}
                    </Box>
                </Box>
            ) : (
                <Box sx={{ width: { xs: '315px', sm: '393px' }, m: '10% auto 0' }}>
                    <NotFoundImg title={<FormattedMessage id="no_tasks_created" />} image />
                </Box>
            )}
            <AddTask openDivider={openDivider} handleClickCloseDivider={handleClickCloseDivider} />
            <Filters openDivider={openDividerFilter} handleClickCloseDivider={handleClickCloseDividerFilter} />
        </Box>
    );
};

export default Tasks;
