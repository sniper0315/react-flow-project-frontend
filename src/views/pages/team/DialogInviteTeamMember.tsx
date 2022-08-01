import { Typography, Box, Grid, TextField, CardMedia } from '@mui/material';
import { FormattedMessage, useIntl } from 'react-intl';
import React from 'react';
import { useTheme } from '@mui/material/styles';
import ButtonCustom from 'ui-component/extended/Button';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import clouds from '../../../assets/images/clouds.svg';
// import { INVITE_MEMBER, ADD_MEMBER_DEV } from '../../../services/graphQL/mutation/teams';
import { useMutation } from '@apollo/client';
import { ADD_MEMBER_DEV, INVITE_MEMBER } from 'services/graphQL/mutations';

const DialogInviteTeamMember = ({ handleCloseDialogInvite, fetchTeam }: any) => {
    const [inviteSuccessful, setInviteSuccessful] = React.useState(false);
    const theme = useTheme();
    const intl = useIntl();
    const formik = useFormik({
        initialValues: {
            email: '',
            role: '',
            message: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email').required('Required'),
            role: Yup.string().required('Required'),
            message: Yup.string().required('Required')
        }),
        onSubmit: (values) => {
            console.log('valuesvalues', values);
            // inviteMember({
            //     variables: { email: values.email, message: values.message }
            // });
            addMembersDev();
            setInviteSuccessful(true);
        }
    });
    const [inviteMember, { loading: loadingInviteMember, error: errorInviteMember }] = useMutation(INVITE_MEMBER, {
        onCompleted: (data: any) => {
            console.log('inviteMember', data);
        },
        onError: (error: any) => {
            console.log(error);
        }
    });
    const [addMemberDev] = useMutation(ADD_MEMBER_DEV, {
        onCompleted: (data: any) => {
            console.log('inviteMember', data);
            fetchTeam();
        },
        onError: (error: any) => {
            console.log(error);
        }
    });
    const addMembersDev = () => {
        addMemberDev({
            variables: {
                organization_id: 'e4d49bee-2000-49e8-a953-b3b15e24698d',
                user_id: 'efb7f89a-36aa-4289-9710-25d29bc63a70',
                role: 'MEMBER'
            }
        });
    };
    return (
        <Box sx={{ p: '5px 20px', borderRadius: '16px', minWidth: { xs: '350px', sm: '562px' } }}>
            {!inviteSuccessful ? (
                <Box>
                    <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item xs={10}>
                            <Typography
                                ml={1}
                                sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 500, fontSize: '16px' }}
                            >
                                <FormattedMessage id="invite_team_member" />
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                {' '}
                                <CloseIcon
                                    onClick={handleCloseDialogInvite}
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
                                id="email"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                variant="outlined"
                                fullWidth
                                placeholder={intl.formatMessage({ id: 'enter_email_address_invite' })}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
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
                                id="role"
                                name="role"
                                value={formik.values.role}
                                onChange={formik.handleChange}
                                variant="outlined"
                                fullWidth
                                placeholder={intl.formatMessage({ id: 'role_placeholder' })}
                                error={formik.touched.role && Boolean(formik.errors.role)}
                                helperText={formik.touched.role && formik.errors.role}
                            />
                        </Box>
                        <Box mt={3} sx={{ display: { xs: 'block', sm: 'none' } }}>
                            <TextField
                                sx={{
                                    '.MuiOutlinedInput-input': {
                                        color: theme.palette.grey[300],
                                        fontWeight: 400,
                                        fontFamily: 'Inter',
                                        fontSize: '14px'
                                    }
                                }}
                                id="message"
                                name="message"
                                value={formik.values.message}
                                onChange={formik.handleChange}
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={4}
                                placeholder={intl.formatMessage({ id: 'messageOne' })}
                                error={formik.touched.message && Boolean(formik.errors.message)}
                                helperText={formik.touched.message && formik.errors.message}
                            />
                        </Box>
                        <Box mt={3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Box sx={{ width: '125px' }}>
                                <ButtonCustom
                                    onClick={formik.handleSubmit}
                                    colorBtn="red"
                                    titleBtn={<FormattedMessage id="send_nvite" />}
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
                        <ButtonCustom onClick={handleCloseDialogInvite} colorBtn="red" titleBtn={<FormattedMessage id="got_it" />} />
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default DialogInviteTeamMember;
