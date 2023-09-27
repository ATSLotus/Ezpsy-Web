import { DIRECTION } from "./config"
import { isArray } from "lodash"

export const ObjectListSort = <T>({
    list,
    method,
    key
}: {
    list: Array<T>
    method: DIRECTION
    key: string
}): Array<T> => {
    if(!isArray(list)) {
        return []
    }
    if(list.length <= 1) {
        return list
    }
    const type = typeof list[0][key]
    switch(true) {
        case method == DIRECTION.FORWARD && type === "string":
            return list.sort((x, y) => {
                return (<string>x[key]).localeCompare((<string>y[key]))
            })
        case method == DIRECTION.REVERSE && type === "string":
            return list.sort((x, y) => {
                return (<string>y[key]).localeCompare((<string>x[key]))
            })
        case method == DIRECTION.FORWARD && type === "number":
            return list.sort((x, y) => {
                return (<number>x[key]) - (<number>y[key])
            })
        case method == DIRECTION.REVERSE && type === "number":
            return list.sort((x, y) => {
                return (<number>y[key]) - (<number>x[key])
            })
        default:
            return list
    }
}