import { Box, Checkbox, Divider, FormControl, FormControlLabel, IconButton, Radio, RadioGroup, Switch, Typography } from '@mui/material';
import { useFormikContext } from 'formik';
import update from 'immutability-helper';

import { Field, FormData, Page, Section } from '../types';

import EyeShowIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import EyeHiddenIcon from '@mui/icons-material/VisibilityOffOutlined';
import { ReactComponent as ChevronDownIcon } from 'assets/images/chevron-down.svg';
import { useState } from 'react';

interface TaskFieldItemProps {
    pIdx: number;
    sIdx: number;
    fIdx: number;
    field: Field;
}

const TaskFieldItem = ({ pIdx, sIdx, fIdx, field }: TaskFieldItemProps) => {
    const { values, setValues } = useFormikContext<FormData>();

    const handleFieldHidden = () => {
        if (values.pages[pIdx].pageSections[sIdx].sectionFields[fIdx].fieldHidden !== true)
            setValues(
                update(values, {
                    pages: { [pIdx]: { pageSections: { [sIdx]: { sectionFields: { [fIdx]: { fieldHidden: { $set: true } } } } } } }
                })
            );
        else
            setValues(
                update(values, {
                    pages: { [pIdx]: { pageSections: { [sIdx]: { sectionFields: { [fIdx]: { fieldHidden: { $set: false } } } } } } }
                })
            );
    };

    const handleFieldEditable = (flag: boolean, event: React.ChangeEvent<HTMLInputElement>) => {
        setValues(
            update(values, {
                pages: { [pIdx]: { pageSections: { [sIdx]: { sectionFields: { [fIdx]: { fieldEditable: { $set: flag } } } } } } }
            })
        );
    };

    return (
        <Box
            sx={{
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                backgroundColor: field.fieldHidden ? '#EFF2FA' : 'white',
                borderRadius: '8px',
                border: '1px solid #D4DBEA'
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography sx={{ fontWeight: 600, fontSize: '14px', color: '#393D4E' }}>
                    {fIdx + 1}. {field.fieldName}
                </Typography>
                {field.fieldHidden && <Typography sx={{ fontSize: '12px' }}>HIDDEN</Typography>}
            </Box>
            <Divider />
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <Switch />
                <Typography sx={{ fontWeight: 400, fontSize: '12px' }}>Required Field</Typography>
                <FormControl sx={{ marginLeft: 'auto' }}>
                    <RadioGroup row defaultValue={field.fieldEditable ? 'edit' : 'view'}>
                        <FormControlLabel
                            value="view"
                            control={
                                <Radio
                                    onChange={(e) => handleFieldEditable(false, e)}
                                    sx={{ padding: 0 }}
                                    size="small"
                                    disabled={field.fieldHidden === true ? true : undefined}
                                />
                            }
                            label="Can view"
                            sx={{ fontSize: '12px', marginRight: '16px' }}
                        />
                        <FormControlLabel
                            value="edit"
                            control={
                                <Radio
                                    onChange={(e) => handleFieldEditable(true, e)}
                                    sx={{ padding: 0 }}
                                    size="small"
                                    disabled={field.fieldHidden === true ? true : undefined}
                                />
                            }
                            label="Can edit"
                            sx={{ fontSize: '12px', marginRight: '16px' }}
                        />
                    </RadioGroup>
                </FormControl>
                <IconButton onClick={() => handleFieldHidden()} sx={{ padding: 0, width: '24px', height: '24px' }}>
                    {field.fieldHidden ? <EyeShowIcon /> : <EyeHiddenIcon />}
                </IconButton>
            </Box>
        </Box>
    );
};

interface AutomationFieldItemProps {
    fIdx: number;
    field: Field;
    onClick?: () => void;
}

const AutomationFieldItem = ({ fIdx, field, onClick }: AutomationFieldItemProps) => (
    <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            height: '49px',
            padding: '16px 0',
            cursor: 'pointer',
            borderBottom: '1px solid #D4DBEA'
        }}
        onClick={onClick}
    >
        <Typography sx={{ fontWeight: 500, fontSize: '14px' }}>
            {fIdx + 1}. {field.fieldName}
        </Typography>
        <Typography sx={{ fontWeight: 600, fontSize: '10px', color: '#98A2B3', textTransform: 'uppercase' }}>{field.fieldType}</Typography>
    </Box>
);

interface TaskSectionItemProps {
    pIdx: number;
    sIdx: number;
    section: Section;
    hasCheckbox: boolean;
    onClick?: () => void;
}

const TaskSectionItem = ({ pIdx, sIdx, section, hasCheckbox = true, onClick }: TaskSectionItemProps) => {
    const { values, setValues } = useFormikContext<FormData>();

    const handleShowSection = () => {
        if (values.pages[pIdx].pageSections[sIdx].sectionClicked !== true)
            setValues(update(values, { pages: { [pIdx]: { pageSections: { [sIdx]: { sectionClicked: { $set: true } } } } } }));
        else setValues(update(values, { pages: { [pIdx]: { pageSections: { [sIdx]: { sectionClicked: { $set: false } } } } } }));
    };

    const handleCheckSection = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues(update(values, { pages: { [pIdx]: { pageSections: { [sIdx]: { sectionChecked: { $set: event.target.checked } } } } } }));
    };

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    height: '48px',
                    backgroundColor: '#EFF2FA',
                    borderColor: '#D4DBEA',
                    cursor: 'pointer'
                }}
                onClick={() => handleShowSection()}
            >
                {hasCheckbox && <Checkbox value={section.sectionChecked} onChange={(e) => handleCheckSection(e)} />}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', width: '100%' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ fontWeight: 600, fontSize: '14px', color: '#677487' }}>↳ </Typography>
                        <Typography sx={{ fontWeight: 600, fontSize: '14px', color: '#393D4E' }}>{section.sectionName}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ fontWeight: 600, fontSize: '12px' }}>{section.sectionFields.length} Fields</Typography>
                        <ChevronDownIcon />
                    </Box>
                </Box>
            </Box>
            {section.sectionClicked &&
                (hasCheckbox ? (
                    <Box sx={{ padding: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '16px' }}>
                            <Switch />
                            <Typography sx={{ fontWeight: 500, fontSize: '12px' }}>Can Comment</Typography>
                        </Box>
                        {section.sectionFields.map((field, fIdx) => (
                            <TaskFieldItem pIdx={pIdx} sIdx={sIdx} fIdx={fIdx} field={field} />
                        ))}
                    </Box>
                ) : (
                    <Box sx={{ margin: '16px 0', padding: '8px 16px' }}>
                        {section.sectionFields.map((field, fIdx) => (
                            <AutomationFieldItem fIdx={fIdx} field={field} onClick={onClick} />
                        ))}
                    </Box>
                ))}
        </>
    );
};

interface TaskPageItemProps {
    pIdx: number;
    page: Page;
    hasCheckbox?: boolean;
    onClick?: () => void;
}

const TaskPageItem = ({ pIdx, page, hasCheckbox = true, onClick }: TaskPageItemProps) => {
    const { values, setValues } = useFormikContext<FormData>();

    const handleShowPage = () => {
        if (values.pages[pIdx].pageClicked !== true) setValues(update(values, { pages: { [pIdx]: { pageClicked: { $set: true } } } }));
        else setValues(update(values, { pages: { [pIdx]: { pageClicked: { $set: false } } } }));
    };

    const handleCheckPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues(update(values, { pages: { [pIdx]: { pageChecked: { $set: event.target.checked } } } }));
    };

    return (
        <>
            <Box
                sx={{ display: 'flex', alignItems: 'center', height: '48px', backgroundColor: '#F9FAFB', cursor: 'pointer' }}
                onClick={() => handleShowPage()}
            >
                {hasCheckbox && <Checkbox value={page.pageChecked} onChange={(e) => handleCheckPage(e)} />}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', width: '100%' }}>
                    <Typography sx={{ fontWeight: 600, fontSize: '14px' }}>{page.pageName}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Typography sx={{ fontWeight: 600, fontSize: '12px' }}>{page.pageSections.length} Sections</Typography>
                        <ChevronDownIcon />
                    </Box>
                </Box>
            </Box>
            {page.pageClicked &&
                page.pageSections.map((section, sIdx) => (
                    <TaskSectionItem pIdx={pIdx} sIdx={sIdx} section={section} hasCheckbox={hasCheckbox} onClick={onClick} />
                ))}
        </>
    );
};

export default TaskPageItem;
