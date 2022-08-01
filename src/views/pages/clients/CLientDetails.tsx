/* eslint-disable no-nested-ternary */
import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useLazyQuery } from '@apollo/client';

import { Typography, Box, Breadcrumbs, Grid, Dialog, Avatar, CardMedia, Tabs, Tab, linkClasses, CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import ButtonCustom from 'ui-component/extended/Button';
import DialogAddClient from './DialogAddClient';
import CLientDetailsGeneral from './CLientDetailsGeneral';
import EditClientDrawer from './EditClientDrawer';
import DialogCrop from './DialogCrop';

import { GET_SPECIFIC_CLIENT, GET_PROJECTS } from 'services/graphQL';
import { useDispatch, useSelector } from 'store';
import { ProjectMemberType, ProjectType, RelevantLinkType } from 'types/clients';

import edit from '../../../assets/images/edit.svg';
import editWhite from '../../../assets/images/editWhite.svg';
import AutoCompliteClients from './AutocompleteClients';
import imgOffers1 from '../../../assets/images/imgOffers1.svg';
import { setCurrentClient } from 'store/slices/clients';
import ClientProvidedServices from './clientProvidedService';

interface LabelType {
    title: string;
    src?: string;
}

type ReleavantLinkUIType = {
    id: string;
    name: string;
    src: string;
    link: string;
};

const formatProjectData = (fetchedData: any[]) => {
    const formattedData: ProjectType[] = [];

    fetchedData.map((data) => {
        const projectUsers: ProjectMemberType[] = data.project_users.map((project_user: any) => ({
            projectId: project_user.project_id,
            orgMemberId: project_user.organization_members_id,
            icon: project_user.organization_member.user.image_url,
            firstName: project_user.organization_member.user.first_name
        }));

        const projectData = {
            id: data.id,
            name: data.name,
            description: data.offer.description,
            clients: [],
            src: data.offer.image_url,
            status: data.status === 'ACTIVE',
            date: data.created_at,
            teamMembers: projectUsers
        };
        formattedData.push(projectData);
    });

    return formattedData;
};
const CLientDetails = () => {
    const theme = useTheme();
    const [openDialogAddClient, setOpenDialogAddClient] = React.useState(false);
    const [openDialogCrop, setOpenDialogCrop] = React.useState(false);
    const [valueTabs, setValueTabs] = React.useState(0);
    const [openDivider, setOpenDivider] = React.useState(false);
    const [details, setDetails] = React.useState<any>();
    const [imageCrop, setImageCrop] = React.useState('');
    const [pendingValue, setPendingValue] = React.useState<LabelType[]>([]);
    const [requestClientById, { data: clientDetailData, error: clientFetchError, loading: clientFetchLoading }] =
        useLazyQuery(GET_SPECIFIC_CLIENT);
    const [requestProjects, { data: projectsData, error: projectsFetchError, loading: projectFetchLoading }] = useLazyQuery(GET_PROJECTS);
    const dispatch = useDispatch();
    const { currentClient, clientList } = useSelector((state) => state.clients);
    const currentAgencyId = JSON.parse(localStorage.getItem('User-info') as string).organizationId;

    const handleClickCloseDivider = () => {
        setOpenDivider(false);
    };
    const handleOpenDivider = () => {
        setOpenDivider(true);
    };
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValueTabs(newValue);
    };

    const pathname = window.location.pathname.split(':')[1];

    React.useEffect(() => {
        requestClientById({ variables: { clientOrganizationId: pathname } });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
        const clientData = clientDetailData?.client_organizations_by_pk;
        requestProjects({ variables: { organizationId: currentAgencyId } });

        if (clientData && projectsData) {
            const formattedProjects = formatProjectData(projectsData?.projects);
            // dispatch();
            const clientLinks: ReleavantLinkUIType[] = [];
            clientData.client_relevant_links &&
                clientData?.client_relevant_links.map((relevantLink: RelevantLinkType) => {
                    clientLinks.push({ id: relevantLink.id, name: relevantLink.title, src: relevantLink.icon, link: relevantLink.url });
                });

            const itemDetails = {
                id: clientData.id,
                agencyId: clientData.agency_id,
                name: { title: clientData.name, src: '' },
                email: clientData.members[0]?.user.email,
                contactName: `${clientData.members && clientData.members[0]?.user.first_name} ${clientData.members[0]?.user.last_name}`,
                phoneNumber: clientData.members && clientData.members[0]?.user.phone,
                description: 'Client general information description',
                date: clientData.members && clientData.members[0]?.user.phone,
                links: clientLinks,
                providedServices: formattedProjects
            };
            // setDetails(itemDetails);
            dispatch(setCurrentClient(itemDetails));
        }
    }, [clientDetailData, projectsData, pathname, requestClientById, requestProjects]);

    React.useEffect(() => {
        setDetails(currentClient);
    }, [currentClient]);

    const handleClickOpenDialogAddClient = () => {
        setOpenDialogAddClient(true);
    };

    const handleCloseDialogAddClient = () => {
        setOpenDialogAddClient(false);
    };
    const handleClickOpenDialogCrop = (image: any) => {
        setImageCrop(image);
        setOpenDialogCrop(true);
    };

    const handleCloseDialogCrop = () => {
        setOpenDialogCrop(false);
    };
    const autocompleteItems = [{ title: 'Team member name' }, { title: 'T2222' }];
    return (
        <Box>
            <Breadcrumbs aria-label="breadcrumb">
                <Link to="/" className="link">
                    <FormattedMessage id="venly" />
                </Link>
                <Link className="link" to="/clients">
                    <FormattedMessage id="clients" />
                </Link>
                <Typography sx={{ textTransform: 'capitalize', color: theme.palette.grey[300], fontFamily: 'Inter', fontWeight: 500 }}>
                    {details?.name?.title}
                </Typography>
            </Breadcrumbs>
            <Grid mt={3} mb={2} container alignItems="center">
                <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box mr={2} sx={{ width: '64px', position: 'relative' }}>
                            <Avatar sx={{ width: '64px', height: '64px' }} alt="Remy Sharp" src={details?.name.src} />
                            <Box
                                onClick={() => handleClickOpenDialogCrop(details?.name.src)}
                                sx={{
                                    width: '24px',
                                    height: '24px',
                                    background: theme.palette.grey[700],
                                    borderRadius: '100px',
                                    border: '2px solid #fff',
                                    position: 'absolute',
                                    bottom: 0,
                                    right: 0,
                                    cursor: 'pointer'
                                }}
                            >
                                <Box sx={{ width: '15px', m: '3px 0 0 3px' }}>
                                    <CardMedia sx={{ objectFit: 'contain' }} component="img" width="18px" image={edit} alt="alt image" />
                                </Box>
                            </Box>
                        </Box>
                        <Typography
                            sx={{
                                textTransform: 'capitalize',
                                color: theme.palette.grey[400],
                                fontSize: '24px',
                                fontWeight: 500,
                                fontFamily: 'Inter'
                            }}
                        >
                            {details?.name?.title}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-end' }, mt: { xs: '20px', sm: 0 } }}>
                        {valueTabs === 0 ? (
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
                                                <CardMedia
                                                    sx={{ objectFit: 'contain' }}
                                                    component="img"
                                                    width="18px"
                                                    image={editWhite}
                                                    alt="alt image"
                                                />
                                            </Typography>
                                            <Typography sx={{ fontWeight: 500, fontFamily: 'Inter' }}>
                                                <FormattedMessage id="edit_client" />
                                            </Typography>
                                        </Box>
                                    }
                                    colorBtn="red"
                                />
                            </Box>
                        ) : (
                            <AutoCompliteClients
                                labels={autocompleteItems}
                                buttonOpen
                                pendingValue={pendingValue}
                                setPendingValue={setPendingValue}
                                width
                            />
                        )}
                    </Box>
                </Grid>
            </Grid>
            <Box sx={{ borderBottom: `1px solid ${theme.palette.grey[500]}` }}>
                <Tabs
                    value={valueTabs}
                    onChange={handleChange}
                    aria-label="wrapped label tabs example"
                    sx={{ '.MuiTabs-flexContainer': { borderBottom: 'none' } }}
                >
                    <Tab sx={{ minWidth: '30px' }} label={<FormattedMessage id="general_information" />} />
                    <Tab label={<FormattedMessage id="provided_services" />} />
                </Tabs>
            </Box>
            {details && (
                <Box>
                    {clientFetchLoading || projectFetchLoading ? (
                        <Box mt={10} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <CircularProgress />
                        </Box>
                    ) : valueTabs === 0 ? (
                        <Box>
                            <CLientDetailsGeneral details={details} />
                        </Box>
                    ) : (
                        <Box mt={3}>
                            <ClientProvidedServices item={details.providedServices} />
                        </Box>
                    )}
                </Box>
            )}
            <Dialog
                open={openDialogAddClient}
                onClose={handleCloseDialogAddClient}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogAddClient handleCloseDialogAddClient={handleCloseDialogAddClient} />{' '}
            </Dialog>
            <Dialog
                open={openDialogCrop}
                onClose={handleCloseDialogAddClient}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogCrop handleCloseDialogCrop={handleCloseDialogCrop} url={imageCrop} />{' '}
            </Dialog>
            <EditClientDrawer openDivider={openDivider} handleClickCloseDivider={handleClickCloseDivider} item={details} />
        </Box>
    );
};

export default CLientDetails;
