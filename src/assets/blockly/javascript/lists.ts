// @ts-nocheck
import BLK from "blockly"

const lists = (Blockly: typeof BLK) => {
    Blockly.JavaScript['shuffle_list'] = function (block) {
        let list = Blockly.JavaScript.valueToCode(block, 'LIST', Blockly.JavaScript.ORDER_ATOMIC);
        // var statements_func = Blockly.JavaScript.statementToCode(block, 'func');
        // TODO: Assemble JavaScript into code variable.
        if([])
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
}

export default lists