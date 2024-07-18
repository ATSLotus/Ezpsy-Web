const spatialContrastSensitivity = `
var times, nums, total, index, canPress, exam_param, i, contrasts, exam_list, position, arr, random, count, contrast_list, x_grat, contrast, x_left, x_right, grating, name2, spatialFrequency, y, canvasColor, width, height, x, left, right, text, strokeCircle;

function listsRepeat(value, n) {
    var array = [];

    for (var i = 0; i < n; i++) {
        array[i] = value;
    }
    return array;
}

async function countTotal() {
    total = 0;
    for (var i_index in exam_list) {
        i = exam_list[i_index];
        total = (typeof total === 'number' ? total : 0) + i;
    }
    return total;

}

function mathRandomInt(a, b) {
    if (a > b) { // Swap a and b to ensure a is smaller.    
        var c = a;
        a = b;
        b = c;
    }  
    return Math.floor(Math.random() * (b - a + 1) + a);
}
async function singrat() {  
    index = 0;
    while (await countTotal() > 0) {    
        if (index == 0) {      
            random = Math.floor(mathRandomInt(1, times));
            while (exam_list[(random - 1)] <= 0) {        
                random = Math.floor(mathRandomInt(1, times));
            }      
            contrast = contrasts[(random - 1)];
            spatialFrequency = exam_param[(random - 1)];
        }              
        let n1i2tr0jq90 = Math.floor(Math.random() * 2);
              
        switch(n1i2tr0jq90){    
            case 0:      
                x_grat = x_left;
                break;
            case 1:      
                x_grat = x_right;
                break;
            default:              
                console.dir('error');
        };
        position = n1i2tr0jq90;
        new Promise(() => {                    
            grating = makeGrating(x_grat, y, 100, 57, spatialFrequency, 90, contrast, 0, 0, 0, 0.5);
        });
        await delay_frame(6);
        canPress = true;
        await grating.draw(500);
        await delay_frame(30);
        grating.remove();
        await delay_frame(60);
        if (canPress) {      
            if (index == 0) {        
                arr =  contrast_list[random];
                count = contrasts[(random - 1)];
                arr.push(count);
                contrasts[(random - 1)] = contrasts[(random - 1)] * 1.1;
            } else if (index == 1) {        
                arr = contrast_list[random];
                count = contrasts[(random - 1)];
                arr.push(count);
            }      
            index = 0;
        }    
        canPress = false;
        if (index != 1) {            
            text.remove();
            exam_list[(random - 1)] = exam_list[(random - 1)] - 1;
            text = makeText((await countTotal()), x, (y - 200), 50, 'bold', 'normal', '仿宋', 'center', 'middle', '#333333');
        }  
    }
}          
keypress.listen('keypressId', ['f','j'],{            
    funcList: {   
        0: (async ()=>{     
            if (canPress) {    
                if (position == 0) {      
                    index = (typeof index === 'number' ? index : 0) + 1;
                    if (index == 2) {        
                        arr =  contrast_list[random];
                        count = contrasts[(random - 1)];
                        arr.push(count);
                        contrasts[(random - 1)] = contrasts[(random - 1)] * 0.9;
                    index = 0;
                    }    
                } else {      
                    if (index == 0) {        
                        arr = contrast_list[random];
                        count = contrasts[(random - 1)];
                        arr.push(count);
                        count[(random - 1)] = count[(random - 1)] + 1;
                        contrasts[(random - 1)] = contrasts[(random - 1)] * 1.1;
                    } else if (index == 1) {        
                        arr =  contrast_list[random];
                        count = contrasts[(random - 1)];
                        arr.push(count);
                    }      
                    index = 0;
                }  
            }  
            canPress = false;
        }),   
        1: (async ()=>{     
            if (canPress) {    
                if (position == 1) {      
                    index = (typeof index === 'number' ? index : 0) + 1;
                    if (index == 2) {        
                        arr = contrast_list[random];
                        count = contrasts[(random - 1)];
                        arr.push(count);
                        contrasts[(random - 1)] = contrasts[(random - 1)] * 0.9;
                        index = 0;
                    }    
                } else {      
                    if (index == 0) {        
                        arr = contrast_list[random];
                        count = contrasts[(random - 1)];
                        arr.push(count);
                        count[(random - 1)] = count[(random - 1)] + 1;
                        contrasts[(random - 1)] = contrasts[(random - 1)] * 1.1;
                    } else if (index == 1) {        
                        arr = contrast_list[random];
                        count = contrasts[(random - 1)];
                        arr.push(count);
                    }      
                    index = 0;
                }  
            }  
            canPress = false;
        }),
    },            
    complete: ()=>{}          
},false);
times = 6;
nums = 120;
exam_param = [0.5, 1, 2, 4, 8, 16];
contrasts = listsRepeat(0.1, times);
exam_list = listsRepeat(nums, times);
contrast_list = {            
    1: [],    
    2: [],    
    3: [],    
    4: [],    
    5: [],    
    6: []
};
await dlg.inputDlg({              
    title: '请输入代号',              
    input: '代号'            
}).then(e=>{              
    if(e)                
        name2 = e[0].data;
});
let msg_resp = await dlg.msgDlg({        
    imgUrl: './src/assets/image/ezpsy/spatialContrastSensitivity.png',        
    content: '请仔细阅读用户指引',        
    imgWidth: 800,        
    imgHeight: 600,        
    confirm: '开始实验'      
})      
if(msg_resp) {        
    document.documentElement.requestFullscreen();
    await delay_ms(1000);
    canvasColor = "#3f3f3f";
    width = screenInformation('width');
    height = screenInformation('height');
    x = width / 2;
    y = height / 2;
    x_left = x - 240;
    x_right = x + 240;
    left = 90;
    right = 270;
    ez.setCanvasStyle({                
        width: width,                
        height: height            
    });
    ez.setCanvasStyle({              
        backColor: canvasColor            
    });
    text = makeText('+', x, y, 80, 'normal', 'normal', '仿宋', 'center', 'middle', '#333333');
    canPress = false;
    strokeCircle = makeCircle(x, y, 50, 0, canvasColor, '#ff6600');
    await delay_frame(120);
    strokeCircle.remove();
    await delay_frame(30);
    text = makeText((await countTotal()), x, (y - 200), 50, 'bold', 'normal', '仿宋', 'center', 'middle', '#333333');
    await singrat();
    AjaxData('1294907698625655936', {"name2": name2,"contrast_list": contrast_list});
    text = makeText('感谢参与本实验', x, (y - 100), 100, 'bold', 'normal', '仿宋', 'center', 'middle', '#33cc00');
}
`

export default spatialContrastSensitivity