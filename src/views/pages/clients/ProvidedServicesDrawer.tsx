import { Box, Drawer, Typography, Grid, Avatar, Dialog } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { useTheme } from '@mui/material/styles';
import ButtonCustom from 'ui-component/extended/Button';
import CloseIcon from '@mui/icons-material/Close';
import moment from 'moment';
import DIalogCongirm from 'ui-component/dialogConfirm';
import React from 'react';
import AutoCompliteClients from './AutocompleteClients';
import { ProjectMemberType } from 'types/clients';

interface DrawerAddOffersProps {
    openDivider: any;
    handleClickCloseDivider: any;
    item?: any;
    autocompleteItems?: any;
}

const ProvidedServicesDrawer = ({ openDivider, handleClickCloseDivider, item, autocompleteItems }: DrawerAddOffersProps) => {
    const theme = useTheme();
    const [pendingValue, setPendingValue] = React.useState<ProjectMemberType[]>([]);
    const TeamContainer = ({ client, index }: any) => {
        const [openDialog, setOpenDialog] = React.useState(false);

        const handleCloseDialog = () => {
            setOpenDialog(false);
        };
        const handleClickOpen = () => {
            setOpenDialog(true);
        };
        return (
            <Grid mt={2} key={index + 1} container justifyContent="space-between" alignItems="center">
                <Grid item xs={6} sx={{ display: 'flex' }}>
                    <Box>
                        <Avatar sx={{ width: '32px', height: '32px' }} alt="Remy Sharp" src={client.src} />
                    </Box>
                    <Box ml={1}>
                        <Typography sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 500 }}>{client.name}</Typography>
                        <Typography
                            sx={{
                                color: theme.palette.grey[400],
                                fontFamily: 'Inter',
                                fontWeight: 400,
                                fontSize: '12px'
                            }}
                        >
                            {client.name}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Box
                        onClick={handleClickOpen}
                        sx={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '100px',
                            background: theme.palette.grey[700],
                            cursor: 'pointer'
                        }}
                    >
                        <Box
                            sx={{
                                width: '16px',
                                height: '16px',
                                borderRadius: '100px',
                                border: `2px solid ${theme.palette.grey[400]}`,
                                m: '8px'
                            }}
                        >
                            <Typography
                                sx={{
                                    color: theme.palette.grey[400],
                                    fontFamily: 'Inter',
                                    fontWeight: 600,
                                    fontSize: '18px',
                                    m: '-7px 0 0 2px'
                                }}
                            >
                                -
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
                <Dialog onClose={handleCloseDialog} open={openDialog}>
                    <DIalogCongirm onConfirm={handleCloseDialog} onClose={handleCloseDialog} />
                </Dialog>
            </Grid>
        );
    };
    return (
        <Drawer anchor="right" open={openDivider} onClose={handleClickCloseDivider}>
            {item && (
                <Box sx={{ width: { xs: '100%', sm: '562px' } }}>
                    <Grid container direction="column" justifyContent="space-between" sx={{ height: { xs: '100%', xl: '100vh' } }}>
                        <Grid p={3} item>
                            <Grid container justifyContent="space-between" alignItems="center">
                                <Grid item xs={10}>
                                    <Typography
                                        ml={1}
                                        sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 500, fontSize: '16px' }}
                                    >
                                        <FormattedMessage id="provided_service_name" />
                                    </Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        {' '}
                                        <CloseIcon
                                            onClick={handleClickCloseDivider}
                                            sx={{ fontSize: '20px', fill: '#9197AE', cursor: 'pointer' }}
                                        />
                                    </Box>
                                </Grid>
                            </Grid>
                            <Grid
                                mt={4}
                                container
                                justifyContent="space-between"
                                alignItems="center"
                                sx={{ borderBottom: `1px solid ${theme.palette.grey[500]}`, pb: '15px' }}
                            >
                                <Grid item xs={6}>
                                    <Box sx={{ display: 'flex' }}>
                                        <Box sx={{ display: 'flex' }}>
                                            {item.clients.map(
                                                (client: any, indexClient: number) =>
                                                    indexClient < 3 && (
                                                        <Box
                                                            key={indexClient + 1}
                                                            sx={{ width: '32px', mr: indexClient + 1 > 0 ? '-12px' : 0 }}
                                                        >
                                                            <Avatar
                                                                sx={{ width: '32px', height: '32px' }}
                                                                alt="Remy Sharp"
                                                                src={client.src}
                                                            />
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
                                                    {`+${item.clients.length - 3}`}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box sx={{ borderRight: `1px solid ${theme.palette.grey[500]}`, m: '0 5px' }}>
                                            <Typography
                                                sx={{
                                                    color: theme.palette.grey[500],
                                                    fontFamily: 'Inter',
                                                    fontWeight: 600,
                                                    display: 'none'
                                                }}
                                            >
                                                a
                                            </Typography>
                                        </Box>
                                        <Box
                                            sx={{
                                                width: '32px',
                                                height: '32px',
                                                borderRadius: '100px',
                                                background: theme.palette.grey[700],
                                                cursor: 'pointer'
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    color: theme.palette.grey[400],
                                                    fontFamily: 'Inter',
                                                    fontWeight: 300,
                                                    fontSize: '30px',
                                                    m: '-6px 0 0 6px'
                                                }}
                                            >
                                                +
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography
                                        sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 600, textAlign: 'right' }}
                                    >
                                        {moment(item.date).format('DD MMMM, YYYY')}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Typography mt={3} sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 600 }}>
                                <FormattedMessage id="description" />
                            </Typography>
                            <Typography
                                mt={3}
                                sx={{
                                    color: theme.palette.grey[400],
                                    fontFamily: 'Inter',
                                    fontWeight: 400,
                                    borderBottom: `1px solid ${theme.palette.grey[500]}`,
                                    pb: '15px'
                                }}
                            >
                                {item.description}
                            </Typography>
                            <Typography mt={4} sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 600 }}>
                                <FormattedMessage id="team_members" />
                            </Typography>
                            <Box
                                mt={2}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    borderBottom: `1px solid ${theme.palette.grey[500]}`,
                                    pb: '15px'
                                }}
                            >
                                <AutoCompliteClients
                                    labels={autocompleteItems}
                                    pendingValue={pendingValue}
                                    setPendingValue={setPendingValue}
                                />
                                <Typography ml={2} sx={{ color: theme.palette.grey[300], fontFamily: 'Inter', fontWeight: 500 }}>
                                    <FormattedMessage id="add_team_member" />
                                </Typography>
                            </Box>
                            <Box mt={4}>
                                {item.clients.map((client: any, index: number) => (
                                    <TeamContainer client={client} index={index} />
                                ))}
                            </Box>
                        </Grid>
                        <Grid
                            item
                            container
                            direction="column"
                            justifyContent="flex-end"
                            alignItems="flex-end"
                            sx={{ borderTop: `1px solid ${theme.palette.grey[500]}` }}
                        >
                            <Grid item p={2}>
                                <Box sx={{ display: 'flex' }}>
                                    <Box mr={2} sx={{ width: '87px' }}>
                                        <ButtonCustom
                                            onClick={handleClickCloseDivider}
                                            colorBtn="white"
                                            titleBtn={<FormattedMessage id="close" />}
                                        />
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            )}
        </Drawer>
    );
};

export default ProvidedServicesDrawer;
