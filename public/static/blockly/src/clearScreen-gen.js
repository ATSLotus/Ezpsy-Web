// 1.清屏
Blockly.JavaScript['clearscreen'] = function(block) {
    // TODO: Assemble JavaScript into code variable.
    var code = `
        ez.clear();
    `;
    return code;
  };

//2.清除元素
Blockly.JavaScript['remove'] = function(block) {
    let value_name = Blockly.JavaScript.valueToCode(block,'id',Blockly.JavaScript.ORDER_ATOMIC);
    // let value_id = Blockly.JavaScript.valueToCode(block,'id',Blockly.JavaScript.ORDER_ATOMIC);
    let code =` 
      ${value_name}.remove();\n
    `
    return code;
  }