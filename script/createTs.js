import * as fs from "fs"

const files = fs.readdirSync("./public/static/blockly/src")
const setGEN = (title) => {
const genStr = 
`import BLK from "blockly"

const ${title} = (Blockly: typeof BLK) => {

}
export default ${title}
`
return genStr
}
const SET = (title) => {
const str = 
`import BLK from "blockly"
import blockColor from "../config"

const ${title} = (Blockly: typeof BLK) => {

}

export default ${title}
`
return str
}

const a = []

files.forEach(file => {
    switch(true) {
        case file.includes("-gen"): 
            const gen_title = file.split('-gen.')[0]
            a.push(gen_title)
            // fs.writeFileSync(`./target/javascript/${gen_title}.ts`, setGEN(gen_title))
            break
        case file.includes("-func"):
            const func_title = file.split('-func.')[0]
            // fs.writeFileSync(`./target/function/${func_title}.ts`, "")
            break
        default:
            const title  = file.split('.')[0]
            // fs.writeFileSync(`./target/blocks/${title}.ts`, SET(title))
            break
    }
})

console.log(a)