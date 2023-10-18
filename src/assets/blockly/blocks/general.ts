import BLK from "blockly"
import blockColor from "../config"

const general = (Blockly: typeof BLK) => {
  // 1.输出 console
  Blockly.Blocks['output'] = {
    init: function () {
      this.appendValueInput("output")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("output");
      this.setInputsInline(false);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(blockColor.texts);
      this.setTooltip("dfdf");
      this.setHelpUrl("www.taobao.com");
    }
  };
}

export default general
