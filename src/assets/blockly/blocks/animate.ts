import BLK from "blockly"
import blockColor from "../config"

const animate = (Blockly: typeof BLK) => {
    //refresh
    Blockly.Blocks['refresh'] = {
        init: function () {
            this.appendDummyInput()
                .appendField('refresh')
            this.appendValueInput("id")
                .setCheck(null)
                .appendField("id")
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(blockColor.animate)
            this.setTooltip("dfdf")
            this.setHelpUrl("www.taobao.com");
        }
    }


    //ezAnimate
    Blockly.Blocks['animate'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("ezAnimate")
            this.appendValueInput("id")
                .setCheck(null)
                .appendField("id")
            this.appendValueInput("delay")
                .setCheck(null)
                .appendField("delay")
            this.appendStatementInput("func")
                .setCheck(null)
                .appendField("func1")
            this.setInputsInline(false)
            this.setPreviousStatement(true, null)
            this.setNextStatement(true, null)
            this.setColour(blockColor.animate)
            this.setTooltip("dfdf")
            this.setHelpUrl("www.taobao.com");
        }
    }

    Blockly.Blocks['play'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("play")
            this.appendValueInput("id")
                .setCheck(null)
                .appendField("id")
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(blockColor.animate)
            this.setTooltip("dfdf")
            this.setHelpUrl("www.taobao.com");
        }
    }

    Blockly.Blocks['pause'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("pause")
            this.appendValueInput("id")
                .setCheck(null)
                .appendField("id")
            this.setInputsInline(true)
            this.setPreviousStatement(true, null)
            this.setNextStatement(true, null)
            this.setColour(blockColor.animate)
            this.setTooltip("dfdf")
            this.setHelpUrl("www.taobao.com");
        }
    }
}

export default animate