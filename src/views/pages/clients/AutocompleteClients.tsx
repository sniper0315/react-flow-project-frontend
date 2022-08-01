import * as React from 'react';
import { useTheme, styled } from '@mui/material/styles';
import Popper from '@mui/material/Popper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Autocomplete, { AutocompleteCloseReason, autocompleteClasses } from '@mui/material/Autocomplete';
import InputBase from '@mui/material/InputBase';
import { Box, Avatar, Typography } from '@mui/material';
import ButtonCustom from 'ui-component/extended/Button';
import { FormattedMessage, useIntl } from 'react-intl';
import SearchIcon from '@mui/icons-material/Search';

interface PopperComponentProps {
    anchorEl?: any;
    disablePortal?: boolean;
    open: boolean;
}
const StyledAutocompletePopper = styled('div')(({ theme }) => ({
    [`& .${autocompleteClasses.paper}`]: {
        boxShadow: 'none',
        margin: 0,
        color: 'inherit',
        fontSize: 13
    },
    [`& .${autocompleteClasses.listbox}`]: {
        backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#1c2128',
        padding: 0,
        [`& .${autocompleteClasses.option}`]: {
            minHeight: 'auto',
            alignItems: 'flex-start',
            padding: 16,
            borderTop: `1px solid ${theme.palette.grey[500]}`,
            '&[aria-selected="true"]': {
                backgroundColor: 'transparent'
            },
            [`&.${autocompleteClasses.focused}, &.${autocompleteClasses.focused}[aria-selected="true"]`]: {
                backgroundColor: theme.palette.action.hover
            }
        }
    },
    [`&.${autocompleteClasses.popperDisablePortal}`]: {
        position: 'relative'
    }
}));

function PopperComponent(props: PopperComponentProps) {
    const { disablePortal, anchorEl, open, ...other } = props;
    return <StyledAutocompletePopper {...other} />;
}

const StyledPopper = styled(Popper)(({ theme }) => ({
    border: `1px solid ${theme.palette.grey[500]} !important`,
    borderRadius: 8,
    width: '352px',
    zIndex: theme.zIndex.modal,
    fontSize: 13,
    color: theme.palette.mode === 'light' ? '#24292e' : '#c9d1d9',
    backgroundColor: `${theme.palette.background.paper} !important`,
    '.MuiAutocomplete-popper': {
        width: '350px !important',
        borderRadius: '0px !important',
        boxShadow: 'none !important'
    },
    '.MuiAutocomplete-paper': {
        borderRadius: '0 0 8px 8px'
    }
}));

const StyledInput = styled(InputBase)(({ theme }) => ({
    padding: 10,
    width: 'calc(100% - 34px)',
    borderBottom: `none`,
    '& input': {
        borderRadius: 4,
        backgroundColor: theme.palette.background.paper,
        padding: 8,
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        border: `none`,
        fontSize: 14,
        '&:focus': {
            boxShadow: `none`,
            borderColor: 'none'
        }
    }
}));

interface AutoCompliteClientsProps {
    labels: any;
    buttonOpen?: boolean;
    pendingValue: any;
    setPendingValue: any;
    width?: boolean;
    setClients?: any;
    clients?: any;
}
export default function AutoCompliteClients({
    labels,
    buttonOpen,
    pendingValue,
    setPendingValue,
    width,
    setClients,
    clients
}: AutoCompliteClientsProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [value, setValue] = React.useState<LabelType[]>([]);
    const intl = useIntl();
    const theme = useTheme();
    React.useEffect(() => {
        setValue(labels);
    }, []);

    console.log('labels', labels);

    const handleValue = (valueAutocomplete: any) => {
        if (clients) {
            const arrClients = clients;
            if (!arrClients.length) {
                arrClients.push(valueAutocomplete);
            } else if (arrClients.length && JSON.stringify(arrClients).includes(JSON.stringify(valueAutocomplete)) === false)
                arrClients.push(valueAutocomplete);
            setClients([...arrClients]);
        }
        console.log(valueAutocomplete);
    };
    const handleClose = () => {
        setValue(pendingValue);
        if (anchorEl) {
            anchorEl.focus();
        }
        setAnchorEl(null);
    };
    const handleClickPopoverAddTeam = (event: any) => {
        console.log('handleclickpopoveraddteam called');
        setPendingValue(value);
        setAnchorEl(event.currentTarget);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'github-label' : undefined;

    return (
        <Box>
            <Box>
                {buttonOpen ? (
                    <Box sx={{ width: { xs: '100%', sm: '207px' } }}>
                        <ButtonCustom
                            onClick={handleClickPopoverAddTeam}
                            titleBtn={
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography
                                        sx={{
                                            color: theme.palette.background.paper,
                                            fontWeight: 500,
                                            fontFamily: 'Inter',
                                            fontSize: '20px',
                                            m: '-3px 5px 0 0'
                                        }}
                                    >
                                        +
                                    </Typography>
                                    <Typography sx={{ fontWeight: 500, fontFamily: 'Inter' }}>
                                        <FormattedMessage id="add_provided_service" />
                                    </Typography>
                                </Box>
                            }
                            colorBtn="red"
                        />
                    </Box>
                ) : (
                    <Box
                        onClick={handleClickPopoverAddTeam}
                        sx={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '100px',
                            background: theme.palette.grey[700],
                            cursor: 'pointer',
                            display: 'flex',
                            alignItmes: 'center'
                        }}
                    >
                        <Typography
                            sx={{
                                color: theme.palette.grey[400],
                                fontFamily: 'Inter',
                                fontWeight: 300,
                                fontSize: '30px',
                                m: '-6px 0 0 6px'
                            }}
                        >
                            +
                        </Typography>
                    </Box>
                )}
            </Box>

            <StyledPopper id={id} open={open} anchorEl={anchorEl} placement="bottom-start">
                <ClickAwayListener onClickAway={handleClose}>
                    <div>
                        <Autocomplete
                            sx={{ width: width ? '300px' : '352px' }}
                            open
                            multiple
                            onClose={(event: React.ChangeEvent<{}>, reason: AutocompleteCloseReason) => {
                                if (reason === 'escape') {
                                    handleClose();
                                }
                            }}
                            value={pendingValue}
                            onChange={(event, newValue, reason) => {
                                if (
                                    event.type === 'keydown' &&
                                    (event as React.KeyboardEvent).key === 'Backspace' &&
                                    reason === 'removeOption'
                                ) {
                                    return;
                                }
                                // setPendingValue(newValue);
                                handleClose();
                            }}
                            disableCloseOnSelect
                            PopperComponent={PopperComponent}
                            renderTags={() => null}
                            noOptionsText="No labels"
                            renderOption={(props, option) => (
                                <li {...props}>
                                    <Box onClick={() => handleValue(option)} sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                        {/* {option.icon && ( */}
                                        <Box
                                            sx={{
                                                width: 32,
                                                height: 32,
                                                flexShrink: 0,
                                                borderRadius: '3px',
                                                mr: 1,
                                                mt: '2px',
                                                ml: '10px'
                                            }}
                                        >
                                            <Avatar sx={{ width: '32px', height: '32px' }} alt="Remy Sharp" src={option.icon} />
                                        </Box>
                                        {/* )} */}
                                        <Box
                                            sx={{
                                                flexGrow: 1,
                                                '& span': {
                                                    color: theme.palette.grey[200]
                                                }
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    color: theme.palette.grey[400],
                                                    fontFamily: 'Inter',
                                                    fontWeight: 500,
                                                    ml: buttonOpen ? '8px' : '0px',
                                                    mt: buttonOpen ? '0px' : '10px'
                                                }}
                                            >
                                                {option.firstName}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </li>
                            )}
                            options={[...labels].sort((a, b) => {
                                // Display the selected labels first.
                                let ai = value.indexOf(a);
                                ai = ai === -1 ? value.length + labels.indexOf(a) : ai;
                                let bi = value.indexOf(b);
                                bi = bi === -1 ? value.length + labels.indexOf(b) : bi;
                                return ai - bi;
                            })}
                            getOptionLabel={(option) => option.firstName}
                            renderInput={(params) => (
                                <Box sx={{ display: 'flex', width: '352px', alignItem: 'center' }}>
                                    <SearchIcon
                                        sx={{
                                            m: '15px 0 0 20px',
                                            fill: theme.palette.grey[200]
                                        }}
                                    />
                                    <StyledInput
                                        ref={params.InputProps.ref}
                                        inputProps={params.inputProps}
                                        autoFocus
                                        placeholder={intl.formatMessage({ id: 'start_typing_team_member_name' })}
                                    />
                                </Box>
                            )}
                        />
                    </div>
                </ClickAwayListener>
            </StyledPopper>
        </Box>
    );
}

interface LabelType {
    firstName: string;
    icon?: string;
}

// From https://github.com/abdonrd/github-labels
