// @ts-nocheck
import BLK from "blockly"

const time = (Blockly: typeof BLK) => {
    Blockly.JavaScript['record'] = function (block) {
        var code = `time.record();\n`
        return code;
    };

    Blockly.JavaScript['cancel'] = function (block) {
        var code = `time.cancel();\n`
        return code;
    };

    Blockly.JavaScript['getContinueValue'] = function (block) {
        var value_id = Blockly.JavaScript.valueToCode(block, 'id', Blockly.JavaScript.ORDER_ATOMIC);
        var code = `${value_id} = time.getContinueValue();\n`
        return code;
    };

    Blockly.JavaScript['getIntervalValue'] = function (block) {
        var value_id = Blockly.JavaScript.valueToCode(block, 'id', Blockly.JavaScript.ORDER_ATOMIC);
        var code = `
          ${value_id} = time.getIntervalValue();\n
        `
        return code;
    };
}
export default time
