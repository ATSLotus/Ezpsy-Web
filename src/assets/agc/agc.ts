import initialize from "ezpsy-server" 
import context from "./context.json"
import schema from "./schema.json"
import { showProgress, tipPopup } from "../utils/popup"

const agc = await initialize({
    context,
    authConfig: [
        {
            mode: 1,
            saveMode: 0,
            tag: "Ezpsy_Auth"
        }
    ],
    DBZone: ["Ezpsy"],
    schema
})

agc.storage.setUploadPercent({
    next: (snapshot) => {
        if(!snapshot){
            tipPopup("error", {
                title: "上传错误",
                tips: "上传结果为空"
            })
            return;
        }
        if(snapshot.totalByteCount == 0){
            tipPopup("error", {
                title: "上传错误",
                tips: "上传文件为空"
            })
            return;
        }
        const progress = (snapshot.bytesTransferred / snapshot.totalByteCount) * 100
        showProgress(progress)
        console.log('Upload is ' + progress.toFixed(1) + '% done')
        switch (snapshot.state) {
            case 'paused':
                console.log('Upload is paused')
                break
            case 'running':
                console.log('Upload is running')
                break
            case 'success':
                console.log('Upload is success')
                break
            case 'canceled':
                console.log('Upload is canceled')
                break
            case 'error':
                console.log('Upload is error')
                break
        }
    },
    error: (err: Error) => {
        tipPopup("error", {
            title: "上传失败",
            tips: err.message
        })
    },
    complete: () => {
        setTimeout(() => {
            tipPopup("success", {
                title: "上传成功",
                tips: "您的文件已上传成功",
                timer: 1500
            })
        }, 500)
    }
})

export default agc