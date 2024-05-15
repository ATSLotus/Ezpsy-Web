import { DomEditor, IDomEditor, SlateElement, SlateTransforms } from "@wangeditor/editor";

function withBlock<T extends IDomEditor>(editor: T) {
    const { isInline, isVoid } = editor
    const newEditor = editor

    newEditor.isInline = elem => {
        const type = DomEditor.getNodeType(elem)
        if(type === "block") return false
        if(type === "inline-block") return true
        return isInline(elem)
    }

    newEditor.isVoid = elem => {
        const type = DomEditor.getNodeType(elem)
        if(type === "block") return true
        if(type === "inline-block") return true
        return isVoid(elem) 
    } 

    return newEditor
}

export default withBlock