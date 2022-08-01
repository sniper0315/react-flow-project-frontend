import { Box } from '@mui/material';
import { memo } from 'react';
import { Handle, Position } from 'react-flow-renderer';

export default memo(({ data, isConnectable }: any) => {
    console.log('endNode');

    return (
        <Box>
            <Handle
                type="target"
                position={Position.Top}
                isConnectable={isConnectable}
                style={{ width: '1px', height: '1px', background: 'transparent' }}
            />
            <Box
                sx={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '64px',
                    border: '1px solid #E0E0E0',
                    padding: '8px',
                    backgroundColor: 'white',
                    boxShadow: '0px 10px 16px rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Box sx={{ width: '24px', height: '24px', borderRadius: '38px', backgroundColor: 'black' }} />
            </Box>
        </Box>
    );
});
