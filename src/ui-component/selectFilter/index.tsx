import { Select, MenuItem, CardMedia, Box, Typography } from '@mui/material';
import { useIntl } from 'react-intl';
import { useTheme } from '@mui/material/styles';

interface SelectIntarface {
    src?: string;
    title: string;
}
interface SelectProps {
    labels: any;
    setValue: any;
    value: string;
    handleLabels?: any;
}
const SelectFilter = ({ value, setValue, labels, handleLabels }: SelectProps) => {
    const theme = useTheme();
    const intl = useIntl();

    return (
        <Select
            placeholder={intl.formatMessage({ id: 'provided_service' })}
            sx={{
                '.MuiOutlinedInput-input': {
                    color: theme.palette.grey[300],
                    fontWeight: 400,
                    fontFamily: 'Inter',
                    fontSize: '14px'
                }
            }}
            fullWidth
            renderValue={(selected) => selected}
            value={value}
            onChange={(e) => setValue(e.target.value)}
        >
            {labels.map((item: any) => (
                <MenuItem
                    key={item.title ? item.title : item}
                    sx={{
                        borderBottom: `1px solid ${theme.palette.grey[500]}`,
                        p: '14px 16px'
                    }}
                    value={item.title ? item.title : item}
                    onClick={() => handleLabels(item)}
                >
                    {item.src && (
                        <Box mr={1} sx={{ width: '32px', height: '32px' }}>
                            <CardMedia sx={{ objectFit: 'contain' }} component="img" width="18px" image={item.src} alt="alt image" />
                        </Box>
                    )}
                    <Typography
                        sx={{
                            color: theme.palette.grey[400],
                            fontFamily: 'Inter',
                            fontWeight: 500,
                            fontSize: '14px'
                        }}
                    >
                        {item.title ? item.title : item}
                    </Typography>
                </MenuItem>
            ))}
        </Select>
    );
};

export default SelectFilter;
