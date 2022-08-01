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
import deleteIcon from '../../../assets/images/deleteIcon.svg';
import zapoff from '../../../assets/images/zapoff.svg';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import DIalogCongirm from 'ui-component/dialogConfirm';
import DrawerAddOffers from './AddOffersDrawer';
import moment from 'moment';
import { DEACTIVE_OFFER } from '../../../services/graphQL/mutations/offer/OffersMutations';
import { useMutation } from '@apollo/client';

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
    );
}

export default function EnhancedTable({ item, fetchOffers }: any) {
    const [selected, setSelected] = React.useState<readonly string[]>([]);

    const theme = useTheme();

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = item.map((n: any) => n.title);
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

    const FullTableRow = ({ isItemSelected, labelId, row }: any) => {
        const [openDivider, setOpenDivider] = React.useState(false);
        const [openDialog, setOpenDialog] = React.useState(false);
        const [anchorEl, setAnchorEl] = React.useState<any>(null);
        const [nameOffers, setNameOffers] = React.useState<any>();
        const [ideOffers, setIdOffers] = React.useState('');
        const open = Boolean(anchorEl);
        const id = open ? 'simple-popover' : undefined;
        const [deactiveOfferMutation] = useMutation(DEACTIVE_OFFER, {
            onCompleted: (data: any) => {
                console.log('deactiveOffer', data);
                fetchOffers();
                handleClickCloseDivider();
            },
            onError: (error: any) => {
                console.log(error);
            }
        });
        const handleClickPopover = (event: any) => {
            setAnchorEl(event.currentTarget);
        };
        const handleClose = () => {
            setAnchorEl(null);
        };
        const handleClickCloseDivider = () => {
            setOpenDivider(false);
        };
        const handleClickDeactive = (offer: any) => {
            console.log('offeroffer', offer);
            setIdOffers(offer.id);
            handleClickOpen();
            handleClose();
        };
        const deactiveOffer = () => {
            deactiveOfferMutation({
                variables: {
                    id: ideOffers,
                    status: 'ARCHIVED'
                }
            });
        };
        const handleClickOpen = () => {
            setOpenDialog(true);
        };
        const handleOpenDivider = () => {
            setOpenDivider(true);
        };
        const handleClickPopoverView = (itemOffers: any) => {
            setNameOffers(itemOffers);
            handleOpenDivider();
            handleClosePopover();
        };
        const handleClosePopover = () => {
            setAnchorEl(null);
        };
        const handleCloseDialog = () => {
            setOpenDialog(false);
        };
        return (
            <TableRow hover role="checkbox" aria-checked={isItemSelected} tabIndex={-1} key={row.title} selected={isItemSelected}>
                <TableCell padding="checkbox" sx={{ pt: '18px' }}>
                    <Checkbox
                        onClick={(event) => handleClick(event, row.title)}
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                            'aria-labelledby': labelId
                        }}
                    />
                </TableCell>
                <TableCell component="th" scope="row" sx={{ width: '357px', pt: '35px' }}>
                    <Typography sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 500 }}>{row.title}</Typography>
                </TableCell>
                <TableCell align="left" sx={{ width: '357px', pt: '35px' }}>
                    {/* <Box sx={{ display: 'flex' }}>
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
                    </Box> */}
                </TableCell>
                <TableCell align="left" sx={{ width: '357px', pt: '30px' }}>
                    <Typography sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 600 }}>
                        {moment(row.created_at).format('DD MMMM, YYYY')}
                    </Typography>
                </TableCell>
                <TableCell align="right" sx={{ pt: '30px' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Box sx={{ width: '40px' }}>
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
                                    horizontal: 'right'
                                }}
                            >
                                <Box sx={{ p: '24px' }}>
                                    <Box
                                        onClick={() => handleClickPopoverView(row)}
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
                                        onClick={() => handleClickDeactive(row)}
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
                                    {/* <Box
                                        // onClick={handleClickDelete}
                                        sx={{ display: 'flex', cursor: 'pointer', alignItems: 'center', mt: '10px' }}
                                    >
                                        <Box sx={{ width: '18px', ml: '2px' }}>
                                            <CardMedia
                                                sx={{ objectFit: 'contain' }}
                                                component="img"
                                                width="18px"
                                                image={deleteIcon}
                                                alt="alt image"
                                            />
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
                                            <FormattedMessage id="delete" />
                                        </Typography>
                                    </Box> */}
                                </Box>
                            </Popover>
                        </Box>
                    </Box>
                </TableCell>
                <Dialog
                    sx={{ '.MuiDialog-paper': { minWidth: { xs: '350px', sm: '562px' } } }}
                    onClose={handleCloseDialog}
                    open={openDialog}
                >
                    <DIalogCongirm onConfirm={deactiveOffer} onClose={handleCloseDialog} />
                </Dialog>
                <DrawerAddOffers openDivider={openDivider} handleClickCloseDivider={handleClickCloseDivider} item={nameOffers} />
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
                                const isItemSelected = isSelected(row.title);
                                const labelId = `enhanced-table-checkbox-${index}`;
                                return <FullTableRow isItemSelected={isItemSelected} labelId={labelId} row={row} />;
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
}
