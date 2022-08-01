import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from '@mui/material';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { FormattedMessage } from 'react-intl';
import { useTheme, styled } from '@mui/material/styles';
import moment from 'moment';

const LightTooltip = styled(({ className, ...props }: TooltipProps) => <Tooltip {...props} classes={{ popper: className }} />)(
    ({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: theme.palette.common.white,
            color: 'rgba(0, 0, 0, 0.87)',
            boxShadow: theme.shadows[1],
            fontSize: 11
        }
    })
);

export default function PenfingInvitesSpecialistTable({ item }: any) {
    const theme = useTheme();
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 498 }} aria-label="simple table">
                <TableHead sx={{ background: theme.palette.grey[700] }}>
                    <TableRow>
                        <TableCell>
                            <Typography sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 500 }}>
                                <FormattedMessage id="role" />
                            </Typography>
                        </TableCell>
                        <TableCell align="left">
                            <Typography sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 500 }}>
                                <FormattedMessage id="description" />
                            </Typography>
                        </TableCell>
                        <TableCell align="left">
                            <Typography sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 500 }}>
                                <FormattedMessage id="date_requested" />
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {item?.map((row: any) => (
                        <TableRow key={row.name}>
                            <TableCell sx={{ pt: '35px' }} component="th" scope="row">
                                <Typography sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 500 }}>
                                    Member
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ pt: '35px', maxWidth: '140px' }}>
                                <LightTooltip
                                    title={
                                        <Typography
                                            sx={{
                                                color: theme.palette.grey[400],
                                                fontFamily: 'Inter',
                                                fontWeight: 500,
                                                p: '20px'
                                            }}
                                        >
                                            {row.message}
                                        </Typography>
                                    }
                                >
                                    <Typography
                                        sx={{
                                            color: theme.palette.grey[400],
                                            fontFamily: 'Inter',
                                            fontWeight: 500,
                                            whiteSpace: 'nowrap',
                                            textOverflow: 'ellipsis',
                                            overflow: 'hidden'
                                        }}
                                    >
                                        {row.message}
                                    </Typography>
                                </LightTooltip>
                            </TableCell>
                            <TableCell sx={{ pt: '35px' }} align="left">
                                <Typography sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 500 }}>
                                    {moment(row.created_at).format('DD MMMM, YYYY')}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
