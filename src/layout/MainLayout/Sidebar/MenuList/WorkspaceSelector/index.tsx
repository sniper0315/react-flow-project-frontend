import { Typography, Box, Popover, Button, List, ListItemButton, styled, Divider, Chip, DividerProps, Link } from '@mui/material';
import { FormattedMessage, useIntl } from 'react-intl';
import React from 'react';
import { useTheme } from '@mui/material/styles';
import ActionItem from 'ui-component/workspace/ActionItem';
import { WorkSpace } from 'types';
import { IconCheck, IconChevronDown, IconLogout } from '@tabler/icons';
import { useSelector } from 'store';

type WorkspaceSelectorProps = {
    userName: string;
    currentWs: string;
    list: WorkSpace[];
    onChangeWs: Function;
};

const WorkspaceDivider = styled(Divider)<DividerProps>((_) => ({
    height: 'auto',
    '& .MuiDivider-wrapper': {
        padding: 0
    },
    '&:after': {
        width: 0
    }
}));
const WorkspaceSelector = ({ userName, currentWs, list, onChangeWs }: WorkspaceSelectorProps) => {
    const theme = useTheme();
    const intl = useIntl();

    const [anchorEl, setAnchorEl] = React.useState<any>(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const handleClickPopover = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const currentWorkSpace = list.find((item) => item.name === currentWs) ?? list[0];
    const availableList = list.filter((item) => item.name !== currentWs);
    const handleClickItem = (workspaceName: string) => {
        onChangeWs(workspaceName);
        handleClose();
    };
    const { drawerOpen } = useSelector((state) => state.menu);

    return (
        <Box sx={{ display: 'flex' }} width="100%">
            <Box width="100%">
                <Button onClick={handleClickPopover} sx={{ padding: 0, width: '100%', textAlign: 'left' }}>
                    <Box width="100%" display="flex" alignItems="center" sx={{ justifyContent: drawerOpen ? 'space-between' : 'center' }}>
                        <ActionItem
                            title={drawerOpen ? currentWorkSpace.name : undefined}
                            subTitle={drawerOpen ? currentWorkSpace.type : undefined}
                            icon={currentWorkSpace.icon}
                        />
                        {drawerOpen && <IconChevronDown size={20} strokeWidth={1.5} color={theme.palette.grey[300]} />}
                    </Box>
                </Button>
                <Popover id={id} open={open} anchorEl={anchorEl} onClose={handleClose}>
                    <Box sx={{ px: 3, py: 2, width: 320 }}>
                        <Typography variant="h5">{userName}</Typography>
                        <Box sx={{ display: 'flex', cursor: 'pointer', alignItems: 'center', justifyContent: 'space-between', py: 2 }}>
                            <ActionItem
                                title={currentWorkSpace.name}
                                subTitle={`${currentWorkSpace.unreadCnt} ${intl.formatMessage({ id: 'Unread_Notifications' })}`}
                                icon={currentWorkSpace.icon}
                            />
                            <IconCheck size={20} strokeWidth={2} color={theme.palette.grey[300]} />
                        </Box>

                        <WorkspaceDivider textAlign="right">
                            <Chip
                                label={currentWorkSpace.type}
                                sx={{
                                    background: theme.palette.grey[900],
                                    textTransform: 'uppercase',
                                    lineHeight: '100%',
                                    height: 'auto',
                                    py: '4px',
                                    fontSize: 8,
                                    letterSpacing: '0.12em'
                                }}
                                size="small"
                            />
                        </WorkspaceDivider>

                        <List>
                            {availableList.map((workspaceItem, idx) => (
                                <ListItemButton onClick={(e) => handleClickItem(workspaceItem.name)} key={idx} disableGutters>
                                    <ActionItem
                                        title={workspaceItem.name}
                                        subTitle={`${workspaceItem.unreadCnt} ${intl.formatMessage({ id: 'Unread_Notifications' })}`}
                                        icon={workspaceItem.icon}
                                        badge={workspaceItem.alert}
                                    />
                                </ListItemButton>
                            ))}
                        </List>

                        <WorkspaceDivider textAlign="right" />
                        <Link sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }} underline="none">
                            <IconLogout size={20} strokeWidth={2} color="#454B89" />
                            <Typography variant="h6">
                                <FormattedMessage id="Log_out" />
                            </Typography>
                        </Link>
                    </Box>
                </Popover>
            </Box>
        </Box>
    );
};

export default WorkspaceSelector;
