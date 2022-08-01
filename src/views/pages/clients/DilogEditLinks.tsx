import { Typography, Box, Grid, TextField, CardMedia } from '@mui/material';
import { FormattedMessage, useIntl } from 'react-intl';
import React from 'react';
import { useTheme } from '@mui/material/styles';
import ButtonCustom from 'ui-component/extended/Button';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import clouds from '../../../assets/images/clouds.svg';
import { useDispatch, useSelector } from 'store';
import { useMutation } from '@apollo/client';
import { EDIT_CLIENT_RELEVANT_LINKS_BY_PK, INSERT_CLIENT_RELEVANT_LINKS_ONE } from 'services/graphQL/mutations';
import { setCurrentClient } from 'store/slices/clients';

interface DilogEditLinksProps {
    handleCloseDialogLinks: any;
    item?: any;
}

const DilogEditLinks = ({ handleCloseDialogLinks, item }: DilogEditLinksProps) => {
    const dispatch = useDispatch();
    const { currentClient } = useSelector((state) => state.clients);
    const [inviteSuccessful, setInviteSuccessful] = React.useState(false);
    const type = item ? 'EDIT' : 'ADD';
    console.log('currentClient', currentClient, item);
    const [insertNewClientLinks] = useMutation(INSERT_CLIENT_RELEVANT_LINKS_ONE, {
        onCompleted: (data: any) => {
            const newLink = data.insert_client_relevant_links_one;
            console.log('insert data', currentClient.links, newLink);
            const links = currentClient.links && [
                ...currentClient.links,
                { id: newLink.id, link: newLink.url, name: newLink.title, src: newLink.icon }
            ];
            const updatedCurrentClient = { ...currentClient, links };
            dispatch(setCurrentClient(updatedCurrentClient));
            handleCloseDialogLinks();
        },
        onError: (error: any) => {
            console.log(error);
        }
    });

    const [editClientLink] = useMutation(EDIT_CLIENT_RELEVANT_LINKS_BY_PK, {
        onCompleted: (data: any) => {
            currentClient &&
                currentClient.links &&
                currentClient.links.map((link) => {
                    console.log('edit link data', data, link);
                    if (link.id === data.id) {
                        link.title = data.title;
                        link.url = data.url;
                    }
                });
            dispatch(setCurrentClient(currentClient));
            handleCloseDialogLinks();
        },
        onError: (error: any) => {
            console.log(error);
        }
    });

    const theme = useTheme();
    const intl = useIntl();
    const formik = useFormik({
        initialValues: {
            linkName: '',
            linkUrl: ''
        },
        validationSchema: Yup.object({
            linkName: Yup.string().required('Required'),
            linkUrl: Yup.string().required('Required')
        }),
        onSubmit: (values) => {
            console.log('valuesvalues', values);
            if (type === 'ADD')
                insertNewClientLinks({
                    variables: {
                        agency_id: currentClient.agencyId,
                        client_id: currentClient.id,
                        title: values.linkName,
                        url: values.linkUrl
                    }
                });
            else if (type === 'EDIT')
                editClientLink({
                    variables: {
                        id: item.id,
                        title: values.linkName,
                        url: values.linkUrl
                    }
                });

            setInviteSuccessful(true);
        }
    });
    React.useEffect(() => {
        if (item) {
            formik.setFieldValue('linkName', item?.name);
            formik.setFieldValue('linkUrl', item?.link);
        }
    }, [item]);
    return (
        <Box sx={{ p: '5px 20px', borderRadius: '16px', width: { xs: '100%', sm: '562px' } }}>
            <Grid container justifyContent="space-between" alignItems="center">
                <Grid item xs={6}>
                    <Typography ml={1} sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 500, fontSize: '16px' }}>
                        {item ? <FormattedMessage id="edit_link" /> : <FormattedMessage id="add_link" />}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        {' '}
                        <CloseIcon onClick={handleCloseDialogLinks} sx={{ fontSize: '20px', fill: '#9197AE', cursor: 'pointer' }} />
                    </Box>
                </Grid>
            </Grid>
            <form onSubmit={formik.handleSubmit}>
                <Box mt={3}>
                    <TextField
                        sx={{
                            '.MuiOutlinedInput-input': {
                                color: theme.palette.grey[300],
                                fontWeight: 400,
                                fontFamily: 'Inter',
                                fontSize: '14px'
                            }
                        }}
                        id="linkName"
                        name="linkName"
                        value={formik.values.linkName}
                        onChange={formik.handleChange}
                        variant="outlined"
                        fullWidth
                        placeholder={intl.formatMessage({ id: 'link_name' })}
                        error={formik.touched.linkName && Boolean(formik.errors.linkName)}
                        helperText={formik.touched.linkName && formik.errors.linkName}
                    />
                </Box>
                <Box mt={3}>
                    <TextField
                        sx={{
                            '.MuiOutlinedInput-input': {
                                color: theme.palette.grey[300],
                                fontWeight: 400,
                                fontFamily: 'Inter',
                                fontSize: '14px'
                            }
                        }}
                        id="linkUrl"
                        name="linkUrl"
                        value={formik.values.linkUrl}
                        onChange={formik.handleChange}
                        variant="outlined"
                        fullWidth
                        placeholder={intl.formatMessage({ id: 'link_name' })}
                        error={formik.touched.linkUrl && Boolean(formik.errors.linkUrl)}
                        helperText={formik.touched.linkUrl && formik.errors.linkUrl}
                    />
                </Box>
                <Box mt={3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Box sx={{ width: item ? '155px' : '115px' }}>
                        <ButtonCustom
                            onClick={formik.handleSubmit}
                            colorBtn="red"
                            titleBtn={item ? <FormattedMessage id="save_changes" /> : <FormattedMessage id="add_link" />}
                        />
                    </Box>
                </Box>
            </form>
        </Box>
    );
};

export default DilogEditLinks;
