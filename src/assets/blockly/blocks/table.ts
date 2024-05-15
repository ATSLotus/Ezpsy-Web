// @ts-nocheck
import BLK from "blockly"
import blockColor from "../config"
import agc from '@/assets/agc/agc';
import { UserStore } from "@/store/store";
import { decrypt } from "@/assets/utils/crypto";

interface MapObj {
    html: string,
    keys: Record<string, "singleline" | "multiline" | "radio" | "checkbox">
}

const table = async (Blockly: typeof BLK) => {

    const userStorage = UserStore()
    let userId = userStorage.getUser?.uid
    const storage = agc.storage

    const listsRes = await storage.getFileListAll(`/private/${userId}/ezTable/`)
    let map = new Map<string, MapObj>()
    let arr = new Array<string, string>()
    if(listsRes.isSuccess) {
        listsRes.data.fileList.forEach(async list => {
            const fileRes = await storage.getFileData(list.path)
            if(fileRes.isSuccess) {
                const json = fileRes.data
                json.data = JSON.parse(decrypt(json.data))
                map.set(`'${list.name.split('.')[0]}'`, {
                    html: json.data.html,
                    keys: JSON.stringify(json.data.keys)
                })
                arr.push([`'${list.name.split('.')[0]}'`, `'${list.name.split('.')[0]}'`])
            }
        })
    }

    Blockly.Blocks["referenceTable"] = {
        init: function () {
            this.appendDummyInput()
                .appendField("referenceTable");
                this.appendDummyInput()
                .appendField("name")
                .appendField(new Blockly.FieldDropdown(arr), "name");
            this.setInputsInline(true);
            this.setOutput(true, null)
            // this.setPreviousStatement(true, null);
            // this.setNextStatement(true, null);
            this.setColour(blockColor.table);
            this.setTooltip("");
            this.setHelpUrl("");
        }
    }
}

export default table