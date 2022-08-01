import { Typography, Box, Grid, TextField, CardMedia } from '@mui/material';
import { FormattedMessage, useIntl } from 'react-intl';
import React from 'react';
import { useTheme } from '@mui/material/styles';
import ButtonCustom from 'ui-component/extended/Button';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import clouds from '../../../assets/images/clouds.svg';
import { ADD_CLIENT } from 'services/graphQL/mutations';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'store';
import { addClientToList } from 'store/slices/clients';

const DialogAddClient = ({ handleCloseDialogAddClient }: any) => {
    const [inviteSuccessful, setInviteSuccessful] = React.useState(false);
    const theme = useTheme();
    const intl = useIntl();
    const dispatch = useDispatch();

    const [addClient] = useMutation(ADD_CLIENT, {
        onCompleted: (data: any) => {
            const { add_client } = data;
            const newClient = {
                id: add_client.organization.id,
                name: { title: add_client.organization.name },
                email: add_client.user.email,
                contactName: add_client.user.first_name,
                phoneNumber: add_client.user.phone,
                date: add_client.user.created_at,
                links: []
            };
            dispatch(addClientToList(newClient));
            handleCloseDialogAddClient();
        },
        onError: (error: any) => {
            console.log(error);
        }
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            brandName: '',
            contactName: '',
            phoneNumber: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email').required('Required'),
            brandName: Yup.string().required('Required'),
            contactName: Yup.string().required('Required'),
            phoneNumber: Yup.string().required('Required')
        }),
        onSubmit: (values) => {
            console.log('valuesvalues', values);
            setInviteSuccessful(true);
            addClient({
                variables: {
                    brandName: values.brandName,
                    contactName: values.contactName,
                    email: values.email,
                    phone: values.phoneNumber
                }
            });
        }
    });

    return (
        <Box sx={{ p: '5px 20px', borderRadius: '16px', width: { xs: '100%', sm: '562px' } }}>
            {!inviteSuccessful ? (
                <Box>
                    <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item xs={6}>
                            <Typography
                                ml={1}
                                sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 500, fontSize: '16px' }}
                            >
                                <FormattedMessage id="add_client" />
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                {' '}
                                <CloseIcon
                                    onClick={handleCloseDialogAddClient}
                                    sx={{ fontSize: '20px', fill: '#9197AE', cursor: 'pointer' }}
                                />
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
                                id="brandName"
                                name="brandName"
                                value={formik.values.brandName}
                                onChange={formik.handleChange}
                                variant="outlined"
                                fullWidth
                                placeholder={intl.formatMessage({ id: 'brand_name' })}
                                error={formik.touched.brandName && Boolean(formik.errors.brandName)}
                                helperText={formik.touched.brandName && formik.errors.brandName}
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
                                id="email"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                variant="outlined"
                                fullWidth
                                placeholder={intl.formatMessage({ id: 'email' })}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                        </Box>
                        <Grid container spacing={4} sx={{ mt: '-8px' }}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    sx={{
                                        '.MuiOutlinedInput-input': {
                                            color: theme.palette.grey[300],
                                            fontWeight: 400,
                                            fontFamily: 'Inter',
                                            fontSize: '14px'
                                        }
                                    }}
                                    id="contactName"
                                    name="contactName"
                                    value={formik.values.contactName}
                                    onChange={formik.handleChange}
                                    variant="outlined"
                                    fullWidth
                                    placeholder={intl.formatMessage({ id: 'contact_point_name' })}
                                    error={formik.touched.contactName && Boolean(formik.errors.contactName)}
                                    helperText={formik.touched.contactName && formik.errors.contactName}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    sx={{
                                        '.MuiOutlinedInput-input': {
                                            color: theme.palette.grey[300],
                                            fontWeight: 400,
                                            fontFamily: 'Inter',
                                            fontSize: '14px'
                                        }
                                    }}
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={formik.values.phoneNumber}
                                    onChange={formik.handleChange}
                                    variant="outlined"
                                    fullWidth
                                    placeholder="+44"
                                    error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                                    helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                                />
                            </Grid>
                        </Grid>
                        <Box mt={3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Box sx={{ width: '115px' }}>
                                <ButtonCustom
                                    onClick={formik.handleSubmit}
                                    colorBtn="red"
                                    titleBtn={<FormattedMessage id="add_client" />}
                                />
                            </Box>
                        </Box>
                    </form>
                </Box>
            ) : (
                <Box>
                    <Box sx={{ width: '230px', m: '30px auto 0' }}>
                        <CardMedia sx={{ objectFit: 'contain' }} component="img" image={clouds} alt="alt image" />
                    </Box>
                    <Typography
                        mt={3}
                        mb={3}
                        sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 500, fontSize: '16px', textAlign: 'center' }}
                    >
                        <FormattedMessage id="invite_sent_successfully" />
                    </Typography>
                    <Box sx={{ width: '77px', m: '0 auto' }}>
                        <ButtonCustom onClick={handleCloseDialogAddClient} colorBtn="red" titleBtn={<FormattedMessage id="got_it" />} />
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default DialogAddClient;
