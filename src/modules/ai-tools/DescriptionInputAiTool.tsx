import { Box, Typography, TextField } from '@mui/material';
import { useIntl } from 'react-intl';
import { useTheme } from '@mui/material/styles';

interface DescriptionInputAiToolProps {
    value: string;
    setValue?: any;
    placholder: string;
    totalWordsLength: string;
}

const DescriptionInputAiTool = ({ value, setValue, placholder, totalWordsLength }: DescriptionInputAiToolProps) => {
    const theme = useTheme();
    const intl = useIntl();
    return (
        <Box sx={{ position: 'relative' }}>
            <TextField
                sx={{
                    '.MuiOutlinedInput-input': {
                        color: theme.palette.grey[300],
                        fontWeight: 400,
                        fontFamily: 'Inter',
                        fontSize: '14px',
                        p: '10px 10px 80px 10px'
                    }
                }}
                id="phoneNumber"
                name="phoneNumber"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                variant="outlined"
                fullWidth
                multiline
                minRows={6}
                maxRows={6}
                placeholder={intl.formatMessage({ id: placholder })}
            />
            <Box sx={{ position: 'absolute', bottom: '10px', width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                <Box sx={{ display: 'flex' }}>
                    <Typography
                        sx={{
                            color: theme.palette.grey[400],
                            fontFamily: 'Inter',
                            fontWeight: 500,
                            fontSize: '12px',
                            letterSpacing: '0.12em'
                        }}
                    >
                        {value.split(' ').length}
                    </Typography>
                    <Typography
                        sx={{
                            color: theme.palette.grey[400],
                            fontFamily: 'Inter',
                            fontWeight: 500,
                            fontSize: '12px',
                            letterSpacing: '0.12em',
                            mr: '10px'
                        }}
                    >
                        {`/${totalWordsLength} WORDS`}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default DescriptionInputAiTool;
