// @ts-nocheck
import BLK from "blockly"

const module = (Blockly: typeof BLK) => {
    Blockly.JavaScript['First-orderGratingMotion'] = function (block) {
        // TODO: Assemble JavaScript into code variable.
        var code = `
            let contrastList = [1, 0.8, 0.6, 0.4, 0.2];
            await First_orderGratingMotion();
            async function First_orderGratingMotion() {
                let windowWidth = window.innerWidth;
                let windowHeight = window.innerHeight;
                let isContinue = true;
                let index = 1;
                let rightNum = 0;
                while (isContinue) {
                    contrast = contrastList[(index - 1)];
                    
                    let x = Math.floor(Math.random() * 2);
                    switch(x){
                        case 0: 
                            grating = makeGrating((windowWidth / 2),(windowHeight / 2),120,57,2,90,contrast,0,0,4,333);
                            break;
                        case 1:
                            grating = makeGrating((windowWidth / 2),(windowHeight / 2),120,57,2,(-90),contrast,0,0,4,333);
                            break;
                        default:
                            console.dir('error');
                    }
                    randomValue = x;
                    await keypress.listen(['f','j'],{
                        funcList: {
                            0: (async ()=>{
                                if (randomValue == 0) {
                                    rightNum = (typeof rightNum == 'number' ? rightNum : 0) + 1;
                                } 
                                else {
                                    if (index > 2) {
                                        index = (typeof index == 'number' ? index : 0) + -1;
                                    } 
                                    else {
                                        isContinue = false;
                                    }
                                }
                            }),
                            1: (async ()=>{
                                if (randomValue == 1) {
                                    rightNum = (typeof rightNum == 'number' ? rightNum : 0) + 1;
                                }
                                else {
                                    if (index > 2) {
                                        index = (typeof index == 'number' ? index : 0) + -1;
                                    } 
                                    else {
                                        isContinue = false;
                                    }
                                }
                            }),
                        },
                        complete: ()=>{
                            ez.remove(grating);
                        }
                    },true);
                
                    if (rightNum >= 2) {
                        rightNum = 0;
                        index = (typeof index == 'number' ? index : 0) + 1;
                    }
                    if (index > 5 || index < 1) {
                        isContinue = false;
                    }
                }
            };
        `;
        return code;
    };

    Blockly.JavaScript['GratingTrain'] = function (block) {
        // TODO: Assemble JavaScript into code variable.
        var code = `
            await train(90);
            await delay_frame(10);
            await train(-90);
            await delay_frame(10);
            async function train(angle) {
                let isContinue = true;
                let windowWidth = window.innerWidth;
                let windowHeight = window.innerHeight;
            
                let grating = makeGrating((windowWidth / 2),(windowHeight / 2),120,57,2,angle,1,0,0,4,333);
            
                while (isContinue) {
            
                    await keypress.listen(['f','j'],{
                        funcList: {
                            0: (async ()=>{
                                if (angle == 90) {
                                    isContinue = false;
                                } 
                                else {
                                    await dlg.errorDlg({
                                        title: '按键错误',
                                        content: '请按下正确按键'
                                    })
                                }
                                }),
                            1: (async ()=>{
                                if (angle == -90) {
                                    isContinue = false;
                                } 
                                else {
                                    await dlg.errorDlg({
                                    title: '按键错误',
                                    content: '请按下正确按键'
                                    })
                                }
                            }),
                        },
                        complete: ()=>{
                            ez.remove(grating);
                        }
                    },true);
                }
            };        
        `;
        return code;
    };

    Blockly.JavaScript['module_text'] = function (block) {
        let value_id = Blockly.JavaScript.valueToCode(block, 'id', Blockly.JavaScript.ORDER_ATOMIC);
        var value_content = Blockly.JavaScript.valueToCode(block, 'content', Blockly.JavaScript.ORDER_ATOMIC);

        var code = `
          ${value_id} = makeText('normal','normal',180,'仿宋',"red",${value_content},(window.innerWidth / 2),(window.innerHeight / 2),'center','middle');
        `
        return code;
    };

    Blockly.JavaScript['module0_text'] = function (block) {
        let value_id = Blockly.JavaScript.valueToCode(block, 'id', Blockly.JavaScript.ORDER_ATOMIC);
        var value_content = Blockly.JavaScript.valueToCode(block, 'content', Blockly.JavaScript.ORDER_ATOMIC);
        var value_color = Blockly.JavaScript.valueToCode(block, 'color', Blockly.JavaScript.ORDER_ATOMIC);

        var code = `
          ${value_id} = makeText('normal','normal',180,'仿宋',${value_color},${value_content},(window.innerWidth / 2),(window.innerHeight / 2),'center','middle');
        `
        return code;
    };

    Blockly.JavaScript['module_listDlg'] = function (block) {
        let value_title = Blockly.JavaScript.valueToCode(block, 'titleText', Blockly.JavaScript.ORDER_ATOMIC);
        let value_list = Blockly.JavaScript.valueToCode(block, 'objectList', Blockly.JavaScript.ORDER_ATOMIC);
        let value_result = Blockly.JavaScript.valueToCode(block, 'result', Blockly.JavaScript.ORDER_ATOMIC);
        // TODO: Assemble JavaScript into code variable.
        var code = `
          await dlg.listDlg({
                title: ${value_title},
                list: ${value_list},
                IsMulti: false,
                confirm: 'OK',
                cancel: 'Cancel'
          }).then(e=>{
                ${value_result} = e
          })
        `;
        return code;
    };

    Blockly.JavaScript['module_msgDlg'] = function (block) {
        let value_image = Blockly.JavaScript.valueToCode(block, 'image', Blockly.JavaScript.ORDER_ATOMIC);
        let statements_func = Blockly.JavaScript.statementToCode(block, 'func');
        // TODO: Assemble JavaScript into code variable.
        var code = `
          document.body.style.background = "#808080";
          await dlg.msgDlg({
                imgUrl: ${value_image},
                content: '请仔细阅读用户指引',
                imgWidth: 1200,
                imgHeight: 800,
                confirm: '开始实验'
          }).then(e=>{
            if(e)
            {
                (async ()=>{\n
                    await ${statements_func}
                    window.close();\n
                })()
            }
          });
        `;
        return code;
    };

    Blockly.JavaScript['module_grating'] = function (block) {
        let value_id = Blockly.JavaScript.valueToCode(block, 'id', Blockly.JavaScript.ORDER_ATOMIC);
        var value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
        var value_y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_ATOMIC);
        var value_r = Blockly.JavaScript.valueToCode(block, 'r', Blockly.JavaScript.ORDER_ATOMIC);
        var value_noiseLevel = Blockly.JavaScript.valueToCode(block, 'noiseLevel', Blockly.JavaScript.ORDER_ATOMIC);



        // TODO: Assemble JavaScript into code variable.
        var code = `
          ${value_id} = makeGrating(${value_x},${value_y},${value_r},57,1,0,1,0,${value_noiseLevel},0,0);\n
        `;
        return code;
    };
}
export default module
