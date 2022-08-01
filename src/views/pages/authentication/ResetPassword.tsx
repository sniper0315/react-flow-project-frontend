import { Box, Grid, CardMedia, Typography, TextField, OutlinedInput, InputAdornment, IconButton, Dialog } from '@mui/material';
import support from '../../../assets/images/support.svg';
import produclaunch from '../../../assets/images/produclaunch.svg';
import { FormattedMessage, useIntl } from 'react-intl';
import { useTheme } from '@mui/material/styles';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import React from 'react';
import ButtonCustom from 'ui-component/extended/Button';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const theme = useTheme();
    const intl = useIntl();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            passwordConfirmation: '',
            password: ''
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .required('Password is required')
                .matches(
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                    'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
                ),
            passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
        }),
        onSubmit: (values) => {
            handleClickOpen();
        }
    });
    const [showPassword, setShowPassword] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    return (
        <Box sx={{ position: 'relative', pt: { xs: '50px', xl: 0 }, minHeight: { xs: '100%', xl: '100vh' } }}>
            <Grid container direction="column" justifyContent="center" alignItems="center" sx={{ minHeight: { xs: '100%', xl: '100vh' } }}>
                <Grid item>
                    <Box sx={{ height: '467px', width: { xs: '90%', sm: '405px' }, m: '0 auto' }}>
                        <Box sx={{ width: '276px', m: '0 auto' }}>
                            <CardMedia sx={{ objectFit: 'contain' }} component="img" width="18px" image={support} alt="alt image" />
                        </Box>
                        <Typography
                            mt={3}
                            sx={{
                                color: theme.palette.grey[400],
                                fontFamily: 'Inter',
                                fontWeight: 700,
                                fontSize: '24px',
                                textAlign: 'center'
                            }}
                        >
                            <FormattedMessage id="reset-password" />
                        </Typography>
                        <Typography
                            mt={1}
                            sx={{
                                color: theme.palette.grey[300],
                                fontFamily: 'Inter',
                                fontWeight: 400,
                                textAlign: 'center'
                            }}
                        >
                            <FormattedMessage id="reset_pass_desc" />
                        </Typography>
                        <form onSubmit={formik.handleSubmit}>
                            <OutlinedInput
                                id="password"
                                name="password"
                                fullWidth
                                type={showPassword ? 'text' : 'password'}
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                sx={{
                                    mt: '24px',
                                    '.MuiOutlinedInput-input': {
                                        color: theme.palette.grey[300],
                                        fontWeight: 400,
                                        fontFamily: 'Inter',
                                        fontSize: '14px'
                                    }
                                }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                placeholder={intl.formatMessage({ id: 'password' })}
                            />
                            {formik.errors.password && formik.touched.password ? (
                                <Typography
                                    sx={{
                                        fontFamily: 'Inter',
                                        fontWeight: 400,
                                        color: 'red',
                                        fontSize: '12px'
                                    }}
                                >
                                    {formik.errors.password}
                                </Typography>
                            ) : null}
                            <TextField
                                sx={{
                                    '.MuiOutlinedInput-input': {
                                        color: theme.palette.grey[300],
                                        fontWeight: 400,
                                        fontFamily: 'Inter',
                                        fontSize: '14px'
                                    },
                                    mt: '24px'
                                }}
                                id="passwordConfirmation"
                                name="passwordConfirmation"
                                value={formik.values.passwordConfirmation}
                                onChange={formik.handleChange}
                                variant="outlined"
                                fullWidth
                                placeholder={intl.formatMessage({ id: 'confirm_password' })}
                                error={formik.touched.passwordConfirmation && Boolean(formik.errors.passwordConfirmation)}
                                helperText={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation}
                            />
                            <Box mt={3}>
                                <ButtonCustom
                                    onClick={formik.handleSubmit}
                                    colorBtn="red"
                                    titleBtn={<FormattedMessage id="reset-password" />}
                                />
                            </Box>
                        </form>
                    </Box>
                </Grid>
            </Grid>
            <Box sx={{ position: { xs: 'relative', xl: 'absolute' }, bottom: 0, width: '100%', mt: { xs: '100px', xl: 0 } }}>
                <Box sx={{ maxWidth: '410px', m: '0 auto' }}>
                    <Typography
                        mb={3}
                        sx={{
                            color: theme.palette.grey[300],
                            fontFamily: 'Inter',
                            fontWeight: 400,
                            textAlign: 'center'
                        }}
                    >
                        Snikpic SRL - VAT BE0729.842.450 - Contact@snikpic.io Avenue Armand Huysmans 157, 1050 Bruxelles
                    </Typography>
                </Box>
            </Box>
            <Dialog open={open} onClose={handleClose}>
                <Box p={4} sx={{ width: '355px' }}>
                    <Box sx={{ width: '168px', m: '0 auto' }}>
                        <CardMedia sx={{ objectFit: 'contain' }} component="img" width="18px" image={produclaunch} alt="alt image" />
                    </Box>
                    <Typography
                        mt={3}
                        mb={3}
                        sx={{
                            color: theme.palette.grey[400],
                            fontFamily: 'Inter',
                            fontWeight: 500,
                            textAlign: 'center',
                            fontSize: '16px'
                        }}
                    >
                        <FormattedMessage id="password_reset_uccessful" />
                    </Typography>
                    <Box sx={{ width: { xs: '180px', sm: '162px' }, m: '0 auto' }}>
                        <ButtonCustom
                            onClick={() => navigate('/offers')}
                            colorBtn="red"
                            titleBtn={<FormattedMessage id="go_to_dashboard" />}
                        />
                    </Box>
                </Box>
            </Dialog>
        </Box>
    );
};

export default ResetPassword;
