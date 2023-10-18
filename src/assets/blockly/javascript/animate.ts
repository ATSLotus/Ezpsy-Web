// @ts-nocheck
import BLK from "blockly"

const animate = (Blockly: typeof BLK) => {
    //refresh
    Blockly.JavaScript['refresh'] = function (block) {
        var value_el = Blockly.JavaScript.valueToCode(block, 'id', Blockly.JavaScript.ORDER_ATOMIC);
        var code = `
            ez.add(${value_el});
        \n`;
        return code;
    }

    //ezAnimate
    Blockly.JavaScript['animate'] = function (block) {
        var value_el = Blockly.JavaScript.valueToCode(block, 'id', Blockly.JavaScript.ORDER_ATOMIC);
        var value_delay = Blockly.JavaScript.valueToCode(block, 'delay', Blockly.JavaScript.ORDER_ATOMIC);
        var statements_func = Blockly.JavaScript.statementToCode(block, 'func');
        // TODO: Assemble JavaScript into code variable.
        var code = `
            EzAnimate(${value_el},${value_delay},(async ()=>{\n${statements_func}\n}));
        \n`;
        return code;
    };

    Blockly.JavaScript['play'] = function (block) {
        var value_el = Blockly.JavaScript.valueToCode(block, 'id', Blockly.JavaScript.ORDER_ATOMIC);
        // TODO: Assemble JavaScript into code variable.
        var code = `
        ${value_el}.IsPause = false;
    \n`;
        return code;
    };

    Blockly.JavaScript['pause'] = function (block) {
        var value_el = Blockly.JavaScript.valueToCode(block, 'id', Blockly.JavaScript.ORDER_ATOMIC);
        // TODO: Assemble JavaScript into code variable.
        var code = `
        ${value_el}.IsPause = true;
    \n`;
        return code;
    };
}
export default animate
