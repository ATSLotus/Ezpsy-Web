// @ts-nocheck
import BLK from "blockly"

const object = (Blockly: typeof BLK) => {
    Blockly.JavaScript['objectContent'] = function (block) {
        let value_key = Blockly.JavaScript.valueToCode(block, 'key', Blockly.JavaScript.ORDER_ATOMIC);
        let value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
        // var statements_func = Blockly.JavaScript.statementToCode(block, 'func');
        // TODO: Assemble JavaScript into code variable.
        var code = `
            ${value_key}: ${value_value}
        `;
        return [code, Blockly.JavaScript.ORDER_ATOMIC];
    };

    Blockly.JavaScript['objectsCreate'] = function (a) {
        let value_title = Blockly.JavaScript.valueToCode(a, 'title', Blockly.JavaScript.ORDER_COMMA);
        for (var b = Array(a.itemCount_), c = 0; c < a.itemCount_; c++)
            b[c] = Blockly.JavaScript.valueToCode(a, "ADD" + c, Blockly.JavaScript.ORDER_COMMA) || "null";
        if (value_title)
            return ["{\n" + value_title + ": {" + b.join() + "}\n}", Blockly.JavaScript.ORDER_ATOMIC]
        else
            return ["{" + b.join() + "}", Blockly.JavaScript.ORDER_ATOMIC]
    };

    Blockly.JavaScript['DlgObjectsCreate'] = function (a) {
        for (var b = Array(a.itemCount_), c = 0; c < a.itemCount_; c++)
            b[c] = Blockly.JavaScript.valueToCode(a, "ADD" + c, Blockly.JavaScript.ORDER_COMMA) || "null";
        return ["{" + b.join() + "}", Blockly.JavaScript.ORDER_ATOMIC]
    };

    Blockly.JavaScript['objectSet'] = function (block: BLK.BlockSvg) {
        let value_id = Blockly.JavaScript.valueToCode(block, 'id', Blockly.JavaScript.ORDER_ATOMIC);
        let value_key = Blockly.JavaScript.valueToCode(block, 'key', Blockly.JavaScript.ORDER_ATOMIC);
        let value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);

        let code = `
            ${value_id}[${value_key}] = ${value_value};\n
        `;
        return code;
    };
}
export default object
