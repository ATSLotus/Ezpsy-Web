Blockly.Blocks['canvasSize'] = {
    init: function() {
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
        this.setColour("#EE82EE");
        this.setTooltip("");
        this.setHelpUrl("");
    }
  };

Blockly.Blocks['canvasColor'] = {
    init: function(){
        this.appendDummyInput()
            .appendField("canvasSize");
        this.appendValueInput("color")
            .setCheck(null)
            .appendField("color");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#EE82EE");
        this.setTooltip("");
        this.setHelpUrl("");
    }
}
