import { Box, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { useTheme } from '@mui/material/styles';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

interface ViewPastRunsProps {
    size: number;
    handleHistory?: any;
}

const ViewPastRuns = ({ size, handleHistory }: ViewPastRunsProps) => {
    const theme = useTheme();

    return (
        <Box
            sx={{ display: 'flex', background: theme.palette.grey[900], p: '24px', justifyContent: 'space-between', alignItems: 'center' }}
        >
            <Box sx={{ display: 'flex' }}>
                <Typography
                    sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 700, fontSize: '12px', letterSpacing: '0.12em' }}
                >
                    {size}
                </Typography>
                <Typography
                    sx={{
                        color: theme.palette.grey[300],
                        fontFamily: 'Inter',
                        fontWeight: 700,
                        fontSize: '12px',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase'
                    }}
                >
                    /10 used this month
                </Typography>
            </Box>
            <Box
                onClick={handleHistory}
                sx={{
                    display: 'flex',
                    background: theme.palette.secondary[300],
                    p: '6px 12px',
                    borderRadius: '10px',
                    width: '147px',
                    alignItems: 'center',
                    cursor: 'pointer'
                }}
            >
                <AccessTimeIcon sx={{ fill: theme.palette.background.paper, fontSize: '20px' }} />
                <Typography ml={1} sx={{ color: theme.palette.background.paper, fontFamily: 'Inter', fontWeight: 500, fontSize: '12px' }}>
                    <FormattedMessage id="view_past_runs" />
                </Typography>
            </Box>
        </Box>
    );
};

export default ViewPastRuns;
