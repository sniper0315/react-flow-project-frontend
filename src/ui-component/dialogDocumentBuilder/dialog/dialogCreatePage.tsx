import { Typography, Box, Grid, TextField } from '@mui/material';
import { FormattedMessage, useIntl } from 'react-intl';
import update from 'immutability-helper';
import { useTheme } from '@mui/material/styles';
import ButtonCustom from 'ui-component/extended/Button';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik, useFormikContext } from 'formik';
import AddIcon from '@mui/icons-material/Add';
import * as Yup from 'yup';
import { Page, FormData } from '../types';

const DialogCreatePage = ({ onClose }: any) => {
    const theme = useTheme();
    const intl = useIntl();

    const { values, setValues } = useFormikContext<FormData>();

    const formik = useFormik({
        initialValues: {
            pageName: ''
        },
        validationSchema: Yup.object({
            pageName: Yup.string().required('Required')
        }),
        onSubmit: (val) => {
            const newPage: Page = {
                pageName: val.pageName,
                pageVariable: false,
                pageSections: [
                    {
                        sectionName: 'Section Name',
                        sectionVariable: false,
                        sectionFields: []
                    }
                ]
            };
            setValues(update(values, { pages: { $push: [newPage] } }));
            onClose();
        }
    });

    return (
        <Box sx={{ p: '5px 20px', borderRadius: '16px', width: { xs: '100%', sm: '562px' } }}>
            <Box>
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item xs={6}>
                        <Typography ml={1} sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 500, fontSize: '16px' }}>
                            <FormattedMessage id="create_new_page" />
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            {' '}
                            <CloseIcon onClick={onClose} sx={{ fontSize: '20px', fill: '#9197AE', cursor: 'pointer' }} />
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
                            id="pageName"
                            name="pageName"
                            value={formik.values.pageName}
                            onChange={formik.handleChange}
                            variant="outlined"
                            fullWidth
                            placeholder={intl.formatMessage({ id: 'enter_page_name' })}
                            error={formik.touched.pageName && Boolean(formik.errors.pageName)}
                            helperText={formik.touched.pageName && formik.errors.pageName}
                        />
                    </Box>

                    <Box mt={3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Box sx={{ width: '150px' }}>
                            <ButtonCustom
                                onClick={formik.handleSubmit}
                                colorBtn="red"
                                titleBtn={
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <AddIcon />
                                        <FormattedMessage id="create_page" />
                                    </Box>
                                }
                            />
                        </Box>
                    </Box>
                </form>
            </Box>
        </Box>
    );
};

export default DialogCreatePage;
