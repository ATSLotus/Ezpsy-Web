import { ScriptsStore } from "@/store/store"

const randerScript = async (str: string): Promise<HTMLScriptElement> => {
    return new Promise((res, rej) => {
        const script = document.createElement('script')
        
        script.src = str
        
        document.getElementsByTagName('head')[0].appendChild(script)

        script.onload = () => {
            ScriptsStore().set(script)
            res(script)
        }

        script.onerror = () => {
            rej(0)
        }
    })
}

export default randerScript