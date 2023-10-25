import { inputPopup } from "./popup"

const baseHeader = `data:image/png;base64,`

export const getBase64 = (str: string) => {
    return str.replace(/data:image\/.{3,4};base64,/, "")
}

export const getBlob = (str: string) => {
    const bstr = atob(str)
    let len = bstr.length
    const u8 = new Uint8Array(len)
    while(len--) {
        u8[len] = bstr.charCodeAt(len)
    }
    const blob = new Blob([u8], {type: "png"})
    return URL.createObjectURL(blob)
}