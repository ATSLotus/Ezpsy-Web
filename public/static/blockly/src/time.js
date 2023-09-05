Blockly.Blocks['record'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("record");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour("#3CB371");
   this.setTooltip("dfdf");
   this.setHelpUrl("www.taobao.com");
    }
  };

  Blockly.Blocks['getContinueValue'] = { 
    init: function() {
      this.appendDummyInput()
          .appendField("getContinueValue");
      this.appendValueInput("id")
          .setCheck(null)
          .appendField('id')
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#3CB371');
   this.setTooltip("dfdf");
   this.setHelpUrl("www.taobao.com");
    }
  };

  Blockly.Blocks['getIntervalValue'] = { 
    init: function() {
      this.appendDummyInput()
          .appendField("getIntervalValue");
      this.appendValueInput("id")
          .setCheck(null)
          .appendField('id')
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#3CB371');
   this.setTooltip("dfdf");
   this.setHelpUrl("www.taobao.com");
    }
  };