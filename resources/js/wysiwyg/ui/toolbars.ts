import {EditorButton} from "./framework/buttons";
import {EditorContainerUiElement, EditorSimpleClassContainer, EditorUiElement} from "./framework/core";
import {el} from "../helpers";
import {EditorFormatMenu} from "./framework/blocks/format-menu";
import {FormatPreviewButton} from "./framework/blocks/format-preview-button";
import {EditorDropdownButton} from "./framework/blocks/dropdown-button";
import {EditorColorPicker} from "./framework/blocks/color-picker";
import {EditorTableCreator} from "./framework/blocks/table-creator";
import {EditorColorButton} from "./framework/blocks/color-button";
import {EditorOverflowContainer} from "./framework/blocks/overflow-container";
import {
    deleteColumn,
    deleteRow,
    deleteTable, insertColumnAfter,
    insertColumnBefore,
    insertRowAbove,
    insertRowBelow,
    table
} from "./defaults/buttons/tables";
import {fullscreen, redo, source, undo} from "./defaults/buttons/controls";
import {
    blockquote, dangerCallout,
    h2,
    h3,
    h4,
    h5,
    infoCallout,
    paragraph,
    successCallout,
    warningCallout
} from "./defaults/buttons/block-formats";
import {
    bold, clearFormating, code,
    highlightColor,
    italic,
    strikethrough, subscript,
    superscript,
    textColor,
    underline
} from "./defaults/buttons/inline-formats";
import {alignCenter, alignJustify, alignLeft, alignRight} from "./defaults/buttons/alignments";
import {bulletList, numberList, taskList} from "./defaults/buttons/lists";
import {
    codeBlock,
    details,
    diagram,
    editCodeBlock,
    horizontalRule,
    image,
    link, media,
    unlink
} from "./defaults/buttons/objects";

export function getMainEditorFullToolbar(): EditorContainerUiElement {
    return new EditorSimpleClassContainer('editor-toolbar-main', [

        // History state
        new EditorOverflowContainer(2, [
            new EditorButton(undo),
            new EditorButton(redo),
        ]),

        // Block formats
        new EditorFormatMenu([
            new FormatPreviewButton(el('h2'), h2),
            new FormatPreviewButton(el('h3'), h3),
            new FormatPreviewButton(el('h4'), h4),
            new FormatPreviewButton(el('h5'), h5),
            new FormatPreviewButton(el('blockquote'), blockquote),
            new FormatPreviewButton(el('p'), paragraph),
            new EditorDropdownButton({label: 'Callouts'}, true, [
                new FormatPreviewButton(el('p', {class: 'callout info'}), infoCallout),
                new FormatPreviewButton(el('p', {class: 'callout success'}), successCallout),
                new FormatPreviewButton(el('p', {class: 'callout warning'}), warningCallout),
                new FormatPreviewButton(el('p', {class: 'callout danger'}), dangerCallout),
            ]),
        ]),

        // Inline formats
        new EditorOverflowContainer(6, [
            new EditorButton(bold),
            new EditorButton(italic),
            new EditorButton(underline),
            new EditorDropdownButton(new EditorColorButton(textColor, 'color'), false, [
                new EditorColorPicker('color'),
            ]),
            new EditorDropdownButton(new EditorColorButton(highlightColor, 'background-color'), false, [
                new EditorColorPicker('background-color'),
            ]),
            new EditorButton(strikethrough),
            new EditorButton(superscript),
            new EditorButton(subscript),
            new EditorButton(code),
            new EditorButton(clearFormating),
        ]),

        // Alignment
        new EditorOverflowContainer(4, [
            new EditorButton(alignLeft),
            new EditorButton(alignCenter),
            new EditorButton(alignRight),
            new EditorButton(alignJustify),
        ]),

        // Lists
        new EditorOverflowContainer(3, [
            new EditorButton(bulletList),
            new EditorButton(numberList),
            new EditorButton(taskList),
        ]),

        // Insert types
        new EditorOverflowContainer(8, [
            new EditorButton(link),
            new EditorDropdownButton(table, false, [
                new EditorTableCreator(),
            ]),
            new EditorButton(image),
            new EditorButton(horizontalRule),
            new EditorButton(codeBlock),
            new EditorButton(diagram),
            new EditorButton(media),
            new EditorButton(details),
        ]),

        // Meta elements
        new EditorOverflowContainer(3, [
            new EditorButton(source),
            new EditorButton(fullscreen),

            // Test
            // new EditorButton({
            //     label: 'Test button',
            //     action(context: EditorUiContext) {
            //         context.editor.update(() => {
            //             // Do stuff
            //         });
            //     },
            //     isActive() {
            //         return false;
            //     }
            // })
        ]),
    ]);
}

export function getImageToolbarContent(): EditorUiElement[] {
    return [new EditorButton(image)];
}

export function getLinkToolbarContent(): EditorUiElement[] {
    return [
        new EditorButton(link),
        new EditorButton(unlink),
    ];
}

export function getCodeToolbarContent(): EditorUiElement[] {
    return [
        new EditorButton(editCodeBlock),
    ];
}

export function getTableToolbarContent(): EditorUiElement[] {
    return [
        new EditorOverflowContainer(2, [
            // Todo - Table properties
            new EditorButton(deleteTable),
        ]),
        new EditorOverflowContainer(3, [
            new EditorButton(insertRowAbove),
            new EditorButton(insertRowBelow),
            new EditorButton(deleteRow),
        ]),
        new EditorOverflowContainer(3, [
            new EditorButton(insertColumnBefore),
            new EditorButton(insertColumnAfter),
            new EditorButton(deleteColumn),
        ]),
    ];
}