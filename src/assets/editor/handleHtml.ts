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
                replace += `<span id="ezpsy_editor_table_${key}" class="${cls}" `
                replace += `contenteditable="true" `
                replace += `data-status="inline-block" `
                replace += `onfocus="((event)=>{event.target.setAttribute('data-status', 'none');event.target.focus()})(event)" `
                replace += `onblur="((event)=>{event.target.setAttribute('data-status', 'inline-block')})(event)" `
                replace += `></span>`
                break
            case "multiline":
                replace += `<span id="ezpsy_editor_table_${key}" class="${cls} no_scroll_bar" `
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
                    replace += `<div class="${cls}_title">${radio_json.title}</div>`
                    let len = radio_json.options.length
                    for(let i = 0; i < len; i++) {
                        const option = radio_json.options[i]
                        replace += `<div id="ezpsy_editor_table_${key}" class="${cls}_option">`
                        replace += `<img class="${cls}_img" `
                        replace += `onclick="((event)=>{
                            const target = event.target
                            if(target.getAttribute('data-selected') === 'true') {
                                target.setAttribute('data-selected', 'false')
                                target.src = target.src.replace('yes', 'no')
                            } else {
                                target.setAttribute('data-selected', 'true')
                                target.src = target.src.replace('no', 'yes')
                            }
                        })(event)" `
                        replace += `src="./src/assets/image/editor/radio-`
                        if(option.checked)
                            replace += `yes.svg" data-selected="true"/>`
                        else
                            replace += `no.svg" data-selected="false"/>`
                        replace += `<span class="${cls}_text">${option.text}</span>`
                        replace += `</div>`
                    }
                    replace += `</div>`
                }
                break
            case "checkbox": 
                if(value) {
                    const radio_json = JSON.parse(base64ToString(value))
                    replace += `<div class="${cls}">`
                    replace += `<div class="${cls}_title">${radio_json.title}</div>`
                    let len = radio_json.options.length
                    for(let i = 0; i < len; i++) {
                        const option = radio_json.options[i]
                        replace += `<div id="ezpsy_editor_table_${key}" class="${cls}_option">`
                        replace += `<input class="${cls}_checkbox" type="checkbox" `
                        if(option.checked)
                            replace += `checked />`
                        else
                            replace += `/>`
                        replace += `<span class="${cls}_text">${option.text}</span>`
                        replace += `</div>`
                    }
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