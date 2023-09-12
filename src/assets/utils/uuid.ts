import crypto from "crypto-js"

class UUID {
    suffix: number
    index: number
    hash: string
    prefixSet: Set<string>
    constructor() {
        this.suffix = 0
        this.index = 0
        this.hash = ''
        this.prefixSet = new Set<string>()
    }
    getUuid() {
        const basePrefixC = 65
        const basePrefix = 97
        const isCap = Math.floor(Math.random()*2)
        const prefix = 
            isCap === 1 ? 
            basePrefixC + Math.floor(Math.random()*26) :
            basePrefix + Math.floor(Math.random()*26)
        const prefixChar = String.fromCharCode(prefix)
        const date = Date.now().toString(32)
        const newHash = crypto.SHA256(date).toString()
        if(this.hash === newHash) {
            if(this.prefixSet.has(prefixChar)) {
                this.index++
                this.suffix = this.index
            } else {
                this.suffix = 0
                this.prefixSet.add(prefixChar)
            }
        } else {
            this.hash = newHash
            this.prefixSet.clear()
            this.prefixSet.add(prefixChar)
            this.suffix = 0
            this.index = 0
        }
        return `${prefixChar}${date}${this.suffix}`
    }
}

const uuid = new UUID()

export default uuid