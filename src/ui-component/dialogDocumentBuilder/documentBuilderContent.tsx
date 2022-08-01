import { Box, Dialog, Divider, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { useFormikContext } from 'formik';
import { FormattedMessage } from 'react-intl';
import AddIcon from '@mui/icons-material/Add';
import { ReactComponent as File24Icon } from 'assets/images/file24.svg';
import { ReactComponent as TextIcon } from 'assets/images/Text.svg';
import { ReactComponent as TableIcon } from 'assets/images/table.svg';
import { ReactComponent as UploadIcon } from 'assets/images/upload.svg';
import { ReactComponent as TextAreaIcon } from 'assets/images/TextArea.svg';
import { ReactComponent as ChevronsDownIcon } from 'assets/images/chevrons-down.svg';
import { ReactComponent as CheckIcon } from 'assets/images/check.svg';
import { ReactComponent as PhRowIcon } from 'assets/images/ph_rows.svg';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ColumnBody, ColumnHeader, NextButton, TwoColumnBox } from './ui';
import FieldItem from './draggable/fieldItem';
import SavedSectionItem from './subcomponents/savedSectionItem';
import VariableItem from './subcomponents/variableItem';
import { SectionContainer } from './sectionContainer';
import { DocumentBuilderContext, FIELD_TYPE, Page, Section, FormData } from './types';
import DialogAddPage from './dialog/dialogAddPage';
import PageItem from './dialog/pageMenuItem';

interface DocumentBuilderProps {
    onNext: () => void;
}

const DocumentBuilderContent = ({ onNext }: DocumentBuilderProps) => {
    const [openAddPageDialog, setOpenAddPageDialog] = useState<boolean>(false);
    const { setPageIndex } = useContext(DocumentBuilderContext);
    const { values } = useFormikContext<FormData>();

    const handleCloseDialogAddPage = () => {
        setOpenAddPageDialog(false);
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <Box mt={2} sx={{ display: 'flex', borderTop: '1px solid #D4DBEA' }}>
                <Box sx={{ width: '200px' }}>
                    <ColumnHeader>
                        <Typography variant="subtitle1">
                            <FormattedMessage id="pages" />
                        </Typography>
                        <AddIcon onClick={() => setOpenAddPageDialog(true)} sx={{ cursor: 'pointer' }} />

                        <Dialog
                            sx={{ '.MuiDialog-paper': { minWidth: '300px' } }}
                            open={openAddPageDialog}
                            onClose={handleCloseDialogAddPage}
                            aria-labelledby="add-page-dialog-title2"
                            aria-describedby="add-page-dialog-description2"
                        >
                            <DialogAddPage onClose={handleCloseDialogAddPage} />
                        </Dialog>
                    </ColumnHeader>
                    <ColumnBody sx={{ paddingTop: '18px' }}>
                        {values.pages.map((page: Page, index: number) => (
                            <PageItem name={page.pageName} key={index} onClick={() => setPageIndex(index)} pageIndex={index} />
                        ))}
                    </ColumnBody>
                </Box>
                <Box sx={{ width: '336px' }}>
                    <ColumnHeader>
                        <Typography variant="subtitle1">
                            <FormattedMessage id="field_types" />
                        </Typography>
                    </ColumnHeader>
                    <ColumnBody sx={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <TwoColumnBox>
                            <FieldItem icon={<TextIcon />} name="Text" type={FIELD_TYPE.TEXT} />
                            <FieldItem icon={<TextAreaIcon />} name="Textarea" type={FIELD_TYPE.TEXTAREA} />
                            <FieldItem icon={<ChevronsDownIcon />} name="Dropdown" type={FIELD_TYPE.DROPDOWN} />
                            <FieldItem icon={<CheckIcon />} name="Tickbox" type={FIELD_TYPE.TICKBOX} />
                            <FieldItem icon={<UploadIcon />} name="File uploader" type={FIELD_TYPE.FILE_UPLOADER} />
                            <FieldItem icon={<TableIcon />} name="Table/Evolutive" type={FIELD_TYPE.TABLE} />
                        </TwoColumnBox>
                        <Divider />
                        {values.pages.find((page) => page.pageVariable || page.pageSections.find((section) => section.sectionVariable)) && (
                            <>
                                <Typography variant="subtitle1">
                                    <FormattedMessage id="variables" />
                                </Typography>
                                <TwoColumnBox>
                                    {values.pages.map((page: Page, pIdx: number) => (
                                        <>
                                            {page.pageVariable ? (
                                                <VariableItem icon={<File24Icon />} name={page.pageName} key={pIdx} />
                                            ) : null}
                                            {page.pageSections.map((section: Section, sIdx: number) =>
                                                section.sectionVariable ? (
                                                    <VariableItem icon={<PhRowIcon />} name={section.sectionName} key={`${pIdx}-${sIdx}`} />
                                                ) : null
                                            )}
                                        </>
                                    ))}
                                </TwoColumnBox>
                                <Divider />
                            </>
                        )}
                        <Typography variant="subtitle1">
                            <FormattedMessage id="saved_sections" />
                        </Typography>
                        <TwoColumnBox>
                            <SavedSectionItem name="Section Name" />
                            <SavedSectionItem name="Section Name" />
                        </TwoColumnBox>
                    </ColumnBody>
                </Box>
                <Box sx={{ flex: 1 }}>
                    <ColumnHeader sx={{ justifyContent: 'flex-end', gap: '12px' }}>
                        <FormattedMessage id="change_saved" />
                        <NextButton onClick={onNext}>
                            <FormattedMessage id="next" />
                        </NextButton>
                    </ColumnHeader>
                    <SectionContainer />
                </Box>
            </Box>
        </DndProvider>
    );
};

export default DocumentBuilderContent;
