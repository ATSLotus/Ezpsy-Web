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
    grid?: {
        align?: "center" | "start" | "end",
        max?: number
    }
    action?: (list: LIST) => void
}

declare interface HEADER extends OPTS_HEADER {
    value: string
    style: string
}

declare interface CONTEXT_MENU {
    title: string | {
        value: [ string, string ],
        key: string
    }
    func: (item: LIST) => void
}

declare interface POSITION {
    x: number
    y: number
}