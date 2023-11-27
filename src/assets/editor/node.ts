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
                "data-value": value,
                class: "ezpsy-editor-block"
            },
            on: {
                
            }
        },
        [value]
    )

    return attachVNode
}

export {
    renderBlock
}