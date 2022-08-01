import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Avatar, Box, Drawer, Typography, Grid, CardMedia, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { IconChevronRight } from '@tabler/icons';
import RelevantEventFinder from './RelevantEventFinder';
import PublicationConceptGenerator from './PublicationConceptGenerator';
import CaptionGenerator from './CaptionGenerator';
import bookmark from '../../assets/images/bookmark.svg';
import file from '../../assets/images/file.svg';
import fileText from '../../assets/images/fileText.svg';
import { useLazyQuery } from '@apollo/client';
import { CAPTION_EXAMPLE } from 'services/graphQL/mutations/aiTools/AiToolsMutations';
import { GET_AI_TOOLS_HISTORY } from 'services/graphQL/queries/aiTool';

interface AIToolsDrawerProps {
    openDivider: any;
    handleClickCloseDivider: any;
    item?: any;
}

const list = [
    {
        icon: (
            <Box sx={{ with: '18px', mr: '5px' }}>
                <CardMedia sx={{ objectFit: 'contain' }} component="img" image={bookmark} alt="AI tools" />
            </Box>
        ),
        formatId: 'relevant_elevant_finder'
    },
    {
        icon: (
            <Box sx={{ with: '18px', mr: '5px' }}>
                <CardMedia sx={{ objectFit: 'contain' }} component="img" image={file} alt="AI tools" />
            </Box>
        ),
        formatId: 'publication_concept_generator'
    },
    {
        icon: (
            <Box sx={{ with: '18px', mr: '5px' }}>
                <CardMedia sx={{ objectFit: 'contain' }} component="img" image={fileText} alt="AI tools" />
            </Box>
        ),
        formatId: 'caption_generator'
    }
];

const AIToolsDrawer = ({ openDivider, handleClickCloseDivider, item }: AIToolsDrawerProps) => {
    const theme = useTheme();
    const container = window !== undefined ? () => window.document.body : undefined;
    const [tools, setTools] = React.useState('');
    const handleToolsNone = () => {
        setTools('');
    };
    const handleTools = (tool: string) => {
        setTools(tool);
        // if (tool === 'caption_generator') getInsertCaptionExample();
    };
    // const [insertCaptionExample] = useMutation(CAPTION_EXAMPLE, {
    //     onCompleted: (data: any) => {
    //         console.log('insertCaptionExample', data);
    //     },
    //     onError: (error: any) => {
    //         console.log(error);
    //     }
    // });
    // const getInsertCaptionExample = () => {
    //     insertCaptionExample({
    //         variables: {
    //             client_organization_id: 'a224d59c-95a5-4216-917c-06ae38ab7463'
    //         }
    //     });
    // };
    const rendrerTool = () => {
        switch (tools) {
            case 'relevant_elevant_finder':
                return <RelevantEventFinder handleToolsNone={handleToolsNone} />;
            case 'publication_concept_generator':
                return <PublicationConceptGenerator handleToolsNone={handleToolsNone} />;
            case 'caption_generator':
                return <CaptionGenerator handleToolsNone={handleToolsNone} />;
            default:
                return '';
        }
    };
    return (
        <Drawer
            container={container}
            hideBackdrop
            variant="temporary"
            anchor="right"
            open={openDivider}
            elevation={1}
            onClose={handleClickCloseDivider}
            // onClose={(_, reason) => reason === 'backdropClick' && handleClickCloseDivider}
            sx={{
                '& .MuiDrawer-paper': {
                    width: '454px',
                    background: theme.palette.background.default,
                    color: theme.palette.text.primary,
                    borderRight: 'none',
                    overflow: 'visible'
                    // [theme.breakpoints.up('md')]: {
                    //     top: '88px'
                    // }
                }
            }}
            ModalProps={{ keepMounted: true }}
            color="inherit"
        >
            <PerfectScrollbar
                component="div"
                style={{
                    // height: !matchUpMd ? 'calc(100vh - 56px)' : 'calc(100vh - 88px)',
                    borderRightWidth: 1,
                    borderRightStyle: 'solid',
                    borderColor: theme.palette.grey[500]
                }}
            >
                <Box
                    sx={{
                        position: 'relative',
                        width: '100%',
                        height: '81px',
                        padding: 3,
                        display: 'flex',
                        borderBottomWidth: 1,
                        borderBottomStyle: 'solid',
                        borderColor: theme.palette.grey[500],
                        [theme.breakpoints.down('md')]: {
                            width: 'auto'
                        }
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                        <Typography variant="h5">AI Tools</Typography>
                    </Box>
                    <Avatar
                        variant="rounded"
                        sx={{
                            ...theme.typography.commonAvatar,
                            ...theme.typography.mediumAvatar,
                            position: 'absolute',
                            left: 0,
                            transform: 'translateX(-50%)',
                            overflow: 'hidden',
                            transition: 'all .2s ease-in-out',
                            border: '1px solid',
                            borderColor: theme.palette.grey[500],
                            borderRadius: '100%',
                            backgroundColor: 'white'
                        }}
                        onClick={() => handleClickCloseDivider()}
                        color="inherit"
                    >
                        <IconChevronRight stroke={1.5} size="1.3rem" />
                    </Avatar>
                </Box>
                {rendrerTool() === '' ? (
                    <Grid container direction="column" spacing={2} p={3}>
                        {list &&
                            list.length > 0 &&
                            list.map((listItem, index) => (
                                <Grid item key={index}>
                                    <Button
                                        onClick={() => handleTools(listItem.formatId)}
                                        sx={{
                                            letterSpacing: '0.46px',
                                            fontSize: { xs: '16px', md: '14px' },
                                            borderRadius: { xs: '4px', md: '10px' },
                                            padding: { xs: '13px', md: '16px' },
                                            background: theme.palette.grey[900],
                                            width: '100%',
                                            color: '#1d2675',
                                            border: theme.palette.orange.main,
                                            fontFamily: 'Inter',
                                            fontWeight: 500,
                                            justifyContent: 'space-between',
                                            // '&:hover': {
                                            //     background: theme.palette.background.paper
                                            // },
                                            height: '42px'
                                        }}
                                    >
                                        <Box display="flex" alignItems="center">
                                            {listItem.icon}
                                            <Typography
                                                sx={{
                                                    fontFamily: 'Inter',
                                                    fontWeight: 600,
                                                    fontSize: '14px',
                                                    color: theme.palette.success[300]
                                                }}
                                            >
                                                <FormattedMessage id={listItem.formatId} />
                                            </Typography>
                                        </Box>
                                        <IconChevronRight />
                                    </Button>
                                </Grid>
                            ))}
                    </Grid>
                ) : (
                    rendrerTool()
                )}
            </PerfectScrollbar>
        </Drawer>
    );
};

export default AIToolsDrawer;
