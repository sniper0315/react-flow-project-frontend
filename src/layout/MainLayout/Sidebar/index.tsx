import { memo, useEffect, useMemo, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, Drawer, useMediaQuery } from '@mui/material';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MenuList from './MenuList';
import LogoSection from '../LogoSection';
import { openDrawer } from 'store/slices/menu';
import { useDispatch, useSelector } from 'store';
import { closedDrawerWidth, drawerWidth } from 'store/constant';
import { WorkSpace } from 'types';
import logoIcon from 'assets/images/logo.svg';
import WorkspaceSelector from './MenuList/WorkspaceSelector';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons';

// ==============================|| SIDEBAR DRAWER ||============================== //

interface SidebarProps {
    window?: Window;
}

const userName: string = 'Paintyn Philips';

const workspaceList: WorkSpace[] = [
    {
        name: 'Venly',
        unreadCnt: 10,
        type: 'agency',
        icon: logoIcon,
        alert: false
    },
    {
        name: 'IBM',
        unreadCnt: 56,
        type: 'client',
        icon: logoIcon,
        alert: true
    },
    {
        name: 'Nike',
        unreadCnt: 5,
        type: 'client',
        icon: logoIcon,
        alert: false
    },
    {
        name: 'Agoria',
        unreadCnt: 23,
        type: 'client',
        icon: logoIcon,
        alert: false
    }
];

const Sidebar = ({ window }: SidebarProps) => {
    const theme = useTheme();
    const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));

    const dispatch = useDispatch();
    const { drawerOpen } = useSelector((state) => state.menu);
    const [currentWs, setCurrentWs] = useState('');

    useEffect(() => {
        setCurrentWs(workspaceList[0].name);
    }, []);

    const logo = useMemo(
        () => (
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                <Box sx={{ display: 'flex', p: 2, mx: 'auto' }}>
                    <LogoSection />
                </Box>
            </Box>
        ),
        []
    );

    const drawer = useMemo(
        () => (
            <PerfectScrollbar
                component="div"
                style={{
                    // height: !matchUpMd ? 'calc(100vh - 56px)' : 'calc(100vh - 88px)',
                    borderRightWidth: 1,
                    borderRightStyle: 'solid',
                    borderColor: theme.palette.grey[500]
                }}
            >
                {/* logo & toggler button */}
                <Box
                    sx={{
                        position: 'relative',
                        width: '100%',
                        padding: 3,
                        display: 'flex',
                        borderBottomWidth: 1,
                        borderBottomStyle: 'solid',
                        borderColor: theme.palette.grey[500],
                        [theme.breakpoints.down('md')]: {
                            width: 'auto'
                        }
                    }}
                >
                    <Box sx={{ display: 'flex', flexGrow: 1 }}>
                        <WorkspaceSelector
                            userName={userName}
                            currentWs={currentWs}
                            list={workspaceList}
                            onChangeWs={(name: string) => setCurrentWs(name)}
                        />
                    </Box>
                    <Avatar
                        variant="rounded"
                        sx={{
                            ...theme.typography.commonAvatar,
                            ...theme.typography.mediumAvatar,
                            position: 'absolute',
                            right: 0,
                            transform: 'translateX(50%)',
                            overflow: 'hidden',
                            transition: 'all .2s ease-in-out',
                            border: '1px solid',
                            borderColor: theme.palette.grey[500],
                            borderRadius: '100%',
                            backgroundColor: 'white'
                        }}
                        onClick={() => dispatch(openDrawer(!drawerOpen))}
                        color="inherit"
                    >
                        {drawerOpen ? <IconChevronLeft stroke={1.5} size="1.3rem" /> : <IconChevronRight stroke={1.5} size="1.3rem" />}
                    </Avatar>
                </Box>

                <MenuList />
            </PerfectScrollbar>
        ),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [currentWs, drawerOpen, matchUpMd]
    );

    const container = window !== undefined ? () => window.document.body : undefined;

    return (
        <Box
            component="nav"
            sx={{
                flexShrink: { md: 0 },
                // eslint-disable-next-line no-nested-ternary
                width: matchUpMd ? (drawerOpen ? drawerWidth : closedDrawerWidth) : 'auto',
                borderWidth: 1,
                borderColor: theme.palette.grey[500],
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen
                })
            }}
            aria-label="mailbox folders"
        >
            <Drawer
                container={container}
                variant={matchUpMd ? 'permanent' : 'temporary'}
                anchor="left"
                open={drawerOpen}
                onClose={() => dispatch(openDrawer(!drawerOpen))}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: drawerOpen ? drawerWidth : 'auto',
                        background: theme.palette.background.default,
                        color: theme.palette.text.primary,
                        borderRight: 'none',
                        overflow: 'visible'
                        // [theme.breakpoints.up('md')]: {
                        //     top: '88px'
                        // }
                    }
                }}
                ModalProps={{ keepMounted: true }}
                color="inherit"
            >
                {drawerOpen && logo}
                {drawer}
            </Drawer>
        </Box>
    );
};

export default memo(Sidebar);
