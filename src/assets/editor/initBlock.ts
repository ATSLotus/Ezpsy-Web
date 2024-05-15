import withBlock from "./plugin";
import { renderBlock, renderInlineBlock } from "./node";
import { BlockToHtml, InlineBlockToHtml } from "./nodeToHtml";
import { parseBlockHtml, parseInlineBlockHtml } from "./parseNode";
import { Boot } from "@wangeditor/editor";

const initBlock = () => {
    const block = "block"
    const inline_block = "inline-block"

    const renderBlockConf = {
        type: block, 
        renderElem: renderBlock,
    }
    
    const BlockToHtmlConf = {
        type: block, 
        elemToHtml: BlockToHtml,
    }
    
    const parseBlockHtmlConf = {
        selector: `span[data-type="${block}"]`, // CSS 选择器，匹配特定的 HTML 标签
        parseElemHtml: parseBlockHtml,
    }

    const renderInlineBlockConf = {
        type: inline_block, 
        renderElem: renderInlineBlock,
    }
    
    const InlineBlockToHtmlConf = {
        type: inline_block, 
        elemToHtml: InlineBlockToHtml,
    }
    
    const parseInlineBlockHtmlConf = {
        selector: `span[data-type="${inline_block}"]`, // CSS 选择器，匹配特定的 HTML 标签
        parseElemHtml: parseInlineBlockHtml,
    }
    
    const mod = {
        editorPlugin: withBlock,
        renderElems: [
            renderBlockConf,
            renderInlineBlockConf
        ],
        elemsToHtml: [
            BlockToHtmlConf,
            InlineBlockToHtmlConf
        ],
        parseElemsHtml: [
            parseBlockHtmlConf,
            parseInlineBlockHtmlConf
        ]
    }
    
    Boot.registerModule(mod)
}

export default initBlock