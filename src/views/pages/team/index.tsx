import { Typography, Box, Breadcrumbs, Grid, Tabs, Tab, CardMedia, Popover, Dialog, CircularProgress } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import React from 'react';
import { useTheme } from '@mui/material/styles';
import ButtonCustom from 'ui-component/extended/Button';
import NotFoundImg from 'ui-component/Offer';
import shuffle from '../../../assets/images/shuffle.svg';
import user from '../../../assets/images/user.svg';
import award from '../../../assets/images/award.svg';
import TeamTable from './TeamTable';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import DialogInviteTeamMember from './DialogInviteTeamMember';
import DialogRequstSpecialist from './DialogRequstSpecialist';
import DialogPandingInvites from './DialogPandingInvites';
import { GET_TEAMS, GET_PENDING_MEMBERS } from '../../../services/graphQL/queries/teams';
import { useLazyQuery, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { ADD_MEMBER_DEV, CANCEL_INVITE } from '../../../services/graphQL/mutations/team/teamMutations';

const Team = () => {
    const theme = useTheme();

    const [openDivider, setOpenDivider] = React.useState(false);
    const [itemsTeam, setItemsTeam] = React.useState<any>();
    const [pendingMembers, setPendingMembers] = React.useState<any>();
    const [valueTabs, setValueTabs] = React.useState(0);
    const [organizationId, setOrganizationId] = React.useState('');
    const [anchorEl, setAnchorEl] = React.useState<any>(null);
    const [openDialogInvite, setOpenDialogInvite] = React.useState(false);
    const [openDialogSpecialist, setOpenDialogSpecialist] = React.useState(false);
    const [openDialogPendingInvites, setOpenDialogPendingInvites] = React.useState(false);

    const [fetchTeam, { data: dataFetchTeam, loading: loadingFetchTeam, error: errorFetchTeam }] = useLazyQuery(GET_TEAMS, {
        onCompleted: (data) => {
            console.log('datadatadatadatadatadatadatadata', data);
            setOrganizationId(data.organizations[0]?.id);
            setItemsTeam(data.organizations[0]?.members);
        },
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first'
    });
    const [fetchPendingMembers, { loading: loadingFetchPendingMember, error: errorFetchPendingMember }] = useLazyQuery(
        GET_PENDING_MEMBERS,
        {
            onCompleted: (data) => {
                setPendingMembers(data.organizations[0]?.member_invites);
            },
            fetchPolicy: 'cache-and-network',
            nextFetchPolicy: 'cache-first'
        }
    );

    const [cancelInvite] = useMutation(CANCEL_INVITE, {
        onCompleted: (data: any) => {
            console.log('inviteMember', data);
        },
        onError: (error: any) => {
            console.log(error);
        }
    });
    const handleDeletePeningInvite = (itemPendingInvite: any) => {
        cancelInvite({
            variables: {
                email: itemPendingInvite.member_email,
                message: itemPendingInvite.message
            }
        });
    };

    React.useEffect(() => {
        // addMemberDev({
        //     variables: {
        //         organization_id: 'e4d49bee-2000-49e8-a953-b3b15e24698d',
        //         user_id: '3fbfa536-12a0-49db-b4cc-d539c3c6cd6d',
        //         role: 'CO_MANAGER'
        //     }
        // });
        fetchTeam();
        fetchPendingMembers();
    }, []);
    const handleClickOpenDialogInvite = () => {
        setOpenDialogInvite(true);
        handleClose();
    };

    const handleCloseDialogInvite = () => {
        setOpenDialogInvite(false);
    };
    const handleClickOpenDialogSpecialist = () => {
        setOpenDialogSpecialist(true);
        handleClose();
    };

    const handleCloseDialogSpecialist = () => {
        setOpenDialogSpecialist(false);
    };
    const handleClickOpenDialogPendingInvites = () => {
        setOpenDialogPendingInvites(true);
        handleClose();
    };

    const handleCloseDialogPendingInvites = () => {
        setOpenDialogPendingInvites(false);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const handleClickPopover = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValueTabs(newValue);
    };

    // React.useEffect(() => {
    //     setItemsTeam(items);
    // }, []);
    const handleClickCloseDivider = () => {
        setOpenDivider(false);
    };
    const handleOpenDivider = () => {
        setOpenDivider(true);
    };
    return (
        <Box>
            <Breadcrumbs aria-label="breadcrumb">
                <Link className="link" to="/">
                    <FormattedMessage id="venly" />
                </Link>
                <Typography sx={{ textTransform: 'capitalize', color: theme.palette.grey[300], fontFamily: 'Inter', fontWeight: 500 }}>
                    <FormattedMessage id="team" />
                </Typography>
            </Breadcrumbs>
            <Grid mt={2} mb={1} container alignItems="center">
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
                        <FormattedMessage id="team" />
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Box sx={{ width: { xs: '140px', sm: '99px' } }}>
                            <ButtonCustom
                                onClick={handleClickPopover}
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
                                        <Typography sx={{ fontWeight: 500, fontFamily: 'Inter', display: { xs: 'none', sm: 'block' } }}>
                                            <FormattedMessage id="invite" />
                                        </Typography>
                                        <Typography sx={{ fontWeight: 500, fontFamily: 'Inter', display: { xs: 'block', sm: 'none' } }}>
                                            <FormattedMessage id="invite_teams" />
                                        </Typography>
                                    </Box>
                                }
                                colorBtn="red"
                            />
                            <Popover
                                id={id}
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handleClose}
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
                                        onClick={handleClickOpenDialogInvite}
                                        sx={{ display: 'flex', cursor: 'pointer', alignItems: 'center' }}
                                    >
                                        <Box sx={{ width: '18px' }}>
                                            <CardMedia
                                                sx={{ objectFit: 'contain' }}
                                                component="img"
                                                width="18px"
                                                image={user}
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
                                            <FormattedMessage id="invite_team_member" />
                                        </Typography>
                                    </Box>
                                    <Box
                                        onClick={handleClickOpenDialogSpecialist}
                                        mt={2}
                                        sx={{ display: 'flex', cursor: 'pointer', alignItems: 'center' }}
                                    >
                                        <Box sx={{ width: '18px' }}>
                                            <CardMedia
                                                sx={{ objectFit: 'contain' }}
                                                component="img"
                                                width="18px"
                                                image={award}
                                                alt="alt image"
                                            />
                                        </Box>
                                        <Typography
                                            sx={{
                                                color: theme.palette.grey[400],
                                                fontFamily: 'Inter',
                                                fontWeight: 500,
                                                fontSize: '14px',
                                                ml: '12px'
                                            }}
                                        >
                                            <FormattedMessage id="request_specialist" />
                                        </Typography>
                                    </Box>
                                </Box>
                            </Popover>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Grid mb={3} container justifyContent="space-between" sx={{ borderBottom: `1px solid ${theme.palette.grey[500]}` }}>
                <Grid item xs={12} sm={6} sx={{ borderBottom: { xs: `1px solid ${theme.palette.grey[500]}`, sm: 'none' } }}>
                    <Tabs
                        value={valueTabs}
                        onChange={handleChange}
                        aria-label="wrapped label tabs example"
                        sx={{ '.MuiTabs-flexContainer': { borderBottom: 'none' } }}
                    >
                        <Tab sx={{ minWidth: '30px' }} label={<FormattedMessage id="all" />} />
                        <Tab label={<FormattedMessage id="in_agency" />} />
                        <Tab label={<FormattedMessage id="specialist" />} />
                    </Tabs>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box
                        onClick={handleClickOpenDialogPendingInvites}
                        sx={{
                            justifyContent: 'flex-end',
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer',
                            m: { xs: '8px 0', sm: '16px 0 0 0' }
                        }}
                    >
                        <Typography sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 500 }}>
                            <FormattedMessage id="pending_members" />
                        </Typography>
                        <Box ml={1} sx={{ width: '20px', height: '20px', background: theme.palette.orange.main, borderRadius: '100px' }}>
                            <Typography
                                sx={{
                                    color: theme.palette.background.paper,
                                    fontFamily: 'Inter',
                                    fontWeight: 500,
                                    fontSize: '12px',
                                    p: '3px 0 0 6px'
                                }}
                            >
                                2
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Grid mt={1} mb={3} container justifyContent="space-between" sx={{ display: { xs: 'none', sm: 'flex' } }}>
                <Grid item xs={6}>
                    <Box ml={1} sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <SearchSharpIcon sx={{ fill: theme.palette.grey[600] }} />
                        <Typography sx={{ color: theme.palette.grey[600], fontFamily: 'Inter', fontWeight: 500 }}>
                            <FormattedMessage id="search" />
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Box
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
                    </Box>
                </Grid>
            </Grid>
            {loadingFetchTeam ? (
                <Box mt={10} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Box>
                    {itemsTeam ? (
                        <Box>
                            <TeamTable item={itemsTeam} organizationId={organizationId} fetchTeam={fetchTeam} />
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
                                <FormattedMessage id="end_of_page" /> - {itemsTeam?.length} <FormattedMessage id="results" />
                            </Typography>
                        </Box>
                    ) : (
                        <Box sx={{ width: '315px', m: '15% auto 0' }}>
                            <NotFoundImg title={<FormattedMessage id="no_team_members" />} />
                        </Box>
                    )}
                </Box>
            )}

            <Dialog
                sx={{ '.MuiDialog-paper': { minWidth: { xs: '350px', sm: '562px' } } }}
                open={openDialogInvite}
                onClose={handleCloseDialogInvite}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogInviteTeamMember handleCloseDialogInvite={handleCloseDialogInvite} fetchTeam={fetchTeam} />{' '}
            </Dialog>
            <Dialog
                sx={{ '.MuiDialog-paper': { minWidth: { xs: '350px', sm: '562px' } } }}
                open={openDialogSpecialist}
                onClose={handleClickOpenDialogSpecialist}
                aria-labelledby="alert-dialog-title2"
                aria-describedby="alert-dialog-description2"
            >
                <DialogRequstSpecialist handleCloseDialogSpecialist={handleCloseDialogSpecialist} />{' '}
            </Dialog>
            <Dialog
                sx={{ '.MuiDialog-paper': { minWidth: { xs: '350px', sm: '562px' } } }}
                open={openDialogPendingInvites}
                onClose={handleCloseDialogPendingInvites}
                aria-labelledby="alert-dialog-title2"
                aria-describedby="alert-dialog-description2"
            >
                <DialogPandingInvites
                    handleCloseDialogPendingInvites={handleCloseDialogPendingInvites}
                    pendingMembers={pendingMembers}
                    handleDeletePeningInvite={handleDeletePeningInvite}
                />{' '}
            </Dialog>
        </Box>
    );
};

export default Team;
