// material-ui
import { Box, CardMedia } from '@mui/material';

// project imports
import MobileSection from './MobileSection';
import LocalizationSection from './LocalizationSection';
import AIToolsSection from './AIToolsSection';

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = () => (
    <>
        {/* header search */}
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ flexGrow: 1 }} />

        {/* mega-menu */}

        <Box>
            <AIToolsSection />
        </Box>

        {/* live customization & localization */}
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <LocalizationSection />
        </Box>

        {/* notification & profile */}

        {/* mobile header */}
        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
            <MobileSection />
        </Box>
    </>
);

export default Header;
