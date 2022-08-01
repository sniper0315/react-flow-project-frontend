import {
    Box,
    Drawer,
    Typography,
    Grid,
    Avatar,
    Popover,
    RadioGroup,
    FormControlLabel,
    Radio,
    TextField,
    MenuItem,
    Select
} from '@mui/material';
import { FormattedMessage, useIntl } from 'react-intl';
import { useTheme } from '@mui/material/styles';
import ButtonCustom from 'ui-component/extended/Button';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import edit4 from '../../../assets/images/edit4.svg';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SelectorAutocomplite from 'ui-component/SelectorAutoComplite';
import DrugAndDropFiles from 'ui-component/dragAndDropFiles';

interface DrawerAddOffersProps {
    openDivider: any;
    handleClickCloseDivider: any;
    selectedTask?: any;
}
interface LabelType {
    title: string;
    src?: string;
}
const AddTask = ({ openDivider, handleClickCloseDivider, selectedTask }: DrawerAddOffersProps) => {
    const theme = useTheme();
    const intl = useIntl();
    const [anchorEl, setAnchorEl] = React.useState<any>(null);
    const [files, setFiles] = React.useState<any>(null);
    const [clients, setClients] = React.useState<LabelType[]>([]);
    const [clientsAssigned, setClientsAssigned] = React.useState<LabelType[]>([]);
    const [pendingValue, setPendingValue] = React.useState<LabelType[]>([]);
    const [pendingValueAssigned, setPendingValueAssigned] = React.useState<LabelType[]>([]);
    const openPopover = Boolean(anchorEl);
    const id = openPopover ? 'simple-popover' : undefined;
    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
            ['link', 'image'],
            ['clean']
        ]
    };
    const formats = ['header', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent', 'link', 'image'];
    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            status: 'To Do',
            provideService: ''
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Required'),
            description: Yup.string().required('Required'),
            status: Yup.string().required('Required'),
            provideService: Yup.string().required('Required')
        }),
        onSubmit: (values) => {
            console.log(values);
        }
    });
    React.useEffect(() => {
        if (selectedTask) {
            formik.setFieldValue('title', selectedTask.taskName);
            if (selectedTask.status !== 'In Progress') formik.setFieldValue('status', selectedTask.status);
        }
    }, [selectedTask]);
    const handleClosePopover = () => {
        setAnchorEl(null);
    };
    const handleClickPopover = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const background = (status: string) => {
        let color: string;
        if (status === 'Done') {
            color = theme.palette.primary[100];
        } else if (status === 'To Do') {
            color = theme.palette.primary[300];
        } else if (status === 'Rework Required') {
            color = theme.palette.primary[400];
        } else if (status === 'In Progress') {
            color = theme.palette.primary[500];
        } else color = theme.palette.grey[900];
        return color;
    };
    const fontColor = (status: string) => {
        let color: string;
        if (status === 'Done') {
            color = theme.palette.primary[600];
        } else if (status === 'To Do') {
            color = theme.palette.primary[700];
        } else if (status === 'Rework Required') {
            color = theme.palette.primary[900];
        } else if (status === 'In Progress') {
            color = theme.palette.secondary[400];
        } else color = theme.palette.secondary[300];
        return color;
    };
    const autocompleteItems = [
        { title: 'Team member name', src: edit4 },
        { title: 'T2222', src: edit4 }
    ];
    const autocompleteItems2 = [
        { title: '2222222', src: edit4 },
        { title: 'T2222', src: edit4 }
    ];
    const deleteImg = (image: string) => {
        const arrFiles = files;
        const newArr: any = [];
        arrFiles.forEach((element: any) => {
            if (element.preview !== image) newArr.push(element);
        });
        setFiles([...newArr]);
    };
    return (
        <Drawer anchor="right" open={openDivider} onClose={handleClickCloseDivider}>
            <Box sx={{ width: { xs: '100%', sm: '562px' } }}>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container direction="column" justifyContent="space-between" sx={{ minHeight: '100vh' }}>
                        <Grid p={3} item>
                            <ArrowBackIcon
                                onClick={handleClickCloseDivider}
                                sx={{ display: { xs: 'block', sm: 'none' }, fill: '#000', fontSize: '30px', mb: '20px' }}
                            />
                            <Grid container justifyContent="space-between" alignItems="center">
                                <Grid item xs={10}>
                                    {selectedTask ? (
                                        <Typography
                                            sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 700, fontSize: '16px' }}
                                        >
                                            <FormattedMessage id="standalone_task" />
                                        </Typography>
                                    ) : (
                                        <Typography
                                            sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 700, fontSize: '16px' }}
                                        >
                                            <FormattedMessage id="add_task" />
                                        </Typography>
                                    )}
                                </Grid>
                            </Grid>
                            <Grid mt={1} mb={4} container justifyContent="space-between" alignItems="center" spacing={3}>
                                <Grid item xs={12} sm={6} display="flex" alignItems="center">
                                    <Typography
                                        sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 600, fontSize: '14px' }}
                                    >
                                        <FormattedMessage id="status" />
                                    </Typography>
                                    <Box
                                        onClick={handleClickPopover}
                                        ml={2}
                                        sx={{
                                            height: '32px',
                                            borderRadius: '16px',
                                            background: background(formik.values.status),
                                            cursor: 'pointer',
                                            display: 'flex',
                                            p: '8px 10px 8px 14px',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Typography
                                            mr={1}
                                            sx={{
                                                color: fontColor(formik.values.status),
                                                fontFamily: 'Inter',
                                                fontWeight: 500,
                                                textAlign: 'center',
                                                fontSize: '12px'
                                            }}
                                        >
                                            {formik.values.status}
                                        </Typography>
                                        <KeyboardArrowDownIcon sx={{ fill: fontColor(formik.values.status), fontSize: '18px' }} />
                                    </Box>
                                    <Popover
                                        id={id}
                                        open={openPopover}
                                        anchorEl={anchorEl}
                                        onClose={handleClosePopover}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left'
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'left'
                                        }}
                                    >
                                        <Box sx={{ p: '12px 24px' }}>
                                            <RadioGroup
                                                aria-labelledby="status"
                                                name="status"
                                                value={formik.values.status}
                                                onChange={(e) => {
                                                    formik.setFieldValue('status', e.target.value);
                                                    handleClosePopover();
                                                }}
                                            >
                                                <FormControlLabel
                                                    value="Not open yet"
                                                    control={<Radio />}
                                                    label={<FormattedMessage id="not_open_yet" />}
                                                />
                                                <FormControlLabel
                                                    value="To Do"
                                                    control={<Radio />}
                                                    label={<FormattedMessage id="to_do" />}
                                                />
                                                <FormControlLabel value="Done" control={<Radio />} label={<FormattedMessage id="done" />} />
                                                <FormControlLabel
                                                    value="Rework Required"
                                                    control={<Radio />}
                                                    label={<FormattedMessage id="rework_required" />}
                                                />
                                            </RadioGroup>
                                        </Box>
                                    </Popover>
                                </Grid>
                                <Grid item xs={6}>
                                    {' '}
                                </Grid>
                            </Grid>
                            <TextField
                                sx={{
                                    '.MuiOutlinedInput-input': {
                                        color: theme.palette.grey[300],
                                        fontWeight: 400,
                                        fontFamily: 'Inter',
                                        fontSize: '14px'
                                    }
                                }}
                                id="title"
                                name="title"
                                value={formik.values.title}
                                onChange={formik.handleChange}
                                variant="outlined"
                                fullWidth
                                placeholder={intl.formatMessage({ id: 'titleHeader' })}
                                error={formik.touched.title && Boolean(formik.errors.title)}
                                helperText={formik.touched.title && formik.errors.title}
                            />
                            <Box mt={3} mb={3}>
                                <SelectorAutocomplite
                                    arrItemSelected={clients}
                                    setArrItemsSelected={setClients}
                                    autocompleteItems={autocompleteItems}
                                    pendingValue={pendingValue}
                                    setPendingValue={setPendingValue}
                                    title="client"
                                />
                            </Box>
                            <Select
                                placeholder={intl.formatMessage({ id: 'provided_service' })}
                                sx={{
                                    '.MuiOutlinedInput-input': {
                                        color: theme.palette.grey[300],
                                        fontWeight: 400,
                                        fontFamily: 'Inter',
                                        fontSize: '14px'
                                    }
                                }}
                                fullWidth
                                value={formik.values.provideService}
                                onChange={(e) => formik.setFieldValue('provideService', e.target.value)}
                            >
                                <MenuItem
                                    sx={{
                                        fontFamily: 'Inter',
                                        fontSize: '14px',
                                        borderBottom: `1px solid ${theme.palette.grey[500]}`,
                                        p: '14px 16px'
                                    }}
                                    value={10}
                                >
                                    Ten
                                </MenuItem>
                                <MenuItem
                                    sx={{
                                        fontFamily: 'Inter',
                                        fontSize: '14px',
                                        borderBottom: `1px solid ${theme.palette.grey[500]}`,
                                        p: '14px 16px'
                                    }}
                                    value={20}
                                >
                                    Twenty
                                </MenuItem>
                                <MenuItem sx={{ fontFamily: 'Inter', fontSize: '14px', p: '14px 16px' }} value={30}>
                                    Thirty
                                </MenuItem>
                            </Select>
                            <Grid container mt={3}>
                                <Grid item xs={12} sm={6}>
                                    <Typography
                                        mb={2}
                                        sx={{
                                            color: theme.palette.grey[400],
                                            fontFamily: 'Inter',
                                            fontWeight: 600,
                                            fontSize: '14px'
                                        }}
                                    >
                                        <FormattedMessage id="owner" />
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Avatar sx={{ width: '32px', height: '32px' }} alt="Remy Sharp" src="" />
                                        <Typography
                                            ml={1}
                                            sx={{
                                                color: theme.palette.grey[400],
                                                fontFamily: 'Inter',
                                                fontWeight: 500,
                                                fontSize: '14px'
                                            }}
                                        >
                                            John Doe
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <SelectorAutocomplite
                                        arrItemSelected={clientsAssigned}
                                        setArrItemsSelected={setClientsAssigned}
                                        autocompleteItems={autocompleteItems2}
                                        pendingValue={pendingValueAssigned}
                                        setPendingValue={setPendingValueAssigned}
                                        title="task_assigned_to"
                                    />
                                </Grid>
                            </Grid>
                            <Typography
                                mt={3}
                                mb={2}
                                sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 600, fontSize: '14px' }}
                            >
                                <FormattedMessage id="attachements" />
                            </Typography>
                            <DrugAndDropFiles files={files} setFiles={setFiles} deleteImg={deleteImg} />
                            <Box
                                mt={3}
                                sx={{
                                    borderRadius: '10px',
                                    border: `1px solid ${theme.palette.grey[500]}`,
                                    minHeight: { xs: '250px', sm: '300px' }
                                }}
                            >
                                <ReactQuill
                                    modules={modules}
                                    formats={formats}
                                    theme="snow"
                                    placeholder={intl.formatMessage({ id: 'what_is_this_channel_about' })}
                                    value={formik.values.description}
                                    onChange={(e: any) => formik.setFieldValue('description', e)}
                                />
                            </Box>
                        </Grid>
                        <Grid
                            item
                            container
                            direction="column"
                            justifyContent="flex-end"
                            alignItems="flex-end"
                            sx={{ borderTop: `1px solid ${theme.palette.grey[500]}` }}
                        >
                            <Grid item p={2}>
                                <Box sx={{ display: 'flex' }}>
                                    <Box mr={2} sx={{ width: '87px' }}>
                                        <ButtonCustom
                                            onClick={handleClickCloseDivider}
                                            colorBtn="white"
                                            titleBtn={<FormattedMessage id="close" />}
                                        />
                                    </Box>
                                    <Box mr={2} sx={{ width: '130px' }}>
                                        <ButtonCustom
                                            onClick={formik.handleSubmit}
                                            colorBtn="red"
                                            titleBtn={<FormattedMessage id="create_task" />}
                                        />
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Drawer>
    );
};

export default AddTask;
