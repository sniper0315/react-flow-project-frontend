import { Typography, Box, Grid, Tab, Tabs } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import React from 'react';
import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import PenfingInvitesAgencyTable from './PenfingInvitesAgencyTable';
import PenfingInvitesSpecialistTable from './PenfingInvitesSpecialistTable';

const DialogPandingInvites = ({ handleCloseDialogPendingInvites, pendingMembers, handleDeletePeningInvite }: any) => {
    const theme = useTheme();
    const [valueTabs, setValueTabs] = React.useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValueTabs(newValue);
    };
    return (
        <Box sx={{ p: '5px 20px', borderRadius: '16px', minWidth: { xs: '350px', sm: '562px' } }}>
            <Grid container justifyContent="space-between" alignItems="center">
                <Grid item xs={6}>
                    <Typography ml={1} sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 500, fontSize: '16px' }}>
                        <FormattedMessage id="pending_invites" />
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        {' '}
                        <CloseIcon
                            onClick={handleCloseDialogPendingInvites}
                            sx={{ fontSize: '20px', fill: '#9197AE', cursor: 'pointer' }}
                        />
                    </Box>
                </Grid>
            </Grid>
            <Box mb={3} sx={{ borderBottom: `1px solid ${theme.palette.grey[500]}` }}>
                <Tabs
                    value={valueTabs}
                    onChange={handleChange}
                    aria-label="wrapped label tabs example"
                    sx={{ '.MuiTabs-flexContainer': { borderBottom: 'none' } }}
                >
                    <Tab sx={{ minWidth: '30px' }} label={<FormattedMessage id="in_agency" />} />
                    <Tab label={<FormattedMessage id="specialist" />} />
                </Tabs>
            </Box>
            {valueTabs === 0 ? (
                <Box>
                    <PenfingInvitesAgencyTable item={pendingMembers} handleDelete={handleDeletePeningInvite} />
                    <Typography
                        mt={4}
                        pb={4}
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
                        <FormattedMessage id="end_of_page" /> - {pendingMembers?.length} <FormattedMessage id="results" />
                    </Typography>
                </Box>
            ) : (
                <Box>
                    <PenfingInvitesSpecialistTable item={pendingMembers} />
                    <Typography
                        mt={4}
                        pb={4}
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
                        <FormattedMessage id="end_of_page" /> - {pendingMembers?.length} <FormattedMessage id="results" />
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default DialogPandingInvites;
