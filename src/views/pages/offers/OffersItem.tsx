import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    Paper,
    TableCell,
    TableBody,
    Typography,
    Avatar,
    Box,
    Checkbox,
    Popover,
    CardMedia,
    Dialog
} from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { useTheme } from '@mui/material/styles';
import React from 'react';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import zapoff from '../../../assets/images/zapoff.svg';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import DIalogCongirm from 'ui-component/dialogConfirm';
import DrawerAddOffers from './AddOffersDrawer';

const ItemOffers = ({ item }: any) => {
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = React.useState<any>(null);
    const [openDivider, setOpenDivider] = React.useState(false);
    const [nameOffers, setNameOffers] = React.useState('');
    const handleClickCloseDivider = () => {
        setOpenDivider(false);
    };
    const handleOpenDivider = () => {
        setOpenDivider(true);
    };
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const [openDialog, setOpenDialog] = React.useState(false);

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    const handleClickPopover = () => {
        handleClickOpen();
        handleClose();
    };
    const handleClickPopoverView = (name: string) => {
        setNameOffers(name);
        handleOpenDivider();
        handleClose();
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    return (
        <TableContainer component={Paper} sx={{ borderRadius: '8px 8px 0 0' }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead sx={{ borderBottom: `1px solid ${theme.palette.grey[500]}`, background: theme.palette.grey[700] }}>
                    <TableRow>
                        <TableCell sx={{ background: theme.palette.grey[900], borderRadius: '8px 0 0 0' }}>
                            <Box sx={{ width: '24px', m: '0 auto' }}>
                                <Checkbox sx={{ p: 0 }} />
                            </Box>
                        </TableCell>
                        <TableCell align="left">
                            {' '}
                            <Typography sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 600 }}>
                                <FormattedMessage id="name" />
                            </Typography>
                        </TableCell>
                        <TableCell align="left">
                            <Typography sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 600 }}>
                                <FormattedMessage id="clients" />
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
                <TableBody>
                    {item?.map((row: any) => (
                        <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row" sx={{ width: '46px', pt: '35px' }}>
                                <Box sx={{ width: '24px', m: '0 auto' }}>
                                    <Checkbox sx={{ p: 0 }} />
                                </Box>
                            </TableCell>
                            <TableCell component="th" scope="row" sx={{ width: '357px', pt: '35px' }}>
                                <Typography sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 500 }}>
                                    {row.name}
                                </Typography>
                            </TableCell>
                            <TableCell align="left" sx={{ width: '357px', pt: '35px' }}>
                                <Box sx={{ display: 'flex' }}>
                                    {row.clients.map(
                                        (client: any, indexClient: number) =>
                                            indexClient < 3 && (
                                                <Box key={indexClient + 1} sx={{ width: '32px', mr: indexClient + 1 > 0 ? '-12px' : 0 }}>
                                                    <Avatar sx={{ width: '32px', height: '32px' }} alt="Remy Sharp" src={client.src} />
                                                </Box>
                                            )
                                    )}
                                    <Box
                                        sx={{
                                            background: theme.palette.grey[700],
                                            borderRadius: '100px',
                                            width: '32px',
                                            zIndex: 2,
                                            border: `2px solid ${theme.palette.background.paper}`,
                                            p: '5px 0 0 4px'
                                        }}
                                    >
                                        <Typography sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 600 }}>
                                            {`+${row.clients.length - 3}`}
                                        </Typography>
                                    </Box>
                                </Box>
                            </TableCell>
                            <TableCell align="left" sx={{ width: '357px', pt: '30px' }}>
                                <Typography sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 600 }}>
                                    {row.date}
                                </Typography>
                            </TableCell>
                            <TableCell align="right" sx={{ pt: '30px' }}>
                                <Typography
                                    onClick={handleClick}
                                    sx={{
                                        color: theme.palette.grey[400],
                                        fontFamily: 'Inter',
                                        fontWeight: 600,
                                        fontSize: '26px',
                                        m: '-10px 20px 0 0',
                                        cursor: 'pointer'
                                    }}
                                >
                                    ...
                                </Typography>
                                <Popover
                                    id={id}
                                    open={open}
                                    anchorEl={anchorEl}
                                    onClose={handleClose}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right'
                                    }}
                                >
                                    <Box sx={{ p: '24px' }}>
                                        <Box
                                            onClick={() => handleClickPopoverView(row.name)}
                                            sx={{ display: 'flex', cursor: 'pointer', alignItems: 'center' }}
                                        >
                                            <VisibilityOutlinedIcon sx={{ width: '20px' }} />
                                            <Typography
                                                sx={{
                                                    color: theme.palette.grey[400],
                                                    fontFamily: 'Inter',
                                                    fontWeight: 500,
                                                    fontSize: '14px',
                                                    ml: '10px'
                                                }}
                                            >
                                                <FormattedMessage id="view" />
                                            </Typography>
                                        </Box>
                                        <Box
                                            onClick={handleClickPopover}
                                            mt={1}
                                            sx={{ display: 'flex', cursor: 'pointer', alignItems: 'center' }}
                                        >
                                            <CardMedia
                                                sx={{ objectFit: 'contain' }}
                                                component="img"
                                                width="18px"
                                                image={zapoff}
                                                alt="alt image"
                                            />
                                            <Typography
                                                sx={{
                                                    color: theme.palette.grey[400],
                                                    fontFamily: 'Inter',
                                                    fontWeight: 500,
                                                    fontSize: '14px',
                                                    ml: '12px'
                                                }}
                                            >
                                                <FormattedMessage id="deactivate" />
                                            </Typography>
                                        </Box>
                                        <Box
                                            onClick={handleClickPopover}
                                            mt={1}
                                            sx={{ display: 'flex', cursor: 'pointer', alignItems: 'center' }}
                                        >
                                            <DeleteOutlinedIcon sx={{ width: '22px' }} />
                                            <Typography
                                                sx={{
                                                    color: theme.palette.grey[400],
                                                    fontFamily: 'Inter',
                                                    fontWeight: 500,
                                                    fontSize: '14px',
                                                    ml: '8px'
                                                }}
                                            >
                                                <FormattedMessage id="delete" />
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Dialog onClose={handleCloseDialog} open={openDialog}>
                <DIalogCongirm onConfirm={handleCloseDialog} onClose={handleCloseDialog} />
            </Dialog>
            <DrawerAddOffers openDivider={openDivider} handleClickCloseDivider={handleClickCloseDivider} item={nameOffers} />
        </TableContainer>
    );
};

export default ItemOffers;
