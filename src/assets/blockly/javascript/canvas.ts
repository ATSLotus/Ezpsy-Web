// @ts-nocheck
import BLK from "blockly"

const canvas = (Blockly: typeof BLK) => {
    Blockly.JavaScript['canvasSize'] = function (block) {
        var value_width = Blockly.JavaScript.valueToCode(block, 'width', Blockly.JavaScript.ORDER_ATOMIC);
        var value_height = Blockly.JavaScript.valueToCode(block, 'height', Blockly.JavaScript.ORDER_ATOMIC);
        // TODO: Assemble JavaScript into code variable.
        var code = `
          ez.setCanvasStyle({
              width: ${value_width},
              height: ${value_height}
          });\n
        `;
        return code;
    };

    Blockly.JavaScript['canvasColor'] = function (block) {
        var value_color = Blockly.JavaScript.valueToCode(block, 'color', Blockly.JavaScript.ORDER_ATOMIC);
        // TODO: Assemble JavaScript into code variable.
        // var code = `
        //   let ezpsy_value_color = ${value_color};
        //   ez.ctx.canvas.style.backgroundColor = ezpsy_value_color;\n
        // `;
        var code = `
          ez.setCanvasStyle({
            backColor: ${value_color}
          });\n
        `
        return code;
    };
}
export default canvas
