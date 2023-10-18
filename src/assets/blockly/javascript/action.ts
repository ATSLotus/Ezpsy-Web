// @ts-nocheck
import BLK from "blockly"

const action = (Blockly: typeof BLK) => {
    //1. 设置填充颜色
    Blockly.JavaScript['setFillColor'] = function (block) {
        let value_id = Blockly.JavaScript.valueToCode(block, 'id', Blockly.JavaScript.ORDER_ATOMIC);
        var value_color = Blockly.JavaScript.valueToCode(block, 'color', Blockly.JavaScript.ORDER_ATOMIC);
        // TODO: Assemble JavaScript into code variable.
        var code = `
        ${value_id}.style.fill = ${value_color};
        ez.add(${value_id});
      \n`;
        return code;
    };

    //2. 设置边框颜色
    Blockly.JavaScript['setStrokeColor'] = function (block) {
        let value_id = Blockly.JavaScript.valueToCode(block, 'id', Blockly.JavaScript.ORDER_ATOMIC);
        var value_color = Blockly.JavaScript.valueToCode(block, 'color', Blockly.JavaScript.ORDER_ATOMIC);
        // TODO: Assemble JavaScript into code variable.
        var code = `
        ${value_id}.style.stroke = ${value_color};
        ez.add(${value_id});
      \n`;
        return code;
    };

    //3. 设置边框线宽
    Blockly.JavaScript['setBorderWidth'] = function (block) {
        let value_id = Blockly.JavaScript.valueToCode(block, 'id', Blockly.JavaScript.ORDER_ATOMIC);
        var value_border = Blockly.JavaScript.valueToCode(block, 'border_width', Blockly.JavaScript.ORDER_ATOMIC);
        // TODO: Assemble JavaScript into code variable.
        var code = `
        ${value_id}.style.lineWidth = ${value_border};
        ez.add(${value_id});
      \n`;
        return code;
    };

    //4. 位移
    Blockly.JavaScript['translate'] = function (block) {
        let value_id = Blockly.JavaScript.valueToCode(block, 'id', Blockly.JavaScript.ORDER_ATOMIC);
        var value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
        var value_y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_ATOMIC);
        // TODO: Assemble JavaScript into code variable.
        var code = `
        ${value_id}.translate = {
            x: ${value_x},
            y: ${value_y}
        }
        ez.add(${value_id});
      \n`;
        return code;
    };

    //5. 缩放
    Blockly.JavaScript['scale'] = function (block) {
        let value_id = Blockly.JavaScript.valueToCode(block, 'id', Blockly.JavaScript.ORDER_ATOMIC);
        var value_width = Blockly.JavaScript.valueToCode(block, 'width', Blockly.JavaScript.ORDER_ATOMIC);
        var value_height = Blockly.JavaScript.valueToCode(block, 'height', Blockly.JavaScript.ORDER_ATOMIC);
        // TODO: Assemble JavaScript into code variable.
        var code = `
        ${value_id}.scale = {
            width: ${value_width},
            height: ${value_height}
        }
        ez.add(${value_id});
      \n`;
        return code;
    };

    //6. 旋转
    Blockly.JavaScript['rotate'] = function (block) {
        let value_id = Blockly.JavaScript.valueToCode(block, 'id', Blockly.JavaScript.ORDER_ATOMIC);
        var value_rotate = Blockly.JavaScript.valueToCode(block, 'rotate', Blockly.JavaScript.ORDER_ATOMIC);
        // TODO: Assemble JavaScript into code variable.
        var code = `
            ${value_id}.rotate = ${value_rotate};
            ez.add(${value_id});
        \n`;
        return code;
    };
}
export default action
