import { IDomEditor, SlateElement } from "@wangeditor/editor";
import { h, VNode } from "snabbdom";
import { BlockElement } from "./interface"

function renderBlock(elem: SlateElement, children: VNode[] | null, editor: IDomEditor): VNode {
    const { block = "", key = "", value = "" } = elem as BlockElement

    const attachVNode = h(
        "span",
        {
            attrs: {
                "data-key": key,
                class: "ezpsy-editor-block"
            },
            on: {
                
            }
        },
        [key]
    )

    return attachVNode
}

function renderInlineBlock(elem: SlateElement, children: VNode[] | null, editor: IDomEditor): VNode {
    const { block = "", key = "", value = "" } = elem as BlockElement

    const attachVNode = h(
        "span",
        {
            attrs: {
                "data-key": key,
                "data-value": value,
                class: "ezpsy-editor-inline-block"
            },
            on: {
                
            }
        },
        [key]
    )

    return attachVNode
}

export {
    renderBlock,
    renderInlineBlock
}