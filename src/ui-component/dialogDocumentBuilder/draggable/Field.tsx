import { Box, Button, Checkbox, TextField, InputAdornment, useTheme, Typography } from '@mui/material';
import { useIntl } from 'react-intl';
import update from 'immutability-helper';
import { ReactComponent as DragThumbIcon } from 'assets/images/dragThumb.svg';
import { ReactComponent as UploadIcon } from 'assets/images/upload.svg';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useState, useContext, memo, useCallback, useRef } from 'react';
import SelectCustom from 'ui-component/selectCustom';
import { Textarea } from '../ui';
import DropdownItem from './dropdownItem';
import { DocumentBuilderContext, Field, FIELD_TYPE, ItemTypes, Page, FormData } from '../types';
import { useFormikContext } from 'formik';
import { useDrag, useDrop } from 'react-dnd';

interface FieldProps {
    fieldIndex: number;
    sectionIndex: number;
    moveField: (field: Field, to: number) => void;
    findField: (field: Field) => { index: number };
    onHover: (index: number) => void;
}
interface FieldHeaderProps {
    title: string;
}
const FieldHeader = ({ title }: FieldHeaderProps) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px', width: '460px', margin: '0 0 8px 30px' }}>
        <Box sx={{ fontWeight: 500, width: '100px' }}>{title}</Box>
        <Box sx={{ width: '100%', height: '1px', backgroundColor: '#E0E0E0' }}> </Box>
    </Box>
);

export interface FieldItemData {
    field: Field;
    originalIndex: number;
}

const FieldElement = memo(({ fieldIndex, sectionIndex, moveField, findField, onHover }: FieldProps) => {
    const theme = useTheme();
    const intl = useIntl();
    const [active, setActive] = useState<boolean>(false);
    const { pageIndex } = useContext(DocumentBuilderContext);
    const { values, setValues, handleChange } = useFormikContext<FormData>();
    const fieldData = values.pages[pageIndex].pageSections[sectionIndex].sectionFields[fieldIndex];
    const ref = useRef<HTMLDivElement>(null);

    const originalIndex = findField(fieldData).index;
    const [{ isDragging }, drag] = useDrag(
        () => ({
            type: ItemTypes.FIELD,
            item: { field: fieldData, originalIndex },
            collect: (monitor) => ({
                isDragging: monitor.isDragging()
            }),
            end: (item, monitor) => {
                const { field: droppedSection, originalIndex: idx } = item;
                const didDrop = monitor.didDrop();
                if (!didDrop) {
                    moveField(droppedSection, idx);
                }
            }
        }),
        [fieldData, originalIndex, moveField]
    );

    const items = values.pages[pageIndex].pageSections[sectionIndex].sectionFields[fieldIndex]?.fieldItems ?? [];

    const [, drop] = useDrop(
        () => ({
            accept: ItemTypes.FIELD,
            hover({ field: draggedField }: FieldItemData) {
                if (draggedField !== fieldData) {
                    const { index: overIndex } = findField(fieldData);
                    moveField(draggedField, overIndex);
                }
            }
        }),
        [findField, moveField]
    );

    const [, newFieldDrop] = useDrop(
        () => ({
            accept: ItemTypes.FIELD_NEW,
            hover({ field: draggedField }: FieldItemData) {
                console.log('fieldTypeHover', draggedField, fieldIndex);
                onHover(fieldIndex);
            }
        }),
        [onHover, fieldIndex, values]
    );

    const findItem = useCallback(
        (item: string) => {
            console.log('findItem', item);
            return {
                item,
                index: items.indexOf(item)
            };
        },
        [items]
    );

    const moveItem = useCallback(
        (item: string, atIndex: number) => {
            const { item: resItem, index } = findItem(item);
            setValues(
                update(values, {
                    pages: {
                        [pageIndex]: {
                            pageSections: {
                                [sectionIndex]: {
                                    sectionFields: {
                                        [fieldIndex]: {
                                            fieldItems: {
                                                $splice: [
                                                    [index, 1],
                                                    [atIndex, 0, resItem]
                                                ]
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                })
            );
        },
        [findItem, items, setValues]
    );

    const [, tableItemDrop] = useDrop(() => ({ accept: ItemTypes.TABLE_ITEM }));

    const [, dropdownItemDrop] = useDrop(() => ({ accept: ItemTypes.DROPDOWN_ITEM }));

    const handleMouseEnter = () => {
        setActive(true);
    };
    const handleMouseOut = () => {
        setActive(false);
    };
    const handleDeleteField = () => {
        setValues(
            update(values, {
                pages: { [pageIndex]: { pageSections: { [sectionIndex]: { sectionFields: { $splice: [[fieldIndex, 1]] } } } } }
            })
        );
    };
    const handleCurrentChange = (type: FIELD_TYPE) => {
        const updateData: Field = {
            fieldType: type,
            fieldName: '',
            fieldValue: '',
            fieldItems: type === FIELD_TYPE.TABLE || type === FIELD_TYPE.DROPDOWN ? ['', ''] : undefined,
            fieldTime: Date.now()
        };
        setValues(
            update(values, {
                pages: {
                    [pageIndex]: { pageSections: { [sectionIndex]: { sectionFields: { [fieldIndex]: { $set: updateData } } } } }
                }
            })
        );
    };

    drag(newFieldDrop(ref));
    return (
        <Box ref={ref} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseOut} sx={{ margin: '24px 12px' }}>
            {fieldData.fieldType === FIELD_TYPE.DROPDOWN && <FieldHeader title="Dropdown" />}
            {fieldData.fieldType === FIELD_TYPE.TICKBOX && <FieldHeader title="Tick Box" />}
            {fieldData.fieldType === FIELD_TYPE.TABLE && <FieldHeader title="Table" />}
            <Box ref={drop}>
                <Box sx={{ position: 'relative', display: 'flex', alignItems: 'flex-start', gap: '16px', padding: '0 30px' }}>
                    {active && <DragThumbIcon style={{ position: 'absolute', left: 0, top: '14px', cursor: 'pointer' }} />}
                    <Box sx={{ flex: 1 }}>
                        {fieldData.fieldType !== FIELD_TYPE.TICKBOX && (
                            <TextField
                                sx={{
                                    '.MuiOutlinedInput-input': {
                                        color: theme.palette.grey[300],
                                        fontWeight: 400,
                                        fontFamily: 'Inter',
                                        fontSize: '14px'
                                    }
                                }}
                                name={`pages[${pageIndex}].pageSections[${sectionIndex}].sectionFields[${fieldIndex}].fieldName`}
                                value={values.pages[pageIndex].pageSections[sectionIndex].sectionFields[fieldIndex].fieldName}
                                onChange={handleChange}
                                variant="outlined"
                                fullWidth
                                placeholder="Name of Field"
                            />
                        )}
                        {fieldData.fieldType === FIELD_TYPE.TICKBOX && (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Checkbox
                                    name={`pages[${pageIndex}].pageSections[${sectionIndex}].sectionFields[${fieldIndex}].fieldValue`}
                                    value={values.pages[pageIndex].pageSections[sectionIndex].sectionFields[fieldIndex].fieldValue}
                                    onChange={handleChange}
                                />
                                <TextField
                                    sx={{
                                        '.MuiOutlinedInput-input': {
                                            color: theme.palette.grey[300],
                                            fontWeight: 400,
                                            fontFamily: 'Inter',
                                            fontSize: '14px'
                                        }
                                    }}
                                    name={`pages[${pageIndex}].pageSections[${sectionIndex}].sectionFields[${fieldIndex}].fieldName`}
                                    value={values.pages[pageIndex].pageSections[sectionIndex].sectionFields[fieldIndex].fieldName}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                    placeholder="Name of Field"
                                    // error={formik.touched.email && Boolean(formik.errors.email)}
                                    // helperText={formik.touched.email && formik.errors.email}
                                />
                            </Box>
                        )}
                    </Box>
                    <Box sx={{ width: '300px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                        {active && (
                            <>
                                <SelectCustom
                                    value={fieldData.fieldType}
                                    setValue={handleCurrentChange}
                                    labels={Object.values(FIELD_TYPE)}
                                />
                                <RemoveCircleOutlineIcon sx={{ cursor: 'pointer' }} onClick={handleDeleteField} />
                            </>
                        )}
                    </Box>
                </Box>
                <Box sx={{ flex: 1, margin: '10px 345px 8px 30px' }}>
                    {fieldData.fieldType === FIELD_TYPE.TEXT && typeof fieldData.fieldValue === 'string' && (
                        <TextField
                            sx={{
                                '.MuiOutlinedInput-input': {
                                    color: theme.palette.grey[300],
                                    fontWeight: 400,
                                    fontFamily: 'Inter',
                                    fontSize: '14px'
                                }
                            }}
                            name={`pages[${pageIndex}].pageSections[${sectionIndex}].sectionFields[${fieldIndex}].fieldValue`}
                            value={values.pages[pageIndex].pageSections[sectionIndex].sectionFields[fieldIndex].fieldValue}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            placeholder={intl.formatMessage({ id: 'section_name' })}
                            // error={formik.touched.email && Boolean(formik.errors.email)}
                            // helperText={formik.touched.email && formik.errors.email}
                        />
                    )}
                    {fieldData.fieldType === FIELD_TYPE.TEXTAREA && typeof fieldData.fieldValue === 'string' && (
                        <Textarea
                            name={`pages[${pageIndex}].pageSections[${sectionIndex}].sectionFields[${fieldIndex}].fieldValue`}
                            value={fieldData.fieldValue}
                            onChange={handleChange}
                            minRows={4}
                            maxRows={8}
                            placeholder={intl.formatMessage({ id: 'section_name' })}
                            // error={formik.touched.email && Boolean(formik.errors.email)}
                            // helperText={formik.touched.email && formik.errors.email}
                        />
                    )}
                    {fieldData.fieldType === FIELD_TYPE.FILE_UPLOADER && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px', height: '50px' }}>
                            <Button
                                variant="outlined"
                                sx={{
                                    display: 'flex',
                                    borderWidth: '2px',
                                    height: '48px',
                                    minWidth: '162px',
                                    fontSize: '16px',
                                    borderRadius: '10px',
                                    alignItems: 'center',
                                    gap: '8px',
                                    'svg path': { stroke: theme.palette.orange.main }
                                }}
                            >
                                <UploadIcon />
                                Upload File
                            </Button>
                            <Box
                                sx={{
                                    fontFamily: 'Inter',
                                    fontStyle: 'italic',
                                    fontWeight: 400,
                                    fontSize: '12px',
                                    lineHeight: '15px',
                                    color: '#5A5A5A'
                                }}
                            >
                                Accepted file types include - jpg, png, mp4, pdf, doc, csv. Maximum file size is 100mb
                            </Box>
                        </Box>
                    )}
                    {fieldData.fieldType === FIELD_TYPE.DROPDOWN && typeof fieldData.fieldValue === 'string' && (
                        <TextField
                            sx={{
                                '.MuiOutlinedInput-input': {
                                    color: theme.palette.grey[300],
                                    fontWeight: 400,
                                    fontFamily: 'Inter',
                                    fontSize: '14px'
                                }
                            }}
                            name={`pages[${pageIndex}].pageSections[${sectionIndex}].sectionFields[${fieldIndex}].fieldValue`}
                            value={values.pages[pageIndex].pageSections[sectionIndex].sectionFields[fieldIndex].fieldValue}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            placeholder={intl.formatMessage({ id: 'section_name' })}
                            // error={formik.touched.email && Boolean(formik.errors.email)}
                            // helperText={formik.touched.email && formik.errors.email}
                        />
                    )}
                    {fieldData.fieldType === FIELD_TYPE.TABLE && (
                        <TextField
                            sx={{
                                '.MuiOutlinedInput-input': {
                                    color: theme.palette.grey[300],
                                    fontWeight: 400,
                                    fontFamily: 'Inter',
                                    fontSize: '14px',
                                    textAlign: 'right'
                                }
                            }}
                            name={`pages[${pageIndex}].pageSections[${sectionIndex}].sectionFields[${fieldIndex}].fieldValue`}
                            value={values.pages[pageIndex].pageSections[sectionIndex].sectionFields[fieldIndex].fieldValue}
                            onChange={handleChange}
                            type="number"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">Maximum number of items</InputAdornment>
                            }}
                            variant="outlined"
                            fullWidth
                            // error={formik.touched.email && Boolean(formik.errors.email)}
                            // helperText={formik.touched.email && formik.errors.email}
                        />
                    )}
                </Box>
            </Box>

            {fieldData.fieldType === FIELD_TYPE.DROPDOWN && (
                <Box
                    ref={dropdownItemDrop}
                    sx={{ width: '400px', marginLeft: '30px', display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '4px' }}
                >
                    <Typography variant="caption">Dropdown Options</Typography>
                    {fieldData.fieldItems?.map((item: string, index: number) => (
                        <DropdownItem
                            isLast={index === (fieldData.fieldItems?.length ?? 0) - 1}
                            sectionIndex={sectionIndex}
                            fieldIndex={fieldIndex}
                            itemIndex={index}
                            itemType={ItemTypes.DROPDOWN_ITEM}
                            moveItem={moveItem}
                            findItem={findItem}
                        />
                    ))}
                </Box>
            )}
            {fieldData.fieldType === FIELD_TYPE.TABLE && (
                <Box
                    ref={tableItemDrop}
                    sx={{ width: '400px', marginLeft: '30px', display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '4px' }}
                >
                    <Typography variant="caption">Column Titles</Typography>
                    {fieldData.fieldItems?.map((item: string, index: number) => (
                        <DropdownItem
                            isLast={index === (fieldData.fieldItems?.length ?? 0) - 1}
                            sectionIndex={sectionIndex}
                            fieldIndex={fieldIndex}
                            itemIndex={index}
                            itemType={ItemTypes.TABLE_ITEM}
                            moveItem={moveItem}
                            findItem={findItem}
                        />
                    ))}
                </Box>
            )}
        </Box>
    );
});

export default FieldElement;
