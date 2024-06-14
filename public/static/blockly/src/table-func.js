async function renderTable(json) {
    const obj = JSON.parse(utils.base64tostring(json))
    const res = await Swal.fire({
        html: `<div class="ezpsy-editor-content" style="text-align: initial">${obj.html}<div>`,
        allowOutsideClick: false,
        allowEscapeKey: false,
        preConfirm: () => {
            let result = {}
            Object.keys(obj.keys).forEach(key => {
                console.log(key, obj.keys[key])
                const dom = document.getElementById(`ezpsy_editor_table_${key}`)
                console.log({res: dom})
                let value = ""
                switch(obj.keys[key]) {
                    case "singleline":
                        value = dom.innerText
                        break
                    case "multiline":
                        value = dom.innerText
                        break
                    case "radio":
                        const imgs = dom.querySelectorAll(".ezpsy-editor-radio-block_img")
                        const texts = dom.querySelectorAll(".ezpsy-editor-radio-block_text")
                        console.log(imgs)
                        console.log(texts)
                        imgs.forEach((img, index) => {
                            if(img.getAttribute('data-selected') === "true") {
                                value = texts[index].innerText
                            }
                        })
                        break
                    case "checkbox":
                        const inputs = dom.querySelectorAll(".ezpsy-editor-checkbox-block_checkbox")
                        const checks = dom.querySelectorAll(".ezpsy-editor-checkbox-block_text")
                        value = []
                        inputs.forEach((input, index) => {
                            if(input.checked) {
                                value.push(checks[index].innerText)
                            }
                        })
                        break
                    default:
                        break
                }
                console.log(value)
                result[key] = value
            })
            return result
        }
    })
    console.log("RES", res)
    if(res.isConfirmed) {
        console.log(res.value)
        return res.value
    }
    else
        return {}
}