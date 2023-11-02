// @ts-nocheck
import { UserStore } from "@/store/store";
import BLK from "blockly"

const dataExport = (Blockly: typeof BLK) => {
    const userStorage = UserStore()
    let userId = userStorage.getUser?.uid
    Blockly.JavaScript['DataStorage'] = function (a) {
        for (var b = Array(a.itemCount_), c = 0; c < a.itemCount_; c++)
            b[c] = Blockly.JavaScript.valueToCode(a, "ADD" + c, Blockly.JavaScript.ORDER_COMMA) || "null";
        let data = "`{"
        for (let i = 0; i < c; i++) {
            data = data + '"' + b[i] + '"' + ":${getString(" + b[i] + ")}"
            if(i !== c-1) {
                data += ","
            }
        }
        data += "}`"
        if(!userId) {
            userId = userStorage.getUser?.uid
        }
        let code = `
            AjaxData('${userId}', ${data});
        `
        return code;
    };
}
export default dataExport
