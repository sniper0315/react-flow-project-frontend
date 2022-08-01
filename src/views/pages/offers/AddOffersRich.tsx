import React, { useCallback, useMemo } from 'react';
import isHotkey from 'is-hotkey';
import { Editable, withReact, useSlate, Slate } from 'slate-react';
import { Editor, Transforms, createEditor, Element as SlateElement } from 'slate';
import { withHistory } from 'slate-history';
import { Box, Button, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import CodeIcon from '@mui/icons-material/Code';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';

const HOTKEYS: any = {
    'mod+b': 'bold',
    'mod+i': 'italic',
    'mod+u': 'underline',
    'mod+`': 'code'
};

const LIST_TYPES = ['numbered-list', 'bulleted-list'];
const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify'];

const AddOffersRich = () => {
    const theme = useTheme();
    const renderElement = useCallback((props) => <Element {...props} />, []);
    const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
    const editor = useMemo(() => withHistory(withReact(createEditor())), []);
    console.log('initialValueinitialValue', initialValue);
    return (
        <Slate editor={editor} value={initialValue}>
            <Box>
                <Box sx={{ background: theme.palette.grey[800], borderRadius: '10px 10px 0 0', p: '20px' }}>
                    <MarkButton format="bold" icon={<FormatBoldIcon sx={{ fill: theme.palette.grey[300] }} />} />
                    <MarkButton format="italic" icon={<FormatItalicIcon sx={{ fill: theme.palette.grey[300] }} />} />
                    <MarkButton format="underline" icon={<FormatUnderlinedIcon sx={{ fill: theme.palette.grey[300] }} />} />
                    <MarkButton format="code" icon={<CodeIcon sx={{ fill: theme.palette.grey[300] }} />} />
                    <BlockButton
                        format="heading-one"
                        icon={<Typography sx={{ color: theme.palette.grey[300], fontSize: '20px', fontWeight: 500 }}>H1</Typography>}
                    />
                    <BlockButton
                        format="heading-two"
                        icon={<Typography sx={{ color: theme.palette.grey[300], fontSize: '17px', fontWeight: 500 }}>H2</Typography>}
                    />
                    <BlockButton format="block-quote" icon={<FormatQuoteIcon sx={{ fill: theme.palette.grey[300] }} />} />
                    <BlockButton format="numbered-list" icon={<FormatListNumberedIcon sx={{ fill: theme.palette.grey[300] }} />} />
                    <BlockButton format="bulleted-list" icon={<FormatListBulletedIcon sx={{ fill: theme.palette.grey[300] }} />} />
                    <BlockButton format="left" icon={<FormatAlignLeftIcon sx={{ fill: theme.palette.grey[300] }} />} />
                    <BlockButton format="center" icon={<FormatAlignCenterIcon sx={{ fill: theme.palette.grey[300] }} />} />
                    <BlockButton format="right" icon={<FormatAlignRightIcon sx={{ fill: theme.palette.grey[300] }} />} />
                </Box>
                <Box sx={{ p: '20px' }}>
                    <Editable
                        className="editable"
                        renderElement={renderElement}
                        renderLeaf={renderLeaf}
                        placeholder="Description"
                        spellCheck
                        autoFocus
                        onKeyDown={(event) => {
                            for (const hotkey in HOTKEYS) {
                                if (isHotkey(hotkey, event as any)) {
                                    event.preventDefault();
                                    const mark: any = HOTKEYS[hotkey];
                                    toggleMark(editor, mark);
                                }
                            }
                        }}
                    />
                </Box>
            </Box>
        </Slate>
    );
};

const toggleBlock = (editor: any, format: any) => {
    const isActive = isBlockActive(editor, format, TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type');
    const isList = LIST_TYPES.includes(format);

    Transforms.unwrapNodes(editor, {
        match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && LIST_TYPES.includes(n.type) && !TEXT_ALIGN_TYPES.includes(format),
        split: true
    });
    let newProperties: any;
    if (TEXT_ALIGN_TYPES.includes(format)) {
        newProperties = {
            align: isActive ? undefined : format
        };
    } else {
        let param: any;
        if (isActive) {
            param = 'paragraph';
        } else if (isList) {
            param = 'paragraph';
        } else param = format;
        newProperties = {
            type: param
        };
    }
    Transforms.setNodes<SlateElement>(editor, newProperties);

    if (!isActive && isList) {
        const block = { type: format, children: [] };
        Transforms.wrapNodes(editor, block);
    }
};

const toggleMark = (editor: any, format: any) => {
    const isActive = isMarkActive(editor, format);

    if (isActive) {
        Editor.removeMark(editor, format);
    } else {
        Editor.addMark(editor, format, true);
    }
};

const isBlockActive = (editor: any, format: any, blockType: string = 'type') => {
    const { selection } = editor;
    if (!selection) return false;

    const [match] = Array.from(
        Editor.nodes(editor, {
            at: Editor.unhangRange(editor, selection),
            match: (n: any) => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format
        })
    );

    return !!match;
};

const isMarkActive = (editor: any, format: any) => {
    const marks: any = Editor.marks(editor);
    return marks ? marks[format] === true : false;
};

const Element = ({ attributes, children, element }: any) => {
    const style = { textAlign: element.align };
    switch (element.type) {
        case 'block-quote':
            return (
                <blockquote style={style} {...attributes}>
                    {children}
                </blockquote>
            );
        case 'bulleted-list':
            return (
                <ul style={style} {...attributes}>
                    {children}
                </ul>
            );
        case 'heading-one':
            return (
                <h1 style={style} {...attributes}>
                    {children}
                </h1>
            );
        case 'heading-two':
            return (
                <h2 style={style} {...attributes}>
                    {children}
                </h2>
            );
        case 'list-item':
            return (
                <li style={style} {...attributes}>
                    {children}
                </li>
            );
        case 'numbered-list':
            return (
                <ol style={style} {...attributes}>
                    {children}
                </ol>
            );
        default:
            return (
                <p style={style} {...attributes}>
                    {children}
                </p>
            );
    }
};

const Leaf = ({ attributes, children, leaf }: any) => {
    if (leaf.bold) {
        children = <strong>{children}</strong>;
    }

    if (leaf.code) {
        children = <code>{children}</code>;
    }

    if (leaf.italic) {
        children = <em>{children}</em>;
    }

    if (leaf.underline) {
        children = <u>{children}</u>;
    }

    return <span {...attributes}>{children}</span>;
};

const BlockButton = ({ format, icon }: any) => {
    const editor = useSlate();
    return (
        <Button
            sx={{ width: '24px', height: '24px', minWidth: '24px', p: '19px' }}
            // active={isBlockActive(editor, format, TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type')}
            onMouseDown={(event) => {
                event.preventDefault();
                toggleBlock(editor, format);
            }}
        >
            {icon}
        </Button>
    );
};

const MarkButton = ({ format, icon }: any) => {
    const editor = useSlate();
    return (
        <Button
            sx={{ width: '24px', height: '24px', minWidth: '24px', p: '19px' }}
            // active={isMarkActive(editor, format)}
            onMouseDown={(event) => {
                event.preventDefault();
                toggleMark(editor, format);
            }}
        >
            {icon}
        </Button>
    );
};

const initialValue: any = [
    {
        type: 'paragraph',
        children: [{ text: '' }]
    }
];

export default AddOffersRich;
