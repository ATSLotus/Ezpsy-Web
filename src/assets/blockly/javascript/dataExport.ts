// @ts-nocheck
import BLK from "blockly"

const dataExport = (Blockly: typeof BLK) => {
    Blockly.JavaScript['dataExport'] = function (a) {
        // console.dir(id_value)
        // let value_url = ctx + 'system/dataExport/add';
        // let value_url = ''
        let value_name = Blockly.JavaScript.valueToCode(a, 'name', Blockly.JavaScript.ORDER_COMMA)
        for (var b = Array(a.itemCount_), c = 0; c < a.itemCount_; c++)
            b[c] = Blockly.JavaScript.valueToCode(a, "ADD" + c, Blockly.JavaScript.ORDER_COMMA) || "null";
        let data = "`{"
        for (let i = 0; i < c; i++) {
            data = data + "'" + b[i] + "'" + ":[${" + b[i] + "}],"
        }
        data += "}`"
        // let code = ` 
        //     AjaxData(${id_value},'${value_url}',${value_name},${data});
        // \n`
        // console.dir(userId);
        let code = `
            AjaxData(${value_name}, ${data});
        `
        return code;
        // return["{"+b.join(", ")+"}",Blockly.JavaScript.ORDER_ATOMIC]
    };
}
export default dataExport
