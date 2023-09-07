import agc from '@/assets/agc/agc'
import { PhoneAuth } from "ezpsy-server"

const auth = agc.getAuth("Ezpsy_Auth") as PhoneAuth

const getVerifyCode = async (opts: Parameters<typeof auth.getVerifyCode>[0]) => {
    const res = await auth.getVerifyCode(opts)
    return res
}

const registerAuth = async (opts: Parameters<typeof auth.register>[0]) => {
    const res = await auth.register(opts)
    return res
}

const loginByPsd = async (opts: Parameters<typeof auth.loginByPassword>[0]) => {
    const res = await auth.loginByPassword(opts)
    return res
}

const loginByCode = async (opts: Parameters<typeof auth.loginByVerifyCode>[0]) => {
    const res = await auth.loginByVerifyCode(opts)
    return res
}

export {
    getVerifyCode,
    registerAuth,
    loginByPsd,
    loginByCode
}