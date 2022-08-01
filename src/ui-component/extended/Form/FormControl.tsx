// material-ui
import { useTheme } from '@mui/material/styles';
import { Divider, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import MUIFormControl from '@mui/material/FormControl';
import { GenericCardProps } from 'types';

// ==============================|| FORM CONTROL ||============================== //

interface FormControlProps {
    captionLabel?: string;
    formState?: string;
    iconPrimary?: GenericCardProps['iconPrimary'];
    iconSecondary?: GenericCardProps['iconPrimary'];
    placeholder?: any;
    textPrimary?: string;
    textSecondary?: string;
    onChange?: any;
    value?: string;
}

const FormControl = ({
    captionLabel,
    formState,
    iconPrimary,
    iconSecondary,
    placeholder,
    textPrimary,
    textSecondary,
    onChange,
    value
}: FormControlProps) => {
    const theme = useTheme();
    const IconPrimary = iconPrimary!;
    const primaryIcon = iconPrimary ? <IconPrimary fontSize="small" sx={{ color: theme.palette.grey[700] }} /> : null;

    const IconSecondary = iconSecondary!;
    const secondaryIcon = iconSecondary ? <IconSecondary fontSize="small" sx={{ color: theme.palette.grey[700] }} /> : null;

    const errorState = formState === 'error';

    return (
        <MUIFormControl fullWidth error={errorState}>
            <InputLabel>{captionLabel}</InputLabel>
            <OutlinedInput
                placeholder={placeholder}
                type="text"
                onChange={onChange}
                value={value}
                label={captionLabel}
                sx={{ fontFamily: 'Inter', fontWeight: 400 }}
                startAdornment={
                    <>
                        {primaryIcon && <InputAdornment position="start">{primaryIcon}</InputAdornment>}
                        {textPrimary && (
                            <>
                                <InputAdornment position="start">{textPrimary}</InputAdornment>
                                <Divider sx={{ height: 28, m: 0.5, mr: 1.5 }} orientation="vertical" />
                            </>
                        )}
                    </>
                }
                endAdornment={
                    <>
                        {secondaryIcon && <InputAdornment position="end">{secondaryIcon}</InputAdornment>}
                        {textSecondary && (
                            <>
                                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                                <InputAdornment position="end">{textSecondary}</InputAdornment>
                            </>
                        )}
                    </>
                }
            />
        </MUIFormControl>
    );
};

export default FormControl;
