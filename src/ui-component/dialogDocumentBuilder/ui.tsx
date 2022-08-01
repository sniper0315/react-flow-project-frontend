import { styled, Box, Button, TextareaAutosize } from '@mui/material';

export const ColumnHeader = styled(Box)(() => ({
    height: '56px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 20px',
    borderLeft: '1px solid #D4DBEA'
}));

export const ColumnBody = styled(Box)(() => ({
    borderTop: '1px solid #D4DBEA',
    borderLeft: '1px solid #D4DBEA',
    height: '700px',
    overflowY: 'auto'
}));
export const NextButton = styled(Button)(({ theme }) => ({
    fontSize: '12px',
    color: 'white',
    borderRadius: '10px',
    background: theme.palette.orange.main,
    '&:hover': {
        background: theme.palette.orange.main
    },
    height: '36px',
    minHeight: '36px'
}));

export const TwoColumnBox = styled(Box)(() => ({
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    gap: '16px'
}));

export const AddSectionButton = styled(Button)(() => ({
    marginTop: '30px',
    fontSize: '14px',
    color: '#393D4E',
    border: '2px solid #D4DBEA',
    minHeight: '42px',
    borderRadius: '21px',
    padding: '0 20px'
}));

export const SectionPaper = styled(Box)(() => ({
    width: '100%',
    padding: '16px',
    border: '1px solid #D4DBEA',
    boxShadow: '0px 10px 16px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px'
}));
export const Textarea = styled(TextareaAutosize)(({ theme }) => ({
    width: '100%',
    border: `1px solid #D4DBEA`,
    borderRadius: 8,
    padding: '16px',
    fontFamily: theme.typography.fontFamily,
    resize: 'none',
    '&::placeholder': {
        color: '#D4DBEA',
        fontFamily: theme.typography.fontFamily,
        fontWeight: 400
    },
    ':hover': {
        borderColor: theme.palette.primary.main,
        borderWidth: 1
    },
    ':focus': {
        borderColor: theme.palette.primary.main,
        borderWidth: 1,
        outline: 'none !important'
    }
}));

export default null;
