import { SlateElement } from "@wangeditor/editor"

export interface BlockElement extends SlateElement {
    block: string
    key: string
    value: string
}

export interface BlockElementWithId extends BlockElement {
    id: string
    block: "singleline" | "multiline" | "radio" | "checkbox"
}
export interface VALUE {
    value: string;
    text: string;
    selected?: boolean;
    styleForRenderMenuList?: {
        [key: string]: string;
    };
}

export interface defaultOptions{
    title: string
    width?: number
    classFunctions?: ClassFunction
}

export interface selectOptions extends defaultOptions {
    options: Array<VALUE>
}