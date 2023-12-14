import { base64ToString } from "../utils/utils"

const REG = /<span data-block="(singleline|multiline|radio|checkbox)" data-key="[a-zA-Z_][0-9a-zA-Z_]*" data-w-e-is-void(="")?( data-w-e-is-inline(="")?)? data-value="[A-Za-z0-9+/=]*">[a-zA-Z_][0-9a-zA-Z_]*<\/span>/g

const handleHtml = (html: string) => {
    const blocks = html.match(REG)
    blocks && blocks.forEach(block => {
        const dom_box = document.createElement("div")
        dom_box.innerHTML = block
        const dom = dom_box.children?.[0]
        const block_type = dom.getAttribute("data-block")
        const key = dom.getAttribute("data-key")
        const value = dom.getAttribute("data-value")
        let replace = ""
        const cls = `ezpsy-editor-${block_type}-block`
        switch(block_type) {
            case "singleline":
                replace += `<span class="${cls}" `
                replace += `contenteditable="true" `
                replace += `data-status="inline-block" `
                replace += `onfocus="((event)=>{event.target.setAttribute('data-status', 'none');event.target.focus()})(event)" `
                replace += `onblur="((event)=>{event.target.setAttribute('data-status', 'inline-block')})(event)" `
                replace += `></span>`
                break
            case "multiline":
                replace += `<span class="${cls} no_scroll_bar" `
                replace += `contenteditable="true" `
                replace += `placeholder="请输入" `
                replace += `onfocus="((event)=>{event.target.setAttribute('placeholder', '');event.target.focus()})(event)" `
                replace += `onblur="((event)=>{event.target.setAttribute('placeholder', '请输入')})(event)" `
                replace += `></span>`
                break
            case "radio":
                if(value) {
                    const radio_json = JSON.parse(base64ToString(value))
                    replace += `<div class="${cls}">`
                    replace += `<div>${radio_json.title}</div>`
                    
                    replace += `</div>`
                }
                break
            default: 
                replace = block
        }
        html = html.replace(block, replace)
    })
    return html
}

export default handleHtml