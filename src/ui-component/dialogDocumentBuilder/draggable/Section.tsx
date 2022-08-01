import { SectionPaper } from '../ui';
import AddIcon from '@mui/icons-material/Add';
import update from 'immutability-helper';
import { ReactComponent as DragThumbIcon } from 'assets/images/dragThumb.svg';
import { ReactComponent as SquareIcon } from 'assets/images/square.svg';
import { ReactComponent as CheckIcon } from 'assets/images/check.svg';
import { ReactComponent as SaveIcon } from 'assets/images/save.svg';
import { ReactComponent as CopyIcon } from 'assets/images/copy.svg';
import { ReactComponent as DeleteIcon } from 'assets/images/deleteIcon.svg';
import { ReactComponent as VectorIcon } from 'assets/images/vector.svg';
import { ReactComponent as TextIcon } from 'assets/images/Text.svg';
import { ReactComponent as TableIcon } from 'assets/images/table.svg';
import { ReactComponent as UploadIcon } from 'assets/images/upload.svg';
import { ReactComponent as TextAreaIcon } from 'assets/images/TextArea.svg';
import { ReactComponent as ChevronsDownIcon } from 'assets/images/chevrons-down.svg';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Box, Button, ClickAwayListener, Dialog, Divider, Popover, TextField, Typography, useTheme } from '@mui/material';
import { memo, useCallback, useContext, useState, useRef } from 'react';
import { useIntl } from 'react-intl';
import MenuItem from '../subcomponents/menuItem';
import FieldElement, { FieldItemData } from './Field';
import { DocumentBuilderContext, Field, FIELD_TYPE, ItemTypes, Page, Section, FormData } from '../types';
import { useFormikContext } from 'formik';
import { useDrag, useDrop } from 'react-dnd';
import DIalogCongirm from 'ui-component/dialogConfirm';

interface SectionProps {
    sectionIndex: number;
    moveSection: (section: Section, to: number) => void;
    findSection: (section: Section) => { index: number };
}

const FieldOptions = [
    { icon: <TextIcon />, name: 'Text', type: FIELD_TYPE.TEXT },
    { icon: <TextAreaIcon />, name: 'Textarea', type: FIELD_TYPE.TEXTAREA },
    { icon: <ChevronsDownIcon />, name: 'Dropdown', type: FIELD_TYPE.DROPDOWN },
    { icon: <CheckIcon />, name: 'Tickbox', type: FIELD_TYPE.TICKBOX },
    { icon: <UploadIcon />, name: 'File uploader', type: FIELD_TYPE.FILE_UPLOADER },
    { icon: <TableIcon />, name: 'Table/Evolutive', type: FIELD_TYPE.TABLE }
];

interface Item {
    section: Section;
    originalIndex: number;
}

const SectionElement = memo(({ sectionIndex, moveSection, findSection }: SectionProps) => {
    const theme = useTheme();
    const intl = useIntl();
    const ref = useRef<HTMLDivElement>(null);
    const [titleEditing, setTitleEditing] = useState<boolean>(false);
    const [hoverIndex, setHoverIndex] = useState<number>();
    const [openAddFieldDialog, setOpenAddFieldDialog] = useState<boolean>(false);
    const [openDialogConfirm, setOpenDialogConfirm] = useState<boolean>(false);
    const { pageIndex, setPageIndex } = useContext(DocumentBuilderContext);
    const { values, setValues, handleChange } = useFormikContext<FormData>();
    const sectionData = values.pages[pageIndex].pageSections[sectionIndex];

    const originalIndex = findSection(sectionData).index;
    const [{ isDragging }, drag] = useDrag(
        () => ({
            type: ItemTypes.SECTION,
            item: { section: sectionData, originalIndex },
            collect: (monitor) => ({
                isDragging: monitor.isDragging()
            }),
            end: (item, monitor) => {
                const { section: droppedSection, originalIndex: idx } = item;
                const didDrop = monitor.didDrop();
                if (!didDrop) {
                    moveSection(droppedSection, idx);
                }
            }
        }),
        [sectionData, originalIndex, moveSection]
    );

    const [, drop] = useDrop(
        () => ({
            accept: ItemTypes.SECTION,
            hover({ section: draggedSection }: Item) {
                if (draggedSection !== sectionData) {
                    const { index: overIndex } = findSection(sectionData);
                    moveSection(draggedSection, overIndex);
                }
            }
        }),
        [findSection, moveSection]
    );

    const [, fieldDrop] = useDrop(() => ({ accept: ItemTypes.FIELD }));

    const fields = values.pages[pageIndex].pageSections[sectionIndex].sectionFields;

    const findField = useCallback(
        (field: Field) => {
            console.log('findField', field);
            return {
                field,
                index: fields.indexOf(field)
            };
        },
        [fields]
    );

    const moveField = useCallback(
        (field: Field, atIndex: number) => {
            const { field: resField, index } = findField(field);
            setValues(
                update(values, {
                    pages: {
                        [pageIndex]: {
                            pageSections: {
                                [sectionIndex]: {
                                    sectionFields: {
                                        $splice: [
                                            [index, 1],
                                            [atIndex, 0, resField]
                                        ]
                                    }
                                }
                            }
                        }
                    }
                })
            );
        },
        [findSection, fields, setValues]
    );

    const handleHover = useCallback(
        (index: number) => {
            setHoverIndex(index);
        },
        [setHoverIndex]
    );

    const [{ isOver }, insertDrop] = useDrop(
        () => ({
            accept: ItemTypes.FIELD_NEW,
            drop: ({ field: draggedField }: FieldItemData) => {
                const newCards = [...fields.slice(0, hoverIndex), draggedField, ...fields.slice(hoverIndex)];
                setValues(
                    update(values, { pages: { [pageIndex]: { pageSections: { [sectionIndex]: { sectionFields: { $set: newCards } } } } } })
                );
            },
            collect: (monitor: any) => ({
                isOver: monitor.isOver()
            })
        }),
        [hoverIndex]
    );
    const [{ isPushOver }, pushDrop] = useDrop(
        () => ({
            accept: ItemTypes.FIELD_NEW,
            drop: ({ field: draggedField }: FieldItemData) => {
                setValues(
                    update(values, {
                        pages: { [pageIndex]: { pageSections: { [sectionIndex]: { sectionFields: { $push: [draggedField] } } } } }
                    })
                );
            },
            collect: (monitor: any) => ({
                isPushOver: monitor.isOver()
            })
        }),
        [hoverIndex]
    );

    const [anchorEl, setAnchorEl] = useState<any>(null);
    const onTitleEditClose = () => {
        setTitleEditing(false);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const handleClickPopover = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleCloseDialogAddField = () => {
        setOpenAddFieldDialog(false);
    };

    const handleAddField = (type: FIELD_TYPE) => {
        const newField: Field = {
            fieldType: type,
            fieldName: '',
            fieldValue: '',
            fieldItems: type === FIELD_TYPE.TABLE || type === FIELD_TYPE.DROPDOWN ? ['', ''] : undefined,
            fieldTime: Date.now()
        };
        setValues(
            update(values, { pages: { [pageIndex]: { pageSections: { [sectionIndex]: { sectionFields: { $push: [newField] } } } } } })
        );
        handleCloseDialogAddField();
    };

    const handleDeleteSection = () => {
        setValues(update(values, { pages: { [pageIndex]: { pageSections: { $splice: [[sectionIndex, 1]] } } } }));
    };
    const handleDuplicateSection = () => {
        const oldSections = values.pages[pageIndex].pageSections;
        const newData = { ...sectionData, sectionName: `${sectionData.sectionName} (Duplicated)` };
        const newSections = [...oldSections.slice(0, sectionIndex + 1), newData, ...oldSections.slice(sectionIndex + 1)];
        setValues(update(values, { pages: { [pageIndex]: { pageSections: { $set: newSections } } } }));
    };
    const handleDeclareVariable = () => {
        const oldValue = sectionData.sectionVariable;
        setValues(
            update(values, { pages: { [pageIndex]: { pageSections: { [sectionIndex]: { sectionVariable: { $set: !oldValue } } } } } })
        );
    };
    const handleCloseDialogConfirm = () => {
        setOpenDialogConfirm(false);
    };

    fieldDrop(insertDrop(ref));
    return (
        <SectionPaper ref={drag}>
            <Box ref={drop} sx={{ display: 'flex', alignItems: 'center', gap: '8px', height: '50px', marginBottom: '16px' }}>
                <DragThumbIcon style={{ cursor: 'pointer' }} />
                {titleEditing ? (
                    <ClickAwayListener onClickAway={onTitleEditClose}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <TextField
                                sx={{
                                    width: '498px',
                                    '.MuiOutlinedInput-input': {
                                        color: theme.palette.grey[300],
                                        fontWeight: 400,
                                        fontFamily: 'Inter',
                                        fontSize: '14px'
                                    }
                                }}
                                name={`pages[${pageIndex}].pageSections[${sectionIndex}].sectionName`}
                                value={values.pages[pageIndex].pageSections[sectionIndex].sectionName}
                                onChange={handleChange}
                                variant="outlined"
                                fullWidth
                                placeholder={intl.formatMessage({ id: 'section_name' })}
                                // error={formik.touched.email && Boolean(formik.errors.email)}
                                // helperText={formik.touched.email && formik.errors.email}
                            />
                            <CheckIcon style={{ cursor: 'pointer' }} onClick={onTitleEditClose} />
                        </Box>
                    </ClickAwayListener>
                ) : (
                    <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                        onClick={() => setTitleEditing(true)}
                    >
                        {sectionData.sectionVariable && <SquareIcon />}
                        <Typography variant="h4">{sectionData.sectionName}</Typography>
                    </Box>
                )}
                <MoreHorizIcon sx={{ marginLeft: 'auto', cursor: 'pointer' }} onClick={handleClickPopover} />
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                >
                    <Box sx={{ width: '300px' }}>
                        <MenuItem icon={<SaveIcon />} name="Save (Make reuseable)" />
                        <Divider />
                        <MenuItem
                            icon={<VectorIcon />}
                            name={sectionData.sectionVariable ? 'Remove variable' : 'Declare variable'}
                            onClick={handleDeclareVariable}
                        />
                        <Divider />
                        <MenuItem icon={<CopyIcon />} name="Duplicate" onClick={handleDuplicateSection} />
                        <Divider />
                        <MenuItem icon={<DeleteIcon />} name="Delete" onClick={() => setOpenDialogConfirm(true)} />
                    </Box>
                </Popover>
                <Dialog
                    sx={{ '.MuiDialog-paper': { minWidth: { xs: '350px', sm: '562px' } } }}
                    open={openDialogConfirm}
                    onClose={handleCloseDialogConfirm}
                    aria-labelledby="alert-dialog-title2"
                    aria-describedby="alert-dialog-description2"
                >
                    <DIalogCongirm onConfirm={handleDeleteSection} onClose={handleCloseDialogConfirm} />
                </Dialog>
            </Box>

            <Box ref={ref}>
                {sectionData.sectionFields?.map((_, index: number) => (
                    <>
                        {index === hoverIndex && isOver && <Divider />}
                        <FieldElement
                            key={index}
                            fieldIndex={index}
                            sectionIndex={sectionIndex}
                            moveField={moveField}
                            findField={findField}
                            onHover={handleHover}
                        />
                    </>
                ))}
            </Box>

            {isPushOver && <Divider />}

            <Box ref={pushDrop}>
                <Button
                    sx={{ color: theme.palette.orange.main, display: 'flex', alignItems: 'center' }}
                    onClick={() => setOpenAddFieldDialog(true)}
                >
                    <AddIcon />
                    Add Field
                </Button>
            </Box>
            <Dialog
                sx={{ '.MuiDialog-paper': { minWidth: '300px' } }}
                open={openAddFieldDialog}
                onClose={handleCloseDialogAddField}
                aria-labelledby="add-field-dialog-title"
                aria-describedby="add-field-dialog-description"
            >
                <Box sx={{ width: '300px' }}>
                    <Typography
                        variant="subtitle2"
                        sx={{
                            paddingLeft: '20px',
                            paddingBottom: '10px',
                            color: '#393D4E',
                            fontWeight: 600,
                            fontSize: '10px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.12em'
                        }}
                    >
                        Field Type
                    </Typography>
                    <Divider />
                    {FieldOptions.map((option, index: number) => (
                        <MenuItem icon={option.icon} name={option.name} key={index} onClick={() => handleAddField(option.type)} />
                    ))}
                </Box>
            </Dialog>
        </SectionPaper>
    );
});

export default SectionElement;
