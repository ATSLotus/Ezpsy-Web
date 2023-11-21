import log from "./log"
import _ from "lodash"

type base_type = "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function"
type AsyncFunction = (...args: any[]) => Promise<any>

export default class ReloadFunction extends Function {
    #reloadMap: Map<string, Function | AsyncFunction>
    constructor() {
        super()
        this.#reloadMap = new Map()
    }
    reload(...args: Array<any>) {
        let key = ""
        if(args.length === 0) {
            key = "*"
        } else {
            key = args.map(arg => {
                return typeof arg
            }).join("-") 
        }
        const func = this.#reloadMap.get(key)
        if(func) {
            return func(...args)
        } else {
            log.error(`执行参数类型为${key === "*" ? "null" : key.split("-").join(" ")}的函数不存在`)
        }
    }
    set({
        types, 
        func
    }: {
        types: Array<base_type>
        func: Function | AsyncFunction
    }) {
        if(!func) {
            log.error("请提供执行函数")
        } else {
            if(types == undefined) {
                log.error("请提供函数参数的基础类型")
            } else if(!(_.isArray(types))) {
                log.error("参数类型请提供字符串数组")
            } else if(types.length === 0) {
                this.#reloadMap.set("*", func)
            } else {
                const key = types.join("-")
                this.#reloadMap.set(key, func)
            }
        }
    }
}