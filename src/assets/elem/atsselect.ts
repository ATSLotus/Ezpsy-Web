import log from '@/assets/utils/log'

export default class ATSSelectElement extends HTMLElement {
    #isShow: boolean
    #dom: HTMLDivElement
    #ul: HTMLUListElement
    #listHeight: number
    constructor() {
        super()
        this.#isShow = false
        this.#listHeight = 0
        let placeholder = ""
        const placeholderColor = '#888888'
        const shadow = this.attachShadow({ mode: "closed" })
        this.#dom = document.createElement("div")
        const dom = this.#dom
        dom.textContent = placeholder ? placeholder : ""
        dom.style.cssText = `
            width: 100%;
            text-indent: 0.8em;
            height: 40px;
            line-height: 40px;
            color: ${placeholderColor};
            border: 1px solid #cccccc;
            border-radius: 5px;
            text-align: left;
            font-size: 14px;
        `
        const style = document.createElement('style')
        style.textContent = `   
            .ats-ul {
                display: block;
                position: absolute;
                border-radius: 5px;
                width: 100%;
                height: 0px;
                background: #fff;
                top: 100%;
                left: 0;
                list-style: none;
                margin: 5px 0 0 0;
                padding: 0;
                z-index: 1;
                overflow: hidden;
                font-size: 14px;
                transition: height .5s;
            }
            .ats-li {
                display: block;
                text-align: left;
                text-indent: 0.8em;
                height: 40px;
                line-height: 40px;
            }
            .ats-li.ats-select-li {
                background: #54a0eb;
                color: #ffffff;
            }
            .ats-li:hover {
                background: #54a0eb;
                color: #ffffff;
            }
        `
        this.#ul = document.createElement('ul')
        const ul = this.#ul
        ul.setAttribute("class", "ats-ul")
        const lists = new Array<HTMLLIElement>()
        const addOpts = async () => {
            const placeholderText = this.getAttribute("placeholder")
            placeholder = placeholderText ? placeholderText : ""
            dom.textContent = placeholder
            const opts = this.getElementsByTagName('option')
            const len = opts.length
            this.#listHeight = 40 * len
            for(let i = 0; i < len; i++) {
                const opt = opts.item(i)
                const li = document.createElement("li")
                li.setAttribute("class", "ats-li")
                li.innerText = opt?.innerText ? opt.innerText : ""
                li.setAttribute("ats-value", opt?.value ? opt.value : li.innerText)
                const selected = opt?.selected
                if(selected) {
                    li.setAttribute("ats-select", "true")
                    li.setAttribute('class', 'ats-li ats-select-li')
                    dom.style.color = this.style.color
                    dom.setAttribute("ats-value", li.getAttribute("ats-value") as string)
                    dom.textContent = li.innerText
                }
                ul.append(li)
                lists.push(li)
            }
            if(!(this.value) && placeholder === "") {
                const li = lists[0]
                li.setAttribute("ats-select", "true")
                li.setAttribute('class', 'ats-li ats-select-li')
                dom.style.color = this.style.color
                dom.setAttribute("ats-value", li.getAttribute("ats-value") as string)
                dom.textContent = li.innerText
            } 
        }
        shadow.append(style, dom, ul)
        setTimeout(() => {
            addOpts()
        })

        const that = this
        const defaultEvent = (e: Event) => {
            // log.info("DEFAULT")
            const target = e.target as HTMLElement
            if(target !== that) {
                let isHidden = true
                const childrenNodes = that.childNodes 
                const len = childrenNodes.length
                for(let i = 0; i < len; i++) {
                    const item = childrenNodes.item(i)
                    if(target === item) {
                        isHidden = false
                        break
                    }
                }
                this.#isShow && isHidden && this.#showSelect()
            }
        }
        const select = (e: Event) => {
            const target = e.target as HTMLElement
            if(target.tagName.toLowerCase() === 'li') {
                if(target.getAttribute("ats-select")) {
                    target.removeAttribute("ats-select")
                    target.setAttribute("class", "ats-li")
                    dom.style.color = placeholderColor
                    dom.setAttribute("ats-value", "")
                    dom.textContent = placeholder
                } else {
                    lists.forEach(li => {
                        li.removeAttribute("ats-select")
                        li.setAttribute("class", "ats-li")
                    })
                    target.setAttribute("ats-select", "true")
                    target.setAttribute("class", "ats-li ats-select-li")
                    dom.style.color = this.style.color
                    dom.setAttribute("ats-value", target.getAttribute("ats-value") as string)
                    dom.textContent = target.innerText
                }
                this.#showSelect()
            }
        }

        document.addEventListener("click", defaultEvent)
        dom.addEventListener("click", this.#showEvent())
        ul.addEventListener("click", select)
        const removeDom = () => {
            // log.info("REMOVE")
            document.removeEventListener("click", defaultEvent)
            dom.removeEventListener("click", this.#showEvent())
            observe.disconnect()
            // @ts-ignore
            observe = null
        }
        let observe = new MutationObserver((records, instance) => {
            const atsselects = document.getElementsByTagName('ats-select')
            const len = atsselects.length
            let isDestory = true
            for(let i = 0; i < len; i++) {
                const atsselect = atsselects.item(i) as HTMLElement
                if(atsselect === that) {
                    isDestory = false
                    break
                } 
            }
            if(isDestory) 
                removeDom()
        })
        observe.observe(document, {
            childList: true,
            subtree: true,
        })
    }
    #showEvent() {
        const that = this
        return () => {
            that.#showSelect()
        }
    }
    #showSelect() {
        const ul = this.#ul
        if(!this.#isShow) {
            ul.style.height = `${this.#listHeight}px`
            ul.style.zIndex = '1'
            ul.style.border = `1px solid #cccccc`
            // ul.style.display = 'block'
        }
        else {
            ul.style.height = `0px`
            setTimeout(() => {
                ul.style.zIndex = '0'
                ul.style.border = 'none'
            }, 500)
            // ul.style.display = 'none'
        }
        this.#isShow = !this.#isShow
    }
    get value() {
        return this.#dom.getAttribute("ats-value")
    }
}