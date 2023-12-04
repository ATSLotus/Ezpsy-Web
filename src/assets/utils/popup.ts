import Swal from "sweetalert2"
import ATSSelectElement from "../elem/atsselect"
import uuid from "./uuid"
import { getBase64, getContainedImageSize, getImgTypeByBase64 } from "./image"

let container = "ats_container"
type ContainerType = "normal" | "spacial" | "fullscreen"
const setContainer = (type: ContainerType) => {
    switch (type) {
        case "normal":
            container = "ats_container"
            break
        case "spacial":
            container = "ats_ezpsy_container"
            break
        case "fullscreen":
            container = "ats_full_container"
            break
        default:
            container = "ats_container"
            break
    }
}
interface POPUP {
    title?: string
    tips?: string
    timer?: number
    confirmText?: string
    cancelText?: string
    isUseConfirm?: boolean
    isUseCancel?: boolean
    isUseClose?: boolean
    closeTip?: string
    isUseCloseTip?: boolean
}

type TYPE = "warn" | "error" | "success" | "info" | "question"

const TIPICON: Record<string, string> = {
    WARN: "data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiPjxwYXRoIGQ9Ik01MjIuNjU2IDM4OC4wNjRhMzIgMzIgMCAwIDAtMzIgMzJ2MTYwYTMyIDMyIDAgMCAwIDY0IDB2LTE2MGEzMiAzMiAwIDAgMC0zMi0zMm0wIDI4OGEzMiAzMiAwIDEgMCAwIDY0IDMyIDMyIDAgMCAwIDAtNjQiIGZpbGw9IiNlOTk5NGIiLz48cGF0aCBkPSJNNzE0LjY1NiA3OTUuNjE2SDIwMy4wNzJsMTI3LjU4NC0yMjEuODg4IDMzLjE1Mi01Ny42NjRMNTIyLjY1NiAyMzkuODRsMTU4LjgxNiAyNzYuMjI0IDMzLjE4NCA1Ny42OTYgMTI3LjU1MiAyMjEuODU2SDcxNC42NTZ6bTE5NC41MjgtMTEuOTY4TDU2Ni41MjggMTg3LjcxMkM1NTYuMzg0IDE3MC4xMTIgNTQwLjQxNiAxNjAgNTIyLjY1NiAxNjBzLTMzLjcyOCAxMC4xMTItNDMuODQgMjcuNzEybC0zNDIuNzIgNTk1LjkzNmMtMTAuMDQ4IDE3LjU2OC0xMC43ODQgMzYuNDgtMS45MiA1MS44NCA4Ljg5NiAxNS4zMjggMjUuNiAyNC4xMjggNDUuODI0IDI0LjEyOGg2ODUuMzQ0YzIwLjE2IDAgMzYuODY0LTguOCA0NS43Ni0yNC4xMjggOC44OTYtMTUuMzYgOC4xOTItMzQuMjQtMS45Mi01MS44NHoiIGZpbGw9IiNlOTk5NGIiLz48L3N2Zz4=",
    ERROR: "data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjUgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiPjxwYXRoIGQ9Ik05ODIuNjY5IDMxMy43NWMtMjUuODEtNjAuNzUzLTYyLjcxNC0xMTUuMzc0LTEwOS42ODYtMTYyLjM0N0M4MjYuMDEgMTA0LjQzIDc3MS4zOSA2Ny41MjcgNzEwLjYzNyA0MS43MTdjLTYyLjk3LTI2Ljc1LTEyOS43MTEtNDAuMzE1LTE5OC4zNjktNDAuMzE1cy0xMzUuNCAxMy41NjQtMTk4LjM3IDQwLjMxNWMtNjAuNzUyIDI1LjgxLTExNS4zNzMgNjIuNzE0LTE2Mi4zNDYgMTA5LjY4Ni00Ni45NzEgNDYuOTczLTgzLjg3NSAxMDEuNTk0LTEwOS42ODUgMTYyLjM0NkMxNS4xMTYgMzc2LjcyIDEuNTUgNDQzLjQ2IDEuNTUgNTEyLjEyczEzLjU2NSAxMzUuMzk4IDQwLjMxNiAxOTguMzY4YzI1LjgxIDYwLjc1NCA2Mi43MTQgMTE1LjM3NSAxMDkuNjg1IDE2Mi4zNDcgNDYuOTcyIDQ2Ljk3MiAxMDEuNTkzIDgzLjg3NiAxNjIuMzQ3IDEwOS42ODUgNjIuOTcgMjYuNzUyIDEyOS43MSA0MC4zMTcgMTk4LjM3IDQwLjMxN3MxMzUuMzk4LTEzLjU2NSAxOTguMzY4LTQwLjMxN2M2MC43NTMtMjUuODA5IDExNS4zNzQtNjIuNzEzIDE2Mi4zNDYtMTA5LjY4NSA0Ni45NzMtNDYuOTcyIDgzLjg3Ny0xMDEuNTkzIDEwOS42ODYtMTYyLjM0NyAyNi43NTItNjIuOTcgNDAuMzE2LTEyOS43MSA0MC4zMTYtMTk4LjM2OHMtMTMuNTY1LTEzNS40LTQwLjMxNi0xOTguMzd6TTkzNy40MzYgNjkxLjI3Yy0yMy4zMzQgNTQuOTIzLTU2LjcxMSAxMDQuMzE4LTk5LjIwNSAxNDYuODEyLTQyLjQ5NCA0Mi40OTMtOTEuODg4IDc1Ljg3LTE0Ni44MTEgOTkuMjA0LTU2Ljg1OSAyNC4xNTYtMTE3LjEzNCAzNi40MDMtMTc5LjE1MyAzNi40MDMtNjIuMDE5IDAtMTIyLjI5NC0xMi4yNDctMTc5LjE1Mi0zNi40MDMtNTQuOTIzLTIzLjMzMy0xMDQuMzE4LTU2LjcxLTE0Ni44MS05OS4yMDQtNDIuNDk0LTQyLjQ5NC03NS44NzItOTEuODg5LTk5LjIwNS0xNDYuODEyLTI0LjE1Ni01Ni44NTgtMzYuNDAyLTExNy4xMzQtMzYuNDAyLTE3OS4xNTIgMC02Mi4wMTkgMTIuMjQ3LTEyMi4yOTQgMzYuNDAzLTE3OS4xNTMgMjMuMzMzLTU0LjkyMyA1Ni43MS0xMDQuMzE3IDk5LjIwNC0xNDYuODFzOTEuODg5LTc1Ljg3MSAxNDYuODExLTk5LjIwNWM1Ni44NTgtMjQuMTU1IDExNy4xMzMtMzYuNDAzIDE3OS4xNTItMzYuNDAzIDYyLjAxOCAwIDEyMi4yOTMgMTIuMjQ4IDE3OS4xNTMgMzYuNDAzIDU0LjkyMyAyMy4zMzQgMTA0LjMxNyA1Ni43MSAxNDYuODEgOTkuMjA1IDQyLjQ5NSA0Mi40OTMgNzUuODcxIDkxLjg4OCA5OS4yMDYgMTQ2LjgxIDI0LjE1NSA1Ni44NTkgMzYuNDAzIDExNy4xMzUgMzYuNDAzIDE3OS4xNTNTOTYxLjU5IDYzNC40MTMgOTM3LjQzNiA2OTEuMjd6IiBmaWxsPSIjZDgxZTA2Ii8+PHBhdGggZD0iTTcwNC42MjUgMzE5Ljc3Yy05Ljk5OC05Ljk5Ny0yNi4yMDQtOS45OTctMzYuMiAwTDUxMi4zODMgNDc1LjgxIDM1Ni4zNDIgMzE5Ljc3Yy05Ljk5Ni05Ljk5Ny0yNi4yMDUtOS45OTctMzYuMiAwLTkuOTk2IDkuOTk2LTkuOTk2IDI2LjIwMyAwIDM2LjJsMTU2LjA0MSAxNTYuMDQtMTU2LjA0IDE1Ni4wNDJjLTkuOTk3IDkuOTk4LTkuOTk3IDI2LjIwNSAwIDM2LjIgNC45OTcgNC45OTggMTEuNTQ5IDcuNDk3IDE4LjEgNy40OTdzMTMuMTAxLTIuNDk5IDE4LjEtNy40OTdMNTEyLjM4NCA1NDguMjFsMTU2LjA0IDE1Ni4wNGM0Ljk5OSA1IDExLjU0OCA3LjQ5OCAxOC4xIDcuNDk4czEzLjEwMi0yLjQ5OSAxOC4xLTcuNDk3YzkuOTk3LTkuOTk2IDkuOTk3LTI2LjIwMyAwLTM2LjJsLTE1Ni4wNC0xNTYuMDQgMTU2LjA0LTE1Ni4wNDJjOS45OTctOS45OTYgOS45OTctMjYuMjA0IDAtMzYuMnoiIGZpbGw9IiNkODFlMDYiLz48L3N2Zz4=",
    SUCCESS: "data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjUgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiPjxwYXRoIGQ9Ik03MzMuMTQ0IDMxNi45MzdMNDU3LjU0NiA1ODcuNzcyYTUuMTY0IDUuMTY0IDAgMCAxLTYuNDM5LjYyOWwtMTU0LjM3LTEwMC40ODljLS4zMjItLjIxOS0uNjUtLjQzMi0uOTY1LS42MzZsLS42MzYtLjM5NmMtLjM5Ni0uMjQ2LS44ODItLjQyNS0xLjMwNi0uNjY0LTQuMzg4LTIuMzk5LTkuMzU3LTMuODgzLTE0LjcxNy0zLjg4My0xNy4wNjIgMC0zMC44NzEgMTMuODIyLTMwLjg3MSAzMC44NzEgMCA2LjY5OSAyLjE5NCAxMi44NTIgNS44MTEgMTcuOTEgMS4zNTkgMi4xMDUgMi45MTIgNC4xMDIgNC44MDYgNS45MDZsMTc1LjEyOCAxNjUuODE0YzE1LjE2NCAxMi4xNDEgMzcuMTQ4IDEwLjI4MSA1MC4wMzktNC4yMzhsMjg5LjcwOS0zNDQuMDYyYzkuMzM4LTExLjA4OCA4LjU0NS0yNy40OTUtMS44MTgtMzcuNjI1LTEwLjc3My0xMC41NDctMjguMDE0LTEwLjU0LTM4Ljc3My4wMjh6IiBmaWxsPSIjYTVkYzg2Ii8+PHBhdGggZD0iTTUxMy43NTEgNTkuNjAyYy0yNDcuNDIxIDAtNDQ4IDIwMC41ODItNDQ4IDQ0Ny45OTcgMCAyNDcuNDM2IDIwMC41NzkgNDQ4LjAwNCA0NDggNDQ4LjAwNCAyNDcuNDMyIDAgNDQ4LTIwMC41NjggNDQ4LTQ0OC4wMDQgMC0yNDcuNDE1LTIwMC41NjgtNDQ3Ljk5Ny00NDgtNDQ3Ljk5N3ptMCA4NDAuMDAxYy0yMTYuNDk1IDAtMzkyLTE3NS40OTQtMzkyLTM5Mi4wMDQgMC0yMTYuNDg5IDE3NS41MDUtMzkxLjk5NyAzOTItMzkxLjk5NyAyMTYuNDk0IDAgMzkyIDE3NS41MDggMzkyIDM5MS45OTcgMCAyMTYuNTA5LTE3NS41MDYgMzkyLjAwNC0zOTIgMzkyLjAwNHoiIGZpbGw9IiNhNWRjODYiLz48L3N2Zz4=",
    INFO: "data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiPjxwYXRoIGQ9Ik01MTIgODUuMzMzQzI3Ni40OCA4NS4zMzMgODUuMzMzIDI3Ni40OCA4NS4zMzMgNTEyUzI3Ni40OCA5MzguNjY3IDUxMiA5MzguNjY3IDkzOC42NjcgNzQ3LjUyIDkzOC42NjcgNTEyIDc0Ny41MiA4NS4zMzMgNTEyIDg1LjMzM3ptMCA3OTYuNDQ1Yy0yMDMuNjYyIDAtMzY5Ljc3OC0xNjYuMTE2LTM2OS43NzgtMzY5Ljc3OFMzMDguMzM4IDE0Mi4yMjIgNTEyIDE0Mi4yMjIgODgxLjc3OCAzMDguMzM4IDg4MS43NzggNTEyIDcxNS42NjIgODgxLjc3OCA1MTIgODgxLjc3OHoiIGZpbGw9IiMzZmMzZWUiLz48cGF0aCBkPSJNNTQ5LjU0NyA2NDEuNzA3bC0yOS41ODMgMTUuOTI5YzIuMjc2LTEyLjUxNiAxNC43OTItNjIuNTc4IDM1LjI3Mi0xNTIuNDYzIDIuMjc1LTkuMTAyIDQuNTUtMzYuNDA5LTE1LjkzLTQ3Ljc4Ni02LjgyNi0zLjQxNC0xNC43OS0zLjQxNC0yMi43NTUgMC05LjEwMiAzLjQxMy0xNy4wNjcgNy45NjQtMjMuODkzIDEyLjUxNS00LjU1MSAzLjQxNC0yNS4wMzEgMTguMjA1LTYwLjMwMiA0NC4zNzQtNi44MjcgNS42ODgtOS4xMDMgMTQuNzktNC41NTIgMjIuNzU1czEzLjY1NCAxMC4yNCAyMC40OCA1LjY4OWwzNC4xMzQtMjAuNDgtMzUuMjcxIDE1MC4xODdjLTMuNDE0IDEzLjY1MyAxLjEzNyAyMi43NTUgNy45NjQgMzAuNzIgNS42ODkgNi44MjYgMTQuNzkxIDExLjM3NyAyMy44OTMgMTEuMzc3IDQuNTUyIDAgNy45NjUtMS4xMzcgMTEuMzc4LTIuMjc1IDYuODI3LTMuNDEzIDMxLjg1OC0xNy4wNjcgNzYuMjMxLTQzLjIzNiA3Ljk2NS00LjU1IDExLjM3OC0xNC43OSA1LjY5LTIyLjc1NS0zLjQxNC01LjY5LTEzLjY1NC05LjEwMi0yMi43NTYtNC41NTF6TTQ3Ny44NjcgMzY0LjA4OWE0NS41MTEgNDUuNTExIDAgMSAwIDkxLjAyMiAwIDQ1LjUxMSA0NS41MTEgMCAxIDAtOTEuMDIyIDB6IiBmaWxsPSIjM2ZjM2VlIi8+PC9zdmc+",
    QUESTION: "data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiPjxwYXRoIGQ9Ik01MTIuMDMyIDBDMjI5LjIxNiAwIDAgMjI5LjIxNiAwIDUxMmMwIDI4Mi43NTIgMjI5LjIxNiA1MTIgNTEyLjAzMiA1MTJDNzk0LjgxNiAxMDI0IDEwMjQgNzk0Ljc1MiAxMDI0IDUxMiAxMDI0IDIyOS4yMTYgNzk0LjgxNiAwIDUxMi4wMzIgMHptLS4wNjQgOTYwQzI2NC41NzYgOTYwIDYzLjkzNiA3NTkuMzkyIDYzLjkzNiA1MTJjMC0yNDcuNDI0IDIwMC42NC00NDggNDQ4LjAzMi00NDhDNzU5LjQ4OCA2NCA5NjAgMjY0LjU3NiA5NjAgNTEyYzAgMjQ3LjM5Mi0yMDAuNTEyIDQ0OC00NDguMDMyIDQ0OHoiIGZpbGw9IiM4N2FkYmQiLz48cGF0aCBkPSJNNTEyIDIwOGExNzYuMTkyIDE3Ni4xOTIgMCAwIDAtMTc2IDE3NiA0OCA0OCAwIDEgMCA5NiAwYzAtNDQuMDk2IDM1Ljg3Mi04MCA4MC04MHM4MCAzNS45MDQgODAgODBjMCAyOC44LTE1LjM2IDU0LjY4OC00MS4wNTYgNjkuMjQ4YTE3Ni43NjggMTc2Ljc2OCAwIDAgMC04OC4xMjggMTUyLjU3NiA0OCA0OCAwIDEgMCA5NiAwYzAtMjguMzg0IDE1LjMyOC01NC45NDQgMzkuOTM2LTY5LjI0OGwyLjExMi0xLjMxMkExNzYuMTYgMTc2LjE2IDAgMCAwIDY4OCAzODRjMC05Ny4wNTYtNzguOTQ0LTE3Ni0xNzYtMTc2ek00NDggNzY4YTY0IDY0IDAgMSAwIDEyOCAwIDY0IDY0IDAgMSAwLTEyOCAweiIgZmlsbD0iIzg3YWRiZCIvPjwvc3ZnPg=="
}

const getTipIcon = (type: TYPE) => {
    return TIPICON[type.toUpperCase()]
}

const tipPopup = (type: TYPE, opts?: POPUP) => {
    const timer = opts?.timer !== undefined ? opts.timer : undefined
    let isUseConfirm = opts?.isUseConfirm ? opts.isUseConfirm : false
    let isUseCancel = opts?.isUseCancel ? opts.isUseCancel : false
    const isUseClose = opts?.isUseClose ? opts.isUseClose : false
    const confirmText = opts?.confirmText ? opts.confirmText : "确认"
    const cancelText = opts?.cancelText ? opts.cancelText : "取消"
    if(opts?.confirmText) 
        isUseConfirm = true
    if(opts?.cancelText)
        isUseCancel = true
    const titleObj = opts?.title ? {
        title: opts.title,
        display: "block"
    } : {
        title: "",
        display: "none"
    }
    const tipsObj = opts?.tips ? {
        tip: opts.tips,
        display: "block"
    } : {
        tip: "",
        display: "none"
    }
    let closeTipObj = {
        closeTip: "",
        display: ""
    }
    if(opts?.closeTip) {
        closeTipObj = {
            closeTip: opts.closeTip,
            display: "block"
        }
    } else if(opts?.isUseCloseTip) {
        closeTipObj = {
            closeTip: "-- 点击空白处关闭 --",
            display: "block"
        }
    } else {
        closeTipObj = {
            closeTip: "",
            display: "none"
        }
    }
    return Swal.fire({
        html: `
            <img width='60px' src='${getTipIcon(type)}' />
            <div style="
                display: ${titleObj.display};
                font-size: 20px;"
            >${titleObj.title}</div>
            <div style="
                display: ${tipsObj.display};
                font-size: 16px;
                margin-top: 10px;
                white-space: pre-wrap;
            ">${tipsObj.tip}</div>
            <div style="
                display: ${closeTipObj.display};
                margin-top: 5px;
                font-size: 14px;
                color: red;
            ">${closeTipObj.closeTip}</div>
        `,
        showConfirmButton: isUseConfirm,
        confirmButtonText: confirmText,
        showCancelButton: isUseCancel,
        cancelButtonText: cancelText,
        showCloseButton: isUseClose,
        customClass: {
            container: container,
            popup: "ats-tip-popup",
            htmlContainer: "ats-tip-htmlContainer",
            closeButton: "ats-close-button",
            actions: "ats-actions",
            confirmButton: "ats-confirm-button",
            cancelButton: "ats-cancel-button"
        },
        timer
    })
}

type THEME = 0 | 1 | 2 
type SPEED = THEME | "slow" | "middle" | "fast"

const showloading = (theme: THEME = 0, speed: SPEED = 0) => {
    let time = 0
    switch(speed) {
        case 0:
        case "slow":
            time = 2
            break
        case 1:
        case "middle":
            time = 1.4
            break
        case 2:
        case "fast":
            time = 0.8
            break
        default:
            time = 2
            break
    }
    Swal.fire({
        html: `
            <div style="--time: ${time}s;" class="ats-loader ats-loader-${theme}">
                <div class="ats-loader-item ats-loader-item0"></div>
                <div class="ats-loader-item ats-loader-item1"></div>
                <div class="ats-loader-item ats-loader-item2"></div>
                <div class="ats-loader-item ats-loader-item3"></div>
                <div class="ats-loader-item ats-loader-item4"></div>
                <div class="ats-loader-item ats-loader-item5"></div>
                <div class="ats-loader-item ats-loader-item6"></div>
                <div class="ats-loader-item ats-loader-item7"></div>
            </div>
        `,
        customClass: {
            container: container,
            popup: "ats-loader-popup",
            htmlContainer: "ats-loader-htmlContainer"
        },
        showConfirmButton: false,
        allowOutsideClick: false,
    })
}

const hideloading = () =>{
    Swal.close()
}

const closePopup = () => {
    Swal.close()
}

const showMsg = (title: string, Msg: string) => {
    return Swal.fire({
        html: `
            <div style="
                font-size: 20px;"
            >${title}</div>
            <div style="
                width: fit-content;
                max-height: 80vh;
                font-size: 16px;
                margin: auto;
                margin-top: 20px;
                white-space: pre-wrap;
                text-align: start;
                padding: 0 20px;
            " class="ats_no_scroll_bar">${Msg}</div>
        `,
        showConfirmButton: false,
        showCancelButton: true,
        cancelButtonText: "关闭",
        customClass: {
            container: container,
            popup: "ats-msg-popup",
            htmlContainer: "ats-tip-htmlContainer",
            closeButton: "ats-close-button",
            actions: "ats-actions",
            confirmButton: "ats-confirm-button",
            cancelButton: "ats-cancel-button"
        }
    })
}

const showImg = (img: string) => {
    const id = "image_" + uuid.getUuid()
    Swal.fire({
        html: `
            <div style="
                width: 90%;
                aspect-ratio: 1/1;
                margin: auto;
                overflow: hidden;
            " id="${id}_box"
            onmouseout="(()=>{
                const img = document.getElementById('${id}')
                if(img.getAttribute('data-move') === 'true') {
                    const left = parseFloat(img.getAttribute('data-left'))
                    const top = parseFloat(img.getAttribute('data-top'))
                    const cache_left = parseFloat(img.getAttribute('data-cache-left'))
                    const cache_top = parseFloat(img.getAttribute('data-cache-top'))
                    img.style.cursor = 'pointer'
                    img.setAttribute('data-move', 'false')
                    img.setAttribute('data-left', (left + cache_left).toString())
                    img.setAttribute('data-top', (top + cache_top).toString()) 
                }
            })()">
                <img style="
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                    display: block;
                    margin: auto;
                    cursor: pointer;
                    user-select: none;
                " src="${img}" id="${id}" draggable="false" 
                data-x="0" data-y="0" data-move="false"
                data-cache-left="0" data-cache-top="0"
                data-scale="1" data-left="0" data-top="0"
                onwheel="((event) => {
                    event.preventDefault();
                    const img = document.getElementById('${id}')
                    const ratio = 0.05;
                    let scale = parseFloat(img.getAttribute('data-scale'))
                    const top = parseFloat(img.getAttribute('data-top'))
                    const left = parseFloat(img.getAttribute('data-left'))
                    if(event.deltaY > 0) {
                        scale -= ratio
                    } else if(event.deltaY < 0) {
                        scale += ratio
                    }
                    img.setAttribute('data-scale', scale.toString())
                    img.style.transform = 
                        'scale(' + scale + ')' + 
                        ' ' + 
                        'translate(' + left +  'px, ' + top + 'px)'
                })(event)"
                onmousedown="((event)=>{
                    const img = document.getElementById('${id}')
                    img.style.cursor = 'move'
                    img.setAttribute('data-x', event.clientX.toString())
                    img.setAttribute('data-y', event.clientY.toString())
                    img.setAttribute('data-move', 'true')
                })(event)" 
                onmousemove="((event)=>{
                    const img = document.getElementById('${id}')
                    if(img.getAttribute('data-move') === 'true') {
                        const box = document.getElementById('${id}_box')
                        const W = box.clientWidth
                        const H = box.clientHeight
                        const x = parseFloat(img.getAttribute('data-x'))
                        const y = parseFloat(img.getAttribute('data-y'))
                        const scale = parseFloat(img.getAttribute('data-scale'))
                        const old_left = parseFloat(img.getAttribute('data-left'))
                        const old_top = parseFloat(img.getAttribute('data-top'))
                        const x_new = event.clientX
                        const y_new = event.clientY
                        const left = x_new - x
                        const top = y_new - y
                        const new_left = old_left + left
                        const new_top = old_top + top
                        if(new_left < W && new_top < H) {
                            const new_left_str = (old_left + left).toString()
                            const new_top_str = (old_top + top).toString()
                            img.style.transform = 
                                'scale(' + scale + ')' + 
                                ' ' + 
                                'translate(' + new_left_str +  'px, ' + new_top_str + 'px)'
                            img.setAttribute('data-cache-left', left.toString())
                            img.setAttribute('data-cache-top', top.toString()) 
                        }
                    }
                })(event)"
                onmouseup="((event)=>{
                    const img = document.getElementById('${id}')
                    const left = parseFloat(img.getAttribute('data-left'))
                    const top = parseFloat(img.getAttribute('data-top'))
                    const cache_left = parseFloat(img.getAttribute('data-cache-left'))
                    const cache_top = parseFloat(img.getAttribute('data-cache-top'))
                    img.style.cursor = 'pointer'
                    img.setAttribute('data-move', 'false')
                    img.setAttribute('data-left', (left + cache_left).toString())
                    img.setAttribute('data-top', (top + cache_top).toString()) 
                })(event)"/>
            </div>
        `,
        showConfirmButton: false,
        showCancelButton: true,
        cancelButtonText: "关闭",
        customClass: {
            container: container,
            popup: "ats-img-popup",
            htmlContainer: "ats-img-htmlContainer",
            closeButton: "ats-close-button",
            actions: "ats-actions",
            confirmButton: "ats-confirm-button",
            cancelButton: "ats-cancel-button"
        }
    })
}

const showProgress = (percent: number) => {
    const html = `
        <div style="" >文件上传中</div>
        <div style="
            width: 90%;
            height: 40px;
            margin: auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
        ">
            <div style="
                width: 80%;
                height: 20px;
                border: 1px solid #ccc;
                // border-radius: 4px;
            ">
                <div id="ezPopup_bar" style="
                    width: ${percent}%;
                    height: 20px;
                    background: #2988e6;
                    transition: width .5s;
                "></div>
            </div>
            <div style="
                transition: content .5s;
            " id="ezPopup_percent" >${percent}</div>
        </div>
    `
    if(
        Swal.isVisible() && 
        document.getElementById("ezPopup_bar") &&
        document.getElementById("ezPopup_percent")
    ) {
        (document.getElementById("ezPopup_bar") as HTMLElement).style.width = `${percent}%`;
        (document.getElementById("ezPopup_percent") as HTMLElement).innerText = `${percent}%`;
    } else {
        Swal.fire({
            html,
            showConfirmButton: false,
            allowOutsideClick: false,
            customClass: {
                container: container,
                popup: "ats-tip-popup",
                htmlContainer: "ats-tip-htmlContainer",
                closeButton: "ats-close-button",
                actions: "ats-actions",
                confirmButton: "ats-confirm-button",
                cancelButton: "ats-cancel-button"
            }
        })
    }
}

type inputTypes = 
    "input" | 
    "multiline" | 
    "checkbox" | 
    "select" | 
    "file" |
    "image" |
    "option"

interface inputObject {
    type: inputTypes
    props: {
        [key: string]: any
    }
}
interface domIndex {
    type: inputTypes
    id: string
}
interface inputOptions {
    storageId?: string
    title: string
    html: Array<inputObject>
    preConfirm: (getValue: () => Array<boolean|File|string>) => () => any
}

const inputPopup = (opts: inputOptions) => {
    let storage = new Array<string|boolean>()
    if(opts.storageId) {
        const st = localStorage.getItem(opts.storageId)
        if(st) 
            storage = JSON.parse(st) as Array<string|boolean>
    }
    
    const ids = new Array<domIndex>()
    let html = ``
    html += `
        <style>
            .ats-multiline {
                font-size: 14px;
                width: 75%;
                outline: none;
                min-height: 80px;
                line-height: 25px;
                max-height: 200px;
                overflow: auto;
                text-align: justify;
                padding: 0;
                border: 1px solid #cccccc;
                border-radius: 5px;
                padding: 0 0.8em;
                box-sizing: border-box;
                color: #000000;
                cursor: text;
            }
            .ats-multiline:empty:before {
                content: attr(placeholder);
                display: block;
                width: 100%;
                height: 25px;
                line-height: 25px;
                color: #888888;
                text-indent: 0em;
            }
            .ats-tips-icon {
                width: 16px;
                height: 16px;
                margin: 0 4px;
                cursor: pointer;
                position: relative;
                background: url(./src/assets/image/popup/tips.svg) no-repeat;
                background-size: 100%;
            }
            .ats-tips-icon:hover .ats-tips {
                display: block;
            }
            .ats-tips {
                display: none;
                min-width: 100px;
                width: fit-content;
                max-width: 200px;
                padding: 5px 10px;
                position: absolute;
                z-index: 1;
                top: 24px;
                left: -50px;
                background: #FFFFFF;
                filter: drop-shadow(0 2px 10px #CCCCCC);
                text-align: justify;
            }
            .ats-tips:before {
                content: "";
                position: absolute;
                width: 0;
                height: 0;
                border-left: 8px solid transparent;
                border-right: 8px solid transparent;
                border-bottom: 6px solid #FFFFFF;
                top: -6px;
                left: 50px;
            }
        </style>
    `
    html += `<div>${opts.title}</div>\n`
    const requireStr = '<span style="margin-left: 5px;color: #FF0000">*</span>'
    const requires = new Array<string>()
    const crops = new Array<string>()
    const regs = new Array<{
        id: string,
        reg: RegExp
    }>()
    // const options = new Array<{
    //     id: string,
    //     nonce: string,
    //     default: number,
    //     hasDefault: boolean
    // }>()
    opts.html.forEach((obj, i) => {
        const id = "input_" + uuid.getUuid()
        const v = storage[i]
        switch(obj.type) {
            case "input": {
                const title = obj.props.title ? obj.props.title : ""
                const placeholder = obj.props.placeholder ? obj.props.placeholder : "请输入内容"
                const defaultValue = obj.props.default ? `${obj.props.default}` : ""
                const require = obj.props.require ? obj.props.require : false
                const tips = obj.props.tips ? obj.props.tips : ""
                const reg = obj.props.reg ? obj.props.reg : null
                const tipsDom = `
                    <div 
                        class="ats-tips-icon"
                    ><div class="ats-tips">${tips}</div></div>
                `
                if(reg) {
                    regs.push({
                        id,
                        reg
                    })
                    requires.push(id)
                } else if(require) {
                    requires.push(id)
                }   
                html += `
                    <div style="
                        width: 90%;
                        position: relative;
                        display: flex;
                        margin-left: 5%;
                        align-items: center;
                        margin-top: 15px;
                    ">
                        <div style="
                            font-size: 14px;
                            height: 40px;
                            display: flex;
                            align-items: center;
                            justify-content: left;
                            width: 15%;
                            flex-shrink: 1;
                            flex-grow: 1;
                            position: relative;
                        ">
                            ${title} ${require ? requireStr : ''} ${reg ? requireStr : ''}
                            ${tips ? tipsDom : ""}
                        </div>
                        <input style="
                            width: 75%;
                            height: 40px;
                            line-height: 40px;
                            outline: none;
                            padding: 0;
                            border: 1px solid #cccccc;
                            border-radius: 5px;
                            box-sizing: border-box;
                            text-indent: 0.8em;
                        " id="${id}" value="${v ? v : defaultValue}"
                        placeholder="${placeholder}" />
                    </div>
                `
                break
            }
            case "multiline": {
                const title = obj.props.title ? obj.props.title : ""
                const placeholder = obj.props.placeholder ? obj.props.placeholder : "请输入内容"
                const defaultValue = obj.props.default ? `${obj.props.default}` : ""
                html += `
                    <div style="
                        width: 90%;
                        position: relative;
                        display: flex;
                        margin-left: 5%;
                        margin-top: 15px;
                    ">
                        <div style="
                            font-size: 14px;
                            height: 40px;
                            display: flex;
                            align-items: center;
                            justify-content: left;
                            width: 15%;
                            flex-shrink: 1;
                            flex-grow: 1;
                        ">${title}</div>
                        <div class="ats-multiline no_scroll_bar"
                        id="${id}" contenteditable="true" 
                        placeholder="${placeholder}"
                        >${v ? v : defaultValue}</div>
                    </div>
                `
                break
            }
            case "checkbox":{
                const title = obj.props.title ? obj.props.title : ""
                const defaultValue = obj.props.default ? "checked" : ""
                const isChecked = v ? "checked" : defaultValue
                html += `
                    <div style="
                        width: 100%;
                        position: relative;
                        display: flex;
                        align-items: center;
                        margin-top: 15px;
                    ">
                        <input style= "
                            width: 18px;
                            height: 18px;
                            margin: 0 0 0 5%;
                            cursor: pointer;
                        "
                        type="checkbox"  
                        id="${id}" ${isChecked} />
                        <div style="
                            font-size: 14px;
                            height: 40px;
                            display: flex;
                            align-items: center;
                            justify-content: left;
                            width: fit-content;;
                            margin-left: 2%;
                        ">${title}</div>
                    </div>
                `
                break
            }
            case "select": {
                const placeholder = obj.props.placeholder ? obj.props.placeholder : ""
                const defaultValue = obj.props.default ? obj.props.default : ""
                const opts = 
                    obj.props.options && obj.props.options instanceof Array ? 
                    obj.props.options : 
                    []
                let optsStr = ``
                opts.forEach(opt => {
                    const isSelected = 
                        v === opt.value ? 
                        'selected' : 
                        defaultValue === opt.value ? "selected" : ""
                    optsStr += `\t<option value="${opt.value}" ${isSelected}>${opt.title}</option>\n`
                })
                html += `
                <ats-select style="
                    width: 90%;
                    height: auto;
                    margin-top: 15px;
                    left: 5%;
                " id="${id}" placeholder="${placeholder}">
                    ${optsStr}
                </ats-select>
                `
                break
            }
            case "file" : {
                const accept = obj.props.accept ? obj.props.accept : "*"
                html += `
                <div style="
                    position: relative;
                    width: 100%;
                ">
                    <div style="
                        width: 90%;
                        aspect-ratio: 3/2;
                        border: 4px dashed #cccccc;
                        margin: auto;
                        margin-top: 15px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        flex-direction: column;
                        cursor: pointer;
                        box-sizing: border-box;
                        border-radius: 5px;
                    " id="${id}_BORDER">
                        <img 
                            src="./src/assets/image/popup/file.svg" 
                            style="
                                width: 20%;
                            "
                            id="${id}_IMG"
                        />
                        <div style="
                            color: #cccccc;
                            font-weight: 700;
                            margin-top: 10px;
                        " id="${id}_TITLE" >请上传文件</div>
                    </div>
                    <input style="
                        position: absolute;
                        width: 90%;
                        aspect-ratio: 3/2;
                        top: 0;
                        left: 5%;
                        cursor: pointer;
                        opacity: 0;
                        border-radius: 5px;
                    " type="file" id="${id}" accept="${accept}"
                    onchange="(async () => {
                        const input = document.getElementById('${id}')
                        const border = document.getElementById('${id}_BORDER')
                        const img = document.getElementById('${id}_IMG')
                        const msg = document.getElementById('${id}_TITLE')
                        if(input.files && input.files?.length > 0){
                            const file = input.files[0]
                            if(file){
                                msg.innerText = file.name
                                msg.style.color = '#0D9357'
                                border.style.borderColor = '#0D9357'
                                img.src = './src/assets/image/popup/file-select.svg'
                            }
                            else{
                                msg.innerText = '请上传文件'
                                msg.style.color = '#cccccc'
                                border.style.borderColor = '#cccccc'
                                img.src = './src/assets/image/popup/file.svg'
                            }
                        } else {
                            msg.innerText = '请上传文件'
                            msg.style.color = '#cccccc'
                            border.style.borderColor = '#cccccc'
                            img.src = './src/assets/image/popup/file.svg'
                        }
                    })()" />
                </div>
                `
                break
            }
            case "image": {
                const title = obj.props.title ? obj.props.title : ""
                const default_img = obj.props.default ? obj.props.default : ""
                const crop_border_size = 10
                html += `
                <div style="
                    position: relative;
                    width: 100%;
                    margin-top: 15px;
                ">
                    <div style="
                        font-size: 14px;
                        width: 90%;
                        margin: auto;
                        display: flex;
                        justify-content: space-between;
                    ">
                        <div style="user-select: none;">${title}</div>
                        <div style="
                            cursor: pointer;
                            color: #0073bb;
                            user-select: none;
                        " onclick="(async () => {
                            const img = document.getElementById('${id}')
                            const input = document.createElement('input')
                            input.type = 'file',
                            input.accept = 'image/*'
                            input.onchange = () => {
                                if(input.files && input.files?.length > 0){
                                    const file = input.files[0]
                                    if(file){
                                        const reader = new FileReader()
                                        reader.onload = () => {
                                            img.src = reader.result
                                        }
                                        reader.readAsDataURL(file)
                                    } else {
                                        img.src = '${default_img}'
                                    }
                                } else {
                                    img.src = '${default_img}'
                                }
                            }
                            input.click()
                        })()" >选择图片</div>
                    </div>
                    <div style="
                        width: 90%;
                        aspect-ratio: 1/1;
                        margin: auto;
                        margin-top: 10px;
                        position: relative;
                        background: #FFFFFF;
                    "> 
                        <div style="
                            position: absolute;
                            width: 100%;
                            height: 100%;
                            background: #00000088;
                        " id="${id}_crop_box">
                            <div style="
                                position: absolute;
                                top: 25%;
                                left: 25%;
                                width: 50%;
                                height: 50%;
                                background: #FFFFFF;
                                mix-blend-mode: overlay;
                               cursor: pointer;
                            " id="${id}_crop">
                                <div style="
                                    width: ${crop_border_size}px;
                                    height: ${crop_border_size}px;
                                    position: absolute;
                                    top: ${ - 0.5 * crop_border_size}px;
                                    left: ${ - 0.5 * crop_border_size}px;
                                    cursor: nwse-resize;
                                " id="${id}_left-top"></div>
                                <div style="
                                    width: calc(100% - ${crop_border_size}px);
                                    height: ${crop_border_size}px;
                                    position: absolute;
                                    top: ${ - 0.5 * crop_border_size}px;
                                    left: ${ 0.5 * crop_border_size}px;
                                    cursor: ns-resize;
                                " id="${id}_top"></div>
                                <div style="
                                    width: ${crop_border_size}px;
                                    height: ${crop_border_size}px;
                                    position: absolute;
                                    top: ${ - 0.5 * crop_border_size}px;
                                    left: calc(100% - ${ 0.5 * crop_border_size }px);
                                    cursor: nesw-resize;
                                " id="${id}_right-top"></div>
                                <div style="
                                    width: ${crop_border_size}px;
                                    height: calc(100% - ${crop_border_size}px);
                                    position: absolute;
                                    top: ${ 0.5 * crop_border_size }px;
                                    left: calc(100% - ${ 0.5 * crop_border_size }px);
                                    cursor: ew-resize;
                                " id="${id}_right"></div>
                                <div style="
                                    width: ${crop_border_size}px;
                                    height: ${crop_border_size}px;
                                    position: absolute;
                                    top: calc(100% - ${ 0.5 * crop_border_size}px);
                                    left: calc(100% - ${ 0.5 * crop_border_size }px);
                                    cursor: nwse-resize;
                                " id="${id}_right-bottom"></div>
                                <div style="
                                    width: calc(100% - ${crop_border_size}px);
                                    height: ${crop_border_size}px;
                                    position: absolute;
                                    top: calc(100% - ${ 0.5 * crop_border_size}px);
                                    left: ${ 0.5 * crop_border_size}px;
                                    cursor: ns-resize;
                                " id="${id}_bottom"></div>
                                <div style="
                                    width: ${crop_border_size}px;
                                    height: ${crop_border_size}px;
                                    position: absolute;
                                    top: calc(100% - ${ 0.5 * crop_border_size}px);
                                    left: ${ - 0.5 * crop_border_size}px;
                                    cursor: nesw-resize;
                                " id="${id}_left-bottom"></div>
                                <div style="
                                    width: ${crop_border_size}px;
                                    height: calc(100% - ${crop_border_size}px);
                                    position: absolute;
                                    top: ${ 0.5 * crop_border_size }px;
                                    left: ${ - 0.5 * crop_border_size }px;
                                    cursor: ew-resize;
                                " id="${id}_left"></div>
                            </div>
                        </div>
                        <img style="
                            width: 100%;
                            height: 100%;
                            object-fit: contain;
                            display: block;
                            user-select: none;
                        " src="${default_img}" id="${id}"/>
                    </div>
                </div>
                `
                crops.push(id)
                break
            }
            // case "option": 
            //     const title = obj.props.title ? obj.props.title : ""
            //     const amount = obj.props.amount ? obj.props.amount : 3
            //     const has_default = obj.props.hasDefault ? !!(obj.props.hasDefault) : true
            //     const nonce = uuid.getUuid()
            //     const addId = `${id}_add_${nonce}`
            //     const optionId = `${id}_options_${nonce}`
            //     options.push({
            //         id,
            //         nonce,
            //         default: amount,
            //         hasDefault: has_default
            //     })
            //     let default_str = ''
            //     if(has_default) 
            //         default_str = `
            //             <div style="
            //             font-size: 14px;
            //             height: 40px;
            //             display: flex;
            //             align-items: center;
            //             justify-content: center;
            //             width: 40px;
            //             position: relative;
            //         ">默认</div>
            //         `
            //     html += `
            //     <div style="
            //         position: relative;
            //         width: 100%;
            //         margin-top: 15px;
            //     ">
            //         <div style="
            //             width: 90%;
            //             display: flex;
            //             justify-content: space-between;
            //             align-items: center;
            //             margin: auto;
            //         ">
            //             <div style="
            //                 font-size: 14px;
            //                 height: 40px;
            //                 display: flex;
            //                 align-items: center;
            //                 justify-content: left;
            //                 width: 15%;
            //                 flex-shrink: 1;
            //                 flex-grow: 1;
            //                 position: relative;
            //             ">
            //                 ${title}
            //             </div>
            //             <div style="
            //                 width: 24px;
            //                 height: 24px;
            //                 background: url(./src/assets/image/popup/add.svg) no-repeat;
            //                 background-size: 24px 24px;
            //                 background-position: center;
            //                 cursor: pointer;
            //             " id="${addId}"></div>
            //             ${default_str}
            //         </div>
            //         <div style="
            //             width: 90%;
            //             margin: auto;
            //         " id="${optionId}"></div>
            //     </div>
            //     `
            //     break
            default:
                break
        }
        ids.push({
            type: obj.type,
            id
        })
    })
    const getValue = () => {
        const res = Array<string | File | boolean>()
        ids.forEach(item => {
            const dom = document.getElementById(item.id)
            switch (item.type) {
                case "input":
                    res.push((<HTMLInputElement>dom).value)
                    break
                case "multiline":
                    res.push((<HTMLDivElement>dom).innerText)
                    break
                case "checkbox":
                    res.push((<HTMLInputElement>dom).checked)
                    break
                case "select":
                    const value = (<ATSSelectElement>dom).value
                    res.push(value ? value: "")
                    break
                case "file":
                    const file_list = (<HTMLInputElement>dom).files
                    res.push(file_list ? file_list[0]: "")
                    break
                case "image":
                    const img_src = (<HTMLImageElement>dom).src
                    if(/data:image\/.{3,4};base64,/.test(img_src)) {
                        const cropper = document.getElementById(`${item.id}_crop`)
                        const cropper_box = document.getElementById(`${item.id}_crop_box`)
                        if(cropper && cropper_box) {
                            const x = cropper.offsetLeft
                            const y = cropper.offsetTop
                            const w = cropper.offsetWidth 
                            const h = cropper.offsetHeight
                            const canvas = document.createElement("canvas")
                            document.body.append(canvas)
                            canvas.width = cropper_box.clientWidth
                            canvas.height = cropper_box.clientHeight
                            const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
                            const size = getContainedImageSize(cropper_box, (<HTMLImageElement>dom))
                            ctx.drawImage(
                                (<HTMLImageElement>dom), 
                                (canvas.width - size.width) / 2,
                                (canvas.height - size.height) / 2,
                                size.width,
                                size.height
                            )
                            const img_data = ctx.getImageData(x, y, w, h)
                            ctx.clearRect(0, 0, canvas.width, canvas.height)
                            canvas.width = w
                            canvas.height = h
                            ctx.putImageData(img_data, 0, 0)
                            const type = getImgTypeByBase64(img_src)
                            const bs64 = canvas.toDataURL(type)
                            res.push(bs64)
                        } else {
                            res.push(img_src)
                        }
                    } else {
                        res.push("")
                    }
                    break
                default:
                    break
            }
        })
        opts.storageId && localStorage.setItem(opts.storageId, JSON.stringify(res))
        return res
    }
    const result = Swal.fire({
        html: html,
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        showConfirmButton: true,
        showCancelButton: true,
        showCloseButton: true,
        allowOutsideClick: false,
        customClass: {
            container: container,
            popup: "ats-input-popup",
            htmlContainer: "ats-input-htmlContainer",
            closeButton: "ats-close-button",
            actions: "ats-actions",
            confirmButton: "ats-confirm-button",
            cancelButton: "ats-cancel-button"
        },
        preConfirm: opts.preConfirm(getValue)
    })

    const confirmButton = Swal.getConfirmButton() as HTMLButtonElement

    const max = requires.length
    const SET = new Set()

    const judgeIsConfirm = () => {
        console.log()
        if(SET.size !== max) {
            confirmButton.setAttribute("disabled", "true")
            confirmButton.style.cursor = "not-allowed"
        } else {
            confirmButton.removeAttribute("disabled")
            confirmButton.style.cursor = "pointer"
        }
    }

    const changeIndex = (dom: HTMLInputElement, oldCss: string) => {
        if(!(dom.value)) {
            dom.style.cssText = oldCss + `
                border-color: #FF0000;
            `
            SET.delete(dom.id)
        } else {
            dom.style.cssText = oldCss + ''
            SET.add(dom.id)
        }
    }

    const changeIndexWithReg = (dom: HTMLInputElement, reg: RegExp, oldCss: string) => {
        if(!(reg.test(dom.value))) {
            dom.style.cssText = oldCss + `
                border-color: #FF0000;
            `
            SET.delete(dom.id)
        } else {
            dom.style.cssText = oldCss + ''
            SET.add(dom.id)
        }
    }

    requires.forEach(id => {
        const dom = document.getElementById(id) as HTMLInputElement
        if(dom) {
            const oldCss = dom.style.cssText
            if(dom.value) {
                SET.add(dom.id)
            }
            dom.addEventListener('input', () => {
                changeIndex(dom, oldCss)
                judgeIsConfirm()
            })
        }
    })

    crops.forEach(crop => {
        const key = "isCropping"
        const key_top = "data-top"
        const key_left = "data-left"
        const position = {
            x: 0,
            y: 0,
            w: 0,
            h: 0
        }
        const methods = [
            "left-top",
            "top",
            "right-top",
            "right",
            "right-bottom",
            "bottom",
            "left-bottom",
            "left"
        ]
        const crop_box = document.getElementById(`${crop}_crop_box`)
        const cropper_box = document.getElementById(`${crop}_crop`)
        if(crop_box && cropper_box) {
            const W = crop_box.offsetWidth
            const H = crop_box.offsetHeight

            cropper_box.addEventListener("mousedown", (event) => {
                cropper_box.style.cursor = "move"
                cropper_box.setAttribute(key, "true")
                position.x = event.clientX
                position.y = event.clientY
                position.w = cropper_box.offsetWidth
                position.h = cropper_box.offsetHeight
            })

            cropper_box.addEventListener("mousemove", (event) => {
                if(cropper_box.getAttribute(key) === "true") {
                    const left = cropper_box.offsetLeft
                    const top = cropper_box.offsetTop
                    if(top > 0 && left > 0) {
                        const x = event.clientX - position.x
                        const y = event.clientY - position.y
                        if(top + y > 0 && top + position.h < H && left + x > 0 && left + position.w < W)
                        cropper_box.style.transform = `translate(${x}px, ${y}px)`
                        cropper_box.setAttribute(key_left, `${x}`)
                        cropper_box.setAttribute(key_top, `${y}`)
                    }
                }
            })

            cropper_box.addEventListener("mouseup", (event) => {
                if(cropper_box.getAttribute(key) === "true") {
                    cropper_box.removeAttribute(key)
                    cropper_box.style.cursor = "pointer"
                    const top = cropper_box.getAttribute(key_top)
                    const left = cropper_box.getAttribute(key_left)
                    cropper_box.removeAttribute(key_top)
                    cropper_box.removeAttribute(key_left)
                    const old_top = cropper_box.offsetTop
                    const old_left = cropper_box.offsetLeft
                    cropper_box.style.transform = ""
                    if(top) {
                        if(/-/.test(top)) {
                            cropper_box.style.top = `${old_top - parseInt(top.replace("-", ""))}px`
                        } else {
                            cropper_box.style.top = `${old_top + parseInt(top)}px`
                        }
                    }
                    if(left) {
                        if(/-/.test(left)) {
                            cropper_box.style.left = `${old_left - parseInt(left.replace("-", ""))}px`
                        } else {
                            cropper_box.style.left = `${old_left + parseInt(left)}px`
                        }
                    }
                }
            })

            methods.forEach(method => {
                const cropper = document.getElementById(`${crop}_${method}`)
                cropper?.addEventListener("mousedown", (event) => {
                    event.stopPropagation()
                    cropper.setAttribute(key, "true")
                    position.x = event.clientX
                    position.y = event.clientY
                    position.w = cropper_box.offsetWidth
                    position.h = cropper_box.offsetHeight
                })
                cropper?.addEventListener("mousemove", (event) => {
                    event.stopPropagation()
                    const isCropping = cropper.getAttribute(key) === "true"
                    if(isCropping){
                        switch(method) {
                            case "left-top": {
                                const left = cropper_box.offsetLeft
                                const top = cropper_box.offsetTop
                                if(top > 0 && left > 0) {
                                    const x = event.clientX - position.x
                                    const w = position.w - x
                                    const y = event.clientY - position.y
                                    const h = position.h - y
                                    if(top + y > 0 && h > 0 && left + x > 0 && w > 0) {
                                        cropper_box.style.width = `${w}px`
                                        cropper_box.style.height = `${h}px`
                                        cropper_box.style.transform = `translate(${x}px, ${y}px)`
                                        cropper_box.setAttribute(key_left, `${x}`)
                                        cropper_box.setAttribute(key_top, `${y}`)
                                    }
                                }
                                break
                            }
                            case "top": {
                                const top = cropper_box.offsetTop
                                if(top > 0) {
                                    const y = event.clientY - position.y
                                    const h = position.h - y
                                    if(top + y > 0 && h > 0) {
                                        cropper_box.style.height = `${h}px`
                                        cropper_box.style.transform = `translate(0px, ${y}px)`
                                        cropper_box.setAttribute(key_top, `${y}`)
                                    }
                                }
                                break
                            }
                            case "right-top": {
                                const left = cropper_box.offsetLeft
                                const top = cropper_box.offsetTop
                                if(top > 0) {
                                    const x = event.clientX - position.x
                                    const w = position.w + x
                                    const y = event.clientY - position.y
                                    const h = position.h - y
                                    if(top + y > 0 && h > 0 && w > 0 && left + w < W) {
                                        cropper_box.style.width = `${w}px`
                                        cropper_box.style.height = `${h}px`
                                        cropper_box.style.transform = `translate(0px, ${y}px)`
                                        cropper_box.setAttribute(key_top, `${y}`)
                                    }
                                }
                                break
                            }
                            case "right": {
                                const x = event.clientX - position.x
                                const w = position.w + x
                                const left = cropper_box.offsetLeft
                                if(w > 0 && left + w < W) {
                                    cropper_box.style.width = `${w}px`
                                }
                                break
                            }
                            case "right-bottom": {
                                const left = cropper_box.offsetLeft
                                const top = cropper_box.offsetTop
                                const x = event.clientX - position.x
                                const w = position.w + x
                                const y = event.clientY - position.y
                                const h = position.h + y
                                if(h > 0 && top + h < H && w > 0 && left + w < W) {
                                    cropper_box.style.width = `${w}px`
                                    cropper_box.style.height = `${h}px`
                                }
                                break
                            }
                            case "bottom": {
                                const y = event.clientY - position.y
                                const h = position.h + y
                                const top = cropper_box.offsetTop
                                if(h > 0 && top + h < H) {
                                    cropper_box.style.height = `${h}px`
                                }
                                break
                            }
                            case "left-bottom": {
                                const left = cropper_box.offsetLeft
                                const top = cropper_box.offsetTop
                                if(left > 0) {
                                    const x = event.clientX - position.x
                                    const w = position.w - x
                                    const y = event.clientY - position.y
                                    const h = position.h + y
                                    if(h > 0 && top + h < H && left + x > 0 && w > 0) {
                                        cropper_box.style.width = `${w}px`
                                        cropper_box.style.height = `${h}px`
                                        cropper_box.style.transform = `translate(${x}px, 0px)`
                                        cropper_box.setAttribute(key_left, `${x}`)
                                    }
                                }
                                break
                            }
                            case "left": {
                                const left = cropper_box.offsetLeft
                                if(left > 0) {
                                    const x = event.clientX - position.x
                                    const w = position.w - x
                                    if(left + x > 0 && w > 0) {
                                        cropper_box.style.width = `${w}px`
                                        cropper_box.style.transform = `translate(${x}px, 0px)`
                                        cropper_box.setAttribute(key_left, `${x}`)
                                    }
                                }
                                break
                            }
                            default:
                                break
                        }
                    }
                })
                const reset = (event: Event) => {
                    event.stopPropagation()
                    if(cropper?.getAttribute(key) === "true") {
                        cropper?.removeAttribute(key)
                        const top = cropper_box.getAttribute(key_top)
                        const left = cropper_box.getAttribute(key_left)
                        cropper_box.removeAttribute(key_top)
                        cropper_box.removeAttribute(key_left)
                        const old_top = cropper_box.offsetTop
                        const old_left = cropper_box.offsetLeft
                        cropper_box.style.transform = ""
                        if(top) {
                            if(/-/.test(top)) {
                                cropper_box.style.top = `${old_top - parseInt(top.replace("-", ""))}px`
                            } else {
                                cropper_box.style.top = `${old_top + parseInt(top)}px`
                            }
                        }
                        if(left) {
                            if(/-/.test(left)) {
                                cropper_box.style.left = `${old_left - parseInt(left.replace("-", ""))}px`
                            } else {
                                cropper_box.style.left = `${old_left + parseInt(left)}px`
                            }
                        }
                    }
                }
                document.body.addEventListener("mouseup", reset)
            })
        }
    })

    regs.forEach(reg => {
        const dom = document.getElementById(reg.id) as HTMLInputElement
        if(dom) {
            const oldCss = dom.style.cssText
            if(reg.reg.test(dom.value)) {
                SET.add(dom.id)
            }
            dom.addEventListener("input", () => {
                changeIndexWithReg(dom, reg.reg, oldCss) 
                judgeIsConfirm()
            })
        }
    })

    judgeIsConfirm()

    return result
}

export {
    setContainer,
    tipPopup,
    showloading,
    hideloading,
    closePopup,
    showMsg,
    showImg,
    showProgress,
    inputPopup
}