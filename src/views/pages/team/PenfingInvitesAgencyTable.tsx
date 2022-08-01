import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, Box, Dialog } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { useTheme } from '@mui/material/styles';
import DIalogCongirm from 'ui-component/dialogConfirm';
import moment from 'moment';

export default function PenfingInvitesAgencyTable({ item, handleDelete }: any) {
    const theme = useTheme();
    const TableRowPendingMembers = ({ row }: any) => {
        const [openDialog, setOpenDialog] = React.useState(false);
        const [cancelInviteItem, setCancelInviteItem] = React.useState<any>();
        const handleCloseDialog = () => {
            setOpenDialog(false);
        };
        const handleClickOpen = (itemCencelInvite: any) => {
            setCancelInviteItem(itemCencelInvite);
            setOpenDialog(true);
        };
        return (
            <TableRow key={row.member_email}>
                <TableCell sx={{ pt: '35px' }} component="th" scope="row">
                    <Typography sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 500 }}>
                        {row.member_email}
                    </Typography>
                </TableCell>
                <TableCell sx={{ pt: '35px' }} align="left">
                    <Typography sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 500 }}>
                        {moment(row.created_at).format('DD MMMM, YYYY')}
                    </Typography>
                </TableCell>
                <TableCell sx={{ pt: '35px' }} align="right">
                    <Box
                        onClick={() => handleClickOpen(row)}
                        sx={{
                            borderRadius: '100px',
                            border: `1px solid ${theme.palette.grey[300]}`,
                            width: '16px',
                            height: '16px',
                            display: 'flex',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            flexDirection: 'column'
                        }}
                    >
                        {' '}
                        <Typography sx={{ color: theme.palette.grey[300], fontFamily: 'Inter', fontWeight: 500, textAlign: 'center' }}>
                            -
                        </Typography>
                    </Box>
                </TableCell>
                <Dialog
                    sx={{ '.MuiDialog-paper': { minWidth: { xs: '350px', sm: '562px' } } }}
                    onClose={handleCloseDialog}
                    open={openDialog}
                >
                    <DIalogCongirm onConfirm={() => handleDelete(cancelInviteItem)} onClose={handleCloseDialog} />
                </Dialog>
            </TableRow>
        );
    };
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 498 }} aria-label="simple table">
                <TableHead sx={{ background: theme.palette.grey[700] }}>
                    <TableRow>
                        <TableCell>
                            <Typography sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 500 }}>
                                <FormattedMessage id="email" />
                            </Typography>
                        </TableCell>
                        <TableCell align="left">
                            <Typography sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 500 }}>
                                <FormattedMessage id="date_invited" />
                            </Typography>
                        </TableCell>
                        <TableCell align="left">
                            <Typography sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 500, display: 'none' }}>
                                <FormattedMessage id="date_invited" />
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {item?.map((row: any) => (
                        <TableRowPendingMembers row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
