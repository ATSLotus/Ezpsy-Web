// @ts-nocheck
import BLK, { Block } from "blockly"

const dialog = (Blockly: typeof BLK) => {

  Blockly.JavaScript['inputDlg'] = function (block) {
    let value_title = Blockly.JavaScript.valueToCode(block, 'titleText', Blockly.JavaScript.ORDER_ATOMIC);
    let value_text = Blockly.JavaScript.valueToCode(block, 'inputText', Blockly.JavaScript.ORDER_ATOMIC);
    let value_result = Blockly.JavaScript.valueToCode(block, 'result', Blockly.JavaScript.ORDER_ATOMIC);
    // var statements_func = Blockly.JavaScript.statementToCode(block, 'func');
    // TODO: Assemble JavaScript into code variable.
    var code = `
            await dlg.inputDlg({
              title: ${value_title},
              input: ${value_text}
            }).then(e=>{
              if(e)
                ${value_result} = e;
            })
        `;
    return code;
  };

  Blockly.JavaScript['errorDlg'] = function (block) {
    let value_title = Blockly.JavaScript.valueToCode(block, 'titleText', Blockly.JavaScript.ORDER_ATOMIC);
    let value_text = Blockly.JavaScript.valueToCode(block, 'textContent', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = `
        await dlg.errorDlg({
              title: ${value_title},
              content: ${value_text}
          })
        `;
    return code;
  };

  Blockly.JavaScript['helpDlg'] = function (block) {
    let value_title = Blockly.JavaScript.valueToCode(block, 'titleText', Blockly.JavaScript.ORDER_ATOMIC);
    let value_text = Blockly.JavaScript.valueToCode(block, 'textContent', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = `
          await dlg.helpDlg({
              title: ${value_title},
              content: ${value_text}
          })
        `;
    return code;
  };

  Blockly.JavaScript['listDlgContent'] = function(block) {
    let value_title = Blockly.JavaScript.valueToCode(block, 'titleText', Blockly.JavaScript.ORDER_ATOMIC); 
    let value_multi = Blockly.JavaScript.valueToCode(block, 'IsMultiple', Blockly.JavaScript.ORDER_ATOMIC);
    let value_result = Blockly.JavaScript.valueToCode(block, 'result', Blockly.JavaScript.ORDER_ATOMIC);
    const res = [
      value_result,
      value_title,
      value_multi,
    ]
    return [JSON.stringify(res), Blockly.JavaScript.ORDER_ATOMIC]
  }

  Blockly.JavaScript['listDlgListen'] = function(block) {
    let value_confirm = Blockly.JavaScript.valueToCode(block, 'confirmText', Blockly.JavaScript.ORDER_ATOMIC); 
    let value_cancel = Blockly.JavaScript.valueToCode(block, 'cancelText', Blockly.JavaScript.ORDER_ATOMIC);
    const res = [
      value_confirm,
      value_cancel
    ]
    return [JSON.stringify(res), Blockly.JavaScript.ORDER_ATOMIC]
  }

  Blockly.JavaScript['listDlg'] = function (block) {
    
    let [
      value_result,
      value_title,
      value_multi,
    ] = JSON.parse(Blockly.JavaScript.valueToCode(block, 'listDlgContent', Blockly.JavaScript.ORDER_ATOMIC));
    let [
      value_confirm,
      value_cancel
    ] = JSON.parse(Blockly.JavaScript.valueToCode(block, 'listDlgListen', Blockly.JavaScript.ORDER_ATOMIC));
    let value_list = Blockly.JavaScript.valueToCode(block, 'objectList', Blockly.JavaScript.ORDER_ATOMIC);
    
    var code = `
      await dlg.listDlg({
          title: ${value_title},
          list: ${value_list},
          IsMulti: ${value_multi},
          confirm: ${value_confirm},
          cancel: ${value_cancel}
      }).then(e=>{
          ${value_result} = e
      })
    `;
    return code;
  };

  Blockly.JavaScript['questDlg'] = function (block) {
    let value_title = Blockly.JavaScript.valueToCode(block, 'titleText', Blockly.JavaScript.ORDER_ATOMIC);
    let value_text = Blockly.JavaScript.valueToCode(block, 'textContent', Blockly.JavaScript.ORDER_ATOMIC);
    let value_result = Blockly.JavaScript.valueToCode(block, 'result', Blockly.JavaScript.ORDER_ATOMIC);
    // var statements_func = Blockly.JavaScript.statementToCode(block, 'func');
    // TODO: Assemble JavaScript into code variable.
    var code = `
            await dlg.questDlg({
              title: ${value_title},
              input: ${value_text}
            }).then(e=>{
              if(e)
                ${value_result} = e;
            });
        `;
    return code;
  };

  Blockly.JavaScript['warnDlg'] = function (block) {
    let value_title = Blockly.JavaScript.valueToCode(block, 'titleText', Blockly.JavaScript.ORDER_ATOMIC);
    let value_text = Blockly.JavaScript.valueToCode(block, 'textContent', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = `
          await dlg.warnDlg({
              title: ${value_title},
              content: ${value_text}
          });
        `;
    return code;
  };

  Blockly.JavaScript['msgDlgContent'] = function(block) {
    let value_image = Blockly.JavaScript.valueToCode(block, 'image', Blockly.JavaScript.ORDER_ATOMIC);
    let value_text = Blockly.JavaScript.valueToCode(block, 'textContent', Blockly.JavaScript.ORDER_ATOMIC);
    const res = [
      value_image,
      value_text
    ]
    return [JSON.stringify(res), Blockly.JavaScript.ORDER_ATOMIC]
  }

  Blockly.JavaScript['msgDlgListener'] = function(block) {
    let value_width = Blockly.JavaScript.valueToCode(block, 'width', Blockly.JavaScript.ORDER_ATOMIC);
    let value_height = Blockly.JavaScript.valueToCode(block, 'height', Blockly.JavaScript.ORDER_ATOMIC);
    let value_confirm = Blockly.JavaScript.valueToCode(block, 'confirm', Blockly.JavaScript.ORDER_ATOMIC);
    const res = [
      value_width,
      value_height,
      value_confirm
    ]
    return [JSON.stringify(res), Blockly.JavaScript.ORDER_ATOMIC]
  }

  Blockly.JavaScript['msgDlg'] = function (block) {
    
    let [
      value_image,
      value_text
    ] = JSON.parse(Blockly.JavaScript.valueToCode(block, 'msgDlgContent', Blockly.JavaScript.ORDER_ATOMIC));
    let [
      value_width,
      value_height,
      value_confirm
    ] = JSON.parse(Blockly.JavaScript.valueToCode(block, 'msgDlgListener', Blockly.JavaScript.ORDER_ATOMIC));
    
    let statements_func = Blockly.JavaScript.statementToCode(block, 'func');
    // TODO: Assemble JavaScript into code variable.
    var code = `
      await dlg.msgDlg({
        imgUrl: ${value_image},
        content: ${value_text},
        imgWidth: ${value_width},
        imgHeight: ${value_height},
        confirm: ${value_confirm}
      }).then(e=>{
        if(e)
        {
          document.documentElement.requestFullscreen();
          (async ()=>{\n${statements_func}\n})()
        }
      });
    `;
    return code;
  };
}
export default dialog
