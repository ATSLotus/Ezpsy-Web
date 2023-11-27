const REG = /<span data-block="(singleline|multiline|radio|checkbox)" data-key="[a-zA-Z0-9_]+" data-w-e-is-void(="")? data-w-e-is-inline(="")? data-value="[a-zA-Z0-9_]+">[a-zA-Z0-9_]+<\/span>/g

const handleHtml = (html: string) => {
    console.log(html)
    const blocks = html.match(REG)
    blocks && blocks.forEach(block => {
        const dom_box = document.createElement("div")
        dom_box.innerHTML = block
        const dom = dom_box.children?.[0]
        const block_type = dom.getAttribute("data-block")
        const key = dom.getAttribute("data-key")
        const value = dom.getAttribute("data-value")
        let replace = ""
        const cls = ``
        switch(block_type) {
            case "":
                replace += `<div cls="${cls}" contenteditable="true">`

                replace += `</div>`
                break
            default: 
                replace = block
        }
        html.replace(block, replace)
    })
    return html
}

export default handleHtml