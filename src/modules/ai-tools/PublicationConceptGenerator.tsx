import { Box, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { useTheme } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React from 'react';
import ViewPastRuns from './ViewPastRuns';
import SelectorAutocomplite from 'ui-component/SelectorAutoComplite';
import ButtonCustom from 'ui-component/extended/Button';
import edit4 from '../../assets/images/edit4.svg';
import PublicationConceptGeneratorResults from './PublicationConceptGeneratorResults';
import DatePickerAiTool from './DatePickerAiTool';
import DescriptionInputAiTool from './DescriptionInputAiTool';
import { useMutation } from '@apollo/client';
import { GENERATE_CONCEPT } from 'services/graphQL/mutations/aiTools/AiToolsMutations';
import moment from 'moment';

interface PublicationConceptGeneratorProps {
    handleToolsNone: () => void;
}
interface LabelType {
    title: string;
    src?: string;
}
const PublicationConceptGenerator = ({ handleToolsNone }: PublicationConceptGeneratorProps) => {
    const theme = useTheme();
    const [pendingValue, setPendingValue] = React.useState<LabelType[]>([]);
    const [selectedClients, setSelectedClients] = React.useState<LabelType[]>([]);
    const [brandDescription, setBrandDescription] = React.useState('');
    const [datePickerValue, setDatePickerValue] = React.useState<Date | null>(new Date());
    const [open, setOpen] = React.useState(false);
    const [results, setResults] = React.useState(false);
    const [history, setHistory] = React.useState(false);
    const autocompleteItems = [
        { title: 'Team member name', src: edit4 },
        { title: 'T2222', src: edit4 }
    ];
    const [generateConcept] = useMutation(GENERATE_CONCEPT, {
        onCompleted: (data: any) => {
            console.log('getRelevantEvents', data);
            setResults(true);
        },
        onError: (error: any) => {
            console.log(error);
        }
    });
    const hanleDatePickerValue = (value: Date) => {
        setDatePickerValue(value);
    };
    const handleCloseResults = () => {
        setResults(false);
        setHistory(false);
    };
    const handleOpenResults = () => {
        generateConcept({
            variables: {
                client_organization_id: '79178303-4fc4-46f7-a03c-30d100f8a7bf',
                brand_description: brandDescription,
                period: moment(datePickerValue).format('MMMM')
            }
        });
    };
    const handleHistory = () => {
        setResults(true);
        setHistory(true);
    };
    const handleOpenkDatePicker = () => {
        setOpen(true);
    };
    const handleCloseDatePicker = () => {
        setOpen(false);
    };
    return (
        <Box>
            {results ? (
                <PublicationConceptGeneratorResults handleResults={handleCloseResults} history={history} />
            ) : (
                <Box>
                    <Box onClick={handleToolsNone} sx={{ display: 'flex', alignItems: 'center', p: '24px', cursor: 'pointer' }}>
                        <ArrowBackIcon sx={{ fontSize: '26px', fill: theme.palette.success[300] }} />
                        <Typography
                            ml={1}
                            sx={{ color: theme.palette.success[300], fontFamily: 'Inter', fontWeight: 500, fontSize: '14px' }}
                        >
                            <FormattedMessage id="publication_concept_generator" />
                        </Typography>
                    </Box>
                    <ViewPastRuns size={5} handleHistory={handleHistory} />
                    <Box p={3}>
                        <SelectorAutocomplite
                            autocompleteItems={autocompleteItems}
                            pendingValue={pendingValue}
                            setPendingValue={setPendingValue}
                            arrItemSelected={selectedClients}
                            setArrItemsSelected={setSelectedClients}
                            title="client"
                        />
                    </Box>
                    <Box sx={{ p: '10px 24px 24px 24px' }}>
                        <Typography sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 600, fontSize: '14px' }}>
                            <FormattedMessage id="date" />
                        </Typography>
                        <DatePickerAiTool
                            date={datePickerValue}
                            handleDate={hanleDatePickerValue}
                            handleOpen={handleOpenkDatePicker}
                            open={open}
                            handleClose={handleCloseDatePicker}
                        />
                    </Box>
                    <Box sx={{ p: '10px 24px 24px 24px' }}>
                        <Typography mb={2} sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 600, fontSize: '14px' }}>
                            <FormattedMessage id="brand_description" />
                        </Typography>
                        <DescriptionInputAiTool
                            value={brandDescription}
                            setValue={setBrandDescription}
                            placholder="brand_desc_tool"
                            totalWordsLength="200"
                        />
                    </Box>
                    <Box sx={{ p: '0 24px 24px 24px', width: '310px' }}>
                        <ButtonCustom
                            onClick={handleOpenResults}
                            titleBtn={
                                <Typography sx={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '14px' }}>
                                    <FormattedMessage id="generate_publication_concepts" />
                                </Typography>
                            }
                            colorBtn="red"
                        />
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default PublicationConceptGenerator;
