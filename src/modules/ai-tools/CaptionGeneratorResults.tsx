import { Box, Typography, CardMedia, Grid, Snackbar } from '@mui/material';
import { FormattedMessage, useIntl } from 'react-intl';
import { useTheme } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React from 'react';
import ButtonCustom from 'ui-component/extended/Button';
import fa_solid_robot from '../../assets/images/fa_solid_robot.svg';
import copy from '../../assets/images/copy.svg';
import Slide, { SlideProps } from '@mui/material/Slide';
import CheckIcon from '@mui/icons-material/Check';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import SelectHistoryAiTools from './SelectHistoryAiTools';
import PreviousResult from './PreviousResult';

type TransitionProps = Omit<SlideProps, 'direction'>;

function TransitionDown(props: TransitionProps) {
    return <Slide {...props} direction="down" />;
}
interface CaptionGeneratorReultProps {
    handleResults: any;
    history?: boolean;
}
interface PreviosuResult {
    id: string;
    title: string;
    date: string;
    description: string;
    progress: number;
    language?: string;
    category?: string;
}
const itemsPublicationConceptGeneratorResults = [
    {
        id: '1',
        title: 'National Beer Day',
        date: '2022-06-25T08:01:36.480824',
        description: 'description',
        progress: 30,
        language: 'Dutch',
        category: '1'
    },
    {
        id: '2',
        title: 'National Beer Day2',
        date: '2022-06-26T08:01:36.480824',
        description: 'description3',
        progress: 55,
        language: 'Dutch',
        category: '2'
    },
    {
        id: '3',
        title: 'National Beer Day3',
        date: '2022-06-29T08:01:36.480824',
        description: 'description3',
        progress: 85,
        language: 'Dutch',
        category: '3'
    }
];
const CaptionGeneratorReults = ({ handleResults, history }: CaptionGeneratorReultProps) => {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [transition, setTransition] = React.useState<React.ComponentType<TransitionProps> | undefined>(undefined);
    const [labelsHistoryDateSelector, setLabelsHistoryDateSelector] = React.useState<any>();
    const [valueHistoryDateSelector, setValueHistoryDateSelector] = React.useState('');
    const [resultsPrevious, setResultsPrevious] = React.useState<PreviosuResult>();
    const handleClick = (Transition: React.ComponentType<TransitionProps>) => () => {
        setTransition(() => Transition);
        setOpen(true);
    };
    const [copyValueDescription, setCopyValueDescription] = React.useState({
        value: '',
        copied: false
    });
    React.useEffect(() => {
        const arrLabels: any = [];
        itemsPublicationConceptGeneratorResults.forEach((result: any) => {
            arrLabels.push(result.date);
        });
        setValueHistoryDateSelector(itemsPublicationConceptGeneratorResults[0].date);
        setResultsPrevious(itemsPublicationConceptGeneratorResults[0]);
        setLabelsHistoryDateSelector(arrLabels);
    }, []);
    const onCopy = () => {
        setCopyValueDescription({
            ...copyValueDescription,
            copied: true
        });
        setTimeout(() => {
            setCopyValueDescription({
                ...copyValueDescription,
                copied: false
            });
        }, 1000);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleValueelectorDate = (value: string) => {
        setValueHistoryDateSelector(value);
        itemsPublicationConceptGeneratorResults.forEach((item: PreviosuResult) => {
            if (value === item.date) setResultsPrevious(item);
        });
    };
    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p: '18px 24px',
                    cursor: 'pointer',
                    borderBottom: `1px solid ${theme.palette.grey[500]}`
                }}
            >
                <Box
                    onClick={handleResults}
                    sx={{
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    <ArrowBackIcon sx={{ fontSize: '26px', fill: theme.palette.success[300] }} />
                    <Typography ml={1} sx={{ color: theme.palette.success[300], fontFamily: 'Inter', fontWeight: 500, fontSize: '14px' }}>
                        <FormattedMessage id="results" />
                    </Typography>
                </Box>
                {history ? (
                    <SelectHistoryAiTools
                        labels={labelsHistoryDateSelector}
                        state={valueHistoryDateSelector}
                        setState={handleValueelectorDate}
                    />
                ) : (
                    <Box sx={{ width: '160px' }}>
                        <ButtonCustom
                            onClick={handleResults}
                            titleBtn={
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}
                                >
                                    <Box mr={1} sx={{ width: '20px' }}>
                                        <CardMedia
                                            sx={{ objectFit: 'contain' }}
                                            component="img"
                                            width="18px"
                                            image={fa_solid_robot}
                                            alt="alt image"
                                        />
                                    </Box>
                                    <Typography sx={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '14px' }}>
                                        <FormattedMessage id="ai_powered" />
                                    </Typography>
                                </Box>
                            }
                            colorBtn="red"
                        />
                    </Box>
                )}
            </Box>
            {/* {history && resultsPrevious && (
                <Box sx={{ p: '24px 24px 0 24px' }}>
                    <PreviousResult resultsPrevious={resultsPrevious} />
                </Box>
            )} */}
            {itemsPublicationConceptGeneratorResults.map((result: PreviosuResult, index: number) => (
                <Grid key={index} container sx={{ alignItems: 'center', p: '24px 24px 0 24px' }}>
                    <Grid item xs={11}>
                        <Typography sx={{ color: theme.palette.success[400], fontFamily: 'Inter', fontWeight: 400, fontSize: '14px' }}>
                            {result.description}
                        </Typography>
                    </Grid>
                    <Grid item xs={1} display="flex" justifyContent="flex-end">
                        <CopyToClipboard onCopy={onCopy} text={result.description}>
                            <Box onClick={handleClick(TransitionDown)} sx={{ width: '18px', cursor: 'pointer' }}>
                                <CardMedia sx={{ objectFit: 'contain' }} component="img" width="18px" image={copy} alt="alt image" />
                            </Box>
                        </CopyToClipboard>
                    </Grid>
                </Grid>
            ))}
            <Snackbar
                sx={{
                    '.MuiPaper-root': {
                        background: theme.palette.primary[100],
                        minWidth: '220px',
                        boxShadow: 'none',
                        borderRadius: '8px',
                        p: '16px 24px'
                    }
                }}
                open={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                TransitionComponent={transition}
                autoHideDuration={2000}
                message={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CheckIcon sx={{ fill: theme.palette.primary[600], mr: '10px' }} />
                        <Typography sx={{ fontFamily: 'Inter', fontWeight: 500, fontSize: '14px', color: theme.palette.primary[600] }}>
                            <FormattedMessage id="copied_to_clipboard" />
                        </Typography>
                    </Box>
                }
                key={transition ? transition.name : ''}
            />
        </Box>
    );
};

export default CaptionGeneratorReults;
