import log from "@/assets/utils/log"
import initialize, { AGC } from "ezpsy-server"
import context from "./context.json"
import schema from "./schema.json"
import { closePopup, hideloading, showProgress, showloading, tipPopup } from "../utils/popup"

const agc = await (async () => {
    showloading()
    return await initialize({
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
})()
hideloading()

agc.storage.setUploadPercent({
    next: (snapshot) => {
        if (!snapshot) {
            tipPopup("error", {
                title: "上传错误",
                tips: "上传结果为空"
            })
            return;
        }
        if (snapshot.totalByteCount == 0) {
            tipPopup("error", {
                title: "上传错误",
                tips: "上传文件为空"
            })
            return;
        }
        const progress = Math.floor((snapshot.bytesTransferred / snapshot.totalByteCount) * 10000) / 100
        showProgress(progress)
        log.info('Upload is ' + progress.toFixed(1) + '% done')
        switch (snapshot.state) {
            case 'paused':
                log.info('Upload is paused')
                break
            case 'running':
                log.info('Upload is running')
                break
            case 'success':
                log.info('Upload is success')
                break
            case 'canceled':
                log.info('Upload is canceled')
                break
            case 'error':
                log.info('Upload is error')
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
            }).then(() => {
                closePopup()
                const reload = agc.storage.funcs.get("reload")
                reload && reload()
            })
        }, 500)
    }
})

export default agc