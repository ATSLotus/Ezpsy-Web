import BLK from "blockly"
import blockColor from "../config"

const dialog = (Blockly: typeof BLK) => {

    Blockly.Blocks['inputDlg'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("inputDlg")
            this.appendValueInput('titleText')
                .setCheck(null)
                .appendField('titleText')
            this.appendValueInput("inputText")
                .setCheck(null)
                .appendField("inputText")
            this.appendValueInput("result")
                .setCheck(null)
                .appendField("result")
            // this.appendStatementInput("func")
            //     .setCheck(null)
            //     .appendField("func")
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(blockColor.dialog);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    };

    Blockly.Blocks['errorDlg'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("errorDlg")
            this.appendValueInput('titleText')
                .setCheck(null)
                .appendField('titleText')
            this.appendValueInput("textContent")
                .setCheck(null)
                .appendField("textContent")
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(blockColor.dialog);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    };

    Blockly.Blocks['helpDlg'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("helpDlg")
            this.appendValueInput('titleText')
                .setCheck(null)
                .appendField('titleText')
            this.appendValueInput("textContent")
                .setCheck(null)
                .appendField("textContent")
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(blockColor.dialog);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    };

    Blockly.Blocks['listDlgContent'] = {
        init: function() {
            this.appendValueInput("result")
                .setCheck(null)
                .appendField("result")
            this.appendValueInput('titleText')
                .setCheck(null)
                .appendField('titleText')
            this.appendValueInput("IsMultiple")
                .setCheck(null)
                .appendField("IsMultiple")
            this.setInputsInline(true);
            this.setOutput(true, null)
            this.setColour(blockColor.dialog);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    }

    Blockly.Blocks['listDlgListen'] = {
        init: function() {
            this.appendValueInput("confirmText")
                .setCheck(null)
                .appendField("confirmText")
            this.appendValueInput("cancelText")
                .setCheck(null)
                .appendField("cancelText")
            this.setInputsInline(true);
            this.setOutput(true, null)
            this.setColour(blockColor.dialog);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    }

    Blockly.Blocks['listDlg'] = {
        init: function () {
            // this.appendDummyInput()
            //     .appendField("listDlg")
            
            this.appendValueInput("listDlgContent")
                .appendField("listDlg")
            this.appendValueInput("listDlgListen")
            this.appendValueInput("objectList")
                .setCheck(null)
                .appendField("options")
            
            this.setInputsInline(false);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(blockColor.dialog);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    };

    Blockly.Blocks['questDlg'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("questDlg")
            this.appendValueInput('titleText')
                .setCheck(null)
                .appendField('titleText')
            this.appendValueInput("textContent")
                .setCheck(null)
                .appendField("textContent")
            this.appendValueInput("result")
                .setCheck(null)
                .appendField("result")
            // this.appendStatementInput("func")
            //     .setCheck(null)
            //     .appendField("func")
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(blockColor.dialog);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    };

    Blockly.Blocks['warnDlg'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("warnDlg")
            this.appendValueInput('titleText')
                .setCheck(null)
                .appendField('titleText')
            this.appendValueInput("textContent")
                .setCheck(null)
                .appendField("textContent")
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(blockColor.dialog);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    };

    Blockly.Blocks["msgDlgContent"] = {
        init: function() {
            this.appendValueInput('image')
                .setCheck(null)
                .appendField('image')
            this.appendValueInput("textContent")
                .setCheck(null)
                .appendField("textContent")
            this.setInputsInline(true);
            this.setOutput(true, null)
            this.setColour(blockColor.dialog);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    }

    Blockly.Blocks["msgDlgListener"] = {
        init: function() {
            this.appendValueInput("width")
                .setCheck(null)
                .appendField("width")
            this.appendValueInput("height")
                .setCheck(null)
                .appendField("height")
            this.appendValueInput("confirm")
                .setCheck(null)
                .appendField("confirm")
            this.setInputsInline(true);
            this.setOutput(true, null)
            this.setColour(blockColor.dialog);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    }

    Blockly.Blocks['msgDlg'] = {
        init: function () {
            // this.appendDummyInput()
            //     .appendField("")
            this.appendValueInput("msgDlgContent")
                .appendField("msgDlg")
            this.appendValueInput("msgDlgListener")
            this.appendStatementInput("func")
                .setCheck(null)
                .appendField("func");
            this.setInputsInline(false);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(blockColor.dialog);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    };
}

export default dialog
