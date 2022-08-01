import { Box, CircularProgress, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { useTheme } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React from 'react';
import ViewPastRuns from './ViewPastRuns';
import edit4 from '../../assets/images/edit4.svg';
import SelectorAutocomplite from 'ui-component/SelectorAutoComplite';
import ButtonCustom from 'ui-component/extended/Button';
import RelevantEventFinderResults from './RelevantEventFinderResults';
import DatePickerAiTool from './DatePickerAiTool';
import DescriptionInputAiTool from './DescriptionInputAiTool';
import { GET_RELEVANT_EVENTS } from 'services/graphQL/mutations/aiTools/AiToolsMutations';
import { useMutation, useLazyQuery } from '@apollo/client';
import moment from 'moment';
import { GET_AI_TOOLS_HISTORY } from 'services/graphQL/queries/aiTool';

interface RelevantEventFinderProps {
    handleToolsNone: () => void;
}
interface LabelType {
    title: string;
    src?: string;
}
interface ResultsValueType {
    date: string;
    excerpt: string;
    name: string;
    score: number;
    url: string;
}
const RelevantEventFinder = ({ handleToolsNone }: RelevantEventFinderProps) => {
    const theme = useTheme();
    const [pendingValue, setPendingValue] = React.useState<LabelType[]>([]);
    const [selectedClients, setSelectedClients] = React.useState<LabelType[]>([]);
    const [brandDescription, setBrandDescription] = React.useState('');
    const [datePickerValue, setDatePickerValue] = React.useState<Date | null>(new Date());
    const [results, setResults] = React.useState(false);
    const [resultsValue, setResultsValue] = React.useState<ResultsValueType[]>([]);
    const [history, setHistory] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const autocompleteItems = [
        { title: 'Team member name', src: edit4 },
        { title: 'T2222', src: edit4 }
    ];
    const [getRelevantEvents, { loading: loadingGetRelevantEvents }] = useMutation(GET_RELEVANT_EVENTS, {
        onCompleted: (data: any) => {
            console.log('getRelevantEvents', data);
            setResultsValue(data.ai_tools_get_related_event);
            setResults(true);
        },
        onError: (error: any) => {
            console.log(error);
        }
    });
    const [fetchRelevantHistory, { loading: loadingFetchRelevantHistory }] = useLazyQuery(GET_AI_TOOLS_HISTORY, {
        onCompleted: (data) => {
            console.log('fetchRelevantHistory', data);
        }
    });
    React.useEffect(() => {
        fetchRelevantHistory({
            variables: {
                client_organization_id: '79178303-4fc4-46f7-a03c-30d100f8a7bf',
                service: 'EVENT'
            }
        });
    }, []);
    const handleCloseResults = () => {
        setResults(false);
        setHistory(false);
    };
    const hanleDatePickerValue = (value: Date) => {
        setDatePickerValue(value);
    };
    const handleOpenResults = () => {
        getRelevantEvents({
            variables: {
                client_organization_id: '79178303-4fc4-46f7-a03c-30d100f8a7bf',
                year: +moment(datePickerValue).format('YYYY'),
                month: +moment(datePickerValue).format('MM'),
                desc: brandDescription
            }
        });
    };
    const handleHistory = () => {
        handleOpenResults();
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
            {loadingGetRelevantEvents ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: '50%' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Box>
                    {results ? (
                        <RelevantEventFinderResults handleResults={handleCloseResults} history={history} resultsValue={resultsValue} />
                    ) : (
                        <Box>
                            <Box onClick={handleToolsNone} sx={{ display: 'flex', alignItems: 'center', p: '24px', cursor: 'pointer' }}>
                                <ArrowBackIcon sx={{ fontSize: '26px', fill: theme.palette.success[300] }} />
                                <Typography
                                    ml={1}
                                    sx={{ color: theme.palette.success[300], fontFamily: 'Inter', fontWeight: 500, fontSize: '14px' }}
                                >
                                    <FormattedMessage id="relevant_event_finder" />
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
                                <Typography
                                    mb={2}
                                    sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 600, fontSize: '14px' }}
                                >
                                    <FormattedMessage id="brand_description" />
                                </Typography>
                                <DescriptionInputAiTool
                                    value={brandDescription}
                                    setValue={setBrandDescription}
                                    placholder="brand_desc_tool"
                                    totalWordsLength="200"
                                />
                            </Box>
                            <Box sx={{ p: '0 24px 24px 24px', width: '240px' }}>
                                <ButtonCustom
                                    onClick={handleOpenResults}
                                    titleBtn={
                                        <Typography sx={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '14px' }}>
                                            <FormattedMessage id="find_relevant_events" />
                                        </Typography>
                                    }
                                    colorBtn="red"
                                />
                            </Box>
                        </Box>
                    )}
                </Box>
            )}
        </Box>
    );
};

export default RelevantEventFinder;
