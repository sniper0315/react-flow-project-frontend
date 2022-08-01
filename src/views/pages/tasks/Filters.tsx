import { Box, Drawer, Typography, Grid, Select, MenuItem, CardMedia } from '@mui/material';
import { FormattedMessage, useIntl } from 'react-intl';
import { useTheme } from '@mui/material/styles';
import ButtonCustom from 'ui-component/extended/Button';
import React from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import edit4 from '../../../assets/images/edit4.svg';
import CheckboxFilter from 'ui-component/checkboxFilter/CheckboxFilter';
import SelectFilter from 'ui-component/selectFilter';

interface DrawerAddOffersProps {
    openDivider: boolean;
    handleClickCloseDivider: any;
}

const Filters = ({ openDivider, handleClickCloseDivider }: DrawerAddOffersProps) => {
    const theme = useTheme();
    const intl = useIntl();
    const [selectBrandValue, setSelectBrandValue] = React.useState('');
    const [selectTaskNameValue, setSelectTaskNameValue] = React.useState('');
    const [brandValue, setBrandValue] = React.useState<any>([]);
    const [taskNameValue, setTaskNameValue] = React.useState<any>([]);
    const [statusCheckboxValue, setStatusCheckboxValue] = React.useState([
        { checked: false, title: 'Not open yet' },
        { checked: false, title: 'To Do' },
        { checked: false, title: 'Done' },
        { checked: false, title: 'Rework required' }
    ]);
    const [valueStatusCheckboxValue, setValueStatusCheckboxValue] = React.useState<any>([]);
    const [typeCheckboxValue, setTypeCheckboxValue] = React.useState([
        { checked: false, title: 'Workflow run' },
        { checked: false, title: 'Standalone' }
    ]);
    const [valueTypeCheckboxValue, setValueTypeCheckboxValue] = React.useState<any>([]);

    const handleAllChecked = () => {
        setStatusCheckboxValue([
            { checked: true, title: 'Not open yet' },
            { checked: true, title: 'To Do' },
            { checked: true, title: 'Done' },
            { checked: true, title: 'Rework required' }
        ]);
        setValueStatusCheckboxValue(['Not open yet', 'To Do', 'Done', 'Rework required']);
    };
    const handleAllCheckedType = () => {
        setTypeCheckboxValue([
            { checked: true, title: 'Workflow run' },
            { checked: true, title: 'Standalone' }
        ]);
        setValueTypeCheckboxValue(['Workflow run', 'Standalone']);
    };
    const autocompleteItems2 = [
        { title: '2222222', src: edit4 },
        { title: 'T2222', src: edit4 }
    ];
    const taskNames = ['task1', 'task2'];
    const handleSelectBrand = (value: string) => {
        setSelectBrandValue(value);
    };
    const handleBrand = (value: any) => {
        const arrBrand = brandValue;
        if (!arrBrand.length) {
            arrBrand.push(value);
        } else if (arrBrand.length && JSON.stringify(arrBrand).includes(JSON.stringify(value)) === false) arrBrand.push(value);
        setBrandValue([...arrBrand]);
    };
    const deleteBrand = (item: any) => {
        const newArr: any = [];
        brandValue.forEach((element: any) => {
            if (element.title !== item.title) newArr.push(element);
        });
        setBrandValue([...newArr]);
    };
    const handleTaskName = (value: any) => {
        const arrTaskName = taskNameValue;
        if (!arrTaskName.length) {
            arrTaskName.push(value);
        } else if (arrTaskName.length && JSON.stringify(arrTaskName).includes(JSON.stringify(value)) === false) arrTaskName.push(value);
        setTaskNameValue([...arrTaskName]);
    };
    const deleteTaskName = (item: any) => {
        const newArr: any = [];
        taskNameValue.forEach((element: any) => {
            if (element !== item) newArr.push(element);
        });
        setTaskNameValue([...newArr]);
    };
    const deleteAllBrand = () => {
        setBrandValue([]);
        setSelectBrandValue('');
    };
    const deleteAllTaskName = () => {
        setTaskNameValue([]);
        setSelectTaskNameValue('');
    };
    const clearFilters = () => {
        setTaskNameValue([]);
        setBrandValue([]);
        setTypeCheckboxValue([
            { checked: false, title: 'Workflow run' },
            { checked: false, title: 'Standalone' }
        ]);
        setStatusCheckboxValue([
            { checked: false, title: 'Not open yet' },
            { checked: false, title: 'To Do' },
            { checked: false, title: 'Done' },
            { checked: false, title: 'Rework required' }
        ]);
        setValueTypeCheckboxValue([]);
        setValueStatusCheckboxValue([]);
        setSelectTaskNameValue('');
        setSelectBrandValue('');
    };
    return (
        <Drawer anchor="right" open={openDivider} onClose={handleClickCloseDivider}>
            <Box sx={{ minWidth: { xs: '100%', sm: '350px' } }}>
                <Grid container direction="column" justifyContent="space-between" sx={{ minHeight: { xs: '100%', xl: '100vh' } }}>
                    <Grid p={3} item>
                        <Grid container justifyContent="space-between" alignItems="center">
                            <Grid item xs={8}>
                                <Typography sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 700, fontSize: '16px' }}>
                                    <FormattedMessage id="filter" />
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <ButtonCustom onClick={clearFilters} colorBtn="white" titleBtn={<FormattedMessage id="clear_all" />} />
                            </Grid>
                        </Grid>
                        <Box mt={3} mb={1} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                            <Box>
                                <Typography sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 500, fontSize: '14px' }}>
                                    <FormattedMessage id="status" />
                                </Typography>
                            </Box>
                            <Box>
                                <Typography
                                    onClick={handleAllChecked}
                                    sx={{
                                        color: theme.palette.grey[400],
                                        fontFamily: 'Inter',
                                        fontWeight: 500,
                                        fontSize: '12px',
                                        cursor: 'pointer',
                                        textAlign: 'right'
                                    }}
                                >
                                    <FormattedMessage id="select_all" />
                                </Typography>
                            </Box>
                        </Box>
                        <Box pb={2} sx={{ borderBottom: `1px solid ${theme.palette.grey[500]}` }}>
                            <CheckboxFilter
                                checkboxArr={statusCheckboxValue}
                                setCheckedCheckbox={setStatusCheckboxValue}
                                setCheckboxValue={setValueStatusCheckboxValue}
                                checkboxValue={valueStatusCheckboxValue}
                            />
                        </Box>
                        <Box mt={3} mb={1} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                            <Box>
                                <Typography sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 500, fontSize: '14px' }}>
                                    <FormattedMessage id="type" />
                                </Typography>
                            </Box>
                            <Box>
                                <Typography
                                    onClick={handleAllCheckedType}
                                    sx={{
                                        color: theme.palette.grey[400],
                                        fontFamily: 'Inter',
                                        fontWeight: 500,
                                        fontSize: '12px',
                                        cursor: 'pointer',
                                        textAlign: 'right'
                                    }}
                                >
                                    <FormattedMessage id="select_all" />
                                </Typography>
                            </Box>
                        </Box>
                        <Box pb={2} sx={{ borderBottom: `1px solid ${theme.palette.grey[500]}` }}>
                            <CheckboxFilter
                                checkboxArr={typeCheckboxValue}
                                setCheckedCheckbox={setTypeCheckboxValue}
                                setCheckboxValue={setValueTypeCheckboxValue}
                                checkboxValue={valueTypeCheckboxValue}
                            />
                        </Box>
                        <Box mt={3} mb={1} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                            <Box>
                                <Typography sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 500, fontSize: '14px' }}>
                                    <FormattedMessage id="brand" />
                                </Typography>
                            </Box>
                            <Box>
                                <Typography
                                    onClick={deleteAllBrand}
                                    sx={{
                                        color: theme.palette.grey[400],
                                        fontFamily: 'Inter',
                                        fontWeight: 500,
                                        fontSize: '12px',
                                        cursor: 'pointer',
                                        textAlign: 'right'
                                    }}
                                >
                                    <FormattedMessage id="clear" />
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ m: '20px 0' }}>
                            <SelectFilter
                                value={selectBrandValue}
                                setValue={handleSelectBrand}
                                labels={autocompleteItems2}
                                handleLabels={handleBrand}
                            />
                        </Box>
                        {brandValue &&
                            brandValue.map((item: any) => (
                                <Box
                                    key={item.title}
                                    sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', m: '20px 0' }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Box mr={1} sx={{ width: '32px', height: '32px' }}>
                                            <CardMedia
                                                sx={{ objectFit: 'contain' }}
                                                component="img"
                                                width="18px"
                                                image={item.src}
                                                alt="alt image"
                                            />
                                        </Box>
                                        <Typography
                                            sx={{
                                                color: theme.palette.grey[400],
                                                fontFamily: 'Inter',
                                                fontWeight: 500,
                                                fontSize: '14px'
                                            }}
                                        >
                                            {item.title}
                                        </Typography>
                                    </Box>
                                    <ClearIcon onClick={() => deleteBrand(item)} sx={{ fontSize: '20px', cursor: 'pointer' }} />
                                </Box>
                            ))}
                        <Box mt={3} mb={1} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                            <Box>
                                <Typography sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 500, fontSize: '14px' }}>
                                    <FormattedMessage id="task_name" />
                                </Typography>
                            </Box>
                            <Box>
                                <Typography
                                    onClick={deleteAllTaskName}
                                    sx={{
                                        color: theme.palette.grey[400],
                                        fontFamily: 'Inter',
                                        fontWeight: 500,
                                        fontSize: '12px',
                                        cursor: 'pointer',
                                        textAlign: 'right'
                                    }}
                                >
                                    <FormattedMessage id="clear" />
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ m: '20px 0' }}>
                            <SelectFilter
                                value={selectTaskNameValue}
                                setValue={setSelectTaskNameValue}
                                labels={taskNames}
                                handleLabels={handleTaskName}
                            />
                        </Box>
                        {taskNameValue &&
                            taskNameValue.map((item: string) => (
                                <Box
                                    key={item}
                                    sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', m: '20px 0' }}
                                >
                                    <Typography
                                        sx={{
                                            color: theme.palette.grey[400],
                                            fontFamily: 'Inter',
                                            fontWeight: 500,
                                            fontSize: '14px'
                                        }}
                                    >
                                        {item}
                                    </Typography>

                                    <ClearIcon onClick={() => deleteTaskName(item)} sx={{ fontSize: '20px', cursor: 'pointer' }} />
                                </Box>
                            ))}
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
                                        titleBtn={<FormattedMessage id="cancel" />}
                                    />
                                </Box>
                                <Box mr={1} sx={{ width: '130px' }}>
                                    <ButtonCustom
                                        onClick={handleClickCloseDivider}
                                        colorBtn="red"
                                        titleBtn={<FormattedMessage id="apply_filter" />}
                                    />
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Drawer>
    );
};

export default Filters;
