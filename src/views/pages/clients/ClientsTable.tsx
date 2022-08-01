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
    Checkbox,
    Button
} from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { useTheme } from '@mui/material/styles';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import zapoff from '../../../assets/images/zapoff.svg';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import DIalogCongirm from 'ui-component/dialogConfirm';
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

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
                <TableCell padding="checkbox" sx={{ background: theme.palette.grey[900], borderRadius: '8px 0 0 0' }}>
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
                <TableCell align="left">
                    {' '}
                    <Typography sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 600 }}>
                        <FormattedMessage id="brand_name" />
                    </Typography>
                </TableCell>
                <TableCell align="left">
                    <Typography sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 600 }}>
                        <FormattedMessage id="contact_point_name" />
                    </Typography>
                </TableCell>
                <TableCell align="left">
                    <Typography sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 600 }}>
                        <FormattedMessage id="email" />
                    </Typography>
                </TableCell>
                <TableCell align="left">
                    <Typography sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 600 }}>
                        <FormattedMessage id="phone_number" />
                    </Typography>
                </TableCell>
                <TableCell align="left">
                    <Typography sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 600 }}>
                        <FormattedMessage id="date_added" />
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

export default function EnhancedTable({ item, handleClient }: any) {
    const [selected, setSelected] = React.useState<readonly string[]>([]);

    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = item.map((n: any) => n.name);
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

    const FullTableRow = ({ isItemSelected, labelId, row, itemData }: any) => {
        const [openDivider, setOpenDivider] = React.useState(false);
        const [openDialog, setOpenDialog] = React.useState(false);
        const [anchorEl, setAnchorEl] = React.useState<any>(null);
        const [nameOffers, setNameOffers] = React.useState<any>();
        const open = Boolean(anchorEl);
        const id = open ? 'simple-popover' : undefined;
        const handleClickPopover = (event: any) => {
            setAnchorEl(event.currentTarget);
        };
        const handleClose = () => {
            setAnchorEl(null);
        };
        const handleClickCloseDivider = () => {
            setOpenDivider(false);
        };
        const handleClickDelete = () => {
            handleClickOpen();
            handleClose();
        };
        const handleClickOpen = () => {
            setOpenDialog(true);
        };
        const handleOpenDivider = () => {
            setOpenDivider(true);
        };
        const handleClickPopoverView = (itemOffers: any) => {
            handleClient(itemOffers);
            setNameOffers(itemOffers);
            handleOpenDivider();
            handleClosePopover();
        };
        const handleClickView = () => {
            navigate(`/clients/:${row.id}`, { replace: true });
        };
        const handleClosePopover = () => {
            setAnchorEl(null);
        };
        const handleCloseDialog = () => {
            setOpenDialog(false);
        };
        return (
            <TableRow hover role="checkbox" aria-checked={isItemSelected} tabIndex={-1} key={row.name} selected={isItemSelected}>
                <TableCell padding="checkbox" sx={{ pt: '18px' }}>
                    <Checkbox
                        onClick={(event) => handleClick(event, row.name)}
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                            'aria-labelledby': labelId
                        }}
                    />
                </TableCell>
                <TableCell align="left" sx={{ width: '357px', pt: '35px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ width: '32px', height: '32px' }} alt="Remy Sharp" src={row.name.src} />
                        <Typography ml={1} sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 500 }}>
                            {row.name.title}
                        </Typography>
                    </Box>
                </TableCell>
                <TableCell component="th" scope="row" sx={{ width: '357px', pt: '35px' }}>
                    <Typography sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 500 }}>{row.contactName}</Typography>
                </TableCell>
                <TableCell align="left" sx={{ width: '357px', pt: '30px' }}>
                    <Typography sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 600 }}>{row.email}</Typography>
                </TableCell>
                <TableCell align="left" sx={{ width: '357px', pt: '30px' }}>
                    <Typography sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 600 }}>{row.phoneNumber}</Typography>
                </TableCell>
                <TableCell align="left" sx={{ width: '357px', pt: '30px' }}>
                    <Typography sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 600 }}>
                        {moment(row.date).format('DD MMMM, YYYY')}
                    </Typography>
                </TableCell>
                <TableCell align="right" sx={{ pt: '30px' }}>
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
                        <Box sx={{ p: '24px' }}>
                            <Button className="textDecorationNone" onClick={() => handleClickView()}>
                                <Box sx={{ display: 'flex', cursor: 'pointer', alignItems: 'center' }}>
                                    <VisibilityOutlinedIcon sx={{ width: '20px', fill: theme.palette.grey[400] }} />
                                    <Typography
                                        sx={{
                                            color: theme.palette.grey[400],
                                            fontFamily: 'Inter',
                                            fontWeight: 500,
                                            fontSize: '14px',
                                            ml: '10px',
                                            textDecoration: 'none'
                                        }}
                                    >
                                        <FormattedMessage id="view" />
                                    </Typography>
                                </Box>
                            </Button>
                        </Box>
                    </Popover>
                </TableCell>
                <Dialog onClose={handleCloseDialog} open={openDialog}>
                    <DIalogCongirm onConfirm={handleCloseDialog} onClose={handleCloseDialog} />
                </Dialog>
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
                                const isItemSelected = isSelected(row.name);
                                const labelId = `enhanced-table-checkbox-${index}`;
                                return (
                                    <FullTableRow
                                        isItemSelected={isItemSelected}
                                        labelId={labelId}
                                        row={row}
                                        key={labelId}
                                        itemData={row}
                                    />
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
}
