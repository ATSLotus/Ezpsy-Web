import { IDomEditor } from "@wangeditor/editor";

export const insertBreak = (editor: IDomEditor) => {
    const node = {
        type: "paragraph",
        children: [
            {
                text: ""
            }
        ]
    }
    editor.insertNode(node)
}