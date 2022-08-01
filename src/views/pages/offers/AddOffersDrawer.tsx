import { Box, Drawer, Typography, Grid, TextField } from '@mui/material';
import { FormattedMessage, useIntl } from 'react-intl';
import { useTheme } from '@mui/material/styles';
import ButtonCustom from 'ui-component/extended/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { CREATE_OFFER, EDIT_OFFER } from '../../../services/graphQL/mutations/offer/OffersMutations';
import { useMutation } from '@apollo/client';

interface DrawerAddOffersProps {
    openDivider: any;
    handleClickCloseDivider: any;
    item?: any;
    fetchOffers?: any;
}

const DrawerAddOffers = ({ openDivider, handleClickCloseDivider, item, fetchOffers }: DrawerAddOffersProps) => {
    const theme = useTheme();
    const intl = useIntl();
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
            name: '',
            description: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().trim('The name cannot be all spaces').required('Required'),
            description: Yup.string().trim().required('Required')
        }),
        onSubmit: (values) => {
            if (item) {
                editOffer({
                    variables: {
                        id: item.id,
                        title: values.name,
                        description: values.description,
                        image_url: 'offer image url',
                        agency_id: 'e4d49bee-2000-49e8-a953-b3b15e24698d'
                    }
                });
            } else {
                createOffer({
                    variables: {
                        title: values.name,
                        description: values.description,
                        image_url: 'offer image url',
                        agency_id: 'e4d49bee-2000-49e8-a953-b3b15e24698d'
                    }
                });
            }
        }
    });
    const [createOffer] = useMutation(CREATE_OFFER, {
        onCompleted: (data: any) => {
            console.log('createOffer', data);
            fetchOffers();
            handleClickCloseDivider();
        },
        onError: (error: any) => {
            console.log(error);
        }
    });
    const [editOffer] = useMutation(EDIT_OFFER, {
        onCompleted: (data: any) => {
            console.log('editeOffer', data);
            handleClickCloseDivider();
            fetchOffers();
        },
        onError: (error: any) => {
            console.log(error);
        }
    });
    React.useEffect(() => {
        if (item) {
            formik.setFieldValue('name', item?.title);
            formik.setFieldValue('description', item?.description);
        }
    }, [item]);

    return (
        <Drawer anchor="right" open={openDivider} onClose={handleClickCloseDivider}>
            <Box sx={{ width: { xs: '100%', sm: '562px' } }}>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container direction="column" justifyContent="space-between" sx={{ minHeight: '100vh' }}>
                        <Grid item sx={{ p: '32px' }} xs={10}>
                            <Typography
                                mb={3}
                                sx={{ fontWeight: 600, fontFamily: 'Inter', color: theme.palette.common.black, fontSize: '16px' }}
                            >
                                {item ? <FormattedMessage id="edit_offer" /> : <FormattedMessage id="create_offer" />}
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
                                id="name"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                variant="outlined"
                                fullWidth
                                placeholder={intl.formatMessage({ id: 'name_of_offer' })}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                            />
                            <Box
                                mt={3}
                                sx={{
                                    borderRadius: '10px',
                                    border: `1px solid ${theme.palette.grey[500]}`,
                                    minHeight: { xs: '350px', sm: '400px' }
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
                        </Grid>
                        <Grid
                            xs={2}
                            item
                            container
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
                                    <Box sx={{ width: '134px' }}>
                                        <ButtonCustom
                                            onClick={formik.handleSubmit}
                                            colorBtn="red"
                                            titleBtn={
                                                item ? <FormattedMessage id="save_changes" /> : <FormattedMessage id="create_offer" />
                                            }
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

export default DrawerAddOffers;
