/*
 * @Author: ATSLotus/时桐
 * @Date: 2022-05-12 16:00:40
 * @LastEditors: ATSLotus/时桐
 * @LastEditTime: 2022-09-21 10:35:15
 * @Description: 
 * @FilePath: /ezpsy/public/static/js/ezpsy/blockly-src/dataExport-gen.js
 */
Blockly.JavaScript['dataExport']=function(a){
    // console.dir(id_value)
    // let value_url = ctx + 'system/dataExport/add';
    // let value_url = ''
    let value_name = Blockly.JavaScript.valueToCode(a,'name',Blockly.JavaScript.ORDER_COMMA)
    for(var b=Array(a.itemCount_),c=0;c<a.itemCount_;c++)
      b[c]=Blockly.JavaScript.valueToCode(a,"ADD"+c,Blockly.JavaScript.ORDER_COMMA)||"null";
    let data = "`{"
    for(let i = 0;i < c;i++)
    {
        data = data +  "'" + b[i] + "'" + ":[${" + b[i] + "}],"
    }
    data += "}`"
    // let code = ` 
    //     AjaxData(${id_value},'${value_url}',${value_name},${data});
    // \n`
    // console.dir(userId);
    let code =`
      AjaxData('${userId}',${value_name},${data});
    `
    return code; 
    // return["{"+b.join(", ")+"}",Blockly.JavaScript.ORDER_ATOMIC]
};