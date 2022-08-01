import { ReactNode } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Divider, List, Typography } from '@mui/material';

// project imports
import NavItem from '../NavItem';
import NavCollapse from '../NavCollapse';
import { GenericCardProps } from 'types';
import { useSelector } from 'store';

// ==============================|| SIDEBAR MENU LIST GROUP ||============================== //

export interface NavGroupProps {
    item: {
        id?: string;
        type?: string;
        icon?: GenericCardProps['iconPrimary'];
        children?: NavGroupProps['item'][];
        title?: ReactNode | string;
        caption?: ReactNode | string;
        color?: 'primary' | 'secondary' | 'default' | undefined;
    };
}

const NavGroup = ({ item }: NavGroupProps) => {
    const theme = useTheme();

    const { drawerOpen } = useSelector((state) => state.menu);

    // menu list collapse & items
    const items = item.children?.map((menu) => {
        switch (menu.type) {
            case 'collapse':
                return <NavCollapse key={menu.id} menu={menu} level={1} />;
            case 'item':
                return <NavItem key={menu.id} item={menu} level={1} />;
            default:
                return (
                    <Typography key={menu.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                );
        }
    });

    return (
        <>
            <List
                sx={{
                    textAlign: drawerOpen ? 'left' : 'center'
                }}
                subheader={
                    item.title && (
                        <Typography
                            variant="caption"
                            sx={{
                                ...theme.typography.menuCaption,
                                px: '24px',
                                fontFamily: 'Inter',
                                letterSpacing: '0.12em',
                                textTransform: 'uppercase'
                            }}
                            display="block"
                            gutterBottom
                        >
                            {item.title}
                            {item.caption && (
                                <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
                                    {item.caption}
                                </Typography>
                            )}
                        </Typography>
                    )
                }
            >
                {items}
            </List>

            {/* group divider */}
            <Divider sx={{ mt: 0.25, mb: 3.25, ml: 3, mr: 3 }} />
        </>
    );
};

export default NavGroup;
