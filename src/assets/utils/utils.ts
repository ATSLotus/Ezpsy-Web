export const formatNum = (num: number) => {
    return num >= 10 ? `${num}` : `0${num}`
}

export const formatDate = (timestamp: number | string | Date) => {
    const DATE = new Date(timestamp)
    const year = `${DATE.getFullYear()}`
    const mounth = formatNum(DATE.getMonth() + 1)
    const date =  formatNum(DATE.getDate())
    const hour = formatNum(DATE.getHours())
    const minute = formatNum(DATE.getMinutes())

    return `${year}/${mounth}/${date} ${hour}:${minute}`
}

export const deepClone = (obj: any, map = new Map()) => {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    
    let cloneObj = obj instanceof Array ? [] : {};

    if (map.get(obj)) {
        return map.get(obj);
    }
    map.set(obj, cloneObj);
    
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            cloneObj[key] = deepClone(obj[key]);
        }
    }
    
    return cloneObj;
}

export const getReg = (value: string) => {
    return new RegExp(`(.*)(${value.split('').join(')(.*)(')})(.*)`, 'i')
}