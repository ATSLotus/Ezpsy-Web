const randerScript = async (str: string) => {
    return new Promise((res, rej) => {
        const script = document.createElement('script')
	
        script.type = 'text/javascript'
        script.src = str
        
        document.getElementsByTagName('head')[0].appendChild(script)

        script.onload = () => {
            res(1)
        }

        script.onerror = () => {
            rej(0)
        }
    })
}

export default randerScript