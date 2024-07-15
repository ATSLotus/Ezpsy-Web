import BLK from "blockly"

let graph = (Blockly: typeof BLK) => {
    Blockly.JavaScript["points_0"] = function (block: BLK.BlockSvg) {
        let value_x = Blockly.JavaScript.valueToCode(block, 'x_0', Blockly.JavaScript.ORDER_ATOMIC);
        let value_y = Blockly.JavaScript.valueToCode(block, 'y_0', Blockly.JavaScript.ORDER_ATOMIC);
        return [`${value_x}, ${value_y}`, Blockly.JavaScript.ORDER_ATOMIC]
    }
    Blockly.JavaScript["points_1"] = function (block: BLK.BlockSvg) {
        let value_x = Blockly.JavaScript.valueToCode(block, 'x_1', Blockly.JavaScript.ORDER_ATOMIC);
        let value_y = Blockly.JavaScript.valueToCode(block, 'y_1', Blockly.JavaScript.ORDER_ATOMIC);
        return [`${value_x}, ${value_y}`, Blockly.JavaScript.ORDER_ATOMIC]
    }
    Blockly.JavaScript["points_2"] = function (block: BLK.BlockSvg) {
        let value_x = Blockly.JavaScript.valueToCode(block, 'x_2', Blockly.JavaScript.ORDER_ATOMIC);
        let value_y = Blockly.JavaScript.valueToCode(block, 'y_2', Blockly.JavaScript.ORDER_ATOMIC);
        return [`${value_x}, ${value_y}`, Blockly.JavaScript.ORDER_ATOMIC]
    }
    Blockly.JavaScript["points_r"] = function (block: BLK.BlockSvg) {
        let value_x = Blockly.JavaScript.valueToCode(block, 'x_0', Blockly.JavaScript.ORDER_ATOMIC);
        let value_y = Blockly.JavaScript.valueToCode(block, 'y_0', Blockly.JavaScript.ORDER_ATOMIC);
        let value_r = Blockly.JavaScript.valueToCode(block, 'r', Blockly.JavaScript.ORDER_ATOMIC);
        return [`${value_x}, ${value_y}, ${value_r}`, Blockly.JavaScript.ORDER_ATOMIC]
    }
    Blockly.JavaScript["size"] = function (block: BLK.BlockSvg) {
        let value_width = Blockly.JavaScript.valueToCode(block, 'width', Blockly.JavaScript.ORDER_ATOMIC);
        let value_height = Blockly.JavaScript.valueToCode(block, 'height', Blockly.JavaScript.ORDER_ATOMIC);
        return [`${value_width}, ${value_height}`, Blockly.JavaScript.ORDER_ATOMIC]
    }
    Blockly.JavaScript["graph_attributes"] = function (block: BLK.BlockSvg) {
        let value_border_width = Blockly.JavaScript.valueToCode(block, 'border_width', Blockly.JavaScript.ORDER_ATOMIC);
        let value_color_fill = Blockly.JavaScript.valueToCode(block, 'color_fill', Blockly.JavaScript.ORDER_ATOMIC);
        return [`${value_border_width}, ${value_color_fill}`, Blockly.JavaScript.ORDER_ATOMIC]
    }
    Blockly.JavaScript["graph_attributes_1"] = function (block: BLK.BlockSvg) {
        let value_border_width = Blockly.JavaScript.valueToCode(block, 'border_width', Blockly.JavaScript.ORDER_ATOMIC);
        let value_color_stroke = Blockly.JavaScript.valueToCode(block, 'color_stroke', Blockly.JavaScript.ORDER_ATOMIC);
        let value_color_fill = Blockly.JavaScript.valueToCode(block, 'color_fill', Blockly.JavaScript.ORDER_ATOMIC);
        return [`${value_border_width || 0}, ${value_color_stroke || "'none'"}, ${value_color_fill || "'none'"}`, Blockly.JavaScript.ORDER_ATOMIC]
    }
    Blockly.JavaScript["font_attributes"] = function (block: BLK.BlockSvg) {
        let dropdown_fontweight = block.getFieldValue('fontWeight');
        let dropdown_fontstyle = block.getFieldValue('fontStyle');
        let value_fontsize = Blockly.JavaScript.valueToCode(block, 'fontSize', Blockly.JavaScript.ORDER_ATOMIC);
        let value_fontfamily = Blockly.JavaScript.valueToCode(block, 'fontFamily', Blockly.JavaScript.ORDER_ATOMIC);
        return [`${value_fontsize}, ${dropdown_fontweight}, ${dropdown_fontstyle}, ${value_fontfamily}`, Blockly.JavaScript.ORDER_ATOMIC]
    }
    Blockly.JavaScript["graph_attributes_2"] = function (block: BLK.BlockSvg) {
        let dropdown_textAlgin = block.getFieldValue('textAlgin');
        let dropdown_textBaseline = block.getFieldValue('textBaseline');
        let value_color = Blockly.JavaScript.valueToCode(block, 'color', Blockly.JavaScript.ORDER_ATOMIC);
        return [`${dropdown_textAlgin}, ${dropdown_textBaseline}, ${value_color}`, Blockly.JavaScript.ORDER_ATOMIC]
    }
    Blockly.JavaScript["grat_attributes_1"] = function (block: BLK.BlockSvg) {
        let value_pixelPerDegree = Blockly.JavaScript.valueToCode(block, 'pixelsPerDegree', Blockly.JavaScript.ORDER_ATOMIC);
        let value_spatialFrequency = Blockly.JavaScript.valueToCode(block, 'spatialFrequency', Blockly.JavaScript.ORDER_ATOMIC);
        let value_angle = Blockly.JavaScript.valueToCode(block, 'angle', Blockly.JavaScript.ORDER_ATOMIC);
        let value_contrast = Blockly.JavaScript.valueToCode(block, 'contrast', Blockly.JavaScript.ORDER_ATOMIC);
        return [`${value_pixelPerDegree}, ${value_spatialFrequency}, ${value_angle}, ${value_contrast}`, Blockly.JavaScript.ORDER_ATOMIC]
    }
    Blockly.JavaScript["grat_attributes_2"] = function (block: BLK.BlockSvg) {
        let value_phase = Blockly.JavaScript.valueToCode(block, 'phase', Blockly.JavaScript.ORDER_ATOMIC);
        let value_noiseLevel = Blockly.JavaScript.valueToCode(block, 'noiseLevel', Blockly.JavaScript.ORDER_ATOMIC);
        let value_animateCycle = Blockly.JavaScript.valueToCode(block, 'animateCycle', Blockly.JavaScript.ORDER_ATOMIC);
        let value_gamma = Blockly.JavaScript.valueToCode(block, 'gamma', Blockly.JavaScript.ORDER_ATOMIC);
        // return [`${value_phase},${value_noiseLevel},${value_animateCycle},${value_time}`, Blockly.JavaScript.ORDER_ATOMIC]
        return [`${value_phase},${value_noiseLevel},${value_animateCycle},${value_gamma}`, Blockly.JavaScript.ORDER_ATOMIC]
    }
    Blockly.JavaScript["random_dot_attributes"] = function (block: BLK.BlockSvg) {
        let value_maskBand = Blockly.JavaScript.valueToCode(block, 'maskBand', Blockly.JavaScript.ORDER_ATOMIC);
        let value_dotNumber = Blockly.JavaScript.valueToCode(block, 'dotNumber', Blockly.JavaScript.ORDER_ATOMIC);
        let value_minSpeed = Blockly.JavaScript.valueToCode(block, 'minSpeed', Blockly.JavaScript.ORDER_ATOMIC);
        let value_maxSpeed = Blockly.JavaScript.valueToCode(block, 'maxSpeed', Blockly.JavaScript.ORDER_ATOMIC);
        return [`${value_maskBand},${value_dotNumber},${value_minSpeed},${value_maxSpeed}`, Blockly.JavaScript.ORDER_ATOMIC]
    }

    // 1.直线
    Blockly.JavaScript['graph_line'] = function (block: BLK.BlockSvg) {
        let value_id = Blockly.JavaScript.valueToCode(block, 'id', Blockly.JavaScript.ORDER_ATOMIC);
        let points_0 = Blockly.JavaScript.valueToCode(block, 'lis_pointer_0', Blockly.JavaScript.ORDER_ATOMIC);
        let points_1 = Blockly.JavaScript.valueToCode(block, 'lis_pointer_1', Blockly.JavaScript.ORDER_ATOMIC);
        let attributes = Blockly.JavaScript.valueToCode(block, 'graph_attributes', Blockly.JavaScript.ORDER_ATOMIC);
        let code = `${value_id} = makeLine(${points_0}, ${points_1}, ${attributes});\n`;
        return code;
    };
    // 2.矩形
    Blockly.JavaScript['graph_rect'] = function (block: BLK.BlockSvg) {
        let value_id = Blockly.JavaScript.valueToCode(block, 'id', Blockly.JavaScript.ORDER_ATOMIC);
        
        let points_0 = Blockly.JavaScript.valueToCode(block, 'lis_pointer_0', Blockly.JavaScript.ORDER_ATOMIC);
        let lis_size = Blockly.JavaScript.valueToCode(block, 'lis_size', Blockly.JavaScript.ORDER_ATOMIC);
        let attributes = Blockly.JavaScript.valueToCode(block, 'graph_attributes_1', Blockly.JavaScript.ORDER_ATOMIC);
        
        let code = `
            ${value_id} = makeRect(${points_0}, ${lis_size}, ${attributes});\n
        `
        return code;
    };
    // 3.三角形
    Blockly.JavaScript['graph_triangle'] = function (block: BLK.BlockSvg) {
        let value_id = Blockly.JavaScript.valueToCode(block, 'id', Blockly.JavaScript.ORDER_ATOMIC);
        let points_0 = Blockly.JavaScript.valueToCode(block, 'lis_pointer_0', Blockly.JavaScript.ORDER_ATOMIC);
        let points_1 = Blockly.JavaScript.valueToCode(block, 'lis_pointer_1', Blockly.JavaScript.ORDER_ATOMIC);
        let points_2 = Blockly.JavaScript.valueToCode(block, 'lis_pointer_2', Blockly.JavaScript.ORDER_ATOMIC);
        let attributes = Blockly.JavaScript.valueToCode(block, 'graph_attributes_1', Blockly.JavaScript.ORDER_ATOMIC);
        let code = `
            ${value_id} = makeTriangle(${points_0}, ${points_1}, ${points_2}, ${attributes});\n
        `;
        return code;
    };
    // 4.圆
    Blockly.JavaScript['graph_circle'] = function (block: BLK.BlockSvg) {
        let value_id = Blockly.JavaScript.valueToCode(block, 'id', Blockly.JavaScript.ORDER_ATOMIC);
        let points_0 = Blockly.JavaScript.valueToCode(block, 'lis_pointer_r', Blockly.JavaScript.ORDER_ATOMIC);
        let attributes = Blockly.JavaScript.valueToCode(block, 'graph_attributes_1', Blockly.JavaScript.ORDER_ATOMIC);
        // TODO: Assemble JavaScript into code letiable.
        let code = `
            ${value_id} = makeCircle(${points_0}, ${attributes});\n
        `;
        return code;
    };
    // 5.文本
    Blockly.JavaScript['graph_text'] = function (block: BLK.BlockSvg) {
        let value_id = Blockly.JavaScript.valueToCode(block, 'id', Blockly.JavaScript.ORDER_ATOMIC);
        let value_content = Blockly.JavaScript.valueToCode(block, 'content', Blockly.JavaScript.ORDER_ATOMIC);
        let points_0 = Blockly.JavaScript.valueToCode(block, 'lis_pointer_0', Blockly.JavaScript.ORDER_ATOMIC);
        let font_attributes = Blockly.JavaScript.valueToCode(block, 'font_attributes', Blockly.JavaScript.ORDER_ATOMIC);
        let graph_attributes = Blockly.JavaScript.valueToCode(block, 'graph_attributes_2', Blockly.JavaScript.ORDER_ATOMIC);
        let code = `
            ${value_id} = makeText(${value_content}, ${points_0}, ${font_attributes}, ${graph_attributes}); 
        `
        return code;
    };
    // 6.图片
    Blockly.JavaScript['image'] = function (block: BLK.BlockSvg) {
        let value_url = Blockly.JavaScript.valueToCode(block, 'URL', Blockly.JavaScript.ORDER_ATOMIC);
        let value_id = Blockly.JavaScript.valueToCode(block, 'id', Blockly.JavaScript.ORDER_ATOMIC);
        let points_0 = Blockly.JavaScript.valueToCode(block, 'lis_pointer_0', Blockly.JavaScript.ORDER_ATOMIC);
        let lis_size = Blockly.JavaScript.valueToCode(block, 'lis_size', Blockly.JavaScript.ORDER_ATOMIC);
        let code = `
            ${value_id} = await preImage(${value_url}, ${points_0}, ${lis_size});\n
        `;
        return code;
    };

    Blockly.JavaScript['drawImg'] = function (block: BLK.BlockSvg) {
        let value_id = Blockly.JavaScript.valueToCode(block, 'id', Blockly.JavaScript.ORDER_ATOMIC);
        let code = `
            await drawImage(${value_id});\n
        `;
        return code;
    };
    // 7.光栅
    Blockly.JavaScript['grating'] = function (block: BLK.BlockSvg) {
        let value_id = Blockly.JavaScript.valueToCode(block, 'id', Blockly.JavaScript.ORDER_ATOMIC);

        let points_0 = Blockly.JavaScript.valueToCode(block, 'lis_pointer_r', Blockly.JavaScript.ORDER_ATOMIC);
        let attributes1 = Blockly.JavaScript.valueToCode(block, 'grat_attributes_1', Blockly.JavaScript.ORDER_ATOMIC);
        let attributes2 = Blockly.JavaScript.valueToCode(block, 'grat_attributes_2', Blockly.JavaScript.ORDER_ATOMIC);
        
        

        let code = `
            \nnew Promise(() => {
                ${value_id} = makeGrating(${points_0}, ${attributes1}, ${attributes2});\n
            });\n
        `;
        return code;
    };

    Blockly.JavaScript['drawGrating'] = function (block: BLK.BlockSvg) {
        let value_id = Blockly.JavaScript.valueToCode(block, 'id', Blockly.JavaScript.ORDER_ATOMIC);
        let value_time = Blockly.JavaScript.valueToCode(block, 'time', Blockly.JavaScript.ORDER_ATOMIC);

        let code = `
            await ${value_id}.draw(${value_time});\n
        `;
        return code;
    };

    // 8.随机点
    Blockly.JavaScript['randomDot'] = function (block: BLK.BlockSvg) {
        let value_id = Blockly.JavaScript.valueToCode(block, 'id', Blockly.JavaScript.ORDER_ATOMIC);
        let points_0 = Blockly.JavaScript.valueToCode(block, 'lis_pointer_r', Blockly.JavaScript.ORDER_ATOMIC);
        let attributes = Blockly.JavaScript.valueToCode(block, 'random_dot_attributes', Blockly.JavaScript.ORDER_ATOMIC);
        let code = `
            ${value_id} = makeRandomDot(${points_0}, ${attributes});\n
        `;
        return code;
    };
}
export default graph
