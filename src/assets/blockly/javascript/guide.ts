import BLK from "blockly"

const guide = (Blockly: typeof BLK) => {
    // 1.实验开始
    Blockly.JavaScript['guide'] = function (block: any) {
        var value_imageurl = Blockly.JavaScript.valueToCode(block, 'imageUrl', Blockly.JavaScript.ORDER_ATOMIC);
        // TODO: Assemble JavaScript into code variable.
        var code = `await guide(${value_imageurl});\n`;
        return code;
    };

    // 2.实验结束
    Blockly.JavaScript['end'] = function (block: any) {
        var value_endtext = Blockly.JavaScript.valueToCode(block, 'ENDTEXT', Blockly.JavaScript.ORDER_ATOMIC);
        // TODO: Assemble JavaScript into code variable.
        var code = `await end(${value_endtext});\n`;
        return code;
    };
}

export default guide