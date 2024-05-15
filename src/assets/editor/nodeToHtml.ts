import { SlateElement } from "@wangeditor/editor"
import { BlockElement } from "./interface"

function BlockToHtml(elem: SlateElement, childrenHtml: string): string {

    const { block = "", key = "", value = "" } = elem as BlockElement

    const formatValue = `"${value}"`

    const html = `<span data-block="${block}" data-key="${key}" data-w-e-is-void data-value=${formatValue}>${key}</span>`

    return html
}

function InlineBlockToHtml(elem: SlateElement, childrenHtml: string): string {

    const { block = "", key = "", value = "" } = elem as BlockElement

    const formatValue = `"${value}"`

    const html = 
    `<span data-block="${block}" data-key="${key}" data-w-e-is-void data-w-e-is-inline data-value=${formatValue}>${key}</span>`

    return html
}

export {
    BlockToHtml,
    InlineBlockToHtml
}