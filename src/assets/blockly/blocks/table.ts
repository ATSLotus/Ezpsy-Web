import BLK from "blockly"
import blockColor from "../config"

const table = (Blockly: typeof BLK) => {
    Blockly.Blocks["referenceTable"] = {
        init: function () {
            this.appendDummyInput()
                .appendField("referenceTable");
            this.appendValueInput('name')
                .setCheck(null)
                .appendField('name')
            this.setInputsInline(true);
            this.setOutput(true, null)
            // this.setPreviousStatement(true, null);
            // this.setNextStatement(true, null);
            this.setColour(blockColor.table);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    }
}

export default table