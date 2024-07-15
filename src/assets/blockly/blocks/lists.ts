// @ts-nocheck
import BLK from "blockly"
import blockColor from "../config"

const lists = (Blockly: typeof BLK) => {
    Blockly.Blocks['shuffle_list'] = {
        init: function(){
            this.appendDummyInput()
                .appendField("shuffle_list")
            this.appendValueInput('LIST')
                .setCheck(null)
                .appendField('LIST')
            this.setInputsInline(true);
            this.setOutput(true, null);
            // this.setPreviousStatement(true, null);
            // this.setNextStatement(true, null);
            this.setColour(blockColor.lists);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    } 

    Blockly.Blocks['list_push'] = {
        init: function(){
            this.appendDummyInput()
                .appendField("list_push")
            this.appendValueInput('LIST')
                .setCheck(null)
                .appendField('LIST')
            this.appendValueInput('value')
                .setCheck(null)
                .appendField('value')
            this.setInputsInline(true);
            // this.setOutput(true, null);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(blockColor.lists);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    } 
}

export default lists