import randerScript from "./randerScript"

const initBlockly = async () => {
    await randerScript("static/blockly/code/blockly.min.js")
}

export default initBlockly