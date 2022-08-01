import { Box, Button, Grid, Typography } from '@mui/material';
import { ReactElement, useContext, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { FormattedMessage } from 'react-intl';
import CloseIcon from '@mui/icons-material/Close';
import ProcessItem from './subcomponents/processItem';
import { ReactComponent as FileIcon } from 'assets/images/file.svg';
import { ReactComponent as FlowIcon } from 'assets/images/Flow.svg';
import { ReactComponent as SendIcon } from 'assets/images/send.svg';
import { ContentType, DocumentBuilderContext } from './types';
import DocumentBuilderContent from './documentBuilderContent';
import WorkflowBuilderContent from './workflowBuilderContent';
import PublishDocument from './publishDialogContent';

type ProcessStatus = {
    titleId: string;
    icon: ReactElement;
    type: ContentType;
};

const ProcessItems: ProcessStatus[] = [
    {
        titleId: 'document',
        icon: <FileIcon />,
        type: ContentType.DOCUMENT_BUILDER
    },
    {
        titleId: 'workflow',
        icon: <FlowIcon />,
        type: ContentType.WORKFLOW_BUILDER
    },
    {
        titleId: 'publish',
        icon: <SendIcon />,
        type: ContentType.PUBLISH
    }
];

interface DialogDocumentBuilderProps {
    onConfirm: () => void;
    onClose: () => void;
}
const validationSchema = yup.array().of(
    yup.object().shape({
        pageName: yup.string().required('Required'),
        pageSections: yup.array().of(
            yup.object().shape({
                sectionName: yup.string().required('Required')
            })
        )
    })
);
const DialogDocumentBuilder = ({ onConfirm, onClose }: DialogDocumentBuilderProps) => {
    const theme = useTheme();
    const { form } = useContext(DocumentBuilderContext);
    const [pageIndex, setPageIndex] = useState<number>(0);
    const [curContent, setCurContent] = useState<ContentType>(ContentType.DOCUMENT_BUILDER);

    const handleOnNext = () => {
        setCurContent((cur) => cur + 1);
    };

    const handleOnPrev = () => {
        setCurContent((cur) => cur - 1);
    };

    const handleProcessSelect = (type: ContentType) => {
        setCurContent(type);
    };

    return (
        <DocumentBuilderContext.Provider value={{ form, pageIndex, setPageIndex }}>
            <Box sx={{ borderRadius: '4px', width: '100%' }}>
                <Box>
                    <Grid container justifyContent="space-between" alignItems="center" sx={{ p: '5px 20px' }}>
                        <Grid item xs={4}>
                            <Typography
                                ml={1}
                                sx={{ color: theme.palette.grey[400], fontFamily: 'Inter', fontWeight: 500, fontSize: '16px' }}
                            >
                                <FormattedMessage id="untitled_workflow" />
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '32px' }}>
                                {ProcessItems.map((process, index) => (
                                    <>
                                        {index !== 0 && <Box sx={{ width: '34px', height: '1px', backgroundColor: '#D9D9D9' }}> </Box>}
                                        <ProcessItem
                                            active={curContent >= index}
                                            titleId={process.titleId}
                                            icon={process.icon}
                                            onClick={() => handleProcessSelect(process.type)}
                                        />
                                    </>
                                ))}
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button onClick={onClose} sx={{ color: '#9197AE' }}>
                                    <CloseIcon sx={{ fontSize: '20px', fill: '#9197AE' }} />
                                    <FormattedMessage id="close" />
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                    <Formik initialValues={form} onSubmit={console.log} enableReinitialize validationSchema={validationSchema}>
                        <Form>
                            {curContent === ContentType.DOCUMENT_BUILDER && <DocumentBuilderContent onNext={handleOnNext} />}
                            {curContent === ContentType.WORKFLOW_BUILDER && <WorkflowBuilderContent onNext={handleOnNext} />}
                            {curContent === ContentType.PUBLISH && <PublishDocument onBack={handleOnPrev} />}
                        </Form>
                    </Formik>
                </Box>
            </Box>
        </DocumentBuilderContext.Provider>
    );
};

export default DialogDocumentBuilder;
