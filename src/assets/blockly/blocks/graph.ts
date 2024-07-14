import BLK from "blockly"
import blockColor from "../config"

const graph = (Blockly: typeof BLK) => {
    Blockly.Blocks["points_0"] = {
        init: function() {
            this.appendValueInput("x_0")
                .setCheck("Number")
                .appendField("x");
            this.appendValueInput("y_0")
                .setCheck("Number")
                .appendField("y");
            this.setOutput(true, null)
            this.setInputsInline(true);
            this.setColour(blockColor.graph);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    }
    Blockly.Blocks["points_1"] = {
        init: function() {
            this.appendValueInput("x_1")
                .setCheck("Number")
                .appendField("x1");
            this.appendValueInput("y_1")
                .setCheck("Number")
                .appendField("y1");
            this.setOutput(true, null)
            this.setInputsInline(true);
            this.setColour(blockColor.graph);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    }
    Blockly.Blocks["points_2"] = {
        init: function() {
            this.appendValueInput("x_2")
                .setCheck("Number")
                .appendField("x2");
            this.appendValueInput("y_2")
                .setCheck("Number")
                .appendField("y2");
            this.setOutput(true, null)
            this.setInputsInline(true);
            this.setColour(blockColor.graph);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    }
    Blockly.Blocks["points_r"] = {
        init: function() {
            this.appendValueInput("x_0")
                .setCheck("Number")
                .appendField("x");
            this.appendValueInput("y_0")
                .setCheck("Number")
                .appendField("y");
            this.appendValueInput("r")
                .setCheck("Number")
                .appendField("radius");
            this.setOutput(true, null)
            this.setInputsInline(true);
            this.setColour(blockColor.graph);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    }
    Blockly.Blocks["size"] = {
        init: function() {
            this.appendValueInput("width")
                .setCheck("Number")
                .appendField("width");
            this.appendValueInput("height")
                .setCheck("Number")
                .appendField("height");
            this.setOutput(true, null)
            this.setInputsInline(true);
            this.setColour(blockColor.graph);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    }
    Blockly.Blocks["graph_attributes"] = {
        init: function() {
            this.appendValueInput("border_width")
                .setCheck("Number")
                .appendField("border_width");
            this.appendValueInput("color")
                .setCheck(null)
                .appendField("color");
            this.setOutput(true, null)
            this.setInputsInline(true);
            this.setColour(blockColor.graph);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    }
    Blockly.Blocks["graph_attributes_1"] = {
        init: function() {
            this.appendValueInput("border_width")
                .setCheck("Number")
                .appendField("border_width");
            this.appendValueInput("color_stroke")
                .setCheck(null)
                .appendField("stroke");
            this.appendValueInput("color_fill")
                .setCheck(null)
                .appendField("fill");
            this.setOutput(true, null)
            this.setInputsInline(true);
            this.setColour(blockColor.graph);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    }
    Blockly.Blocks["graph_attributes_2"] = {
        init: function() {
            this.appendDummyInput()
                .appendField("textAlgin")
                .appendField(new Blockly.FieldDropdown([["'start'", "'start'"], ["'end'", "'end'"], ["'center'", "'center'"], ["'left'", "'left'"], ["'right'", "'right'"]]), "textAlgin");
            this.appendDummyInput()
                .appendField("textBaseline")
                .appendField(new Blockly.FieldDropdown([["'alphabetic'", "'alphabetic'"], ["'top'", "'top'"], ["'hanging'", "'hanging'"], ["'middle'", "'middle'"], ["'ideographic'", "'ideographic'"], ["'bottom'", "'bottom'"]]), "textBaseline");
            this.appendValueInput("color")
                .setCheck(null)
                .appendField("color");
            this.setOutput(true, null)
            this.setInputsInline(true);
            this.setColour(blockColor.graph);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    }
    Blockly.Blocks["font_attributes"] = {
        init: function() {
            this.appendValueInput("fontSize")
                .setCheck("Number")
                .appendField("fontSize");
            this.appendDummyInput()
                .appendField("fontWeight")
                .appendField(new Blockly.FieldDropdown([["'normal'", "'normal'"], ["'bold'", "'bold'"]]), "fontWeight");
            this.appendDummyInput()
                .appendField("fontStyle")
                .appendField(new Blockly.FieldDropdown([["'normal'", "'normal'"], ["'italic'", "'italic'"]]), "fontStyle");
            this.appendValueInput("fontFamily")
                .setCheck("String")
                .appendField("fontFamily");
            this.setOutput(true, null)
            this.setInputsInline(true);
            this.setColour(blockColor.graph);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    }
    Blockly.Blocks["grat_attributes_1"] = {
        init: function() {
            this.appendValueInput("pixelsPerDegree")
                .setCheck(null)
                .appendField("pixelsPerDegree");
            this.appendValueInput("spatialFrequency")
                .setCheck(null)
                .appendField("spatialFrequency");
            this.appendValueInput("angle")
                .setCheck(null)
                .appendField("angle");
            this.appendValueInput("contrast")
                .setCheck(null)
                .appendField("contrast");
            this.setOutput(true, null)
            this.setInputsInline(true);
            this.setColour(blockColor.graph);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    }
    Blockly.Blocks["grat_attributes_2"] = {
        init: function() {
            this.appendValueInput("phase")
                .setCheck(null)
                .appendField("phase");
            this.appendValueInput("noiseLevel")
                .setCheck(null)
                .appendField("noiseLevel");
            this.appendValueInput("animateCycle")
                .setCheck(null)
                .appendField("timeFrequency");
            this.appendValueInput("gamma")
                .setCheck(null)
                .appendField("gamma");
            this.setOutput(true, null)
            this.setInputsInline(true);
            this.setColour(blockColor.graph);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    }
    Blockly.Blocks["random_dot_attributes"] = {
        init: function() {
            this.appendValueInput("maskBand")
                .setCheck(null)
                .appendField("maskBand");
            this.appendValueInput("dotNumber")
                .setCheck(null)
                .appendField("dotNumber");
            this.appendValueInput("minSpeed")
                .setCheck(null)
                .appendField("minSpeed");
            this.appendValueInput("maxSpeed")
                .setCheck(null)
                .appendField("maxSpeed");
            this.setOutput(true, null)
            this.setInputsInline(true);
            this.setColour(blockColor.graph);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    }
    // 1.直线
    Blockly.Blocks['graph_line'] = {
        init: function () {

            this.appendValueInput('id')
                .setCheck("String")
                .appendField('Line')
            this.appendValueInput("lis_pointer_0")
                .appendField("start")
                .setAlign(Blockly.ALIGN_RIGHT)
            this.appendValueInput("lis_pointer_1")
                .appendField("end")
                .setAlign(Blockly.ALIGN_RIGHT)
            this.appendValueInput("graph_attributes")
                .appendField("attributes")
                .setAlign(Blockly.ALIGN_RIGHT)
            
            this.setInputsInline(false);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(blockColor.graph);
            this.setTooltip("graph_line");
            this.setHelpUrl("");
        },
    };
    // 2.矩形
    Blockly.Blocks['graph_rect'] = {
        init: function () {

            this.appendValueInput('id')
                .setCheck("String")
                .appendField('Rect')
            this.appendValueInput("lis_pointer_0")
                .appendField("top_left")
                .setAlign(Blockly.ALIGN_RIGHT)
            this.appendValueInput("lis_size")
                .appendField("size")
                .setAlign(Blockly.ALIGN_RIGHT)
            this.appendValueInput("graph_attributes_1")
                .appendField("attributes")
                .setAlign(Blockly.ALIGN_RIGHT)

            this.setInputsInline(false);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(blockColor.graph);
            this.setTooltip("dfdf");
            this.setHelpUrl("www.taobao.com");
        }
    };
    // 3.实心矩形
    // Blockly.Blocks['graph_fillrect'] = {
    //     init: function () {
    //         // this.appendDummyInput()
    //         //     .appendField("fillRect");

    //         this.appendValueInput('id')
    //             .setCheck("String")
    //             .appendField('fillRect')
    //         this.appendValueInput("lis_pointer_0")
    //             .appendField("top_left")
    //             .setAlign(Blockly.ALIGN_RIGHT)
    //         this.appendValueInput("lis_size")
    //             .appendField("size")
    //             .setAlign(Blockly.ALIGN_RIGHT)
    //         this.appendValueInput("fill_color")
    //             .setAlign(Blockly.ALIGN_RIGHT)
    //             .setCheck(null)
    //             .appendField("fill");
            
    //         this.setInputsInline(false);
    //         this.setPreviousStatement(true, null);
    //         this.setNextStatement(true, null);
    //         this.setColour(blockColor.graph);
    //         this.setTooltip("dfdf");
    //         this.setHelpUrl("www.taobao.com");
    //     }
    // };
    // 4.三角形
    Blockly.Blocks['graph_triangle'] = {
        init: function () {
            // this.appendDummyInput()
            //     .appendField("triangle");
            this.appendValueInput('id')
                .setCheck("String")
                .appendField('Triangle')
            this.appendValueInput("lis_pointer_0")
                .appendField("point1")
                .setAlign(Blockly.ALIGN_RIGHT)
            this.appendValueInput("lis_pointer_1")
                .appendField("point2")
                .setAlign(Blockly.ALIGN_RIGHT)
            this.appendValueInput("lis_pointer_2")
                .appendField("point3")
                .setAlign(Blockly.ALIGN_RIGHT)
            this.appendValueInput("graph_attributes_1")
                .appendField("attributes")
                .setAlign(Blockly.ALIGN_RIGHT)

            this.setInputsInline(false);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(blockColor.graph);
            this.setTooltip("dfdf");
            this.setHelpUrl("www.taobao.com");
        }
    };
    // 5.圆
    Blockly.Blocks['graph_circle'] = {
        init: function () {
            // this.appendDummyInput()
            //     .appendField("Circle");
            this.appendValueInput('id')
                .setCheck("String")
                .appendField('Circle')
            this.appendValueInput("lis_pointer_r")
                .appendField("center")
                .setAlign(Blockly.ALIGN_RIGHT)
            this.appendValueInput("graph_attributes_1")
                .appendField("attributes")
                .setAlign(Blockly.ALIGN_RIGHT)
            this.setInputsInline(false);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(blockColor.graph);
            this.setTooltip("dfdf");
            this.setHelpUrl("www.taobao.com");
        }
    };
    // 6.填充圆
    // Blockly.Blocks['graph_fillcircle'] = {
    //     init: function () {
    //         this.appendDummyInput()
    //             .appendField("fillCircle");
    //         this.appendValueInput('id')
    //             .setCheck("String")
    //             .appendField('id')
    //         this.appendValueInput("x")
    //             .setCheck("Number")
    //             .appendField("X");
    //         this.appendValueInput("y")
    //             .setCheck("Number")
    //             .appendField("Y");
    //         this.appendValueInput("r")
    //             .setCheck("Number")
    //             .appendField("R");
    //         this.appendValueInput("fill_color")
    //             .setCheck(null)
    //             .appendField("fill_color");
    //         this.setInputsInline(true);
    //         this.setPreviousStatement(true, null);
    //         this.setNextStatement(true, null);
    //         this.setColour(blockColor.graph);
    //         this.setTooltip("dfdf");
    //         this.setHelpUrl("www.taobao.com");
    //     }
    // };
    //7. 文本
    Blockly.Blocks['graph_text'] = {
        init: function () {
            // this.appendDummyInput()
            //     .appendField("text");
            this.appendValueInput('id')
                .setCheck("String")
                .appendField('Text')
            this.appendValueInput("content")
                .setAlign(Blockly.ALIGN_RIGHT)
                .setCheck("String")
                .appendField("content");
            this.appendValueInput("lis_pointer_0")
                .appendField("position")
                .setAlign(Blockly.ALIGN_RIGHT)
            this.appendValueInput("font_attributes")
                .appendField("font")
                .setAlign(Blockly.ALIGN_RIGHT)
            this.appendValueInput("graph_attributes_2")
                .appendField("attributes")
                .setAlign(Blockly.ALIGN_RIGHT)
            this.setInputsInline(false);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(blockColor.graph);
            this.setTooltip("dfdf");
            this.setHelpUrl("www.taobao.com");
        }
    };
    // 8.图片
    Blockly.Blocks['image'] = {
        init: function () {
            // this.appendDummyInput()
            //     .appendField("preImage");
            this.appendValueInput("id")
                .setCheck(null)
                .appendField("PreImage");
            this.appendValueInput("URL")
                .setCheck(null)
                .appendField("URL");
            this.appendValueInput("lis_pointer_0")
                .appendField("top_left")
                .setAlign(Blockly.ALIGN_RIGHT)
            this.appendValueInput("lis_size")
                .appendField("size")
                .setAlign(Blockly.ALIGN_RIGHT)
            this.setInputsInline(false);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(blockColor.graph);
            this.setTooltip("dfdf");
            this.setHelpUrl("www.taobao.com");
        }
    };

    Blockly.Blocks['drawImg'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("drawImage");
            this.appendValueInput("id")
                .setCheck(null)
                .appendField("id");
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(blockColor.graph);
            this.setTooltip("dfdf");
            this.setHelpUrl("www.taobao.com");
        }
    };
    // 9.光栅
    Blockly.Blocks['grating'] = {
        init: function () {
            // this.appendDummyInput()
            //     .appendField("grating");
            this.appendValueInput('id')
                .setCheck("String")
                .appendField('Grating')
            this.appendValueInput("lis_pointer_r")
                .appendField("center")
                .setAlign(Blockly.ALIGN_RIGHT)
            this.appendValueInput("grat_attributes_1")
                .appendField("attributes1")
                .setAlign(Blockly.ALIGN_RIGHT)
            this.appendValueInput("grat_attributes_2")
                .appendField("attributes2")
                .setAlign(Blockly.ALIGN_RIGHT)
            this.setInputsInline(false);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(blockColor.graph);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    };

    Blockly.Blocks['drawGrating'] = {
        init: function() {
            this.appendValueInput('id')
                .setCheck("String")
                .appendField('drawGrating')
            this.appendValueInput("time")
                .setCheck(null)
                .appendField("time");
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(blockColor.graph);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    }
    // 10.随机点
    Blockly.Blocks['randomDot'] = {
        init: function () {
            // this.appendDummyInput()
            //     .appendField("randomDot");
            this.appendValueInput('id')
                .setCheck("String")
                .appendField('RandomDot')
            this.appendValueInput("lis_pointer_r")
                .appendField("center")
                .setAlign(Blockly.ALIGN_RIGHT)
            this.appendValueInput("random_dot_attributes")
                .appendField("attributes")
                .setAlign(Blockly.ALIGN_RIGHT)
            this.setInputsInline(false);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(blockColor.graph);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    };


}

export default graph
