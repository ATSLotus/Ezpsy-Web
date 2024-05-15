import BLK from "blockly"
import action from "./action"
import animate from "./animate"
import async_f from "./async"
import canvas from "./canvas"
import clearScreen from "./clearScreen"
import control from "./control"
import dataExport from "./dataExport"
import delay from "./delay"
import dialog from "./dialog"
import general from "./general"
import graph from "./graph"
import guide from "./guide"
import module from "./module"
import object from "./object"
import systemInformation from "./systemInformation"
import time from "./time"
import table from "./table"

const blocksInit = (Blockly: typeof BLK) => {
    action(Blockly)
    animate(Blockly)
    // async(Blockly)
    canvas(Blockly)
    clearScreen(Blockly)
    control(Blockly)
    dataExport(Blockly)
    delay(Blockly)
    table(Blockly)
    dialog(Blockly)
    general(Blockly)
    graph(Blockly)
    guide(Blockly)
    module(Blockly)
    object(Blockly)
    systemInformation(Blockly)
    time(Blockly)
}

export default blocksInit