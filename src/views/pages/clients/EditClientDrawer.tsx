import { Box, Drawer, Typography, Grid, TextField } from '@mui/material';
import { FormattedMessage, useIntl } from 'react-intl';
import { useTheme } from '@mui/material/styles';
import ButtonCustom from 'ui-component/extended/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useMutation } from '@apollo/client';
import { EDIT_CLIENT } from 'services/graphQL/mutations';
import { useDispatch, useSelector } from 'store';
import { setCurrentClient } from 'store/slices/clients';

interface DrawerAddOffersProps {
    openDivider: any;
    handleClickCloseDivider: any;
    item?: any;
}

const EditClientDrawer = ({ openDivider, handleClickCloseDivider, item }: DrawerAddOffersProps) => {
    const theme = useTheme();
    const intl = useIntl();

    const dispatch = useDispatch();
    const currentClient = useSelector((state) => state.clients);
    const [editClient] = useMutation(EDIT_CLIENT, {
        onCompleted: (data: any) => {
            const updatedCurClinet = currentClient && { ...currentClient, name: { title: data.update_client_organizations_by_pk.name } };
            dispatch(setCurrentClient(updatedCurClinet));
        },
        onError: (error: any) => {
            console.log(error);
        }
    });

    const formik = useFormik({
        initialValues: {
            brandName: '',
            description: ''
        },
        validationSchema: Yup.object({
            brandName: Yup.string().required('Required'),
            description: Yup.string().required('Required')
        }),
        onSubmit: (values) => {
            console.log('valuesvalues', values);
            editClient({ variables: { clientId: item.id, name: values.brandName } });
        }
    });

    React.useEffect(() => {
        if (item) {
            formik.setFieldValue('brandName', item?.name.title);
        }
    }, [item]);

    return (
        <Drawer anchor="right" open={openDivider} onClose={handleClickCloseDivider}>
            <Box sx={{ width: { xs: '100%', sm: '562px' } }}>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container direction="column" justifyContent="space-between" sx={{ minHeight: { xs: '100%', xl: '100vh' } }}>
                        <Grid item sx={{ p: '26px 32px' }}>
                            <Typography
                                mb={3}
                                sx={{ fontWeight: 600, fontFamily: 'Inter', color: theme.palette.common.black, fontSize: '16px' }}
                            >
                                <FormattedMessage id="edit_client" />
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
                                    id="description"
                                    name="description"
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    rows={6}
                                    placeholder={intl.formatMessage({ id: 'description' })}
                                    error={formik.touched.description && Boolean(formik.errors.description)}
                                    helperText={formik.touched.description && formik.errors.description}
                                />
                            </Box>
                        </Grid>
                        <Grid
                            item
                            container
                            direction="column"
                            justifyContent="flex-end"
                            alignItems="flex-end"
                            sx={{ borderTop: `1px solid ${theme.palette.grey[500]}`, p: '32px' }}
                        >
                            <Grid item>
                                <Box sx={{ display: 'flex' }}>
                                    <Box mr={2} sx={{ width: '87px' }}>
                                        <ButtonCustom
                                            onClick={handleClickCloseDivider}
                                            colorBtn="white"
                                            titleBtn={<FormattedMessage id="cancel" />}
                                        />
                                    </Box>
                                    <Box sx={{ width: '144px' }}>
                                        <ButtonCustom
                                            onClick={formik.handleSubmit}
                                            colorBtn="red"
                                            titleBtn={<FormattedMessage id="save_changes" />}
                                        />
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Drawer>
    );
};

export default EditClientDrawer;
