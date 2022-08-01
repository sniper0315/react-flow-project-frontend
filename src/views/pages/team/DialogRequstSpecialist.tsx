import { Typography, Box, Grid, TextField, CardMedia } from '@mui/material';
import { FormattedMessage, useIntl } from 'react-intl';
import React from 'react';
import { useTheme } from '@mui/material/styles';
import ButtonCustom from 'ui-component/extended/Button';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import message from '../../../assets/images/message.svg';

const DialogRequstSpecialist = ({ handleCloseDialogSpecialist }: any) => {
    const theme = useTheme();
    const intl = useIntl();
    const [specialistSuccessful, setSpecialistSuccessful] = React.useState(false);
    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
            ['link', 'image'],
            ['clean']
        ]
    };
    const formats = ['header', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent', 'link', 'image'];
    const formik = useFormik({
        initialValues: {
            description: '',
            role: ''
        },
        validationSchema: Yup.object({
            description: Yup.string().trim().required('Required'),
            role: Yup.string().trim().required('Required')
        }),
        onSubmit: (values) => {
            console.log('valuesvalues', values);
            setSpecialistSuccessful(true);
        }
    });
    return (
        <Box sx={{ p: '5px 20px', borderRadius: '16px', width: { xs: '100%', sm: '562px' } }}>
            {!specialistSuccessful ? (
                <Box>
                    <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item xs={9}>
                            <Typography
                                ml={1}
                                sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 500, fontSize: '16px' }}
                            >
                                <FormattedMessage id="request_specialist" />
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                {' '}
                                <CloseIcon
                                    onClick={handleCloseDialogSpecialist}
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
                        <Box
                            mt={3}
                            sx={{
                                borderRadius: '10px',
                                border:
                                    formik.touched.description && Boolean(formik.errors.description)
                                        ? '1px solid red'
                                        : `1px solid ${theme.palette.grey[500]}`,
                                height: '300px'
                            }}
                        >
                            <ReactQuill
                                modules={modules}
                                formats={formats}
                                theme="snow"
                                placeholder="Description"
                                value={formik.values.description}
                                onChange={(e: any) => formik.setFieldValue('description', e)}
                            />
                        </Box>
                        {formik.touched.description && Boolean(formik.errors.description) && (
                            <Typography sx={{ color: 'red', fontFamily: 'Inter', fontWeight: 400, fontSize: '12px', m: '5px 0 0 20px' }}>
                                Required
                            </Typography>
                        )}
                        <Box mt={3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Box sx={{ width: '145px' }}>
                                <ButtonCustom
                                    onClick={formik.handleSubmit}
                                    colorBtn="red"
                                    titleBtn={<FormattedMessage id="send_request" />}
                                />
                            </Box>
                        </Box>
                    </form>
                </Box>
            ) : (
                <Box>
                    <Box sx={{ width: '356px', m: '30px auto 0' }}>
                        <CardMedia sx={{ objectFit: 'contain' }} component="img" image={message} alt="alt image" />
                    </Box>
                    <Typography
                        mt={3}
                        mb={3}
                        sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 500, fontSize: '16px', textAlign: 'center' }}
                    >
                        <FormattedMessage id="request_sent_successfully" />
                    </Typography>
                    <Box sx={{ width: '77px', m: '0 auto' }}>
                        <ButtonCustom onClick={handleCloseDialogSpecialist} colorBtn="red" titleBtn={<FormattedMessage id="got_it" />} />
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default DialogRequstSpecialist;
