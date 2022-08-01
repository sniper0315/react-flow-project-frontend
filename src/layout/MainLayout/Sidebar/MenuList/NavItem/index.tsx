import { ForwardRefExoticComponent, RefAttributes, forwardRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Chip, ListItemButton, ListItemIcon, ListItemText, Typography, useMediaQuery } from '@mui/material';

// project imports
import useConfig from 'hooks/useConfig';
import { useDispatch, useSelector } from 'store';
import { activeItem, openDrawer } from 'store/slices/menu';

// assets
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

// types
import { LinkTarget, NavItemType } from 'types';

interface NavItemProps {
    item: NavItemType;
    level: number;
}

// ==============================|| SIDEBAR MENU LIST ITEMS ||============================== //

const NavItem = ({ item, level }: NavItemProps) => {
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down('lg'));

    const { borderRadius } = useConfig();
    const dispatch = useDispatch();
    const { openItem, drawerOpen } = useSelector((state) => state.menu);

    const Icon = item?.icon!;
    const itemIcon = item?.icon ? (
        <Icon stroke={1.5} size="1.3rem" />
    ) : (
        <FiberManualRecordIcon
            sx={{
                width: openItem.findIndex((id) => id === item?.id) > -1 ? 8 : 6,
                height: openItem.findIndex((id) => id === item?.id) > -1 ? 8 : 6
            }}
            fontSize={level > 0 ? 'inherit' : 'medium'}
        />
    );

    let itemTarget: LinkTarget = '_self';
    if (item.target) {
        itemTarget = '_blank';
    }

    let listItemProps: {
        component: ForwardRefExoticComponent<RefAttributes<HTMLAnchorElement>> | string;
        href?: string;
        target?: LinkTarget;
    } = { component: forwardRef((props, ref) => <Link ref={ref} {...props} to={item.url!} target={itemTarget} />) };
    if (item?.external) {
        listItemProps = { component: 'a', href: item.url, target: itemTarget };
    }

    const itemHandler = (id: string) => {
        dispatch(activeItem([id]));
        matchesSM && dispatch(openDrawer(false));
    };

    // active menu item on page load
    useEffect(() => {
        const currentIndex = document.location.pathname
            .toString()
            .split('/')
            .findIndex((id) => id === item.id);
        if (currentIndex > -1) {
            dispatch(activeItem([item.id!]));
        }
        // eslint-disable-next-line
    }, []);

    return (
        <ListItemButton
            {...listItemProps}
            sx={{
                borderRadius: `${borderRadius}px`,
                mb: 0.5,
                alignItems: 'flex-start',
                backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
                px: `24px`,
                py: 0,
                my: level > 1 ? 1 : 2.25,
                color: theme.palette.grey[300],
                '&.Mui-selected, &:hover, &.Mui-selected:hover': {
                    backgroundColor: 'transparent',
                    color: theme.palette.orange.main,
                    fontWeight: 700,
                    position: 'relative',
                    '&:after': {
                        content: "''",
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        height: '100%',
                        width: '3px',
                        borderTopRightRadius: '5px',
                        borderBottomRightRadius: '5px',
                        color: 'transparent',
                        background: theme.palette.orange.main
                    }
                }
            }}
            disabled={item.disabled}
            selected={openItem?.findIndex((id) => id === item.id) > -1}
            onClick={() => itemHandler(item.id!)}
        >
            <ListItemIcon
                sx={{
                    my: 'auto',
                    minWidth: !item?.icon ? 18 : 36,
                    width: drawerOpen ? 'auto' : '100%',
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                {itemIcon}
            </ListItemIcon>

            {drawerOpen && (
                <ListItemText
                    primary={
                        <Typography
                            variant={openItem?.findIndex((id) => id === item.id) > -1 ? 'h5' : 'body1'}
                            color="inherit"
                            sx={{ ...theme.typography.menuLink }}
                        >
                            {item.title}
                        </Typography>
                    }
                    secondary={
                        item.caption && (
                            <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
                                {item.caption}
                            </Typography>
                        )
                    }
                />
            )}
            {item.chip && (
                <Chip
                    color={item.chip.color}
                    variant={item.chip.variant}
                    size={item.chip.size}
                    label={item.chip.label}
                    avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
                />
            )}
        </ListItemButton>
    );
};

export default NavItem;
