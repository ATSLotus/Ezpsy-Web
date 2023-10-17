declare interface OPERATE {
    [key: string]: {
        text: string,
        func: (item: LIST) => void,
        style?: string
    } 
} 

declare interface OPTS_HEADER {
    type: string
    text: string
    style: Record<string, string>
    sort?: DIRECTION | boolean
    align?: "center" | "start" | "end"
    action?: (list: LIST) => void
}

declare interface HEADER extends OPTS_HEADER {
    value: string
    style: string
}