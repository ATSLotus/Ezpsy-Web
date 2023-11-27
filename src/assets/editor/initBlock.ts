import withBlock from "./plugin";
import { renderBlock } from "./node";
import { BlockToHtml } from "./nodeToHtml";
import { parseBlockHtml } from "./parseNode";
import { Boot } from "@wangeditor/editor";

const initBlock = () => {
    const keyName = "block"

    const renderBlockConf = {
        type: keyName, 
        renderElem: renderBlock,
    }
    
    const BlockToHtmlConf = {
        type: keyName, 
        elemToHtml: BlockToHtml,
    }
    
    const parseBlockHtmlConf = {
        selector: `span[data-type="${keyName}"]`, // CSS 选择器，匹配特定的 HTML 标签
        parseElemHtml: parseBlockHtml,
    }
    
    const mod = {
        editorPlugin: withBlock,
        renderElems: [
            renderBlockConf
        ],
        elemsToHtml: [
            BlockToHtmlConf
        ],
        parseElemsHtml: [
            parseBlockHtmlConf
        ]
    }
    
    Boot.registerModule(mod)
}

export default initBlock