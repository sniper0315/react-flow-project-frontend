import { Typography, Box, Grid, TextField, Avatar } from '@mui/material';
import { FormattedMessage, useIntl } from 'react-intl';
import React from 'react';
import { useTheme } from '@mui/material/styles';
import ButtonCustom from 'ui-component/extended/Button';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import imgOffers1 from '../../../assets/images/imgOffers1.svg';

const DialogViewTeamMember = ({ hendleCloseDialogViewTeamMember, item }: any) => {
    const theme = useTheme();
    const intl = useIntl();

    const formik = useFormik({
        initialValues: {
            role: ''
        },
        validationSchema: Yup.object({
            role: Yup.string().required('Required')
        }),
        onSubmit: (values) => {
            console.log('valuesvalues', values);
            hendleCloseDialogViewTeamMember();
        }
    });
    React.useEffect(() => {
        if (item) {
            formik.setFieldValue('role', item?.role_id);
        }
    }, [item]);
    return (
        <Box sx={{ p: '5px 20px', borderRadius: '16px', width: { xs: '100%', sm: '562px' } }}>
            <Grid container justifyContent="space-between" alignItems="center">
                <Grid item xs={9}>
                    <Typography sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 500, fontSize: '16px' }}>
                        <FormattedMessage id="team_member_one" />
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        {' '}
                        <CloseIcon
                            onClick={hendleCloseDialogViewTeamMember}
                            sx={{ fontSize: '20px', fill: '#9197AE', cursor: 'pointer' }}
                        />
                    </Box>
                </Grid>
            </Grid>
            <Grid
                mt={5}
                pb={2}
                container
                justifyContent="space-between"
                alignItems="center"
                sx={{ borderBottom: `1px solid ${theme.palette.grey[500]}` }}
            >
                <Grid item xs={7} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ mr: '2px' }}>
                        <Avatar sx={{ width: '48px', height: '48px' }} alt="Remy Sharp" src={item.user.image_url} />
                    </Box>
                    <Box>
                        <Typography ml={1} sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 500 }}>
                            {item.user.first_name}
                        </Typography>
                        <Typography ml={1} sx={{ color: theme.palette.grey[600], fontFamily: 'Inter', fontWeight: 500, fontSize: '12px' }}>
                            {item.user.email}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={5}>
                    <Typography
                        ml={1}
                        sx={{
                            color: theme.palette.orange.main,
                            fontFamily: 'Inter',
                            fontWeight: 500,
                            fontSize: '14px',
                            textAlign: 'right'
                        }}
                    >
                        In-Agency
                    </Typography>
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
                        id="role"
                        name="role"
                        value={formik.values.role}
                        onChange={formik.handleChange}
                        variant="outlined"
                        fullWidth
                        placeholder={intl.formatMessage({ id: 'role' })}
                        error={formik.touched.role && Boolean(formik.errors.role)}
                        helperText={formik.touched.role && formik.errors.role}
                    />
                </Box>
                <Box mt={3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Box sx={{ width: '145px' }}>
                        <ButtonCustom onClick={formik.handleSubmit} colorBtn="red" titleBtn={<FormattedMessage id="save_changes" />} />
                    </Box>
                </Box>
            </form>
        </Box>
    );
};

export default DialogViewTeamMember;
