import { Box, Typography } from '@mui/material';
import { memo } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { WorkFlowNodeBranchStyle } from '../types';

export default memo(({ data, isConnectable }: any) => {
    console.log('branchNode');

    return (
        <>
            <Handle
                type="target"
                position={Position.Top}
                isConnectable={isConnectable}
                style={{ width: '1px', height: '1px', background: 'transparent' }}
            />
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '124px',
                    height: '28px',
                    borderRadius: '8px',
                    padding: '8px 16px',
                    backgroundColor: data.branchType === WorkFlowNodeBranchStyle.APPROVED ? '#A6F4C5' : '#D4DBEA'
                }}
            >
                <Typography sx={{ fontWeight: 600, fontSize: '10px', color: '#054F31' }}>
                    {data.branchType === WorkFlowNodeBranchStyle.APPROVED ? 'APPROVED' : 'NOT APPROVED'}
                </Typography>
            </Box>
            <Handle
                type="source"
                position={Position.Bottom}
                isConnectable={isConnectable}
                style={{ width: '1px', height: '1px', background: 'transparent' }}
            />
        </>
    );
});
