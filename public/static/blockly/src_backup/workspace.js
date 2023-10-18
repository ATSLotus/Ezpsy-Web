
var back = document.getElementById('back')
back.addEventListener('click',function(){
    workspace.undo();
})

var runJs=document.getElementById('run');
 runJs.addEventListener('click',function(){
	// Generate JavaScript code and display it.
    Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
    //将工作空间的模块转译成JS代码，Blockly.JavaScript.workspaceToCode需要引入javascript_compressed.js
    var code = Blockly.JavaScript.workspaceToCode(workspace);
    code='(async function(){'+'\n'+code+'\n'+'}())';
    //放入系统缓存
    sessionStorage.setItem('key',code);
	window.open("/experment.html" + "?path=key");
});

let swalXml = function(){
    return swal.fire({
      title: '请输入xml文件名',
      input: 'text',
      showCancelButton: true,
      customClass: {
        confirmButton: 'button-class',
        cancelButton: 'button-class',
      }
    })
}

// let saveXml = function(e,xmlB,code,id_value){ 

//     $.ajax({
//         type: "post",
//         url: ctx + "system/xmlFile/add",
//         data: {
//             "xmlName": e.value,
//             "userId": parseInt(id_value),
//             "xml": xmlB.toString(),
//             "code": code
//         },
//         success: function (data) {
//             if(data.code===0)
//             {
//                 swal.fire({
//                     type: 'success',
//                     title: 'Your workspace has been saved',
//                     showConfirmButton: false,
//                     timer: 1500
//                 })
//             }
//             else{
//                 swal.fire({
//                     type: 'error',
//                     title: "Your workspace isn't saved",
//                     showConfirmButton: false,
//                     timer: 1500
//                 })
//             }
//         }
//     })
// }

let swalXmlFor = function(xmlB,func,code){
    swalXml().then(e=>{
        // console.dir(e)
        if(e.value) 
        {
            func(e,xmlB)
        }
        else{
            if(!e.dismiss)
            {
                console.dir('请输入xml文件名');
                swal.fire({
                    title: '请输入xml文件名',
                    type: 'warning',
                    showConfirmButton: false,
                    timer: 1500
                }).then(e=>{
                    swalXmlFor(xmlB,func,code);
                })
            }
        }
    })
}

let downloadXml = function(e,xmlB){
    download(e.value,xmlB).then(e=>{
        if(e)
        {
            swal.fire({
                type: 'success',
                title: 'Your workspace has been saved',
                showConfirmButton: false,
                timer: 1500
            })
        }
    })
}

let download = function(fileName,content) {
    return new Promise((res,rej)=>{
        let blob = new Blob([content], {
            type: "text/xml;charset=utf-8"
        });
        let reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = function(e) {
            let a = document.createElement('a');
            a.download = fileName;
            a.href = e.target.result;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            res(1);
        }
    })
}

// // js监听
// function myUpdateFunction(event) {
//     var code = Blockly.JavaScript.workspaceToCode(workspace);
//     document.getElementById('code_area').innerText = code;
// }
// workspace.addChangeListener(myUpdateFunction);