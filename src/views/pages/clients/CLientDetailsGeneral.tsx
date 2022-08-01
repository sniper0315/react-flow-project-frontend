import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Typography, Box, Grid, Dialog, CardMedia, Popover } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import edit2 from '../../../assets/images/edit2.svg';
import deleteIcon from '../../../assets/images/deleteIcon.svg';
import DilogEditLinks from './DilogEditLinks';
import DIalogCongirm from 'ui-component/dialogConfirm';
import { IconLink } from '@tabler/icons';
import { useSelector, useDispatch } from 'store';
import { DELETE_CLIENT_RELEVANT_LINKS_BY_PK } from 'services/graphQL/mutations';
import { useMutation } from '@apollo/client';
import { setCurrentClient } from 'store/slices/clients';

const CLientDetailsGeneral = ({ details }: any) => {
    const theme = useTheme();
    const [openDialogLinksAdd, setOpenDialogLinksAdd] = React.useState(false);

    const dispatch = useDispatch();
    const { currentClient } = useSelector((state) => state.clients);

    const handleClickOpenDialogLinksAdd = () => {
        setOpenDialogLinksAdd(true);
    };

    const handleCloseDialogLinksAdd = () => {
        setOpenDialogLinksAdd(false);
    };
    const LinksContainer = ({ item }: any) => {
        const [anchorEl, setAnchorEl] = React.useState<any>(null);
        const [stateLink, setStateLink] = React.useState<any>();
        const [openDialogLinks, setOpenDialogLinks] = React.useState(false);
        const [openDialogConfirm, setOpenDialogConfirm] = React.useState(false);

        const [deleteClientLink] = useMutation(DELETE_CLIENT_RELEVANT_LINKS_BY_PK, {
            onCompleted: (data: any) => {
                const links = currentClient.links && currentClient.links.filter((link) => link.id !== item.id);
                let updatedCurClient = {};
                updatedCurClient = { ...currentClient, links };
                dispatch(setCurrentClient(updatedCurClient));
                handleCloseDialogConfirm();
            },
            onError: (error: any) => {
                console.log(error);
            }
        });

        const handleClickOpenDialogLinks = (itemLink: any) => {
            if (itemLink) setStateLink(itemLink);
            setOpenDialogLinks(true);
            handleClosePopover();
        };

        const handleCloseDialogLinks = () => {
            setOpenDialogLinks(false);
        };
        const handleClickOpenDialogConfirm = () => {
            setOpenDialogConfirm(true);
            handleClosePopover();
        };

        const handleCloseDialogConfirm = () => {
            setOpenDialogConfirm(false);
        };

        const handleDeleteConfirmDialog = () => {
            deleteClientLink({
                variables: {
                    id: item.id
                }
            });
        };

        const handleClickPopover = (event: any) => {
            setAnchorEl(event.currentTarget);
        };
        const handleClosePopover = () => {
            setAnchorEl(null);
        };
        const openPopover = Boolean(anchorEl);
        const id = openPopover ? 'simple-popover' : undefined;

        return (
            <Grid mt={2} key={item.name} container justifyContent="space-between">
                <Grid item sx={{ display: 'flex' }}>
                    <Box sx={{ width: '18px', mr: '5px' }}>
                        {item.src ? (
                            <CardMedia sx={{ objectFit: 'contain' }} component="img" width="18px" image={item.src} alt="alt image" />
                        ) : (
                            <IconLink />
                        )}
                    </Box>
                    <Box>
                        <Typography
                            sx={{
                                textTransform: 'capitalize',
                                color: theme.palette.grey[400],
                                fontFamily: 'Inter',
                                fontWeight: 500
                            }}
                        >
                            {item.name}
                        </Typography>
                        <Typography
                            sx={{
                                color: theme.palette.grey[400],
                                fontFamily: 'Inter',
                                fontWeight: 500,
                                fontSize: '12px'
                            }}
                        >
                            {item.link}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Typography
                        aria-describedby={id}
                        onClick={handleClickPopover}
                        sx={{
                            color: theme.palette.grey[400],
                            fontFamily: 'Inter',
                            fontWeight: 600,
                            fontSize: '26px',
                            m: '-10px 0px 0 0',
                            cursor: 'pointer',
                            zIndex: 111
                        }}
                    >
                        ...
                    </Typography>
                    <Popover
                        id={id}
                        open={openPopover}
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
                        <Box sx={{ p: '20px' }}>
                            <Box
                                onClick={() => handleClickOpenDialogLinks(item)}
                                sx={{ display: 'flex', cursor: 'pointer', alignItems: 'center' }}
                            >
                                <Box sx={{ width: '18px' }}>
                                    <CardMedia sx={{ objectFit: 'contain' }} component="img" width="18px" image={edit2} alt="alt image" />
                                </Box>
                                <Typography
                                    sx={{
                                        textTransform: 'capitalize',
                                        color: theme.palette.grey[400],
                                        fontFamily: 'Inter',
                                        fontWeight: 500,
                                        fontSize: '14px',
                                        ml: '12px'
                                    }}
                                >
                                    <FormattedMessage id="edit" />
                                </Typography>
                            </Box>
                            <Box
                                onClick={handleClickOpenDialogConfirm}
                                sx={{ display: 'flex', cursor: 'pointer', alignItems: 'center', mt: '20px', ml: '2px' }}
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
                </Grid>
                <Dialog
                    sx={{ '.MuiDialog-paper': { minWidth: { xs: '350px', sm: '562px' } } }}
                    open={openDialogLinks}
                    onClose={handleCloseDialogLinks}
                    aria-labelledby="alert-dialog-title2"
                    aria-describedby="alert-dialog-description2"
                >
                    <DilogEditLinks handleCloseDialogLinks={handleCloseDialogLinks} item={stateLink} />
                </Dialog>
                <Dialog
                    sx={{ '.MuiDialog-paper': { minWidth: { xs: '350px', sm: '562px' } } }}
                    open={openDialogConfirm}
                    onClose={handleCloseDialogConfirm}
                    aria-labelledby="alert-dialog-title2"
                    aria-describedby="alert-dialog-description2"
                >
                    <DIalogCongirm onConfirm={handleDeleteConfirmDialog} onClose={handleCloseDialogConfirm} />
                </Dialog>
            </Grid>
        );
    };
    return (
        <Grid mt={1} container spacing={4}>
            <Grid item xs={12} sm={8}>
                <Box mb={1} sx={{ borderBottom: `1px solid ${theme.palette.grey[500]}` }}>
                    <Typography
                        mt={2}
                        sx={{
                            textTransform: 'uppercase',
                            color: theme.palette.grey[600],
                            fontFamily: 'Inter',
                            fontWeight: 500,
                            letterSpacing: '0.12em',
                            fontSize: '10px'
                        }}
                    >
                        <FormattedMessage id="contact_point_name" />
                    </Typography>
                    <Typography
                        mt={1}
                        mb={2}
                        sx={{
                            color: theme.palette.grey[400],
                            fontFamily: 'Inter',
                            fontWeight: 500
                        }}
                    >
                        {details.contactName}
                    </Typography>
                </Box>
                <Grid sx={{ borderBottom: `1px solid ${theme.palette.grey[500]}` }} container spacing={2}>
                    <Grid item xs={6}>
                        <Typography
                            mt={2}
                            sx={{
                                textTransform: 'uppercase',
                                color: theme.palette.grey[600],
                                fontFamily: 'Inter',
                                fontWeight: 500,
                                letterSpacing: '0.12em',
                                fontSize: '10px'
                            }}
                        >
                            <FormattedMessage id="email" />
                        </Typography>
                        <Typography
                            mt={1}
                            mb={2}
                            sx={{
                                color: theme.palette.grey[400],
                                fontFamily: 'Inter',
                                fontWeight: 500
                            }}
                        >
                            {details.email}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography
                            mt={2}
                            sx={{
                                textTransform: 'uppercase',
                                color: theme.palette.grey[600],
                                fontFamily: 'Inter',
                                fontWeight: 500,
                                letterSpacing: '0.12em',
                                fontSize: '10px'
                            }}
                        >
                            <FormattedMessage id="phone_number" />
                        </Typography>
                        <Typography
                            mt={1}
                            mb={2}
                            sx={{
                                color: theme.palette.grey[400],
                                fontFamily: 'Inter',
                                fontWeight: 500
                            }}
                        >
                            {details.phoneNumber}
                        </Typography>
                    </Grid>
                </Grid>
                <Box mt={3} mb={1} sx={{ borderBottom: `1px solid ${theme.palette.grey[500]}` }}>
                    <Typography
                        mt={2}
                        sx={{
                            textTransform: 'uppercase',
                            color: theme.palette.grey[600],
                            fontFamily: 'Inter',
                            fontWeight: 500,
                            letterSpacing: '0.12em',
                            fontSize: '10px'
                        }}
                    >
                        <FormattedMessage id="main_communication_language" />
                    </Typography>
                    <Typography
                        mt={1}
                        mb={2}
                        sx={{
                            color: theme.palette.grey[400],
                            fontFamily: 'Inter',
                            fontWeight: 500
                        }}
                    >
                        {details.lang}
                    </Typography>
                </Box>
                <Box mt={1} sx={{ borderBottom: `1px solid ${theme.palette.grey[500]}` }}>
                    <Typography
                        mt={3}
                        sx={{
                            textTransform: 'uppercase',
                            color: theme.palette.grey[600],
                            fontFamily: 'Inter',
                            fontWeight: 500,
                            letterSpacing: '0.12em',
                            fontSize: '10px'
                        }}
                    >
                        <FormattedMessage id="description" />
                    </Typography>
                    <Typography
                        mt={1}
                        mb={2}
                        sx={{
                            color: theme.palette.grey[400],
                            fontFamily: 'Inter',
                            fontWeight: 500
                        }}
                    >
                        {details.description}
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
                <Box
                    sx={{
                        border: `1px solid ${theme.palette.grey[500]}`,
                        p: '27px 24px',
                        boxShadow: '0px 10px 16px rgba(0, 0, 0, 0.05)',
                        borderRadius: '8px'
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography
                            sx={{
                                textTransform: 'uppercase',
                                color: theme.palette.grey[600],
                                fontFamily: 'Inter',
                                fontWeight: 500,
                                letterSpacing: '0.12em',
                                fontSize: '10px'
                            }}
                        >
                            <FormattedMessage id="relevant_links" />
                        </Typography>
                        <Typography
                            onClick={handleClickOpenDialogLinksAdd}
                            sx={{
                                color: theme.palette.grey[400],
                                fontFamily: 'Inter',
                                fontWeight: 500,
                                fontSize: '20px',
                                mt: '-8px',
                                cursor: 'pointer'
                            }}
                        >
                            +
                        </Typography>
                    </Box>
                    {details.links.map((item: any, index: number) => (
                        <LinksContainer item={item} key={index} />
                    ))}
                </Box>
            </Grid>
            <Dialog
                sx={{ '.MuiDialog-paper': { minWidth: { xs: '350px', sm: '562px' } } }}
                open={openDialogLinksAdd}
                onClose={handleCloseDialogLinksAdd}
                aria-labelledby="alert-dialog-title2"
                aria-describedby="alert-dialog-description2"
            >
                <DilogEditLinks handleCloseDialogLinks={handleCloseDialogLinksAdd} />
            </Dialog>
        </Grid>
    );
};

export default CLientDetailsGeneral;
