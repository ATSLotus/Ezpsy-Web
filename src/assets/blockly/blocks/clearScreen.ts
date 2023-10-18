import BLK from "blockly"
import blockColor from "../config"

const clearScreen = (Blockly: typeof BLK) => {
    // 1.清屏
    Blockly.Blocks['clearscreen'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("clearScreen");
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(blockColor.clearScreen);
            this.setTooltip("dfdf");
            this.setHelpUrl("www.taobao.com");
        }
    };

    //清除元素
    Blockly.Blocks['remove'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("remove");
            this.appendValueInput('id')
                .setCheck(null)
                .appendField('id')
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(blockColor.clearScreen);
            this.setTooltip("dfdf");
            this.setHelpUrl("www.taobao.com");
        }
    };
}

export default clearScreen
