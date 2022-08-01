import { Box, Typography, CardMedia, Snackbar, CircularProgress, Divider } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { useTheme } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React from 'react';
import ButtonCustom from 'ui-component/extended/Button';
import fa_solid_robot from '../../assets/images/fa_solid_robot.svg';
import copy from '../../assets/images/copy.svg';
import Slide, { SlideProps } from '@mui/material/Slide';
import CheckIcon from '@mui/icons-material/Check';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import moment from 'moment';
import SelectHistoryAiTools from './SelectHistoryAiTools';
import PreviousResult from './PreviousResult';

type TransitionProps = Omit<SlideProps, 'direction'>;

function TransitionDown(props: TransitionProps) {
    return <Slide {...props} direction="down" />;
}

interface ResultsValueType {
    date: string;
    excerpt: string;
    name: string;
    score: number;
    url: string;
}
interface RelevantEventFinderResultsProps {
    handleResults: any;
    history?: boolean;
    resultsValue: ResultsValueType[];
}

// interface PreviosuResult {
//     id: string;
//     title: string;
//     date: string;
//     description: string;
//     progress: number;
//     language?: string;
//     category?: string;
// }
const RelevantEventFinderResults = ({ handleResults, history, resultsValue }: RelevantEventFinderResultsProps) => {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [labelsHistoryDateSelector, setLabelsHistoryDateSelector] = React.useState<any>();
    const [valueHistoryDateSelector, setValueHistoryDateSelector] = React.useState('');
    const [resultsPrevious, setResultsPrevious] = React.useState<ResultsValueType>();
    const [transition, setTransition] = React.useState<React.ComponentType<TransitionProps> | undefined>(undefined);
    const handleClick = (Transition: React.ComponentType<TransitionProps>) => () => {
        setTransition(() => Transition);
        setOpen(true);
    };
    React.useEffect(() => {
        const arrLabels: any = [];
        resultsValue.forEach((result: any) => {
            arrLabels.push(result.date);
        });
        setValueHistoryDateSelector(resultsValue[0].date);
        setResultsPrevious(resultsValue[0]);
        setLabelsHistoryDateSelector(arrLabels);
    }, []);
    const [copyValueDescription, setCopyValueDescription] = React.useState({
        value: '',
        copied: false
    });
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
        resultsValue.forEach((item: ResultsValueType) => {
            if (value === item.date) setResultsPrevious(item);
        });
    };
    const colorProgress = (progress: number) => {
        let color: string;
        if (progress < 50) {
            color = theme.palette.error[100];
        } else if (progress > 49 && progress < 70) {
            color = theme.palette.orange[100];
        } else color = theme.palette.success[100];
        return color;
    };
    const colorBorder = (progress: number) => {
        let color: string;
        if (progress < 50) {
            color = theme.palette.primary[400];
        } else if (progress > 49 && progress < 70) {
            color = theme.palette.primary[500];
        } else color = theme.palette.primary[100];
        return color;
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
                        <FormattedMessage id={history ? 'history' : 'results'} />
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
            {history && resultsPrevious && (
                <Box sx={{ p: '24px 24px 0 24px' }}>
                    <PreviousResult resultsPrevious={resultsPrevious} />
                </Box>
            )}
            <Box>
                {resultsValue.map((result: any, index: number) => (
                    <Box key={index} sx={{ p: '24px 24px 0 24px' }}>
                        <Typography sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 700, fontSize: '14px' }}>
                            {result.name}
                        </Typography>
                        <Typography mt={1} sx={{ color: theme.palette.grey[300], fontFamily: 'Inter', fontWeight: 500, fontSize: '12px' }}>
                            {moment(result.date).format('DD MMMM, YYYY')}
                        </Typography>
                        <Typography mt={2} sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 400, fontSize: '14px' }}>
                            {result.excerpt}
                        </Typography>
                        <Box mt={2} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box sx={{ position: 'relative', width: '40px', height: '40px' }}>
                                    <CircularProgress
                                        variant="determinate"
                                        thickness={3}
                                        value={result.progress}
                                        sx={{ color: colorProgress(result.score * 100), zIndex: 2 }}
                                    />
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            width: '39px',
                                            height: '39px',
                                            border: `1px solid ${colorBorder(Math.floor(result.score * 100))}`,
                                            borderRadius: '100px',
                                            top: 0,
                                            left: 0,
                                            zIndex: '-1',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                color: colorProgress(Math.floor(result.score * 100)),
                                                fontFamily: 'Inter',
                                                fontWeight: 700,
                                                fontSize: '12px'
                                            }}
                                        >
                                            {Math.floor(result.score * 100)}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                color: colorProgress(Math.floor(result.score * 100)),
                                                fontFamily: 'Inter',
                                                fontWeight: 700,
                                                fontSize: '12px'
                                            }}
                                        >
                                            %
                                        </Typography>
                                    </Box>
                                </Box>
                                <Typography
                                    ml={1}
                                    sx={{
                                        color: theme.palette.grey[400],
                                        fontFamily: 'Inter',
                                        fontWeight: 500,
                                        fontSize: '14px'
                                    }}
                                >
                                    <FormattedMessage id="match" />
                                </Typography>
                            </Box>
                            <CopyToClipboard onCopy={onCopy} text={result.excerpt}>
                                <Box onClick={handleClick(TransitionDown)} sx={{ width: '18px', cursor: 'pointer' }}>
                                    <CardMedia sx={{ objectFit: 'contain' }} component="img" width="18px" image={copy} alt="alt image" />
                                </Box>
                            </CopyToClipboard>
                        </Box>
                        {index + 1 !== resultsValue.length && <Divider sx={{ borderColor: theme.palette.grey[500], mt: '12px' }} />}
                    </Box>
                ))}
            </Box>
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

export default RelevantEventFinderResults;
