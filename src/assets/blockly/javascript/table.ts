// @ts-nocheck
import BLK from "blockly"
import agc from '@/assets/agc/agc';
import { UserStore } from "@/store/store";
import { decrypt } from "@/assets/utils/crypto";
import { stringtobase64 } from "@/assets/utils/utils";

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
            }
        })
    }
    console.log("MAP", map)

    Blockly.JavaScript['referenceTable'] = function (block) {
        let value_name = block.getFieldValue('name');
        
        const json = stringtobase64(JSON.stringify(map.get(value_name)))

        var code = `
            await renderTable(${JSON.stringify(json)})
        `;
        return [code, Blockly.JavaScript.ORDER_ATOMIC]; 
        
    };
}

export default table