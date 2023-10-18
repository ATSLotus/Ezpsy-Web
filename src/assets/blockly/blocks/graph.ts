import BLK from "blockly"
import blockColor from "../config"

const graph = (Blockly: typeof BLK) => {
    //1. 直线
    Blockly.Blocks['graph_line'] = {
        init: function () {
            // console.dir(this)
            // validate(this);
            this.appendDummyInput()
                .appendField("line");
            this.appendValueInput('id')
                .setCheck("String")
                .appendField('id')
            this.appendValueInput("start_x")
                .setCheck("Number")
                .appendField("start_x");
            this.appendValueInput("start_y")
                .setCheck("Number")
                .appendField("start_y");
            this.appendValueInput("end_x")
                .setCheck("Number")
                .appendField("end_x");
            this.appendValueInput("end_y")
                .setCheck("Number")
                .appendField("end_y");
            this.appendValueInput("border_width")
                .setCheck("Number")
                .appendField("border_width");
            this.appendValueInput("color")
                .setCheck(null)
                .appendField("color");
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(blockColor.graph);
            this.setTooltip("");
            this.setHelpUrl("");
        },
    };
    // 2.空心矩形
    Blockly.Blocks['graph_strokerect'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("strokeRect");
            this.appendValueInput('id')
                .setCheck("String")
                .appendField('id')
            this.appendValueInput("start_x")
                .setCheck("Number")
                .appendField("start_x");
            this.appendValueInput("start_y")
                .setCheck("Number")
                .appendField("start_y");
            this.appendValueInput("width")
                .setCheck("Number")
                .appendField("width");
            this.appendValueInput("height")
                .setCheck("Number")
                .appendField("height");
            this.appendValueInput("border_width")
                .setCheck("Number")
                .appendField("border_width");
            this.appendValueInput("border_color")
                .setCheck(null)
                .appendField("border_color");
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(blockColor.graph);
            this.setTooltip("dfdf");
            this.setHelpUrl("www.taobao.com");
        }
    };
    // 3.实心矩形
    Blockly.Blocks['graph_fillrect'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("fillRect");
            this.appendValueInput('id')
                .setCheck("String")
                .appendField('id')
            this.appendValueInput("start_x")
                .setCheck("Number")
                .appendField("start_x");
            this.appendValueInput("start_y")
                .setCheck("Number")
                .appendField("start_y");
            this.appendValueInput("width")
                .setCheck("Number")
                .appendField("width");
            this.appendValueInput("height")
                .setCheck("Number")
                .appendField("height");
            this.appendValueInput("fill_color")
                .setCheck(null)
                .appendField("fill_color");
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(blockColor.graph);
            this.setTooltip("dfdf");
            this.setHelpUrl("www.taobao.com");
        }
    };
    // 4.三角形
    Blockly.Blocks['graph_triangle'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("triangle");
            this.appendValueInput('id')
                .setCheck("String")
                .appendField('id')
            this.appendValueInput("top_x")
                .setCheck("Number")
                .appendField("top_x");
            this.appendValueInput("top_y")
                .setCheck("Number")
                .appendField("top_y");
            this.appendValueInput("left_x")
                .setCheck("Number")
                .appendField("left_x");
            this.appendValueInput("left_y")
                .setCheck("Number")
                .appendField("left_y");
            this.appendValueInput("right_x")
                .setCheck("Number")
                .appendField("right_x");
            this.appendValueInput("right_y")
                .setCheck("Number")
                .appendField("right_y");
            this.appendValueInput("border_color")
                .setCheck(null)
                .appendField("border_color");
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(blockColor.graph);
            this.setTooltip("dfdf");
            this.setHelpUrl("www.taobao.com");
        }
    };
    // 5.空心圆
    Blockly.Blocks['graph_strokecircle'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("strokeCircle");
            this.appendValueInput('id')
                .setCheck("String")
                .appendField('id')
            this.appendValueInput("x")
                .setCheck("Number")
                .appendField("X");
            this.appendValueInput("y")
                .setCheck("Number")
                .appendField("Y");
            this.appendValueInput("r")
                .setCheck("Number")
                .appendField("R");
            this.appendValueInput("border_color")
                .setCheck(null)
                .appendField("border_color");
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(blockColor.graph);
            this.setTooltip("dfdf");
            this.setHelpUrl("www.taobao.com");
        }
    };
    // 6.填充圆
    Blockly.Blocks['graph_fillcircle'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("fillCircle");
            this.appendValueInput('id')
                .setCheck("String")
                .appendField('id')
            this.appendValueInput("x")
                .setCheck("Number")
                .appendField("X");
            this.appendValueInput("y")
                .setCheck("Number")
                .appendField("Y");
            this.appendValueInput("r")
                .setCheck("Number")
                .appendField("R");
            this.appendValueInput("fill_color")
                .setCheck(null)
                .appendField("fill_color");
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(blockColor.graph);
            this.setTooltip("dfdf");
            this.setHelpUrl("www.taobao.com");
        }
    };
    //7. 文本
    Blockly.Blocks['graph_text'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("text");
            this.appendValueInput('id')
                .setCheck("String")
                .appendField('id')
            this.appendValueInput("content")
                .setCheck("String")
                .appendField("content");
            this.appendValueInput("x")
                .setCheck("Number")
                .appendField("X");
            this.appendValueInput("y")
                .setCheck("Number")
                .appendField("Y");
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
            this.appendDummyInput()
                .appendField("textAlgin")
                .appendField(new Blockly.FieldDropdown([["'start'", "'start'"], ["'end'", "'end'"], ["'center'", "'center'"], ["'left'", "'left'"], ["'right'", "'right'"]]), "textAlgin");
            this.appendDummyInput()
                .appendField("textBaseline")
                .appendField(new Blockly.FieldDropdown([["'alphabetic'", "'alphabetic'"], ["'top'", "'top'"], ["'hanging'", "'hanging'"], ["'middle'", "'middle'"], ["'ideographic'", "'ideographic'"], ["'bottom'", "'bottom'"]]), "textBaseline");
            this.appendValueInput("color")
                .setCheck(null)
                .appendField("color");
            this.setInputsInline(true);
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
            this.appendDummyInput()
                .appendField("preImage");
            this.appendValueInput("id")
                .setCheck(null)
                .appendField("id");
            this.appendValueInput("URL")
                .setCheck(null)
                .appendField("URL");
            this.appendValueInput("X")
                .setCheck(null)
                .appendField("X");
            this.appendValueInput("Y")
                .setCheck(null)
                .appendField("Y");
            this.appendValueInput("width")
                .setCheck(null)
                .appendField("width");
            this.appendValueInput("height")
                .setCheck(null)
                .appendField("height");
            this.setInputsInline(true);
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
            this.appendDummyInput()
                .appendField("grating");
            this.appendValueInput('id')
                .setCheck("String")
                .appendField('id')
            this.appendValueInput("x")
                .setCheck(null)
                .appendField("x");
            this.appendValueInput("y")
                .setCheck(null)
                .appendField("y");
            this.appendValueInput("r")
                .setCheck(null)
                .appendField("r");
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
            this.appendValueInput("phase")
                .setCheck(null)
                .appendField("phase");
            this.appendValueInput("noiseLevel")
                .setCheck(null)
                .appendField("noiseLevel");
            this.appendValueInput("animateCycle")
                .setCheck(null)
                .appendField("timeFrequency");
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
    };
    // 10.随机点
    Blockly.Blocks['randomDot'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("randomDot");
            this.appendValueInput('id')
                .setCheck("String")
                .appendField('id')
            this.appendValueInput("x")
                .setCheck(null)
                .appendField("x");
            this.appendValueInput("y")
                .setCheck(null)
                .appendField("y");
            this.appendValueInput("r")
                .setCheck(null)
                .appendField("r");
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
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(blockColor.graph);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    };


}

export default graph
