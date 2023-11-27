import { IDomEditor, SlateDescendant, SlateElement } from "@wangeditor/editor";

function parseBlockHtml(domElement: Element, children: SlateDescendant[], editor: IDomEditor): SlateElement {
    
    const block = domElement.getAttribute('data-block') || ''
    const key = domElement.getAttribute('data-key') || ''
    const value = domElement.getAttribute('data-value') || ''

    const AtBlock = {
        type: "block",
        block,
        key,
        value,
        children: [
            {
                text: ""
            }
        ]
    }

    return AtBlock
}

export {
    parseBlockHtml
}