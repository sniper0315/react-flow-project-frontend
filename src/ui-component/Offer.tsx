import { CardMedia, Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import notFound from '../assets/images/notFound.svg';
import notification from '../assets/images/notification.svg';

interface ButtonProps {
    title: any;
    image?: boolean;
}

export default function NotFoundImg({ title, image }: ButtonProps) {
    const theme = useTheme();
    return (
        <Box>
            <CardMedia
                sx={{ marginBottom: '14px', objectFit: 'contain', pt: '12px' }}
                component="img"
                width="100%"
                // height="220px"
                image={image ? notification : notFound}
                alt="alt image"
            />
            <Typography sx={{ color: theme.palette.grey[600], textAlign: 'center', fontFamily: 'Inter', fontWeight: 500 }}>
                {title}
            </Typography>
        </Box>
    );
}
