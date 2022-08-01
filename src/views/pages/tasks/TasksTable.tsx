import * as React from 'react';
import Box from '@mui/material/Box';
import {
    Table,
    Popover,
    Avatar,
    CardMedia,
    Dialog,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Paper,
    Checkbox
} from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { useTheme } from '@mui/material/styles';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import zapoff from '../../../assets/images/zapoff.svg';
import share from '../../../assets/images/share.svg';
import archive from '../../../assets/images/archive.svg';
import deleteIcon from '../../../assets/images/deleteIcon.svg';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import moment from 'moment';
import DIalogSharedLink from './DIalogSharedLink';
import AddTask from './AddTask';

interface EnhancedTableProps {
    numSelected: number;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const { onSelectAllClick, numSelected, rowCount } = props;
    const theme = useTheme();

    return (
        <TableHead sx={{ borderBottom: `1px solid ${theme.palette.grey[500]}`, background: theme.palette.grey[700] }}>
            <TableRow>
                <TableCell
                    padding="checkbox"
                    sx={{
                        background: theme.palette.grey[900],
                        borderRadius: '8px 0 0 0',
                        borderRight: `1px solid ${theme.palette.grey[500]}`,
                        p: '8px 18px'
                    }}
                >
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts'
                        }}
                    />
                </TableCell>
                <TableCell align="left" sx={{ borderRight: `1px solid ${theme.palette.grey[500]}` }}>
                    {' '}
                    <Typography sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 600 }}>
                        <FormattedMessage id="task_name" />
                    </Typography>
                </TableCell>
                <TableCell align="left" sx={{ borderRight: `1px solid ${theme.palette.grey[500]}` }}>
                    <Typography sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 600, textAlign: 'center' }}>
                        <FormattedMessage id="status" />
                    </Typography>
                </TableCell>
                <TableCell align="left" sx={{ borderRight: `1px solid ${theme.palette.grey[500]}` }}>
                    <Typography sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 600 }}>
                        <FormattedMessage id="due_date" />
                    </Typography>
                </TableCell>
                <TableCell align="left" sx={{ borderRight: `1px solid ${theme.palette.grey[500]}` }}>
                    <Typography sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 600, textAlign: 'center' }}>
                        <FormattedMessage id="assignee" />
                    </Typography>
                </TableCell>
                <TableCell align="left">
                    <Typography sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 600 }}>
                        <FormattedMessage id="brand" />
                    </Typography>
                </TableCell>
                <TableCell align="left">
                    <Typography sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 600, display: 'none' }}>
                        <FormattedMessage id="date_added" />
                    </Typography>
                </TableCell>
            </TableRow>
        </TableHead>
    );
}

export default function TasksTable({ item }: any) {
    const [selected, setSelected] = React.useState<readonly string[]>([]);

    const theme = useTheme();
    const [dateNow, setDateNow] = React.useState<any>();
    React.useEffect(() => {
        setDateNow(moment());
    }, []);
    const handleTimeIsAfter = (time: any) => {
        if (dateNow) {
            time = moment(time);
            return dateNow.isAfter(time);
        }
        return null;
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = item.map((n: any) => n.taskName);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };
    const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected: readonly string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }

        setSelected(newSelected);
    };

    const isSelected = (name: string) => selected.indexOf(name) !== -1;

    const FullTableRow = ({ isItemSelected, labelId, row, time }: any) => {
        const [anchorEl, setAnchorEl] = React.useState<any>(null);
        const [idMember, setIdMember] = React.useState('');
        const open = Boolean(anchorEl);
        const id = open ? 'simple-popover' : undefined;
        const [openDialogSharedLink, setOpenDialogSharedLink] = React.useState(false);
        const [linkShared, setLinkShared] = React.useState<any>();
        const [openDivider, setOpenDivider] = React.useState(false);
        const [selectedTask, setSelectedTask] = React.useState<any>();
        const hendleOpenDialogSharedLink = (itemLink: any) => {
            setLinkShared(itemLink);
            setOpenDialogSharedLink(true);
            handleClose();
        };
        const handleClickCloseDivider = () => {
            setOpenDivider(false);
        };
        const handleOpenDivider = (task: any) => {
            setSelectedTask(task);
            setOpenDivider(true);
        };
        const hendleCloseDialogSharedLink = () => {
            setOpenDialogSharedLink(false);
        };
        const handleClickPopover = (event: any) => {
            setAnchorEl(event.currentTarget);
        };
        const handleClose = () => {
            setAnchorEl(null);
        };
        const handleClickDelete = (idUser: string) => {
            setIdMember(idUser);
            // handleClickOpen();
            handleClose();
        };

        // const handleClickOpen = () => {
        //     setOpenDialog(true);
        // };
        // const handleClickPopoverView = (itemOffers: any) => {
        //     setNameOffers(itemOffers);
        //     hendleOpenDialogSharedLink();
        //     handleOpenDivider();
        //     handleClosePopover();
        // };
        const handleClosePopover = () => {
            setAnchorEl(null);
        };
        // const handleCloseDialog = () => {
        //     setOpenDialog(false);
        // };
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
            <TableRow hover role="checkbox" aria-checked={isItemSelected} tabIndex={-1} key={row.taskName} selected={isItemSelected}>
                <TableCell padding="checkbox" sx={{ borderRight: `1px solid ${theme.palette.grey[500]}`, p: '8px 18px' }}>
                    <Checkbox
                        onClick={(event) => handleClick(event, row.taskName)}
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                            'aria-labelledby': labelId
                        }}
                    />
                </TableCell>
                <TableCell
                    component="th"
                    scope="row"
                    sx={{ borderRight: `1px solid ${theme.palette.grey[500]}`, p: '8px 18px', maxWidth: '300px' }}
                >
                    <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center' }}>
                        <Typography
                            onClick={() => handleOpenDivider(row)}
                            sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 500, cursor: 'pointer' }}
                        >
                            {row.taskName}
                        </Typography>
                        <Box
                            sx={{
                                background: theme.palette.secondary[500],
                                p: '3px 10px',
                                borderRadius: '4px',
                                ml: '10px',
                                cursor: 'pointer'
                            }}
                        >
                            <Typography
                                sx={{
                                    color: theme.palette.background.paper,
                                    fontFamily: 'Inter',
                                    fontWeight: 500,
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    fontSize: '12px',
                                    width: '60px'
                                }}
                            >
                                (12 Jun - 17 Jun) [Instagram Content Creation]
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                        <Typography
                            sx={{
                                color: theme.palette.background.paper,
                                fontFamily: 'Inter',
                                fontWeight: 500,
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                fontSize: '12px',
                                width: '120px',
                                cursor: 'pointer'
                            }}
                        >
                            (12 Jun - 17 Jun) [Instagram Content Creation]
                        </Typography>
                        <Typography sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 500 }}>
                            {row.taskName}
                        </Typography>
                    </Box>
                </TableCell>
                <TableCell align="left" sx={{ borderRight: `1px solid ${theme.palette.grey[500]}`, p: '8px 18px' }}>
                    <Box
                        sx={{
                            width: '95%',
                            m: '0 auto',
                            p: '12px 0',
                            borderRadius: '100px',
                            background: background(row.status)
                        }}
                    >
                        <Typography sx={{ color: fontColor(row.status), fontFamily: 'Inter', fontWeight: 500, textAlign: 'center' }}>
                            {row.status}
                        </Typography>
                    </Box>
                </TableCell>
                <TableCell align="left" sx={{ borderRight: `1px solid ${theme.palette.grey[500]}`, p: '8px 18px' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 600 }}>
                            {moment(row.dueDate).format('DD MMMM, YYYY')}
                        </Typography>
                        <Box
                            sx={{
                                background: time ? theme.palette.secondary[600] : theme.palette.primary[500],
                                borderRadius: '16px',
                                p: '4px 8px'
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
                    </Box>
                </TableCell>
                <TableCell align="left" sx={{ borderRight: `1px solid ${theme.palette.grey[500]}`, p: '8px 18px' }}>
                    <Box sx={{ width: '32px', m: '0 auto' }}>
                        <Avatar sx={{ width: '32px', height: '32px' }} alt="Remy Sharp" src={row.assigneeUrl} />
                    </Box>
                </TableCell>
                <TableCell align="left" sx={{ p: '8px 18px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ width: '32px', height: '32px' }}>
                            <CardMedia sx={{ objectFit: 'contain' }} component="img" width="18px" image={row.brand.src} alt="alt" />
                        </Box>
                        <Typography ml={1} sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 500 }}>
                            {row.brand.title}
                        </Typography>
                    </Box>
                </TableCell>
                <TableCell align="right" sx={{ p: '8px 18px' }}>
                    <Typography
                        onClick={handleClickPopover}
                        sx={{
                            color: theme.palette.grey[400],
                            fontFamily: 'Inter',
                            fontWeight: 600,
                            fontSize: '26px',
                            m: '-10px 20px 0 0',
                            cursor: 'pointer',
                            zIndex: 111
                        }}
                    >
                        ...
                    </Typography>
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClosePopover}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left'
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center'
                        }}
                    >
                        <Box sx={{ p: '20px' }}>
                            <Box
                                onClick={() => hendleOpenDialogSharedLink(row)}
                                sx={{ display: 'flex', cursor: 'pointer', alignItems: 'center' }}
                            >
                                <Box sx={{ width: '20px' }}>
                                    <CardMedia sx={{ objectFit: 'contain' }} component="img" width="18px" image={share} alt="alt image" />
                                </Box>

                                <Typography
                                    sx={{
                                        color: theme.palette.grey[400],
                                        fontFamily: 'Inter',
                                        fontWeight: 500,
                                        fontSize: '14px',
                                        ml: '10px'
                                    }}
                                >
                                    <FormattedMessage id="share" />
                                </Typography>
                            </Box>
                            <Box
                                onClick={() => handleClickDelete(row.user.id)}
                                mt={2}
                                sx={{ display: 'flex', cursor: 'pointer', alignItems: 'center' }}
                            >
                                <CardMedia sx={{ objectFit: 'contain' }} component="img" width="18px" image={archive} alt="alt image" />
                                <Typography
                                    sx={{
                                        color: theme.palette.grey[400],
                                        fontFamily: 'Inter',
                                        fontWeight: 500,
                                        fontSize: '14px',
                                        ml: '12px'
                                    }}
                                >
                                    <FormattedMessage id="archive" />
                                </Typography>
                            </Box>
                        </Box>
                    </Popover>
                </TableCell>
                <Dialog
                    sx={{ '.MuiDialog-paper': { minWidth: { xs: '350px', sm: '562px' } } }}
                    onClose={hendleCloseDialogSharedLink}
                    open={openDialogSharedLink}
                >
                    <DIalogSharedLink handleClose={hendleCloseDialogSharedLink} linkShared={linkShared} />
                </Dialog>
                <AddTask openDivider={openDivider} handleClickCloseDivider={handleClickCloseDivider} selectedTask={selectedTask} />
            </TableRow>
        );
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <TableContainer>
                    <Table sx={{ borderRadius: '8px 8px 0 0', minWidth: 750 }} aria-labelledby="tableTitle">
                        <EnhancedTableHead numSelected={selected.length} onSelectAllClick={handleSelectAllClick} rowCount={item.length} />
                        <TableBody>
                            {item.map((row: any, index: number) => {
                                const time = handleTimeIsAfter(row.dueDate);
                                const isItemSelected = isSelected(row.taskName);
                                const labelId = `enhanced-table-checkbox-${index}`;
                                return <FullTableRow isItemSelected={isItemSelected} labelId={labelId} row={row} time={time} />;
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
}
