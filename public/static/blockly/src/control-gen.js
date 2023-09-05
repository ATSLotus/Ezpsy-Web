Blockly.JavaScript['randomfunc']=function(a){
  let randomValue = Blockly.JavaScript.valueToCode(a,'randomValue',Blockly.JavaScript.ORDER_ATOMIC)
  for(var b=Array(a.itemCount_),d=Array(a.itemCount_),c=0;c<a.itemCount_;c++)
  {
    d[c]=Blockly.JavaScript.statementToCode(a,"func"+c)||"null";
  }
  let object = `switch(x){\n`;
  for(let i = 0;i < c;i++)
  {
    object += `case ${i}: \n${d[i]};\nbreak;\n`
  }
  object += `default:
    console.dir('error');
  }\n`
  let code = `
    let x = Math.floor(Math.random() * ${c});
    ${object};
    ${randomValue} = x;\n
  `
  return code
    
  // return[code,Blockly.JavaScript.ORDER_ATOMIC]
};

Blockly.JavaScript['await_keypress']=function(a){
  let complete = Blockly.JavaScript.statementToCode(a,'complete')
  let IsDestroy = Blockly.JavaScript.valueToCode(a,'isDestroy',Blockly.JavaScript.ORDER_ATOMIC)
  for(var b=Array(a.itemCount_),d=Array(a.itemCount_),c=0;c<a.itemCount_;c++)
  {
    b[c]=Blockly.JavaScript.valueToCode(a,"key"+c,Blockly.JavaScript.ORDER_COMMA)||"null";
    d[c]=Blockly.JavaScript.statementToCode(a,"func"+c)||"null";
  }
  let funcObject =  `{\n`;
  for(let i = 0;i < d.length;i++)
  {
    funcObject += `   ${i}: (async ()=>{\n   ${d[i]}\n}),\n`
  }
  funcObject += `},\n`
  let code = `
    await keypress.listen([${b}],{
      funcList: ${funcObject}
      complete: ()=>{\n${complete}\n}
    },${IsDestroy}); \n
  `
  return code
  // return[code,Blockly.JavaScript.ORDER_ATOMIC]
};

Blockly.JavaScript['keypress']=function(a){
  let complete = Blockly.JavaScript.statementToCode(a,'complete')
  let IsDestroy = Blockly.JavaScript.valueToCode(a,'isDestroy',Blockly.JavaScript.ORDER_ATOMIC)
  for(var b=Array(a.itemCount_),d=Array(a.itemCount_),c=0;c<a.itemCount_;c++)
  {
    b[c]=Blockly.JavaScript.valueToCode(a,"key"+c,Blockly.JavaScript.ORDER_COMMA)||"null";
    d[c]=Blockly.JavaScript.statementToCode(a,"func"+c)||"null";
  }
  let funcObject =  `{\n`;
  for(let i = 0;i < d.length;i++)
  {
    funcObject += `   ${i}: (async ()=>{\n   ${d[i]}\n}),\n`
  }
  funcObject += `},\n`
  let code = `
    keypress.listen([${b}],{
      funcList: ${funcObject}
      complete: ()=>{\n${complete}\n}
    },${IsDestroy}); \n
  `
  return code
  // return[code,Blockly.JavaScript.ORDER_ATOMIC]
};
