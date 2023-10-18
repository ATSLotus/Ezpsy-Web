Blockly.Blocks['First-orderGratingMotion'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("First-orderGratingMotion")
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#905EA1");
        this.setTooltip("");
        this.setHelpUrl("");
    }
}

Blockly.Blocks['GratingTrain'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("GratingTrain")
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#905EA1");
        this.setTooltip("");
        this.setHelpUrl("");
    }
}

Blockly.Blocks['module_text'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("text");
        this.appendValueInput('id')
            .setCheck("String")
            .appendField('id')
        this.appendValueInput("content")
            .setCheck("String")
            .appendField("content");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(60);
        this.setTooltip("dfdf");
        this.setHelpUrl("www.taobao.com");
    }
};

Blockly.Blocks['module0_text'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("fillText");
        this.appendValueInput('id')
            .setCheck("String")
            .appendField('id')
        this.appendValueInput("content")
            .setCheck("String")
            .appendField("content");
        this.appendValueInput("color")
            .setCheck(null)
            .appendField("color");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(60);
        this.setTooltip("dfdf");
        this.setHelpUrl("www.taobao.com");
    }
};

Blockly.Blocks['module_listDlg'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("listDlg")
        this.appendValueInput('titleText')
            .setCheck(null)
            .appendField('titleText')
        this.appendValueInput("result")
            .setCheck(null)
            .appendField("result")
        this.appendValueInput("objectList")
            .setCheck(null)
            .appendField("objectList")
        // this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#CD853F");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['module_msgDlg'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("msgDlg")
        this.appendValueInput('image')
            .setCheck(null)
            .appendField('image')
        this.appendStatementInput("func")
            .setCheck(null)
            .appendField("func");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#8FBC8F");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['module_grating'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("grating");
        this.appendValueInput('id')
            .setCheck("String")
            .appendField('id')
        this.appendValueInput("x")
            .setCheck(null)
            .appendField("x");
        this.appendValueInput("y")
            .setCheck(null)
            .appendField("y");
        this.appendValueInput("r")
            .setCheck(null)
            .appendField("r");
        this.appendValueInput("noiseLevel")
            .setCheck(null)
            .appendField("noiseLevel");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(60);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};