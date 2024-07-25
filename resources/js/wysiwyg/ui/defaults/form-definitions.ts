import {EditorFormDefinition, EditorSelectFormFieldDefinition} from "../framework/forms";
import {EditorUiContext} from "../framework/core";
import {$createLinkNode} from "@lexical/link";
import {$createTextNode, $getSelection} from "lexical";
import {$createImageNode} from "../../nodes/image";
import {setEditorContentFromHtml} from "../../actions";
import {$createMediaNodeFromHtml} from "../../nodes/media";


export const link: EditorFormDefinition = {
    submitText: 'Apply',
    action(formData, context: EditorUiContext) {
        context.editor.update(() => {

            const selection = $getSelection();

            const linkNode = $createLinkNode(formData.get('url')?.toString() || '', {
                title: formData.get('title')?.toString() || '',
                target: formData.get('target')?.toString() || '',
            });
            linkNode.append($createTextNode(formData.get('text')?.toString() || ''));

            selection?.insertNodes([linkNode]);
        });
        return true;
    },
    fields: [
        {
            label: 'URL',
            name: 'url',
            type: 'text',
        },
        {
            label: 'Text to display',
            name: 'text',
            type: 'text',
        },
        {
            label: 'Title',
            name: 'title',
            type: 'text',
        },
        {
            label: 'Open link in...',
            name: 'target',
            type: 'select',
            valuesByLabel: {
                'Current window': '',
                'New window': '_blank',
            }
        } as EditorSelectFormFieldDefinition,
    ],
};

export const image: EditorFormDefinition = {
    submitText: 'Apply',
    action(formData, context: EditorUiContext) {
        context.editor.update(() => {
            const selection = $getSelection();
            const imageNode = $createImageNode(formData.get('src')?.toString() || '', {
                alt: formData.get('alt')?.toString() || '',
                height: Number(formData.get('height')?.toString() || '0'),
                width: Number(formData.get('width')?.toString() || '0'),
            });
            selection?.insertNodes([imageNode]);
        });
        return true;
    },
    fields: [
        {
            label: 'Source',
            name: 'src',
            type: 'text',
        },
        {
            label: 'Alternative description',
            name: 'alt',
            type: 'text',
        },
        {
            label: 'Width',
            name: 'width',
            type: 'text',
        },
        {
            label: 'Height',
            name: 'height',
            type: 'text',
        },
    ],
};

export const media: EditorFormDefinition = {
    submitText: 'Save',
    action(formData, context: EditorUiContext) {

        // TODO - Get media from selection

        const embedCode = (formData.get('embed') || '').toString().trim();
        if (embedCode) {
            context.editor.update(() => {
                const node = $createMediaNodeFromHtml(embedCode);
                // TODO - Replace existing or insert new
            });

            return true;
        }

        const src = (formData.get('src') || '').toString().trim();
        const height = (formData.get('height') || '').toString().trim();
        const width = (formData.get('width') || '').toString().trim();

        // TODO - Update existing or insert new

        return true;
    },
    fields: [
        {
            label: 'Source',
            name: 'src',
            type: 'text',
        },
        {
            label: 'Width',
            name: 'width',
            type: 'text',
        },
        {
            label: 'Height',
            name: 'height',
            type: 'text',
        },
        // TODO - Tabbed interface to separate this option
        {
            label: 'Paste your embed code below:',
            name: 'embed',
            type: 'textarea',
        },
    ],
};

export const source: EditorFormDefinition = {
    submitText: 'Save',
    action(formData, context: EditorUiContext) {
        setEditorContentFromHtml(context.editor, formData.get('source')?.toString() || '');
        return true;
    },
    fields: [
        {
            label: 'Source',
            name: 'source',
            type: 'textarea',
        },
    ],
};