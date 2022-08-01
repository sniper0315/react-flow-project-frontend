import { Button, CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface ButtonProps {
    titleBtn: any;
    colorBtn: 'red' | 'white';
    loading?: boolean;
    onClick?: any;
    type?: string;
}

export default function ButtonCustom({ colorBtn, titleBtn, loading, onClick, type }: ButtonProps) {
    const theme = useTheme();
    return (
        <Button
            onClick={onClick}
            sx={{
                letterSpacing: '0.46px',
                fontSize: { xs: '16px', md: '14px' },
                borderRadius: { xs: '4px', md: '10px' },
                padding: { xs: '13px', md: '16px' },
                background: colorBtn === 'red' ? theme.palette.orange.main : theme.palette.background.paper,
                width: '100%',
                color: colorBtn === 'red' ? theme.palette.background.paper : theme.palette.orange.main,
                border: colorBtn === 'red' ? 'none' : `2px solid ${theme.palette.orange.main}`,
                fontFamily: 'Inter',
                fontWeight: 500,
                '&:hover': {
                    background: colorBtn === 'red' ? theme.palette.orange.main : theme.palette.background.paper
                },
                height: '42px',
                minHeight: '42px'
            }}
        >
            {loading ? <CircularProgress /> : titleBtn}
        </Button>
    );
}
