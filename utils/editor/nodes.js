import Paragraph from '@tiptap/extension-paragraph';
import Document from '@tiptap/extension-document';
import Text from '@tiptap/extension-text';
import {mergeAttributes, Mark} from '@tiptap/core';

export const FatigueMark = Mark.create({
	name: 'fatigue',
	renderHTML({HTMLAttributes}) {
		return [
			'span',
			{class: `editor--fatigue__value${HTMLAttributes.value}`},
			0,
		];
	},
	addAttributes() {
		return {
			value: {
				default: 0,
			},
		};
	},
});

export const LengthMark = Mark.create({
	name: 'length',
	renderHTML({HTMLAttributes}) {
		return [
			'span',
			{class: `editor--sentence__length-${HTMLAttributes.value}`},
			0,
		];
	},
	addAttributes() {
		return {
			value: {
				default: 0,
			},
		};
	},
});

export const EditorText = Text.extend({
	marks: 'fatigue length',
});

export const EditorParagraph = Paragraph.extend({
	content: 'text*',
	renderHTML({HTMLAttributes}) {
		return [
			'p',
			mergeAttributes(HTMLAttributes, {class: 'editor--paragraph'}),
			0,
		];
	},
});

export const EditorDocument = Document.extend({
	content: 'paragraph+',
});
