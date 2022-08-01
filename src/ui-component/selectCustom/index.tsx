import { Select, MenuItem, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface SelectProps {
    labels: any;
    setValue: any;
    value: string;
}
const SelectCustom = ({ value, setValue, labels }: SelectProps) => {
    const theme = useTheme();

    return (
        <Select
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
            {labels.map((item: string) => (
                <MenuItem
                    key={item}
                    sx={{
                        borderBottom: `1px solid ${theme.palette.grey[500]}`,
                        p: '14px 16px'
                    }}
                    value={item}
                >
                    <Typography
                        sx={{
                            color: theme.palette.grey[400],
                            fontFamily: 'Inter',
                            fontWeight: 500,
                            fontSize: '14px'
                        }}
                    >
                        {item}
                    </Typography>
                </MenuItem>
            ))}
        </Select>
    );
};

export default SelectCustom;
