import { Avatar, Badge, BadgeProps, Box, styled, Typography, useTheme } from '@mui/material';
import { useSelector } from 'store';

type ActionItemProps = {
    title?: string;
    subTitle?: string;
    icon: string;
    badge?: boolean;
};

const StyledBadge = styled(Badge)<BadgeProps>((_) => ({
    '& .MuiBadge-badge': {
        width: 12,
        height: 12,
        borderRadius: '100%',
        background: '#F98B7C',
        border: `2px solid white`
    }
}));

const ActionItem = ({ title, subTitle, icon, badge }: ActionItemProps) => {
    const theme = useTheme();
    const { drawerOpen } = useSelector((state) => state.menu);
    return (
        <Box sx={{ display: 'flex' }}>
            <StyledBadge variant={badge ? 'dot' : undefined}>
                <Avatar variant="rounded" sx={{ borderRadius: '8px', width: 32, height: 32 }} src={icon} />
            </StyledBadge>
            {(title || subTitle) && (
                <Box pl={1}>
                    <Typography variant="h4" color={theme.palette.grey[400]} fontWeight={700} fontFamily="Inter">
                        {title}
                    </Typography>
                    <Typography color={theme.palette.grey[600]} fontSize="10px" fontWeight={500}>
                        {subTitle}
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default ActionItem;
