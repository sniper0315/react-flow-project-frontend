import { Box, Drawer, Typography, Grid, CardMedia } from '@mui/material';
import { FormattedMessage, useIntl } from 'react-intl';
import { useTheme } from '@mui/material/styles';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React from 'react';
import AutoCompliteClients from 'views/pages/clients/AutocompleteClients';

interface LabelType {
    title: string;
    src?: string;
}
interface SelectorAutocompliteProps {
    autocompleteItems: LabelType[];
    pendingValue: LabelType[];
    setPendingValue: any;
    arrItemSelected: LabelType[];
    setArrItemsSelected: any;
    title?: string;
}

const SelectorAutocomplite = ({
    autocompleteItems,
    pendingValue,
    setPendingValue,
    arrItemSelected,
    setArrItemsSelected,
    title
}: SelectorAutocompliteProps) => {
    const theme = useTheme();
    return (
        <Box>
            <Typography sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 600, fontSize: '14px' }}>
                <FormattedMessage id={title} />
            </Typography>
            <Grid container>
                <Grid item mt={2}>
                    <AutoCompliteClients
                        labels={autocompleteItems}
                        pendingValue={pendingValue}
                        setPendingValue={setPendingValue}
                        clients={arrItemSelected}
                        setClients={setArrItemsSelected}
                    />
                </Grid>
                {arrItemSelected &&
                    arrItemSelected.map((client: LabelType) => (
                        <Grid
                            mt={2}
                            item
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                ml: '10px',
                                pl: '10px',
                                borderLeft: `1px solid ${theme.palette.grey[500]}`
                            }}
                        >
                            <Box sx={{ width: '32px' }}>
                                <CardMedia sx={{ objectFit: 'contain' }} component="img" width="100%" image={client.src} alt="alt image" />
                            </Box>
                            <Typography
                                ml={1}
                                sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 600, fontSize: '14px' }}
                            >
                                {client.title}
                            </Typography>
                        </Grid>
                    ))}
            </Grid>
        </Box>
    );
};

export default SelectorAutocomplite;
