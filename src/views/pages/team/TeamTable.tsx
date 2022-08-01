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
import deleteIcon from '../../../assets/images/deleteIcon.svg';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import DIalogCongirm from 'ui-component/dialogConfirm';
import moment from 'moment';
import DialogViewTeamMember from './DialogViewTeamMember';
import { DELETE_MEMBER } from '../../../services/graphQL/mutations/team/teamMutations';
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
                        <FormattedMessage id="email" />
                    </Typography>
                </TableCell>
                <TableCell align="left">
                    <Typography sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 600 }}>
                        <FormattedMessage id="role" />
                    </Typography>
                </TableCell>
                <TableCell align="left">
                    <Typography sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 600 }}>
                        <FormattedMessage id="type" />
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

export default function TeamTable({ item, organizationId, fetchTeam }: any) {
    const [selected, setSelected] = React.useState<readonly string[]>([]);

    const theme = useTheme();

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = item.map((n: any) => n.user.id);
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
        const [idMember, setIdMember] = React.useState('');
        const [openDialogViewTeamMember, setOpenDialogViewTeamMember] = React.useState(false);
        const open = Boolean(anchorEl);
        const id = open ? 'simple-popover' : undefined;

        const [deleteMember, { loading: loadingDeleteMember, error: errorDeleteMember }] = useMutation(DELETE_MEMBER, {
            onCompleted: (data: any) => {
                console.log('inviteMember', data);
                fetchTeam();
                setOpenDialog(false);
            },
            onError: (error: any) => {
                console.log(error);
            }
        });
        const hendleOpenDialogViewTeamMember = () => {
            setOpenDialogViewTeamMember(true);
            handleClose();
        };
        const hendleCloseDialogViewTeamMember = () => {
            setOpenDialogViewTeamMember(false);
        };
        const handleClickPopover = (event: any) => {
            setAnchorEl(event.currentTarget);
        };
        const handleClose = () => {
            setAnchorEl(null);
        };
        const handleClickCloseDivider = () => {
            setOpenDivider(false);
        };
        const onConfirmDeleteMember = () => {
            deleteMember({
                variables: { organization_id: organizationId, user_id: idMember }
            });
        };
        const handleClickDelete = (idUser: string) => {
            setIdMember(idUser);
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
            setNameOffers(itemOffers);
            hendleOpenDialogViewTeamMember();
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
            <TableRow hover role="checkbox" aria-checked={isItemSelected} tabIndex={-1} key={row.id} selected={isItemSelected}>
                <TableCell padding="checkbox" sx={{ pt: '18px' }}>
                    <Checkbox
                        onClick={(event) => handleClick(event, row.user.id)}
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                            'aria-labelledby': labelId
                        }}
                    />
                </TableCell>
                <TableCell component="th" scope="row" sx={{ pt: '35px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ width: '32px', height: '32px' }} alt="Remy Sharp" src={row.user.image_url} />
                        <Typography ml={1} sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 500 }}>
                            {row.user.first_name}
                        </Typography>
                    </Box>
                </TableCell>
                <TableCell align="left" sx={{ pt: '35px' }}>
                    <Typography sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 500 }}>{row.user.email}</Typography>
                </TableCell>
                <TableCell align="left" sx={{ pt: '35px' }}>
                    <Typography sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 600 }}>{row.role_id}</Typography>
                </TableCell>
                <TableCell align="left" sx={{ pt: '35px' }}>
                    <Typography sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 600 }}>In-Agency</Typography>
                </TableCell>
                <TableCell align="left" sx={{ pt: '35px' }}>
                    <Typography sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 600 }}>
                        {moment(row.created_at).format('DD MMMM, YYYY')}
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
                                onClick={() => handleClickDelete(row.user.id)}
                                mt={1}
                                sx={{ display: 'flex', cursor: 'pointer', alignItems: 'center' }}
                            >
                                <CardMedia sx={{ objectFit: 'contain' }} component="img" width="18px" image={zapoff} alt="alt image" />
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
                                onClick={() => handleClickDelete(row.user.id)}
                                sx={{ display: 'flex', cursor: 'pointer', alignItems: 'center', mt: '10px', ml: '2px' }}
                            >
                                <Box sx={{ width: '18px' }}>
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
                            </Box>
                        </Box>
                    </Popover>
                </TableCell>
                <Dialog
                    sx={{ '.MuiDialog-paper': { minWidth: { xs: '350px', sm: '562px' } } }}
                    onClose={handleCloseDialog}
                    open={openDialog}
                >
                    <DIalogCongirm onConfirm={onConfirmDeleteMember} onClose={handleCloseDialog} />
                </Dialog>
                <Dialog
                    sx={{ '.MuiDialog-paper': { minWidth: { xs: '350px', sm: '562px' } } }}
                    onClose={hendleCloseDialogViewTeamMember}
                    open={openDialogViewTeamMember}
                >
                    <DialogViewTeamMember hendleCloseDialogViewTeamMember={hendleCloseDialogViewTeamMember} item={nameOffers} />
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
                                const isItemSelected = isSelected(row.user.id);
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
