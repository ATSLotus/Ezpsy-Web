//1.设置填充颜色
Blockly.Blocks['setFillColor'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("setFillColor");
        this.appendValueInput('id')
            .setCheck(null)
            .appendField('id')
        this.appendValueInput("color")
            .setCheck(null)
            .appendField("color");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#FF4500');
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

//2.设置边框颜色
Blockly.Blocks['setStrokeColor'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("setStrokeColor");
        this.appendValueInput('id')
            .setCheck(null)
            .appendField('id')
        this.appendValueInput("color")
            .setCheck(null)
            .appendField("color");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#FF4500');
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

//3.设置边框线宽
Blockly.Blocks['setBorderWidth'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("setBorderWidth");
        this.appendValueInput('id')
            .setCheck(null)
            .appendField('id')
        this.appendValueInput("border_width")
            .setCheck(null)
            .appendField("border_width");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#FF4500');
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

//4. 位移
Blockly.Blocks['translate'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("translate");
        this.appendValueInput('id')
            .setCheck(null)
            .appendField('id')
        this.appendValueInput("x")
            .setCheck(null)
            .appendField("x");
        this.appendValueInput("y")
            .setCheck(null)
            .appendField("y");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#FF4500');
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

//5. 缩放
Blockly.Blocks['scale'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("scale");
        this.appendValueInput('id')
            .setCheck(null)
            .appendField('id')
        this.appendValueInput("width")
            .setCheck(null)
            .appendField("width");
        this.appendValueInput("height")
            .setCheck(null)
            .appendField("height");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#FF4500');
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

//6. 旋转
Blockly.Blocks['rotate'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("rotate");
        this.appendValueInput('id')
            .setCheck(null)
            .appendField('id')
        this.appendValueInput("rotate")
            .setCheck(null)
            .appendField("rotate");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#FF4500');
        this.setTooltip("");
        this.setHelpUrl("");
    }
};