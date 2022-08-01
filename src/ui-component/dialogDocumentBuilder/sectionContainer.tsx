import { useFormikContext } from 'formik';
import update from 'immutability-helper';
import { memo, FC, useContext, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import AddIcon from '@mui/icons-material/Add';
import SectionElement from './draggable/Section';
import { DocumentBuilderContext, ItemTypes, Page, Section, FormData } from './types';
import { AddSectionButton, ColumnBody } from './ui';
import { FormattedMessage } from 'react-intl';

export interface SectionContainerState {
    cards: any[];
}

export const SectionContainer: FC = memo(() => {
    const { pageIndex } = useContext(DocumentBuilderContext);
    const { values, setValues } = useFormikContext<FormData>();
    const sections = values.pages[pageIndex].pageSections;

    const findSection = useCallback(
        (section: Section) => {
            console.log('findSection', section);
            return {
                section,
                index: sections.indexOf(section)
            };
        },
        [sections]
    );

    const moveSection = useCallback(
        (section: Section, atIndex: number) => {
            const { section: resSection, index } = findSection(section);
            setValues(
                update(values, {
                    pages: {
                        [pageIndex]: {
                            pageSections: {
                                $splice: [
                                    [index, 1],
                                    [atIndex, 0, resSection]
                                ]
                            }
                        }
                    }
                })
            );
        },
        [findSection, sections, setValues]
    );

    const [, drop] = useDrop(() => ({ accept: ItemTypes.SECTION }));

    const handleAddSection = () => {
        const newSection: Section = {
            sectionName: 'Section Name',
            sectionVariable: false,
            sectionFields: []
        };
        setValues(update(values, { pages: { [pageIndex]: { pageSections: { $push: [newSection] } } } }));
    };

    return (
        <ColumnBody
            ref={drop}
            sx={{
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px'
            }}
        >
            {values.pages[pageIndex].pageSections.map((section: Section, index: number) => (
                <SectionElement key={index} sectionIndex={index} moveSection={moveSection} findSection={findSection} />
            ))}
            <AddSectionButton onClick={handleAddSection}>
                <AddIcon />
                <FormattedMessage id="add_section" />
            </AddSectionButton>
        </ColumnBody>
    );
});
