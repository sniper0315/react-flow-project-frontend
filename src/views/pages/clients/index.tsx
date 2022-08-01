import { Typography, Box, Breadcrumbs, Grid, Dialog, CircularProgress } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import React, { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import ButtonCustom from 'ui-component/extended/Button';
import NotFoundImg from 'ui-component/Offer';
import EnhancedTable from './ClientsTable';
import DialogAddClient from './DialogAddClient';
import CLientDetails from './CLientDetails';
import { Link } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { GET_CLIENTS } from 'services/graphQL/queries';
import { ClientType } from 'types/clients';
import { setClientList as setClientListAction } from 'store/slices/clients';
import { useDispatch } from 'react-redux';
import useLocalStorage from 'hooks/useLocalStorage';
import { useSelector } from 'store';

type ClientOrgMemberType = {
    id: string;
    organization_id: string;
    status: string;
    updated_at: string;
    user_id: string;
    user: {
        first_name: string;
        last_name: string;
        email: string;
        phone: string;
        image_url: string;
    };
};

type ClientOrgType = {
    agency_id: string;
    address_id: string;
    id: string;
    name: string;
    created_at: string;
    members: ClientOrgMemberType[];
    client_relevant_links: any;
};

const formatData = (clientOrgs: ClientOrgType[]) => {
    const formattedData: ClientType[] = [];
    clientOrgs?.map((clientOrg) =>
        clientOrg?.members?.map((clientOrgMember: ClientOrgMemberType) => {
            const clientData = {
                id: clientOrg.id,
                agencyId: clientOrg.agency_id,
                name: { title: clientOrg.name },
                email: clientOrgMember.user.email,
                contactName: `${clientOrgMember.user.first_name} ${clientOrgMember.user.last_name}`,
                phoneNumber: clientOrgMember.user.phone,
                lang: 'English',
                description: 'Test description',
                date: clientOrg.created_at,
                links: clientOrg.client_relevant_links
            };
            formattedData.push(clientData);
        })
    );
    return formattedData;
};

const testOrgId = 'e4d49bee-2000-49e8-a953-b3b15e24698d';

const Clients = () => {
    const theme = useTheme();
    const [openDialogAddClient, setOpenDialogAddClient] = React.useState(false);
    const [clientDetail, setClientDetail] = React.useState(false);
    // const [clientList, setClientList] = React.useState<any>();
    const [selectedClient, setSelectedClient] = React.useState<any>();
    const dispatch = useDispatch();
    const { clientList } = useSelector((state) => state.clients);

    const [userInfo, setUserInfo] = useLocalStorage('User-info', {
        organizationId: ''
    });

    const handleClickOpenDialogAddClient = () => {
        setOpenDialogAddClient(true);
    };

    const handleCloseDialogAddClient = () => {
        setOpenDialogAddClient(false);
    };
    const handleClient = (client: any) => {
        setSelectedClient(client);
        setClientDetail(true);
    };

    const [requestClientOrgsById, { data, loading: clientOrgsFetchLoading, error: clientOrgsFetchError }] = useLazyQuery(GET_CLIENTS);

    useEffect(() => {
        setUserInfo({ ...userInfo, organizationId: testOrgId });
        requestClientOrgsById({ variables: { organizationId: testOrgId } });
    }, []);

    React.useEffect(() => {
        const clientOrgs = data?.client_organizations ?? [];
        if (clientOrgs) {
            const formattedData = formatData(clientOrgs);
            dispatch(setClientListAction(formattedData));
        }
    }, [data]);

    return (
        <Box>
            {clientDetail ? (
                <CLientDetails />
            ) : (
                <Box>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link className="link" to="/">
                            <FormattedMessage id="venly" />
                        </Link>
                        <Typography
                            sx={{ textTransform: 'capitalize', color: theme.palette.grey[300], fontFamily: 'Inter', fontWeight: 500 }}
                        >
                            <FormattedMessage id="clients" />
                        </Typography>
                    </Breadcrumbs>
                    <Grid mt={2} mb={3} container alignItems="center">
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
                                <FormattedMessage id="clients" />
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Box sx={{ width: '146px' }}>
                                    <ButtonCustom
                                        onClick={handleClickOpenDialogAddClient}
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
                                                <Typography sx={{ fontWeight: 500, fontFamily: 'Inter' }}>
                                                    <FormattedMessage id="add_client" />
                                                </Typography>
                                            </Box>
                                        }
                                        colorBtn="red"
                                    />
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                    {clientOrgsFetchLoading ? (
                        <Box mt={10} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <>
                            {clientList?.length ? (
                                <Box>
                                    <EnhancedTable item={clientList} handleClient={handleClient} />
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
                                        <FormattedMessage id="end_of_page" /> - {clientList?.length} <FormattedMessage id="results" />
                                    </Typography>
                                </Box>
                            ) : (
                                <Box sx={{ width: '315px', m: '15% auto 0' }}>
                                    <NotFoundImg title={<FormattedMessage id="no_clients_found" />} />
                                </Box>
                            )}
                        </>
                    )}
                    <Dialog
                        sx={{ '.MuiDialog-paper': { minWidth: { xs: '350px', sm: '562px' } } }}
                        open={openDialogAddClient}
                        onClose={handleCloseDialogAddClient}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogAddClient handleCloseDialogAddClient={handleCloseDialogAddClient} item={clientList && clientList[0]} />
                    </Dialog>
                </Box>
            )}
        </Box>
    );
};

export default Clients;
