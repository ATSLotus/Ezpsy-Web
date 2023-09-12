import agc from '@/assets/agc/agc'
import { PhoneAuth } from "ezpsy-server"

const auth = agc.getAuth("Ezpsy_Auth") as PhoneAuth

const getCurrentUser = async () => {
    const user = await auth.getUserInfo()
    return user
}

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

type profileParameter = Parameters<typeof auth.updateProfile>

const updateProfile = async (user: profileParameter[0], obj: profileParameter[1]) => {
    const res = await auth.updateProfile(user, obj)
    return res
}

export {
    getCurrentUser,
    getVerifyCode,
    registerAuth,
    loginByPsd,
    loginByCode
}