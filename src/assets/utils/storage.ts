type KEY = 
    "EZPSY_PRODUCTION" | 
    "EZPSY_TABLE" |
    "EZPSY_CODES" | 
    "EZPSY_DATA" |
    "EZPSY_IMAGE"

const setStorage = (key: KEY, value: string) => {
    localStorage.setItem(key, value)
}

const getStorage = (key: KEY) => {
    return localStorage.getItem(key)
}

export {
    setStorage,
    getStorage
}