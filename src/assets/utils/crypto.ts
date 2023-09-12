import crypto from "crypto-js"
import log from "@/assets/utils/log"

const getRandomChar = () => {
    let char = ``
    for(let i = 0; i < 8; i++) {
        const basePrefixC = 65
        const basePrefix = 97
        const isCap = Math.floor(Math.random()*3)
        let item = ''
        switch(isCap) {
            case 0: 
                item = Math.floor(Math.random()*10).toString()
                break
            case 1:
                item = String.fromCharCode(basePrefixC + Math.floor(Math.random()*26))
                break
            case 2: 
                item = String.fromCharCode(basePrefix + Math.floor(Math.random()*26))
                break
            default:
                break
        }
        char += item
    }
    return char
}

const aseKey: string = crypto.AES.decrypt("4pWQOdoUhJPmkYy+OcHXSg==", crypto.enc.Utf8.parse("MH991111"), {
    mode: crypto.mode.ECB,
    padding: crypto.pad.ZeroPadding
}).toString(crypto.enc.Utf8)

const random = getRandomChar()

const encrypt = (str: string, isRandom: boolean = false) => {
    let newAseKey = aseKey
    if(isRandom) newAseKey += random
    return encodeURIComponent(crypto.AES.encrypt(encodeURIComponent(str), crypto.enc.Utf8.parse(newAseKey), {
        mode: crypto.mode.ECB,
        padding: crypto.pad.ZeroPadding
    }).toString())
}

const decrypt = (str: string, isRandom: boolean = false) => {
    let newAseKey = aseKey
    if(isRandom) newAseKey += random
    return decodeURIComponent(crypto.AES.decrypt(decodeURIComponent(str), crypto.enc.Utf8.parse(newAseKey), {
        mode: crypto.mode.ECB,
        padding: crypto.pad.ZeroPadding
    }).toString(crypto.enc.Utf8))
}

export {
    encrypt,
    decrypt
}