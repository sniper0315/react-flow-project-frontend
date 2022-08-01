import { Box, TextField, useTheme } from '@mui/material';
import { useContext, useRef } from 'react';
import update from 'immutability-helper';
import { useIntl } from 'react-intl';
import { ReactComponent as DragThumbIcon } from 'assets/images/dragThumb.svg';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { DocumentBuilderContext, Page, FormData } from '../types';
import { useFormikContext } from 'formik';
import { useDrag, useDrop } from 'react-dnd';

interface DropdownItemProps {
    isLast?: boolean;
    sectionIndex: number;
    fieldIndex: number;
    itemIndex: number;
    itemType: string;
    moveItem: (item: string, to: number) => void;
    findItem: (item: string) => { index: number };
}

interface MenuItem {
    item: string;
    originalIndex: number;
}

const DropdownItem = ({ isLast = false, sectionIndex, fieldIndex, itemIndex, itemType, moveItem, findItem }: DropdownItemProps) => {
    const theme = useTheme();
    const ref = useRef<HTMLDivElement>(null);

    const intl = useIntl();
    const { pageIndex } = useContext(DocumentBuilderContext);
    const { values, setValues, handleChange } = useFormikContext<FormData>();

    const itemData: string = values.pages[pageIndex].pageSections[sectionIndex].sectionFields[fieldIndex]?.fieldItems?.[itemIndex] ?? '';

    const originalIndex = findItem(itemData).index;
    const [{ isDragging }, drag] = useDrag(
        () => ({
            type: itemType,
            item: { item: itemData, originalIndex },
            collect: (monitor) => ({
                isDragging: monitor.isDragging()
            }),
            end: (item, monitor) => {
                const { item: droppedItem, originalIndex: idx } = item;
                const didDrop = monitor.didDrop();
                if (!didDrop) {
                    moveItem(droppedItem, idx);
                }
            }
        }),
        [itemData, originalIndex, moveItem]
    );

    const [, drop] = useDrop(
        () => ({
            accept: itemType,
            hover({ item: draggedItem }: MenuItem) {
                if (draggedItem !== itemData) {
                    const { index: overIndex } = findItem(itemData);
                    moveItem(draggedItem, overIndex);
                }
            }
        }),
        [findItem, moveItem]
    );
    const handleItemAdd = () => {
        setValues(
            update(values, {
                pages: {
                    [pageIndex]: { pageSections: { [sectionIndex]: { sectionFields: { [fieldIndex]: { fieldItems: { $push: [''] } } } } } }
                }
            })
        );
    };
    const handleItemDelete = () => {
        if ((values.pages[pageIndex].pageSections[sectionIndex].sectionFields[fieldIndex].fieldItems?.length ?? 0) < 3) return;
        setValues(
            update(values, {
                pages: {
                    [pageIndex]: {
                        pageSections: { [sectionIndex]: { sectionFields: { [fieldIndex]: { fieldItems: { $splice: [[itemIndex, 1]] } } } } }
                    }
                }
            })
        );
    };
    drag(drop(ref));
    return (
        <Box ref={ref} sx={{ position: 'relative' }}>
            <DragThumbIcon style={{ position: 'absolute', left: '-30px', top: '14px', cursor: 'pointer' }} />
            <TextField
                sx={{
                    '.MuiOutlinedInput-input': {
                        color: theme.palette.grey[300],
                        fontWeight: 400,
                        fontFamily: 'Inter',
                        fontSize: '14px'
                    }
                }}
                name={`pages[${pageIndex}].pageSections[${sectionIndex}].sectionFields[${fieldIndex}].fieldItems.[${itemIndex}]`}
                value={values.pages[pageIndex].pageSections[sectionIndex].sectionFields[fieldIndex].fieldItems?.[itemIndex]}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                placeholder={intl.formatMessage({ id: 'title' })}
                // error={formik.touched.email && Boolean(formik.errors.email)}
                // helperText={formik.touched.email && formik.errors.email}
            />
            <RemoveCircleOutlineIcon
                sx={{ position: 'absolute', right: '-40px', top: '14px', cursor: 'pointer' }}
                onClick={handleItemDelete}
            />
            {isLast && (
                <AddCircleOutlineIcon
                    sx={{ position: 'absolute', right: '-80px', top: '14px', cursor: 'pointer' }}
                    onClick={handleItemAdd}
                />
            )}
        </Box>
    );
};

export default DropdownItem;
