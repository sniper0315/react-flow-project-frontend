import { Box } from '@mui/material';
import { memo, ReactElement } from 'react';
import { useDrag } from 'react-dnd';
import { FIELD_TYPE, ItemTypes } from '../types';

interface FieldItemProps {
    icon?: ReactElement;
    name?: string;
    type: FIELD_TYPE;
}

const FieldItem = memo(({ icon, name = '', type }: FieldItemProps) => {
    const defaultField = {
        fieldType: type,
        fieldValue: '',
        fieldItems: type === FIELD_TYPE.TABLE || type === FIELD_TYPE.DROPDOWN ? ['', ''] : undefined
    };
    const [{ isDragging }, drag] = useDrag(
        () => ({
            type: ItemTypes.FIELD_NEW,
            item: { field: defaultField, originalIndex: -1 },
            collect: (monitor) => ({
                isDragging: monitor.isDragging()
            })
        }),
        []
    );
    return (
        <Box
            ref={drag}
            sx={{
                display: 'flex',
                alignItems: 'center',
                borderRadius: '8px',
                backgroundColor: '#EFF2FA',
                gap: '8px',
                height: '40px',
                padding: '0px 10px',
                fontSize: '12px'
            }}
        >
            {icon}
            {name}
        </Box>
    );
});

export default FieldItem;
