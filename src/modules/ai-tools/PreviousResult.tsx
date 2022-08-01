import { Box, Typography, Grid } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { useTheme } from '@mui/material/styles';
import moment from 'moment';

interface ResultsValueType {
    date: string;
    excerpt: string;
    name: string;
    score: number;
    url: string;
    language?: string;
    category?: string;
}
interface PreviousResultProps {
    resultsPrevious: ResultsValueType;
}

const PreviousResult = ({ resultsPrevious }: PreviousResultProps) => {
    const theme = useTheme();

    return (
        <Box sx={{ p: '16px', background: theme.palette.orange[200], borderRadius: '8px' }}>
            <Typography sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 600, fontSize: '14px' }}>
                <FormattedMessage id="brand_description" />
            </Typography>
            <Typography mt={1} sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 400, fontSize: '14px' }}>
                {resultsPrevious.excerpt}
            </Typography>
            <Grid container spacing={3} sx={{ mt: '-5px' }}>
                <Grid item xs={4}>
                    <Typography sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 600, fontSize: '14px' }}>
                        <FormattedMessage id="date" />
                    </Typography>
                    <Typography mt={1} sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 500, fontSize: '12px' }}>
                        {moment(resultsPrevious.date).format('DD MMMM, YYYY')}
                    </Typography>
                </Grid>
                {resultsPrevious.language && (
                    <Grid item xs={4}>
                        <Typography sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 600, fontSize: '14px' }}>
                            <FormattedMessage id="language" />
                        </Typography>
                        <Typography mt={1} sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 500, fontSize: '12px' }}>
                            {resultsPrevious.language}
                        </Typography>
                    </Grid>
                )}
                {resultsPrevious.category && (
                    <Grid item xs={4}>
                        <Typography sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 600, fontSize: '14px' }}>
                            <FormattedMessage id="category" />
                        </Typography>
                        <Typography mt={1} sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 500, fontSize: '12px' }}>
                            {resultsPrevious.category}
                        </Typography>
                    </Grid>
                )}
            </Grid>
        </Box>
    );
};

export default PreviousResult;
