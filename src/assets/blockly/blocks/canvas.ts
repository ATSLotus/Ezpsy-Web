import BLK from "blockly"
import blockColor from "../config"

const canvas = (Blockly: typeof BLK) => {
    Blockly.Blocks['canvasSize'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("canvasSize");
            this.appendValueInput('width')
                .setCheck("Number")
                .appendField('width')
            this.appendValueInput("height")
                .setCheck("Number")
                .appendField("height");
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(blockColor.canvas);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    };

    Blockly.Blocks['canvasColor'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("canvasSize");
            this.appendValueInput("color")
                .setCheck(null)
                .appendField("color");
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(blockColor.canvas);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    }

}

export default canvas
