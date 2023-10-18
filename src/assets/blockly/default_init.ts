import BLK from "blockly"
import blockColor from "./config";

const defaultInit = (Blockly: typeof BLK) => {
    const defaultTheme = Blockly.Themes.Classic

    defaultTheme.blockStyles['logic_blocks']['colourPrimary'] = blockColor.logic
    defaultTheme.blockStyles['loop_blocks']['colourPrimary'] = blockColor.loops
    defaultTheme.blockStyles['math_blocks']['colourPrimary'] = blockColor.math
    defaultTheme.blockStyles['text_blocks']['colourPrimary'] = blockColor.texts
    defaultTheme.blockStyles['list_blocks']['colourPrimary'] = blockColor.lists
    defaultTheme.blockStyles['colour_blocks']['colourPrimary'] = blockColor.colour
    defaultTheme.blockStyles['variable_blocks']['colourPrimary'] = blockColor.variables
    defaultTheme.blockStyles['procedure_blocks']['colourPrimary'] = blockColor.procedure

}

export default defaultInit