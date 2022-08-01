import { Typography, Box, Breadcrumbs, Grid, CircularProgress } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import React from 'react';
import { useTheme } from '@mui/material/styles';
import ButtonCustom from 'ui-component/extended/Button';
import NotFoundImg from 'ui-component/Offer';
import { BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';
import DrawerAddOffers from './AddOffersDrawer';
import imgOffers1 from '../../../assets/images/imgOffers1.svg';
import EnhancedTable from './OffersTable';
import { Link } from 'react-router-dom';
import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_OFFERS } from '../../../services/graphQL/queries/offers';

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;

export type ParagraphElement = {
    type: 'paragraph';
    children: CustomText[];
};

export type HeadingElement = {
    type: 'heading';
    level: number;
    children: CustomText[];
};

export type CustomElement = ParagraphElement | HeadingElement;

export type FormattedText = { text: any; bold?: true };

export type CustomText = FormattedText;

declare module 'slate' {
    interface CustomTypes {
        Editor: CustomEditor;
        Element: CustomElement;
        Text: CustomText;
    }
}

const Offers = () => {
    const theme = useTheme();
    const [openDivider, setOpenDivider] = React.useState(false);
    const [itemsOffers, setItemsOffers] = React.useState<any>();
    const [fetchOffers, { loading: loadingFetchOffers, error: errorFetchOffers }] = useLazyQuery(GET_OFFERS, {
        onCompleted: (data) => {
            console.log('offers', data.offers);
            setItemsOffers(data.offers);
        },
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first'
    });

    React.useEffect(() => {
        fetchOffers();
    }, []);
    const handleClickCloseDivider = () => {
        setOpenDivider(false);
    };
    const handleOpenDivider = () => {
        setOpenDivider(true);
    };
    return (
        <Box>
            <Breadcrumbs aria-label="breadcrumb">
                <Link className="link" to="/">
                    <FormattedMessage id="venly" />
                </Link>
                <Typography sx={{ textTransform: 'capitalize', color: theme.palette.grey[300], fontFamily: 'Inter', fontWeight: 500 }}>
                    <FormattedMessage id="offers" />
                </Typography>
            </Breadcrumbs>
            <Grid mt={2} mb={3} container alignItems="center">
                <Grid item xs={6}>
                    <Typography
                        sx={{
                            textTransform: 'capitalize',
                            color: theme.palette.grey[400],
                            fontSize: '24px',
                            fontWeight: 500,
                            fontFamily: 'Inter'
                        }}
                    >
                        <FormattedMessage id="offers" />
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Box sx={{ width: '146px' }}>
                            <ButtonCustom
                                onClick={handleOpenDivider}
                                titleBtn={
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Typography
                                            sx={{
                                                color: theme.palette.background.paper,
                                                fontWeight: 500,
                                                fontFamily: 'Inter',
                                                fontSize: '20px',
                                                m: '-3px 5px 0 0'
                                            }}
                                        >
                                            +
                                        </Typography>
                                        <Typography sx={{ fontWeight: 500, fontFamily: 'Inter' }}>
                                            <FormattedMessage id="create_offer" />
                                        </Typography>
                                    </Box>
                                }
                                colorBtn="red"
                            />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            {loadingFetchOffers ? (
                <Box mt={10} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Box>
                    {' '}
                    {itemsOffers?.length ? (
                        // <ItemOffers item={itemsOffers} />
                        <Box>
                            <EnhancedTable item={itemsOffers} fetchOffers={fetchOffers} />
                            <Typography
                                mt={4}
                                sx={{
                                    color: theme.palette.grey[600],
                                    fontFamily: 'Inter',
                                    fontWeight: 600,
                                    fontSize: '10px',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.12em',
                                    textAlign: 'center'
                                }}
                            >
                                <FormattedMessage id="end_of_page" /> - {itemsOffers?.length} <FormattedMessage id="results" />
                            </Typography>
                        </Box>
                    ) : (
                        <Box sx={{ width: '315px', m: '15% auto 0' }}>
                            <NotFoundImg title={<FormattedMessage id="no_offers_found" />} />
                        </Box>
                    )}
                </Box>
            )}

            <DrawerAddOffers openDivider={openDivider} handleClickCloseDivider={handleClickCloseDivider} fetchOffers={fetchOffers} />
        </Box>
    );
};

export default Offers;
