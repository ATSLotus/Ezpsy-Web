import log from "./log"
import beautify from 'js-beautify';

const formatJavaScriptCode = (jsCodeString: string) => {
    // return jsCodeString
    return beautify(jsCodeString.replace(/[\n\t\r]/g, ''), { indent_size: 4 })
}

export default formatJavaScriptCode