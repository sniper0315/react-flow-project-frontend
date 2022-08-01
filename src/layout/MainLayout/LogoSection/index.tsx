import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Avatar, Link } from '@mui/material';

// project imports
import { DASHBOARD_PATH } from 'config';
import { ReactComponent as Logo } from 'assets/images/logo.svg';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => (
    <Link component={RouterLink} to={DASHBOARD_PATH}>
        <Avatar variant="rounded" sx={{ borderRadius: '8px' }}>
            <Logo width="100%" height="100%" />
        </Avatar>
    </Link>
);

export default LogoSection;
