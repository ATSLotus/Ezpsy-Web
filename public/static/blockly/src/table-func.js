async function renderTable(json) {
    console.log(json)
    const obj = JSON.parse(utils.base64tostring(json))
    console.log(obj)
    return await Swal.fire({
        html: `<div class="ezpsy-editor-content" style="text-align: initial">${obj.html}<div>`,
        preConfirm: () => {

        }
    }).then(res => {
        return res.value
    })
}