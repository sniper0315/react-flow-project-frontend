import { Box, Typography, Grid, TextField } from '@mui/material';
import { FormattedMessage, useIntl } from 'react-intl';
import { useTheme } from '@mui/material/styles';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ButtonCustom from 'ui-component/extended/Button';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const DIalogSharedLink = ({ handleClose, linkShared }: any) => {
    const theme = useTheme();
    const intl = useIntl();
    const [state, setState] = React.useState({
        value: '',
        copied: false
    });
    const formik = useFormik({
        initialValues: {
            email: '',
            link: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email').required('Required'),
            link: Yup.string().required('Required')
        }),
        onSubmit: (values) => {
            console.log('valuesvalues', values);
            handleClose();
        }
    });
    React.useEffect(() => {
        if (linkShared) {
            formik.setFieldValue('link', `${process.env.REACT_APP_MAIN_URL}/${linkShared?.id}`);
            setState({
                ...state,
                value: `${process.env.REACT_APP_MAIN_URL}/${linkShared?.id}`
            });
        }
    }, []);
    const onCopy = () => {
        setState({
            ...state,
            copied: true
        });
        setTimeout(() => {
            setState({
                ...state,
                copied: false
            });
        }, 1000);
    };
    return (
        <Box sx={{ width: { xs: '340px', sm: '562px' }, p: '18px 24px' }}>
            <form onSubmit={formik.handleSubmit}>
                <Typography
                    mb={2}
                    sx={{
                        color: theme.palette.grey[400],
                        fontFamily: 'Inter',
                        fontWeight: 700,
                        fontSize: '16px'
                    }}
                >
                    <FormattedMessage id="share" />
                </Typography>
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
                    placeholder={intl.formatMessage({ id: 'enter_email_address' })}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <Box mt={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Box sx={{ width: '93px' }}>
                        <ButtonCustom onClick={formik.handleSubmit} colorBtn="red" titleBtn={<FormattedMessage id="share" />} />
                    </Box>
                </Box>
                <Grid mt={3} container spacing={3} alignItems="center">
                    <Grid item xs={12} sm={9}>
                        <TextField
                            sx={{
                                '.MuiOutlinedInput-input': {
                                    color: theme.palette.grey[300],
                                    fontWeight: 400,
                                    fontFamily: 'Inter',
                                    fontSize: '14px',
                                    p: '10px'
                                }
                            }}
                            id="link"
                            name="link"
                            value={formik.values.link}
                            onChange={formik.handleChange}
                            variant="outlined"
                            fullWidth
                            placeholder={intl.formatMessage({ id: 'enter_email_address' })}
                            error={formik.touched.link && Boolean(formik.errors.link)}
                            helperText={formik.touched.link && formik.errors.link}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <CopyToClipboard onCopy={onCopy} text={state.value}>
                            <ButtonCustom colorBtn="white" titleBtn={<FormattedMessage id="copy_link" />} />
                        </CopyToClipboard>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default DIalogSharedLink;
