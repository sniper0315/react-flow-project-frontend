import * as React from 'react';
import { TableCell, TableHead, TableRow, Typography, Checkbox } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { useTheme } from '@mui/material/styles';

interface EnhancedTableProps {
    numSelected: number;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    rowCount: number;
}

const EnhancedTableHead = (props: EnhancedTableProps) => {
    const { onSelectAllClick, numSelected, rowCount } = props;
    const theme = useTheme();

    return (
        <TableHead sx={{ borderBottom: `1px solid ${theme.palette.grey[500]}`, background: theme.palette.grey[700] }}>
            <TableRow>
                <TableCell padding="checkbox" sx={{ background: theme.palette.grey[900], borderRadius: '8px 0 0 0' }}>
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts'
                        }}
                    />
                </TableCell>
                <TableCell align="left">
                    {' '}
                    <Typography sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 600 }}>
                        <FormattedMessage id="name" />
                    </Typography>
                </TableCell>
                <TableCell align="left">
                    <Typography sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 600 }}>
                        <FormattedMessage id="team" />
                    </Typography>
                </TableCell>
                <TableCell align="left">
                    <Typography sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 600 }}>
                        <FormattedMessage id="status" />
                    </Typography>
                </TableCell>
                <TableCell align="left">
                    <Typography sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 600 }}>
                        <FormattedMessage id="date_added" />
                    </Typography>
                </TableCell>
                <TableCell align="left">
                    <Typography sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 600, display: 'none' }}>
                        <FormattedMessage id="date_added" />
                    </Typography>
                </TableCell>
            </TableRow>
        </TableHead>
    );
};

export default EnhancedTableHead;
