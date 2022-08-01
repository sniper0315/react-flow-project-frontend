import { Box, CardMedia, CircularProgress, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { useTheme } from '@mui/material/styles';
import solidImg from '../../assets/images/solidImg.svg';
import ButtonCustom from 'ui-component/extended/Button';

interface SimpleDialogProps {
    onConfirm: () => void;
    onClose: () => void;
    loading?: boolean;
}

const DIalogCongirm = ({ onConfirm, onClose, loading }: SimpleDialogProps) => {
    const theme = useTheme();
    return (
        <Box sx={{ p: '20px', width: { xs: '100%', sm: '565px' } }}>
            <Box sx={{ width: '235px', m: '50px auto 0' }}>
                <CardMedia sx={{ objectFit: 'contain' }} component="img" width="100%" image={solidImg} alt="alt image" />
                <Typography
                    sx={{
                        color: theme.palette.grey[400],
                        fontFamily: 'Inter',
                        fontWeight: 600,
                        fontSize: '16px',
                        textAlign: 'center',
                        mt: '20px',
                        mb: '20px'
                    }}
                >
                    <FormattedMessage id="are_you_sure" />
                </Typography>
                <Box pb={4} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ with: '101px' }}>
                        {loading ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <CircularProgress />{' '}
                            </Box>
                        ) : (
                            <ButtonCustom onClick={onConfirm} titleBtn={<FormattedMessage id="yes_do_it" />} colorBtn="red" />
                        )}
                    </Box>
                    <Box sx={{ with: '101px' }}>
                        <ButtonCustom onClick={onClose} titleBtn={<FormattedMessage id="No_don_t" />} colorBtn="white" />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default DIalogCongirm;
