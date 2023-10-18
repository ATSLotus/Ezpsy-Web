<script setup lang="ts">
    import log from '@/assets/utils/log'
    import blockColor from "@/assets/blockly/config"
    import { reactive } from 'vue';

    const color = reactive(blockColor)

</script>

<template>
    <xml id="ezpsy-toolbox" style="display: none">
        <!-- guide -->
        <!-- <category name="Guide" :colour="color.guide">
            <block type="guide">
                <value name="imageUrl">
                    <shadow type="text">
                        <field name="TEXT">http://www.easyun.ltd/img/head-back2.png</field>
                    </shadow>
                </value>
            </block>
            <block type="end">
                <value name="ENDTEXT">
                    <shadow type="text">
                        <field name="TEXT">实验结束感谢参与！</field>
                    </shadow>
                </value>
            </block>
        </category> -->
        <!-- <sep></sep> -->
        <!-- logic -->
        <category name="Logic" :colour="color.logic">
            <block type="controls_if"></block>
            <block type="logic_compare"></block>
            <block type="logic_operation"></block>
            <block type="logic_negate"></block>
            <block type="logic_boolean"></block>
            <block type="logic_null"></block>
            <block type="logic_ternary"></block>
        </category>
        <sep></sep>
        <!-- loops -->
        <category name="Loops" :colour="color.loops">
            <block type="controls_repeat_ext">
                <value name="TIMES">
                    <shadow type="math_number">
                        <field name="NUM">10</field>
                    </shadow>
                </value>
            </block>
            <block type="controls_whileUntil"></block>
            <block type="controls_for">
                <value name="FROM">
                    <shadow type="math_number">
                        <field name="NUM">1</field>
                    </shadow>
                </value>
                <value name="TO">
                    <shadow type="math_number">
                        <field name="NUM">10</field>
                    </shadow>
                </value>
                <value name="BY">
                    <shadow type="math_number">
                        <field name="NUM">1</field>
                    </shadow>
                </value>
            </block>
            <block type="controls_forEach"></block>
            <block type="controls_flow_statements"></block>
        </category>
        <sep></sep>
        <!--代码块-Math区域-->
        <category name="Math" :colour="color.math">
            <block type="math_number"></block>
            <block type="math_arithmetic">
                <value name="A">
                    <shadow type="math_number">
                        <field name="NUM">1</field>
                    </shadow>
                </value>
                <value name="B">
                    <shadow type="math_number">
                        <field name="NUM">1</field>
                    </shadow>
                </value>
            </block>
            <block type="math_single">
                <value name="NUM">
                    <shadow type="math_number">
                        <field name="NUM">9</field>
                    </shadow>
                </value>
            </block>
            <block type="math_trig">
                <value name="NUM">
                    <shadow type="math_number">
                        <field name="NUM">45</field>
                    </shadow>
                </value>
            </block>
            <block type="math_constant"></block>
            <block type="math_number_property">
                <value name="NUMBER_TO_CHECK">
                    <shadow type="math_number">
                        <field name="NUM">0</field>
                    </shadow>
                </value>
            </block>
            <block type="math_round">
                <value name="NUM">
                    <shadow type="math_number">
                        <field name="NUM">3.1</field>
                    </shadow>
                </value>
            </block>
            <block type="math_on_list"></block>
            <block type="math_modulo">
                <value name="DIVIDEND">
                    <shadow type="math_number">
                        <field name="NUM">64</field>
                    </shadow>
                </value>
                <value name="DIVISOR">
                    <shadow type="math_number">
                        <field name="NUM">10</field>
                    </shadow>
                </value>
            </block>
            <block type="math_constrain">
                <value name="VALUE">
                    <shadow type="math_number">
                        <field name="NUM">50</field>
                    </shadow>
                </value>
                <value name="LOW">
                    <shadow type="math_number">
                        <field name="NUM">1</field>
                    </shadow>
                </value>
                <value name="HIGH">
                    <shadow type="math_number">
                        <field name="NUM">100</field>
                    </shadow>
                </value>
            </block>
            <block type="math_random_int">
                <value name="FROM">
                    <shadow type="math_number">
                        <field name="NUM">1</field>
                    </shadow>
                </value>
                <value name="TO">
                    <shadow type="math_number">
                        <field name="NUM">100</field>
                    </shadow>
                </value>
            </block>
            <block type="math_random_float"></block>
        </category>
        <sep></sep>
        <!--代码块-Text区域-->
        <category name="Text" :colour="color.texts">
            <block type="text"></block>
            <block type="text_join"></block>
            <block type="text_append">
                <value name="TEXT">
                    <shadow type="text"></shadow>
                </value>
            </block>
            <block type="text_length">
                <value name="VALUE">
                    <shadow type="text">
                        <field name="TEXT">abc</field>
                    </shadow>
                </value>
            </block>
            <block type="text_isEmpty">
                <value name="VALUE">
                    <shadow type="text">
                        <field name="TEXT"></field>
                    </shadow>
                </value>
            </block>
            <block type="text_indexOf">
                <value name="VALUE">
                    <block type="variables_get">
                        <field name="VAR">{textVariable}</field>
                    </block>
                </value>
                <value name="FIND">
                    <shadow type="text">
                        <field name="TEXT">abc</field>
                    </shadow>
                </value>
            </block>
            <block type="text_charAt">
                <value name="VALUE">
                    <block type="variables_get">
                        <field name="VAR">{textVariable}</field>
                    </block>
                </value>
            </block>
            <block type="text_getSubstring">
                <value name="STRING">
                    <block type="variables_get">
                        <field name="VAR">{textVariable}</field>
                    </block>
                </value>
            </block>
            <block type="text_changeCase">
                <value name="TEXT">
                    <shadow type="text">
                        <field name="TEXT">abc</field>
                    </shadow>
                </value>
            </block>
            <block type="text_trim">
                <value name="TEXT">
                    <shadow type="text">
                        <field name="TEXT">abc</field>
                    </shadow>
                </value>
            </block>
            <block type="text_print">
                <value name="TEXT">
                    <shadow type="text">
                        <field name="TEXT">abc</field>
                    </shadow>
                </value>
            </block>
            <block type="output">
                <value name="output">
                    <shadow type="text">
                        <field name="TEXT">ok</field>
                    </shadow>
                </value>
            </block>
            <block type="text_prompt_ext">
                <value name="TEXT">
                    <shadow type="text">
                        <field name="TEXT">abc</field>
                    </shadow>
                </value>
            </block>
        </category>
        <sep></sep>
        <!--代码块-Lists区域-->
        <category name="Lists" :colour="color.lists">
            <block type="lists_create_with">
                <mutation items="0"></mutation>
            </block>
            <block type="lists_create_with"></block>
            <block type="lists_repeat">
                <value name="NUM">
                    <shadow type="math_number">
                        <field name="NUM">5</field>
                    </shadow>
                </value>
            </block>
            <block type="lists_length"></block>
            <block type="lists_isEmpty"></block>
            <block type="lists_indexOf">
                <value name="VALUE">
                    <block type="variables_get">
                        <field name="VAR">{listVariable}</field>
                    </block>
                </value>
            </block>
            <block type="lists_getIndex">
                <value name="VALUE">
                    <block type="variables_get">
                        <field name="VAR">{listVariable}</field>
                    </block>
                </value>
            </block>
            <block type="lists_setIndex">
                <value name="LIST">
                    <block type="variables_get">
                        <field name="VAR">{listVariable}</field>
                    </block>
                </value>
            </block>
            <block type="lists_getSublist">
                <value name="LIST">
                    <block type="variables_get">
                        <field name="VAR">{listVariable}</field>
                    </block>
                </value>
            </block>
            <block type="lists_split">
                <value name="DELIM">
                    <shadow type="text">
                        <field name="TEXT">,</field>
                    </shadow>
                </value>
            </block>
            <block type="lists_sort"></block>
        </category>
        <sep></sep>
        <!--Object-->
        <category name="Object" :colour="color.object">
            <block type="objectContent">
                <value name="key">
                    <block type="text">
                        <field name="TEXT">objectKey</field>
                    </block>
                </value>
            </block>
            <block type="objectsCreate">
                <value name="title">
                    <block type="text">
                        <field name="TEXT">title</field>
                    </block>
                </value>
                <mutation items="0"></mutation>
            </block>
            <block type="DlgObjectsCreate">
                <mutation items="0"></mutation>
            </block>
            <!-- <block type="ObjectAdd">
    <value name="key">
    <block type="objectContent">
        <field name="TEXT">objectKey</field>
    </block>
    </value>
</block> -->
        </category>
        <sep></sep>
        <!--代码块-color区域-->
        <category name="Color" :colour="color.colour">
            <block type="colour_picker"></block>
            <block type="colour_random"></block>
            <block type="colour_rgb">
                <value name="RED">
                    <shadow type="math_number">
                        <field name="NUM">100</field>
                    </shadow>
                </value>
                <value name="GREEN">
                    <shadow type="math_number">
                        <field name="NUM">50</field>
                    </shadow>
                </value>
                <value name="BLUE">
                    <shadow type="math_number">
                        <field name="NUM">0</field>
                    </shadow>
                </value>
            </block>
            <block type="colour_blend">
                <value name="COLOUR1">
                    <shadow type="colour_picker">
                        <field name="COLOUR">#ff0000</field>
                    </shadow>
                </value>
                <value name="COLOUR2">
                    <shadow type="colour_picker">
                        <field name="COLOUR">#3333ff</field>
                    </shadow>
                </value>
                <value name="RATIO">
                    <shadow type="math_number">
                        <field name="NUM">0.5</field>
                    </shadow>
                </value>
            </block>
        </category>
        <sep></sep>
        <!--设置canvas样式-->
        <category name="Canvas" :colour="color.canvas">
            <block type="canvasSize">
                <value name="width">
                    <block type="math_number">
                        <field name="NUM">1200</field>
                    </block>
                </value>
                <value name="height">
                    <block type="math_number">
                        <field name="NUM">1200</field>
                    </block>
                </value>
            </block>
            <block type="canvasColor">
                <value name="color">
                    <block type="colour_rgb">
                        <value name="RED">
                            <block type="math_number">
                                <field name="NUM">100</field>
                            </block>
                        </value>
                        <value name="GREEN">
                            <block type="math_number">
                                <field name="NUM">50</field>
                            </block>
                        </value>
                        <value name="BLUE">
                            <block type="math_number">
                                <field name="NUM">0</field>
                            </block>
                        </value>
                    </block>
                </value>
            </block>
        </category>
        <sep></sep>
        <!-- 图形 -->
        <category name="Graph" :colour="color.graph">
            <!-- 直线 -->
            <block type="graph_line">
                <value name="id">
                    <block type="variables_get">
                        <field name="VAR">line</field>
                    </block>
                </value>
                <value name="start_x">
                    <block type="math_number">
                        <field name="NUM">100</field>
                    </block>
                </value>
                <value name="start_y">
                    <block type="math_number">
                        <field name="NUM">100</field>
                    </block>
                </value>
                <value name="end_x">
                    <block type="math_number">
                        <field name="NUM">1000</field>
                    </block>
                </value>
                <value name="end_y">
                    <block type="math_number">
                        <field name="NUM">1000</field>
                    </block>
                </value>
                <value name="border_width">
                    <block type="math_number">
                        <field name="NUM">2</field>
                    </block>
                </value>
                <value name="color">
                    <block type="colour_rgb">
                        <value name="RED">
                            <shadow type="math_number">
                                <field name="NUM">100</field>
                            </shadow>
                        </value>
                        <value name="GREEN">
                            <shadow type="math_number">
                                <field name="NUM">50</field>
                            </shadow>
                        </value>
                        <value name="BLUE">
                            <shadow type="math_number">
                                <field name="NUM">0</field>
                            </shadow>
                        </value>
                    </block>
                </value>
            </block>
            <!-- 空心矩形 -->
            <block type="graph_strokerect">
                <value name="id">
                    <block type="variables_get">
                        <field name="VAR">strokeRect</field>
                    </block>
                </value>
                <value name="start_x">
                    <block type="math_number">
                        <field name="NUM">100</field>
                    </block>
                </value>
                <value name="start_y">
                    <block type="math_number">
                        <field name="NUM">100</field>
                    </block>
                </value>
                <value name="width">
                    <block type="math_number">
                        <field name="NUM">100</field>
                    </block>
                </value>
                <value name="height">
                    <block type="math_number">
                        <field name="NUM">100</field>
                    </block>
                </value>
                <value name="border_width">
                    <block type="math_number">
                        <field name="NUM">1</field>
                    </block>
                </value>
                <value name="border_color">
                    <block type="colour_rgb">
                        <value name="RED">
                            <shadow type="math_number">
                                <field name="NUM">100</field>
                            </shadow>
                        </value>
                        <value name="GREEN">
                            <shadow type="math_number">
                                <field name="NUM">50</field>
                            </shadow>
                        </value>
                        <value name="BLUE">
                            <shadow type="math_number">
                                <field name="NUM">0</field>
                            </shadow>
                        </value>
                    </block>
                </value>
            </block>
            <!-- 实心矩形 -->
            <block type="graph_fillrect">
                <value name="id">
                    <block type="variables_get">
                        <field name="VAR">fillRect</field>
                    </block>
                </value>
                <value name="start_x">
                    <block type="math_number">
                        <field name="NUM">200</field>
                    </block>
                </value>
                <value name="start_y">
                    <block type="math_number">
                        <field name="NUM">200</field>
                    </block>
                </value>
                <value name="width">
                    <block type="math_number">
                        <field name="NUM">100</field>
                    </block>
                </value>
                <value name="height">
                    <block type="math_number">
                        <field name="NUM">100</field>
                    </block>
                </value>
                <value name="fill_color">
                    <block type="colour_rgb">
                        <value name="RED">
                            <block type="math_number">
                                <field name="NUM">100</field>
                            </block>
                        </value>
                        <value name="GREEN">
                            <block type="math_number">
                                <field name="NUM">50</field>
                            </block>
                        </value>
                        <value name="BLUE">
                            <block type="math_number">
                                <field name="NUM">0</field>
                            </block>
                        </value>
                    </block>
                </value>
            </block>
            <!-- 三角形 -->
            <block type="graph_triangle">
                <value name="id">
                    <block type="variables_get">
                        <field name="VAR">triangle</field>
                    </block>
                </value>
                <value name="top_x">
                    <block type="math_number">
                        <field name="NUM">100</field>
                    </block>
                </value>
                <value name="top_y">
                    <block type="math_number">
                        <field name="NUM">100</field>
                    </block>
                </value>
                <value name="left_x">
                    <block type="math_number">
                        <field name="NUM">200</field>
                    </block>
                </value>
                <value name="left_y">
                    <block type="math_number">
                        <field name="NUM">200</field>
                    </block>
                </value>
                <value name="right_x">
                    <block type="math_number">
                        <field name="NUM">0</field>
                    </block>
                </value>
                <value name="right_y">
                    <block type="math_number">
                        <field name="NUM">200</field>
                    </block>
                </value>
                <value name="border_color">
                    <block type="colour_rgb">
                        <value name="RED">
                            <block type="math_number">
                                <field name="NUM">100</field>
                            </block>
                        </value>
                        <value name="GREEN">
                            <block type="math_number">
                                <field name="NUM">50</field>
                            </block>
                        </value>
                        <value name="BLUE">
                            <block type="math_number">
                                <field name="NUM">0</field>
                            </block>
                        </value>
                    </block>
                </value>
            </block>
            <!-- 空心圆 -->
            <block type="graph_strokecircle">
                <value name="id">
                    <block type="variables_get">
                        <field name="VAR">strokeCircle</field>
                    </block>
                </value>
                <value name="x">
                    <block type="math_number">
                        <field name="NUM">100</field>
                    </block>
                </value>
                <value name="y">
                    <block type="math_number">
                        <field name="NUM">100</field>
                    </block>
                </value>
                <value name="r">
                    <block type="math_number">
                        <field name="NUM">50</field>
                    </block>
                </value>
                <value name="border_color">
                    <block type="colour_rgb">
                        <value name="RED">
                            <block type="math_number">
                                <field name="NUM">100</field>
                            </block>
                        </value>
                        <value name="GREEN">
                            <block type="math_number">
                                <field name="NUM">50</field>
                            </block>
                        </value>
                        <value name="BLUE">
                            <block type="math_number">
                                <field name="NUM">0</field>
                            </block>
                        </value>
                    </block>
                </value>
            </block>
            <!-- 实心圆 -->
            <block type="graph_fillcircle">
                <value name="id">
                    <block type="variables_get">
                        <field name="VAR">fillCircle</field>
                    </block>
                </value>
                <value name="x">
                    <block type="math_number">
                        <field name="NUM">100</field>
                    </block>
                </value>
                <value name="y">
                    <block type="math_number">
                        <field name="NUM">100</field>
                    </block>
                </value>
                <value name="r">
                    <block type="math_number">
                        <field name="NUM">50</field>
                    </block>
                </value>
                <value name="fill_color">
                    <block type="colour_rgb">
                        <value name="RED">
                            <block type="math_number">
                                <field name="NUM">100</field>
                            </block>
                        </value>
                        <value name="GREEN">
                            <block type="math_number">
                                <field name="NUM">50</field>
                            </block>
                        </value>
                        <value name="BLUE">
                            <block type="math_number">
                                <field name="NUM">0</field>
                            </block>
                        </value>
                    </block>
                </value>
            </block>
            <!-- 文本 -->
            <block type="graph_text">
                <value name="id">
                    <block type="variables_get">
                        <field name="VAR">text</field>
                    </block>
                </value>
                <field name="fontWeight">'normal'</field>
                <field name="fontStyle">'normal'</field>
                <value name="content">
                    <block type="text">
                        <field name="TEXT">shoring</field>
                    </block>
                </value>
                <value name="x">
                    <block type="math_number">
                        <field name="NUM">100</field>
                    </block>
                </value>
                <value name="y">
                    <block type="math_number">
                        <field name="NUM">100</field>
                    </block>
                </value>
                <value name="fontSize">
                    <block type="math_number">
                        <field name="NUM">20</field>
                    </block>
                </value>
                <value name="fontFamily">
                    <block type="text">
                        <field name="TEXT">仿宋</field>
                    </block>
                </value>
                <field name="textAlgin">'start'</field>
                <field name="textBaseline">'alphabetic'</field>
                <value name="color">
                    <block type="colour_rgb">
                        <value name="RED">
                            <shadow type="math_number">
                                <field name="NUM">100</field>
                            </shadow>
                        </value>
                        <value name="GREEN">
                            <shadow type="math_number">
                                <field name="NUM">50</field>
                            </shadow>
                        </value>
                        <value name="BLUE">
                            <shadow type="math_number">
                                <field name="NUM">0</field>
                            </shadow>
                        </value>
                    </block>
                </value>
            </block>
            <!-- 图片 -->
            <block type="image">
                <value name="id">
                    <block type="variables_get">
                        <field name="VAR">image1</field>
                    </block>
                </value>
                <value name="URL">
                    <block type="text">
                        <field name="TEXT">
                            https://tse1-mm.cn.bing.net/th/id/R-C.6e2a7d7ecb7202c7145e9966794b3248?rik=5DRSyuQWDE8Weg&riu=http%3a%2f%2fup.36992.com%2fpic%2f9b%2f55%2f28%2f9b55289650cbc404d43c6e9bcc508588.jpg&ehk=fv6Eh69nmHC3wh9CJlGEJUJv53qxB4BLKiExF5ItWI0%3d&risl=&pid=ImgRaw&r=0
                        </field>
                    </block>
                </value>
                <value name="X">
                    <block type="math_number">
                        <field name="NUM">100</field>
                    </block>
                </value>
                <value name="Y">
                    <block type="math_number">
                        <field name="NUM">100</field>
                    </block>
                </value>
                <value name="width">
                    <block type="math_number">
                        <field name="NUM">200</field>
                    </block>
                </value>
                <value name="height">
                    <block type="math_number">
                        <field name="NUM">200</field>
                    </block>
                </value>
            </block>
            <block type="drawImg">
                <value name="id">
                    <block type="variables_get">
                        <field name="VAR">image1</field>
                    </block>
                </value>
            </block>
            <!-- -光栅- -->
            <block type="grating">
                <value name="id">
                    <block type="variables_get">
                        <field name="VAR">grating</field>
                    </block>
                </value>
                <value name="x">
                    <block type="math_number">
                        <field name="NUM">100</field>
                    </block>
                </value>
                <value name="y">
                    <block type="math_number">
                        <field name="NUM">100</field>
                    </block>
                </value>
                <value name="r">
                    <block type="math_number">
                        <field name="NUM">120</field>
                    </block>
                </value>
                <value name="pixelsPerDegree">
                    <block type="math_number">
                        <field name="NUM">57</field>
                    </block>
                </value>
                <value name="spatialFrequency">
                    <block type="math_number">
                        <field name="NUM">1</field>
                    </block>
                </value>
                <value name="angle">
                    <block type="math_number">
                        <field name="NUM">0</field>
                    </block>
                </value>
                <value name="contrast">
                    <block type="math_number">
                        <field name="NUM">1</field>
                    </block>
                </value>
                <value name="phase">
                    <block type="math_number">
                        <field name="NUM">0</field>
                    </block>
                </value>
                <value name="noiseLevel">
                    <block type="math_number">
                        <field name="NUM">0</field>
                    </block>
                </value>
                <value name="animateCycle">
                    <block type="math_number">
                        <field name="NUM">0</field>
                    </block>
                </value>
                <value name="time">
                    <block type="math_number">
                        <field name="NUM">1000</field>
                    </block>
                </value>
            </block>
            <!-- -随机点- -->
            <block type="randomDot">
                <value name="id">
                    <block type="variables_get">
                        <field name="VAR">randomDot</field>
                    </block>
                </value>
                <value name="x">
                    <block type="math_number">
                        <field name="NUM">100</field>
                    </block>
                </value>
                <value name="y">
                    <block type="math_number">
                        <field name="NUM">100</field>
                    </block>
                </value>
                <value name="r">
                    <block type="math_number">
                        <field name="NUM">100</field>
                    </block>
                </value>
                <value name="maskBand">
                    <block type="math_number">
                        <field name="NUM">8</field>
                    </block>
                </value>
                <value name="dotNumber">
                    <block type="math_number">
                        <field name="NUM">100</field>
                    </block>
                </value>
                <value name="minSpeed">
                    <block type="math_number">
                        <field name="NUM">0</field>
                    </block>
                </value>
                <value name="maxSpeed">
                    <block type="math_number">
                        <field name="NUM">5</field>
                    </block>
                </value>
            </block>
        </category>
        <sep></sep>
        <!-- 基础动作 -->
        <category name="Action" :colour="color.action">
            <!-- 设置填充色 -->
            <block type="setFillColor">
                <value name="id">
                    <block type="variables_get">
                        <field name="VAR">el</field>
                    </block>
                </value>
                <value name="color">
                    <block type="colour_rgb">
                        <value name="RED">
                            <shadow type="math_number">
                                <field name="NUM">100</field>
                            </shadow>
                        </value>
                        <value name="GREEN">
                            <shadow type="math_number">
                                <field name="NUM">50</field>
                            </shadow>
                        </value>
                        <value name="BLUE">
                            <shadow type="math_number">
                                <field name="NUM">0</field>
                            </shadow>
                        </value>
                    </block>
                </value>
            </block>
            <!-- 设置边框色 -->
            <block type="setStrokeColor">
                <value name="id">
                    <block type="variables_get">
                        <field name="VAR">el</field>
                    </block>
                </value>
                <value name="color">
                    <block type="colour_rgb">
                        <value name="RED">
                            <shadow type="math_number">
                                <field name="NUM">100</field>
                            </shadow>
                        </value>
                        <value name="GREEN">
                            <shadow type="math_number">
                                <field name="NUM">50</field>
                            </shadow>
                        </value>
                        <value name="BLUE">
                            <shadow type="math_number">
                                <field name="NUM">0</field>
                            </shadow>
                        </value>
                    </block>
                </value>
            </block>
            <!-- 设置边框线宽 -->
            <block type="setBorderWidth">
                <value name="id">
                    <block type="variables_get">
                        <field name="VAR">el</field>
                    </block>
                </value>
                <value name="border_width">
                    <block type="math_number">
                        <field name="NUM">5</field>
                    </block>
                </value>
            </block>
            <!-- 位移 -->
            <block type="translate">
                <value name="id">
                    <block type="variables_get">
                        <field name="VAR">el</field>
                    </block>
                </value>
                <value name="x">
                    <block type="math_number">
                        <field name="NUM">40</field>
                    </block>
                </value>
                <value name="y">
                    <block type="math_number">
                        <field name="NUM">40</field>
                    </block>
                </value>
            </block>
            <!-- 缩放 -->
            <block type="scale">
                <value name="id">
                    <block type="variables_get">
                        <field name="VAR">el</field>
                    </block>
                </value>
                <value name="width">
                    <block type="math_number">
                        <field name="NUM">1.2</field>
                    </block>
                </value>
                <value name="height">
                    <block type="math_number">
                        <field name="NUM">1.2</field>
                    </block>
                </value>
            </block>
            <!-- 旋转 -->
            <block type="rotate">
                <value name="id">
                    <block type="variables_get">
                        <field name="VAR">el</field>
                    </block>
                </value>
                <value name="rotate">
                    <block type="math_number">
                        <field name="NUM">90</field>
                    </block>
                </value>
            </block>
        </category>
        <sep></sep>
        <!-- 动画 -->
        <category name="Animate" :colour="color.animate">
            <block type="refresh">
                <value name="id">
                    <block type="variables_get">
                        <field name="VAR">el</field>
                    </block>
                </value>
            </block>
            <block type="animate">
                <value name="id">
                    <block type="variables_get">
                        <field name="VAR">el</field>
                    </block>
                </value>
                <value name="delay">
                    <block type="math_number">
                        <field name="NUM">6</field>
                    </block>
                </value>
            </block>
            <block type="play">
                <value name="id">
                    <block type="variables_get">
                        <field name="VAR">el</field>
                    </block>
                </value>
            </block>
            <block type="pause">
                <value name="id">
                    <block type="variables_get">
                        <field name="VAR">el</field>
                    </block>
                </value>
            </block>
        </category>
        <sep></sep>
        <!-- 清除 -->
        <category name="Clear" :colour="color.clearScreen">
            <!-- 清屏 -->
            <block type="clearscreen">
            </block>
            <!-- 清除元素 -->
            <block type="remove">
                <value name="id">
                    <block type="variables_get">
                        <field name="VAR">el</field>
                    </block>
                </value>
            </block>
        </category>
        <sep></sep>
        <!-- 弹窗 -->
        <category name="Dialog" :colour="color.dialog">
            <!-- -弹窗信息- -->
            <block type="inputDlg">
                <value name="titleText">
                    <block type="text">
                        <field name="TEXT">title</field>
                    </block>
                </value>
                <value name="inputText">
                    <block type="text">
                        <field name="TEXT">输入框</field>
                    </block>
                </value>
                <value name="result">
                    <block type="variables_get">
                        <field name="VAR">result</field>
                    </block>
                </value>
            </block>
            <block type="errorDlg">
                <value name="titleText">
                    <block type="text">
                        <field name="TEXT">title</field>
                    </block>
                </value>
                <value name="textContent">
                    <block type="text">
                        <field name="TEXT">content</field>
                    </block>
                </value>
            </block>
            <block type="helpDlg">
                <value name="titleText">
                    <block type="text">
                        <field name="TEXT">title</field>
                    </block>
                </value>
                <value name="textContent">
                    <block type="text">
                        <field name="TEXT">content</field>
                    </block>
                </value>
            </block>
            <block type="listDlg">
                <value name="titleText">
                    <block type="text">
                        <field name="TEXT">title</field>
                    </block>
                </value>
                <value name="result">
                    <block type="variables_get">
                        <field name="VAR">result</field>
                    </block>
                </value>
                <value name="objectList">
                    <block type="DlgObjectsCreate">
                        <mutation items="0"></mutation>
                    </block>
                </value>
                <value name="IsMultiple">
                    <block type="logic_boolean">
                        <field name="BOOL">flase</field>
                    </block>
                </value>
                <value name="confirmText">
                    <block type="text">
                        <field name="TEXT">OK</field>
                    </block>
                </value>
                <value name="cancelText">
                    <block type="text">
                        <field name="TEXT">Cancel</field>
                    </block>
                </value>
            </block>
            <block type="questDlg">
                <value name="titleText">
                    <block type="text">
                        <field name="TEXT">title</field>
                    </block>
                </value>
                <value name="textContent">
                    <block type="text">
                        <field name="TEXT">content</field>
                    </block>
                </value>
                <value name="result">
                    <block type="variables_get">
                        <field name="VAR">result</field>
                    </block>
                </value>
            </block>
            <block type="warnDlg">
                <value name="titleText">
                    <block type="text">
                        <field name="TEXT">title</field>
                    </block>
                </value>
                <value name="textContent">
                    <block type="text">
                        <field name="TEXT">content</field>
                    </block>
                </value>
            </block>
            <block type="msgDlg">
                <value name="image">
                    <block type="text">
                        <field name="TEXT">https://unsplash.it/400/200</field>
                    </block>
                </value>
                <value name="textContent">
                    <block type="text">
                        <field name="TEXT">请仔细阅读用户指引</field>
                    </block>
                </value>
                <value name="width">
                    <block type="math_number">
                        <field name="NUM">400</field>
                    </block>
                </value>
                <value name="height">
                    <block type="math_number">
                        <field name="NUM">200</field>
                    </block>
                </value>
                <value name="confirm">
                    <block type="text">
                        <field name="TEXT">开始实验</field>
                    </block>
                </value>
            </block>
        </category>
        <sep></sep>
        <!-- 延时 -->
        <category name="Delay" :colour="color.delay">
            <block type="delay_ms">
                <value name="X">
                    <block type="math_number">
                        <field name="NUM">1000</field>
                    </block>
                </value>
            </block>
            <block type="delay_frame">
                <value name="X">
                    <block type="math_number">
                        <field name="NUM">60</field>
                    </block>
                </value>
            </block>
            <!-- <block type="await">
            </block> -->
        </category>
        <sep></sep>
        <!--计时-->
        <category name="Time" :colour="color.time">
            <block type="record"></block>
            <block type="getContinueValue">
                <value name="id">
                    <block type="variables_get">
                        <field name="VAR">continueCalculate</field>
                    </block>
                </value>
            </block>
            <block type="getIntervalValue">
                <value name="id">
                    <block type="variables_get">
                        <field name="VAR">intervalCalculate</field>
                    </block>
                </value>
            </block>
        </category>
        <sep></sep>
        <!-- 系统信息 -->
        <category name="SysInfo" :colour="color.systemInformation">
            <block type="broswerversion"></block>
            <block type="screeninformation">
                <field name="information">'height'</field>
            </block>
        </category>
        <sep></sep>
        <!-- Control -->
        <category name="Control" :colour="color.control">

            <block type="randomfunc">
                <value name="randomValue">
                    <block type="variables_get">
                        <field name="VAR">randomValue</field>
                    </block>
                </value>
                <mutation items="2"></mutation>
            </block>

            <block type="await_keypress">
                <value name="isDestroy">
                    <block type="logic_boolean">
                        <field name="BOOL">flase</field>
                    </block>
                </value>
                <mutation items="1"></mutation>
            </block>

            <block type="keypress">
                <value name="isDestroy">
                    <block type="logic_boolean">
                        <field name="BOOL">flase</field>
                    </block>
                </value>
                <mutation items="1"></mutation>
            </block>

        </category>
        <sep></sep>
        <!-- 变量 -->
        <category name="Variables" :colour="color.variables" custom="VARIABLE">
        </category>
        <sep></sep>
        <!-- 函数 custom="PROCEDURE" -->
        <category name="Function" :colour="color.procedure" custom="PROCEDURE">
        </category>
        <sep></sep>
        <!-- 数据导出 -->
        <category name="DataExport" :colour="color.dataExport">
            <block type="dataExport">
                <value name="name">
                    <block type="text">
                        <field name="TEXT">expermentName</field>
                    </block>
                </value>
                <mutation items="0"></mutation>
            </block>
        </category>
        <sep></sep>
        <!-- 模块 -->
        <!-- <category name="Module" :colour="#8AC2D4">
            <block type="First-orderGratingMotion">
            </block>
            <block type="GratingTrain">
            </block>
            <block type="module_text">
                <value name="id">
                    <block type="variables_get">
                        <field name="VAR">text</field>
                    </block>
                </value>
                <value name="content">
                    <block type="text">
                        <field name="TEXT">shoring</field>
                    </block>
                </value>
            </block>
            <block type="module0_text">
                <value name="id">
                    <block type="variables_get">
                        <field name="VAR">text</field>
                    </block>
                </value>
                <value name="content">
                    <block type="text">
                        <field name="TEXT">shoring</field>
                    </block>
                </value>
                <value name="color">
                    <block type="colour_rgb">
                        <value name="RED">
                            <shadow type="math_number">
                                <field name="NUM">100</field>
                            </shadow>
                        </value>
                        <value name="GREEN">
                            <shadow type="math_number">
                                <field name="NUM">50</field>
                            </shadow>
                        </value>
                        <value name="BLUE">
                            <shadow type="math_number">
                                <field name="NUM">0</field>
                            </shadow>
                        </value>
                    </block>
                </value>
            </block>
            <block type="module_listDlg">
                <value name="titleText">
                    <block type="text">
                        <field name="TEXT">title</field>
                    </block>
                </value>
                <value name="result">
                    <block type="variables_get">
                        <field name="VAR">result</field>
                    </block>
                </value>
                <value name="objectList">
                    <block type="DlgObjectsCreate">
                        <mutation items="0"></mutation>
                    </block>
                </value>
            </block>
            <block type="module_msgDlg">
                <value name="image">
                    <block type="text">
                        <field name="TEXT">https://unsplash.it/400/200</field>
                    </block>
                </value>
            </block>
            <block type="module_grating">
                <value name="id">
                    <block type="variables_get">
                        <field name="VAR">grating</field>
                    </block>
                </value>
                <value name="x">
                    <block type="math_number">
                        <field name="NUM">100</field>
                    </block>
                </value>
                <value name="y">
                    <block type="math_number">
                        <field name="NUM">100</field>
                    </block>
                </value>
                <value name="r">
                    <block type="math_number">
                        <field name="NUM">120</field>
                    </block>
                </value>
                <value name="noiseLevel">
                    <block type="math_number">
                        <field name="NUM">0</field>
                    </block>
                </value>
                <value name="animateCycle">
                    <block type="math_number">
                        <field name="NUM">0</field>
                    </block>
                </value>
            </block>
        </category> -->
        <!-- <sep></sep> -->
    </xml>
</template>

<style scoped lang="scss"></style>