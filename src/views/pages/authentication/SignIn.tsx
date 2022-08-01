import { Box, Grid, CardMedia, Typography, TextField, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import logo from '../../../assets/images/logoMini.svg';
import { FormattedMessage, useIntl } from 'react-intl';
import { useTheme } from '@mui/material/styles';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import React from 'react';
import ButtonCustom from 'ui-component/extended/Button';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {
    const theme = useTheme();
    const intl = useIntl();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = React.useState(false);
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email').required('Required'),
            password: Yup.string().required('Required')
        }),
        onSubmit: (values) => {
            navigate('/offers');
        }
    });
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    return (
        <Box sx={{ position: 'relative' }}>
            <Grid container direction="column" justifyContent="center" alignItems="center" sx={{ minHeight: '100vh' }}>
                <Grid item>
                    <Box sx={{ height: '467px', width: { xs: '90%', sm: '405px' }, m: '0 auto' }}>
                        <Box sx={{ width: '65px', height: '65px', m: '0 auto' }}>
                            <CardMedia sx={{ objectFit: 'contain' }} component="img" width="18px" image={logo} alt="alt image" />
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
                            <FormattedMessage id="sign_in" />
                        </Typography>
                        <Typography
                            mt={1}
                            mb={3}
                            sx={{
                                color: theme.palette.grey[300],
                                fontFamily: 'Inter',
                                fontWeight: 400,
                                textAlign: 'center'
                            }}
                        >
                            <FormattedMessage id="signin_desc" />
                        </Typography>
                        <form onSubmit={formik.handleSubmit}>
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
                            <OutlinedInput
                                id="password"
                                name="password"
                                fullWidth
                                type={showPassword ? 'text' : 'password'}
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                sx={{
                                    m: '24px 0',
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
                            <Link to="/forgotpassword">
                                <Typography
                                    mb={3}
                                    sx={{
                                        color: theme.palette.grey[300],
                                        fontFamily: 'Inter',
                                        fontWeight: 400,
                                        textAlign: 'center'
                                    }}
                                >
                                    <FormattedMessage id="forgot-password" />
                                </Typography>
                            </Link>
                            <ButtonCustom onClick={formik.handleSubmit} colorBtn="red" titleBtn={<FormattedMessage id="login" />} />
                        </form>
                    </Box>
                </Grid>
            </Grid>
            <Box sx={{ position: 'absolute', bottom: 0, width: '100%' }}>
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
        </Box>
    );
};

export default SignIn;
