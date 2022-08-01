import { Box, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { useTheme } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React from 'react';
import ButtonCustom from 'ui-component/extended/Button';
import SelectorAutocomplite from 'ui-component/SelectorAutoComplite';
import ViewPastRuns from './ViewPastRuns';
import edit4 from '../../assets/images/edit4.svg';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SelectCustom from 'ui-component/selectCustom';
import CaptionGeneratorReults from './CaptionGeneratorResults';
import DescriptionInputAiTool from './DescriptionInputAiTool';
import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_CLIENT_CUPTION_EXAMPLES } from 'services/graphQL/queries/aiTool';
import { GENERATE_CAPTION } from 'services/graphQL/mutations/aiTools/AiToolsMutations';

interface CaptionGeneratorProps {
    handleToolsNone: () => void;
}
interface LabelType {
    title: string;
    src?: string;
}
const CaptionGenerator = ({ handleToolsNone }: CaptionGeneratorProps) => {
    const theme = useTheme();
    const [pendingValue, setPendingValue] = React.useState<LabelType[]>([]);
    const [results, setResults] = React.useState(false);
    const [history, setHistory] = React.useState(false);
    const [captions, setCaptions] = React.useState(false);
    const [selectedClients, setSelectedClients] = React.useState<LabelType[]>([]);
    const autocompleteItems = [
        { title: 'Team member name', src: edit4 },
        { title: 'T2222', src: edit4 }
    ];
    const selectLangLabels = ['en', 'fr', 'de'];
    const selectCategoryLabels = ['category1', 'category2', 'category3'];
    const formik = useFormik({
        initialValues: {
            lang: 'en',
            category: 'category1',
            description: ''
        },
        validationSchema: Yup.object({
            lang: Yup.string().required('Required'),
            category: Yup.string().required('Required'),
            description: Yup.string().trim()
        }),
        onSubmit: (values) => {
            generateCaption({
                variables: {
                    category: values.category,
                    client_organization_id: '79178303-4fc4-46f7-a03c-30d100f8a7bf',
                    language: values.lang,
                    concept_description: values.description
                }
            });
        }
    });
    const [fetchClientCaptionExamples] = useLazyQuery(GET_CLIENT_CUPTION_EXAMPLES, {
        onCompleted: (data) => {
            console.log('dataFetchClientCaptionExamples', data);
        }
    });
    const [generateCaption] = useMutation(GENERATE_CAPTION, {
        onCompleted: (data: any) => {
            console.log('getRelevantEvents', data);
            getClientCuption();
            setResults(true);
            setResults(true);
        },
        onError: (error: any) => {
            console.log(error);
        }
    });
    const getClientCuption = () => {
        fetchClientCaptionExamples({
            variables: {
                client_organization_id: 'a224d59c-95a5-4216-917c-06ae38ab7463'
            }
        });
    };
    React.useEffect(() => {
        getClientCuption();
    }, []);
    const handleLang = (item: string) => {
        formik.setFieldValue('lang', item);
    };
    const handleDescription = (item: string) => {
        formik.setFieldValue('description', item);
    };
    const handleCategory = (item: string) => {
        formik.setFieldValue('category', item);
    };
    const handleCloseResults = () => {
        setResults(false);
        setHistory(false);
    };
    const handleHistory = () => {
        setResults(true);
        setHistory(true);
    };
    return (
        <Box>
            {results ? (
                <CaptionGeneratorReults handleResults={handleCloseResults} history={history} />
            ) : (
                <Box>
                    <Box onClick={handleToolsNone} sx={{ display: 'flex', alignItems: 'center', p: '24px', cursor: 'pointer' }}>
                        <ArrowBackIcon sx={{ fontSize: '26px', fill: theme.palette.success[300] }} />
                        <Typography
                            ml={1}
                            sx={{ color: theme.palette.success[300], fontFamily: 'Inter', fontWeight: 500, fontSize: '14px' }}
                        >
                            <FormattedMessage id="caption_generator" />
                        </Typography>
                    </Box>
                    <form onSubmit={formik.handleSubmit}>
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
                            <Typography
                                mb={2}
                                sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 600, fontSize: '14px' }}
                            >
                                <FormattedMessage id="brand_description" />
                            </Typography>
                            <DescriptionInputAiTool
                                value={formik.values.description}
                                setValue={handleDescription}
                                placholder="caption_generator_desc"
                                totalWordsLength="200"
                            />
                        </Box>
                        <Box sx={{ p: '0 24px 24px 24px' }}>
                            <Typography
                                mb={2}
                                sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 600, fontSize: '14px' }}
                            >
                                <FormattedMessage id="language_of_publication" />
                            </Typography>
                            <SelectCustom value={formik.values.lang} setValue={handleLang} labels={selectLangLabels} />
                        </Box>
                        <Box sx={{ p: '0 24px 24px 24px' }}>
                            <Typography
                                mb={2}
                                sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 600, fontSize: '14px' }}
                            >
                                <FormattedMessage id="category" />
                            </Typography>
                            <SelectCustom value={formik.values.category} setValue={handleCategory} labels={selectCategoryLabels} />
                        </Box>
                        <Box sx={{ p: '0 24px 24px 24px', width: '220px' }}>
                            <ButtonCustom
                                onClick={formik.handleSubmit}
                                titleBtn={
                                    <Typography sx={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '14px' }}>
                                        <FormattedMessage id="generate_captions" />
                                    </Typography>
                                }
                                colorBtn="red"
                            />
                        </Box>
                    </form>
                </Box>
            )}
        </Box>
    );
};

export default CaptionGenerator;
