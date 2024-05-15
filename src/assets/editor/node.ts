import { IDomEditor, SlateElement } from "@wangeditor/editor";
import { h, VNode } from "snabbdom";
import { BlockElement, block_type } from "./interface"
import { insertBlock } from "./utils";

function renderBlock(elem: SlateElement, children: VNode[] | null, editor: IDomEditor): VNode {
    const { block = "", key = "", value = "" } = elem as BlockElement

    const attachVNode = h(
        "span",
        {
            attrs: {
                "data-key": key,
                "data-block": block,
                "data-value": value,
                class: "ezpsy-editor-block"
            },
            on: {
                click: () => {
                    insertBlock(editor, block as block_type, {
                        key: key,
                        value: value,
                        isSkip: true,
                        selection: editor.selection
                    })
                }
            }
        },
        [
            h("span", {style: {color: "#FFFF00"}}, [` [${block}] `]),
            h("span", {}, [key])
        ]
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
                "data-block": block,
                "data-value": value,
                class: "ezpsy-editor-inline-block"
            },
            on: {
                click: () => {
                    insertBlock(editor, block as block_type, {
                        key: key,
                        value: value,
                        isSkip: true,
                        selection: editor.selection
                    })
                }
            }
        },
        [
            h("span", {style: {color: "#FFFF00"}}, [` [${block}] `]),
            h("span", {}, [key])
        ]
    )

    return attachVNode
}

export {
    renderBlock,
    renderInlineBlock
}