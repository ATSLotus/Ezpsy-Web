import { encrypt } from "../utils/crypto"
import { getBase64 } from "../utils/image"
import { inputPopup, tipPopup } from "../utils/popup"
import uuid from "../utils/uuid"
import agc from "./agc"

const storage = agc.storage

const storeImage = (user: any) => {
    inputPopup({
        title: "请输入相关信息",
        html: [
            {
                type: "input",
                props: {
                    title: "文件名",
                    placeholder: "请输入"
                }
            },
            {
                type: "multiline",
                props: {
                    title: "描述",
                    placeholder: "请输入"
                }
            },
            {
                type: "file",
                props: {
                    accept: "image/*"
                }
            }
        ],
        preConfirm: (getValue) => {
            return () => {
                const res = getValue()
                return {
                    title: res[0] as string,
                    description: res[1] as string,
                    file: res[2] as File
                }
            }
        }
    }).then(res => {
        if(res.isConfirmed) {
            const title = res.value.title ? res.value.title : uuid.getUuid()
            const description = res.value.description ? res.value.description : ""
            const file = res.value.file ? res.value.file : null
            const reader = new FileReader()
            if(file) {
                reader.onload = () => {
                    const json = {
                        data: encrypt(JSON.stringify({
                            creator: {
                                // @ts-ignore
                                name: user.displayName,
                                // @ts-ignore
                                avatar: user.photoUrl
                            },
                            description: description,
                            image: getBase64(reader.result as string)
                        }))
                    }
                    storage.uploadString({
                        str: JSON.stringify(json),
                        // @ts-ignore
                        folder: `private/${user.uid}/ezImage`,
                        name: title,
                        extension: "json"
                    })
                }
                reader.readAsDataURL(file)
            } else {
                tipPopup("error", {
                    title: "上传失败",
                    tips: "请选择需要上传的图片",
                    closeTip: "点击空白处关闭弹窗"
                })
            }
        }
    })
}

export default storeImage