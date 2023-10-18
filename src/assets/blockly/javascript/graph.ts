// @ts-nocheck
import BLK from "blockly"

const graph = (Blockly: typeof BLK) => {
    // 1.直线
    Blockly.JavaScript['graph_line'] = function (block) {
        let value_id = Blockly.JavaScript.valueToCode(block, 'id', Blockly.JavaScript.ORDER_ATOMIC);
        var value_start_x = Blockly.JavaScript.valueToCode(block, 'start_x', Blockly.JavaScript.ORDER_ATOMIC);
        var value_start_y = Blockly.JavaScript.valueToCode(block, 'start_y', Blockly.JavaScript.ORDER_ATOMIC);
        var value_end_x = Blockly.JavaScript.valueToCode(block, 'end_x', Blockly.JavaScript.ORDER_ATOMIC);
        var value_end_y = Blockly.JavaScript.valueToCode(block, 'end_y', Blockly.JavaScript.ORDER_ATOMIC);
        var value_border_width = Blockly.JavaScript.valueToCode(block, 'border_width', Blockly.JavaScript.ORDER_ATOMIC);
        var value_color = Blockly.JavaScript.valueToCode(block, 'color', Blockly.JavaScript.ORDER_ATOMIC);
        // TODO: Assemble JavaScript into code variable.
        var code = `
      ${value_id} = makeLine(${value_start_x},${value_start_y},${value_end_x},${value_end_y},${value_border_width},${value_color});\n
    `;
        return code;
    };
    // 2.空心矩形
    Blockly.JavaScript['graph_strokerect'] = function (block) {
        let value_id = Blockly.JavaScript.valueToCode(block, 'id', Blockly.JavaScript.ORDER_ATOMIC);
        var value_start_x = Blockly.JavaScript.valueToCode(block, 'start_x', Blockly.JavaScript.ORDER_ATOMIC);
        var value_start_y = Blockly.JavaScript.valueToCode(block, 'start_y', Blockly.JavaScript.ORDER_ATOMIC);
        var value_width = Blockly.JavaScript.valueToCode(block, 'width', Blockly.JavaScript.ORDER_ATOMIC);
        var value_height = Blockly.JavaScript.valueToCode(block, 'height', Blockly.JavaScript.ORDER_ATOMIC);
        var value_border_width = Blockly.JavaScript.valueToCode(block, 'border_width', Blockly.JavaScript.ORDER_ATOMIC);
        var value_border_color = Blockly.JavaScript.valueToCode(block, 'border_color', Blockly.JavaScript.ORDER_ATOMIC);
        // TODO: Assemble JavaScript into code variable.
        var code = `
    ${value_id} = makeStrokeRect(${value_start_x},${value_start_y},${value_width},${value_height},${value_border_width},${value_border_color});\n
  `;
        return code;
    };
    // 3.实心矩形
    Blockly.JavaScript['graph_fillrect'] = function (block) {
        let value_id = Blockly.JavaScript.valueToCode(block, 'id', Blockly.JavaScript.ORDER_ATOMIC);
        var value_start_x = Blockly.JavaScript.valueToCode(block, 'start_x', Blockly.JavaScript.ORDER_ATOMIC);
        var value_start_y = Blockly.JavaScript.valueToCode(block, 'start_y', Blockly.JavaScript.ORDER_ATOMIC);
        var value_width = Blockly.JavaScript.valueToCode(block, 'width', Blockly.JavaScript.ORDER_ATOMIC);
        var value_height = Blockly.JavaScript.valueToCode(block, 'height', Blockly.JavaScript.ORDER_ATOMIC);
        var value_fill_color = Blockly.JavaScript.valueToCode(block, 'fill_color', Blockly.JavaScript.ORDER_ATOMIC);
        // TODO: Assemble JavaScript into code variable.
        var code = `
    ${value_id} = makeFillRect(${value_start_x},${value_start_y},${value_width},${value_height},${value_fill_color});\n
  `;
        return code;
    };
    // 4.三角形
    Blockly.JavaScript['graph_triangle'] = function (block) {
        let value_id = Blockly.JavaScript.valueToCode(block, 'id', Blockly.JavaScript.ORDER_ATOMIC);
        var value_top_x = Blockly.JavaScript.valueToCode(block, 'top_x', Blockly.JavaScript.ORDER_ATOMIC);
        var value_top_y = Blockly.JavaScript.valueToCode(block, 'top_y', Blockly.JavaScript.ORDER_ATOMIC);
        var value_left_x = Blockly.JavaScript.valueToCode(block, 'left_x', Blockly.JavaScript.ORDER_ATOMIC);
        var value_left_y = Blockly.JavaScript.valueToCode(block, 'left_y', Blockly.JavaScript.ORDER_ATOMIC);
        var value_right_x = Blockly.JavaScript.valueToCode(block, 'right_x', Blockly.JavaScript.ORDER_ATOMIC);
        var value_right_y = Blockly.JavaScript.valueToCode(block, 'right_y', Blockly.JavaScript.ORDER_ATOMIC);
        var value_border_color = Blockly.JavaScript.valueToCode(block, 'border_color', Blockly.JavaScript.ORDER_ATOMIC);
        // TODO: Assemble JavaScript into code variable.
        var code = `
    ${value_id} = makeTriangle(${value_top_x},${value_top_y},${value_left_x},${value_left_y},${value_right_x},${value_right_y},${value_border_color});\n
  `;
        return code;
    };
    // 5.空心圆
    Blockly.JavaScript['graph_strokecircle'] = function (block) {
        let value_id = Blockly.JavaScript.valueToCode(block, 'id', Blockly.JavaScript.ORDER_ATOMIC);
        var value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
        var value_y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_ATOMIC);
        var value_r = Blockly.JavaScript.valueToCode(block, 'r', Blockly.JavaScript.ORDER_ATOMIC);
        var value_border_color = Blockly.JavaScript.valueToCode(block, 'border_color', Blockly.JavaScript.ORDER_ATOMIC);
        // TODO: Assemble JavaScript into code variable.
        var code = `
    ${value_id} = makeStroke_circle(${value_x},${value_y},${value_r},${value_border_color});\n
  `;
        return code;
    };
    // 6.填充圆
    Blockly.JavaScript['graph_fillcircle'] = function (block) {
        let value_id = Blockly.JavaScript.valueToCode(block, 'id', Blockly.JavaScript.ORDER_ATOMIC);
        var value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
        var value_y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_ATOMIC);
        var value_r = Blockly.JavaScript.valueToCode(block, 'r', Blockly.JavaScript.ORDER_ATOMIC);
        var value_fill_color = Blockly.JavaScript.valueToCode(block, 'fill_color', Blockly.JavaScript.ORDER_ATOMIC);
        // TODO: Assemble JavaScript into code variable.
        var code = `
    ${value_id} = makeFill_circle(${value_x},${value_y},${value_r},${value_fill_color});\n
  `;
        return code;
    };
    //7. 文本
    Blockly.JavaScript['graph_text'] = function (block) {
        let value_id = Blockly.JavaScript.valueToCode(block, 'id', Blockly.JavaScript.ORDER_ATOMIC);
        var value_content = Blockly.JavaScript.valueToCode(block, 'content', Blockly.JavaScript.ORDER_ATOMIC);
        var value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
        var value_y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_ATOMIC);
        var value_fontsize = Blockly.JavaScript.valueToCode(block, 'fontSize', Blockly.JavaScript.ORDER_ATOMIC);
        var dropdown_fontweight = block.getFieldValue('fontWeight');
        var dropdown_fontstyle = block.getFieldValue('fontStyle');
        var value_fontfamily = Blockly.JavaScript.valueToCode(block, 'fontFamily', Blockly.JavaScript.ORDER_ATOMIC);
        var dropdown_textAlgin = block.getFieldValue('textAlgin');
        var dropdown_textBaseline = block.getFieldValue('textBaseline');
        var value_color = Blockly.JavaScript.valueToCode(block, 'color', Blockly.JavaScript.ORDER_ATOMIC);

        var code = `
    ${value_id} = makeText(${dropdown_fontstyle},${dropdown_fontweight},${value_fontsize},${value_fontfamily},${value_color},${value_content},${value_x},${value_y},${dropdown_textAlgin},${dropdown_textBaseline}); 
  `
        return code;
    };
    // 8.图片
    Blockly.JavaScript['image'] = function (block) {
        var value_url = Blockly.JavaScript.valueToCode(block, 'URL', Blockly.JavaScript.ORDER_ATOMIC);
        var value_id = Blockly.JavaScript.valueToCode(block, 'id', Blockly.JavaScript.ORDER_ATOMIC);
        var value_x = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_ATOMIC);
        var value_y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ATOMIC);
        var value_width = Blockly.JavaScript.valueToCode(block, 'width', Blockly.JavaScript.ORDER_ATOMIC);
        var value_height = Blockly.JavaScript.valueToCode(block, 'height', Blockly.JavaScript.ORDER_ATOMIC);
        var code = `
    ${value_id} = await preImage(${value_url},${value_x},${value_y},${value_width},${value_height});\n
  `;
        return code;
    };

    Blockly.JavaScript['drawImg'] = function (block) {
        var value_id = Blockly.JavaScript.valueToCode(block, 'id', Blockly.JavaScript.ORDER_ATOMIC);
        var code = `
    await drawImage(${value_id});\n
  `;
        return code;
    };
    // 9.光栅
    Blockly.JavaScript['grating'] = function (block) {
        let value_id = Blockly.JavaScript.valueToCode(block, 'id', Blockly.JavaScript.ORDER_ATOMIC);
        var value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
        var value_y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_ATOMIC);
        var value_r = Blockly.JavaScript.valueToCode(block, 'r', Blockly.JavaScript.ORDER_ATOMIC);
        var value_pixelPerDegree = Blockly.JavaScript.valueToCode(block, 'pixelsPerDegree', Blockly.JavaScript.ORDER_ATOMIC);
        var value_spatialFrequency = Blockly.JavaScript.valueToCode(block, 'spatialFrequency', Blockly.JavaScript.ORDER_ATOMIC);
        var value_angle = Blockly.JavaScript.valueToCode(block, 'angle', Blockly.JavaScript.ORDER_ATOMIC);
        var value_contrast = Blockly.JavaScript.valueToCode(block, 'contrast', Blockly.JavaScript.ORDER_ATOMIC);
        var value_phase = Blockly.JavaScript.valueToCode(block, 'phase', Blockly.JavaScript.ORDER_ATOMIC);
        var value_noiseLevel = Blockly.JavaScript.valueToCode(block, 'noiseLevel', Blockly.JavaScript.ORDER_ATOMIC);
        var value_animateCycle = Blockly.JavaScript.valueToCode(block, 'animateCycle', Blockly.JavaScript.ORDER_ATOMIC);
        var value_time = Blockly.JavaScript.valueToCode(block, 'time', Blockly.JavaScript.ORDER_ATOMIC);



        // TODO: Assemble JavaScript into code variable.
        var code = `
    ${value_id} = makeGrating(${value_x},${value_y},${value_r},${value_pixelPerDegree},${value_spatialFrequency},${value_angle},${value_contrast},${value_phase},${value_noiseLevel},${value_animateCycle},${value_time});\n
  `;
        return code;
    };

    // 10.随机点
    Blockly.JavaScript['randomDot'] = function (block) {
        let value_id = Blockly.JavaScript.valueToCode(block, 'id', Blockly.JavaScript.ORDER_ATOMIC);
        var value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
        var value_y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_ATOMIC);
        var value_r = Blockly.JavaScript.valueToCode(block, 'r', Blockly.JavaScript.ORDER_ATOMIC);
        var value_maskBand = Blockly.JavaScript.valueToCode(block, 'maskBand', Blockly.JavaScript.ORDER_ATOMIC);
        var value_dotNumber = Blockly.JavaScript.valueToCode(block, 'dotNumber', Blockly.JavaScript.ORDER_ATOMIC);
        var value_minSpeed = Blockly.JavaScript.valueToCode(block, 'minSpeed', Blockly.JavaScript.ORDER_ATOMIC);
        var value_maxSpeed = Blockly.JavaScript.valueToCode(block, 'maxSpeed', Blockly.JavaScript.ORDER_ATOMIC);



        // TODO: Assemble JavaScript into code variable.
        var code = `
    ${value_id} = makeRandomDot(${value_x},${value_y},${value_r},${value_maskBand},${value_dotNumber},${value_minSpeed},${value_maxSpeed});\n
  `;
        return code;
    };
}
export default graph
