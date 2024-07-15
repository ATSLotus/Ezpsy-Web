// @ts-nocheck
import BLK from "blockly"

const lists = (Blockly: typeof BLK) => {
    Blockly.JavaScript['shuffle_list'] = function (block) {
        let list = Blockly.JavaScript.valueToCode(block, 'LIST', Blockly.JavaScript.ORDER_ATOMIC);
        // var statements_func = Blockly.JavaScript.statementToCode(block, 'func');
        // TODO: Assemble JavaScript into code variable.
        var code = `
            (() => {
                if(${list} instanceof Array)
                    return ${list}.sort(() => Math.random() - 0.5);
                else 
                    return []
            })()
        `;
        return [code, Blockly.JavaScript.ORDER_ATOMIC];
    };

    Blockly.JavaScript['list_push'] = function (block) {
        let list = Blockly.JavaScript.valueToCode(block, 'LIST', Blockly.JavaScript.ORDER_ATOMIC);
        let value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);

        var code = `
            ${list}.push(${value_value});\n
        `;
        return code;
    };
}

export default lists