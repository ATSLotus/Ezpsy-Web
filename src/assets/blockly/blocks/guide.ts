import BLK from "blockly"
import blockColor from "../config"

const guide = (Blockly: typeof BLK) => {
    // 1.用户指引
    Blockly.Blocks['guide'] = {
        init: function () {
            this.appendValueInput("imageUrl")
                .setCheck(null)
                .appendField("Guide");
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(blockColor.guide);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    };
    // 2.实验结束
    Blockly.Blocks['end'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("END");
            this.appendValueInput("ENDTEXT")
                .setCheck(null);
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(blockColor.guide);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    };
}

export default guide