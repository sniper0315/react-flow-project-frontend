import * as React from 'react';
import Box from '@mui/material/Box';
import { Table, TableBody, TableContainer, Paper } from '@mui/material';
import FullTableRow from './FullTableRow';
import EnhancedTableHead from './EnhancedTableHead';
import { GET_ORGANIZATION_MEMBERS_BY_ROLE } from 'services/graphQL';
import { ProjectMemberType } from 'types/clients';
import { useLazyQuery } from '@apollo/client';

export default function ClientProvidedServices({ item, handleClient }: any) {
    const [selected, setSelected] = React.useState<readonly string[]>([]);

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = item.map((n: any) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const isSelected = (name: string) => selected.indexOf(name) !== -1;

    const [availableTeamMembers, setAvailableTeamMembers] = React.useState<ProjectMemberType[]>([]);
    const [requestOrgMembersByRole, { data: orgMemberData, loading: orgMemberLoading, error: orgMemberError }] =
        useLazyQuery(GET_ORGANIZATION_MEMBERS_BY_ROLE);

    const formatData = (data: any) => {
        const result: ProjectMemberType[] = [];
        data.map((orgMember: any) => {
            result.push({
                orgMemberId: orgMember.id,
                icon: orgMember.user.image_url,
                firstName: orgMember.user.first_name
            });
        });
        return result;
    };

    React.useEffect(() => {
        requestOrgMembersByRole({ variables: { role: 'Member' } });
    }, []);

    React.useEffect(() => {
        console.log('orgMemberData', orgMemberData);
        // if (orgMemberData.organization_members) {
        //     const result = formatData(orgMemberData.organization_members);
        //     setAvailableTeamMembers(result);
        // }
    }, [orgMemberData]);
    // const availableTeamMembers = [
    //     {
    //         firstName: 'fake first name',
    //         icon: 'fake icon'
    //     }
    // ];

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <TableContainer>
                    <Table sx={{ borderRadius: '8px 8px 0 0', minWidth: 750 }} aria-labelledby="tableTitle">
                        <EnhancedTableHead numSelected={selected.length} onSelectAllClick={handleSelectAllClick} rowCount={item.length} />
                        <TableBody>
                            {item.map((row: any, index: number) => {
                                const isItemSelected = isSelected(row.name);
                                const labelId = `enhanced-table-checkbox-${index}`;
                                return (
                                    <FullTableRow
                                        isItemSelected={isItemSelected}
                                        labelId={labelId}
                                        row={row}
                                        key={labelId}
                                        selected={selected}
                                        setSelected={setSelected}
                                        availableTeamMembers={availableTeamMembers}
                                    />
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
}
