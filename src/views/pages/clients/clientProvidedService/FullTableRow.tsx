import * as React from 'react';
import Box from '@mui/material/Box';
import {
    Popover,
    Avatar,
    CardMedia,
    Dialog,
    TableCell,
    TableRow,
    Typography,
    Checkbox,
    FormControlLabel,
    Radio,
    RadioGroup
} from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { useTheme } from '@mui/material/styles';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import edit4 from '../../../../assets/images/edit4.svg';
import zapoff from '../../../../assets/images/zapoff.svg';
import DIalogCongirm from 'ui-component/dialogConfirm';
import moment from 'moment';
import ProvidedServicesDrawer from '../ProvidedServicesDrawer';
import AutoCompliteClients from '../AutocompleteClients';
import { useMutation } from '@apollo/client';
import { CHANGE_PROJECT_STATUS } from 'services/graphQL/mutations';
import { STATUS_ACTIVE, STATUS_INACTIVE } from 'utils/constants';

interface LabelType {
    title: string;
    src?: string;
}

const FullTableRow = ({ isItemSelected, labelId, row, selected, setSelected, availableTeamMembers }: any) => {
    const [changeStatus] = useMutation(CHANGE_PROJECT_STATUS, {
        onCompleted: (data: any) => {
            console.log('createOffer', data);
        },
        onError: (error: any) => {
            console.log(error);
        }
    });
    const theme = useTheme();
    const [openDivider, setOpenDivider] = React.useState(false);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<any>(null);
    const [anchorElStatus, setAnchorElStatus] = React.useState<any>(null);
    const [anchorElAddTeam, setAnchorElAddTeam] = React.useState<any>(null);
    const [nameOffers, setNameOffers] = React.useState<any>();
    const [valueRadioStatus, setValueRadioStatus] = React.useState('running');
    const openStatus = Boolean(anchorElStatus);
    const idStatus = openStatus ? 'simple-popover' : undefined;
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const openAddTeam = Boolean(anchorElAddTeam);
    const idAddTeam = openAddTeam ? 'simple-popover' : undefined;
    const [pendingValue, setPendingValue] = React.useState<LabelType[]>([]);
    console.log('pending value called', pendingValue);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValueRadioStatus((event.target as HTMLInputElement).value);
        changeStatus({
            variables: {
                projectId: row.id,
                status: (event.target as HTMLInputElement).value === 'running' ? STATUS_ACTIVE : STATUS_INACTIVE
            }
        });
        handleCloseStatus();
    };

    const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected: readonly string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }

        setSelected(newSelected);
    };

    React.useEffect(() => {
        if (row && row.status) {
            setValueRadioStatus('running');
        } else setValueRadioStatus('stopped');
    }, []);
    const handleClickPopoverStatus = (event: any) => {
        setAnchorElStatus(event.currentTarget);
    };
    const handleCloseStatus = () => {
        setAnchorElStatus(null);
    };
    const handleClosePopoverAddTeam = () => {
        setAnchorElAddTeam(null);
    };
    const handleClickPopoverAddTeam = (event: any) => {
        setAnchorElAddTeam(event.currentTarget);
    };
    const handleClickPopover = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClickCloseDivider = () => {
        setOpenDivider(false);
    };
    const handleClickDelete = () => {
        handleClickOpen();
        handleClose();
    };
    const handleClickOpen = () => {
        setOpenDialog(true);
    };
    const handleOpenDivider = () => {
        setOpenDivider(true);
    };
    const handleClickPopoverView = (itemOffers: any) => {
        setNameOffers(itemOffers);
        handleOpenDivider();
        handleClosePopover();
    };
    const handleClosePopover = () => {
        setAnchorEl(null);
    };
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    return (
        <TableRow hover role="checkbox" aria-checked={isItemSelected} tabIndex={-1} key={row.name} selected={isItemSelected}>
            <TableCell padding="checkbox" sx={{ pt: '18px' }}>
                <Checkbox
                    onClick={(event) => handleClick(event, row.name)}
                    color="primary"
                    checked={isItemSelected}
                    inputProps={{
                        'aria-labelledby': labelId
                    }}
                />
            </TableCell>
            <TableCell align="left" sx={{ pt: '35px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ width: '32px', height: '32px' }} alt="Remy Sharp" src={row.src} />
                    <Typography ml={1} sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 500 }}>
                        {row.name}
                    </Typography>
                </Box>
            </TableCell>
            <TableCell component="th" scope="row" sx={{ pt: '35px' }}>
                <Box sx={{ display: 'flex' }}>
                    <Box sx={{ display: 'flex' }}>
                        {row.teamMembers.map(
                            (client: any, indexClient: number) =>
                                indexClient < 3 && (
                                    <Box key={indexClient + 1} sx={{ width: '32px', mr: indexClient + 1 > 0 ? '-12px' : 0 }}>
                                        <Avatar sx={{ width: '32px', height: '32px' }} alt="Remy Sharp" src={client.src} />
                                    </Box>
                                )
                        )}
                        {row.teamMembers.length > 3 && (
                            <Box
                                sx={{
                                    background: theme.palette.grey[700],
                                    borderRadius: '100px',
                                    width: '32px',
                                    zIndex: 2,
                                    border: `2px solid ${theme.palette.background.paper}`,
                                    p: '5px 0 0 4px'
                                }}
                            >
                                <Typography sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 600 }}>
                                    {`+${row.teamMembers.length - 3}`}
                                </Typography>
                            </Box>
                        )}
                    </Box>
                    <Box sx={{ borderRight: `1px solid ${theme.palette.grey[500]}`, m: '0 5px' }}>
                        <Typography sx={{ color: theme.palette.grey[500], fontFamily: 'Inter', fontWeight: 600, display: 'none' }}>
                            a
                        </Typography>
                    </Box>
                    <AutoCompliteClients labels={availableTeamMembers} pendingValue={pendingValue} setPendingValue={setPendingValue} />
                </Box>
            </TableCell>
            <TableCell align="left" sx={{ pt: '30px' }}>
                <Box sx={{ display: 'flex' }}>
                    <Box sx={{ borderRadius: '72px', p: '8px 16px', background: 'rgba(33, 150, 243, 0.08)' }}>
                        <Typography sx={{ color: '#2196F3', fontFamily: 'Inter', fontWeight: 500 }}>
                            <FormattedMessage id={valueRadioStatus} />
                        </Typography>
                    </Box>
                    <Box sx={{ borderRight: `1px solid ${theme.palette.grey[500]}`, m: '0 5px' }}>
                        <Typography sx={{ color: theme.palette.grey[500], fontFamily: 'Inter', fontWeight: 600, display: 'none' }}>
                            a
                        </Typography>
                    </Box>
                    <Box
                        onClick={handleClickPopoverStatus}
                        sx={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '100px',
                            background: theme.palette.grey[700],
                            cursor: 'pointer'
                        }}
                    >
                        <Box sx={{ width: '16px', m: '8px 0 0 8px' }}>
                            <CardMedia sx={{ objectFit: 'contain' }} component="img" image={edit4} alt="alt image" />
                        </Box>
                    </Box>
                    <Popover
                        id={idStatus}
                        open={openStatus}
                        anchorEl={anchorElStatus}
                        onClose={handleCloseStatus}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right'
                        }}
                    >
                        <Box sx={{ p: '20px' }}>
                            <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value={valueRadioStatus}
                                onChange={handleChange}
                            >
                                <FormControlLabel
                                    color="secondary"
                                    value="running"
                                    control={<Radio />}
                                    label={<FormattedMessage id="running" />}
                                />
                                <FormControlLabel
                                    color="secondary"
                                    value="stopped"
                                    control={<Radio />}
                                    label={<FormattedMessage id="stopped" />}
                                />
                            </RadioGroup>
                        </Box>
                    </Popover>
                </Box>
            </TableCell>
            <TableCell align="left" sx={{ pt: '30px' }}>
                <Typography sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 600 }}>
                    {moment(row.date).format('DD MMMM, YYYY')}
                </Typography>
            </TableCell>
            <TableCell align="right" sx={{ pt: '30px' }}>
                <Typography
                    onClick={handleClickPopover}
                    sx={{
                        color: theme.palette.grey[400],
                        fontFamily: 'Inter',
                        fontWeight: 600,
                        fontSize: '26px',
                        m: '-10px 20px 0 0',
                        cursor: 'pointer',
                        zIndex: 111
                    }}
                >
                    ...
                </Typography>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClosePopover}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left'
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center'
                    }}
                >
                    <Box sx={{ p: '24px' }}>
                        <Box onClick={() => handleClickPopoverView(row)} sx={{ display: 'flex', cursor: 'pointer', alignItems: 'center' }}>
                            <VisibilityOutlinedIcon sx={{ width: '20px' }} />
                            <Typography
                                sx={{
                                    color: theme.palette.grey[400],
                                    fontFamily: 'Inter',
                                    fontWeight: 500,
                                    fontSize: '14px',
                                    ml: '10px'
                                }}
                            >
                                <FormattedMessage id="view" />
                            </Typography>
                        </Box>
                        <Box onClick={handleClickDelete} mt={1} sx={{ display: 'flex', cursor: 'pointer', alignItems: 'center' }}>
                            <CardMedia sx={{ objectFit: 'contain' }} component="img" width="18px" image={zapoff} alt="alt image" />
                            <Typography
                                sx={{
                                    color: theme.palette.grey[400],
                                    fontFamily: 'Inter',
                                    fontWeight: 500,
                                    fontSize: '14px',
                                    ml: '12px'
                                }}
                            >
                                <FormattedMessage id="deactivate" />
                            </Typography>
                        </Box>
                    </Box>
                </Popover>
            </TableCell>
            <Dialog sx={{ '.MuiDialog-paper': { minWidth: { xs: '350px', sm: '562px' } } }} onClose={handleCloseDialog} open={openDialog}>
                <DIalogCongirm onConfirm={handleCloseDialog} onClose={handleCloseDialog} />
            </Dialog>
            <ProvidedServicesDrawer
                openDivider={openDivider}
                handleClickCloseDivider={handleClickCloseDivider}
                item={nameOffers}
                autocompleteItems={availableTeamMembers}
            />
        </TableRow>
    );
};
export default FullTableRow;
