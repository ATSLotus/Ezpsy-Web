import agc from '@/assets/agc/agc'
import log from "@/assets/utils/log"
import { AnonymouslyAuth, PhoneAuth } from "ezpsy-server"

const auth = agc.getAuth("Ezpsy_Auth") as PhoneAuth
const anonymous_auth = agc.getAuth("Ezpsy_Anonymous") as AnonymouslyAuth

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type CURRENT_USER = UnwrapPromise<ReturnType<PhoneAuth["getUserInfo"]>> & {
    isAnonymous: boolean
}

const getCurrentUser = async () => {
    const user = await auth.getUserInfo()
    const resp: CURRENT_USER = {
        isSuccess: user.isSuccess,
        isAnonymous: user.data?.user.anonymous || false,
        data: user.data
    }
    return resp
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

const loginAnonymously = async () => {
    const res = await anonymous_auth.login(() => {
        log.info("匿名登录成功")
    })
    return res
}

type profileParameter = Parameters<typeof auth.updateProfile>

const updateProfile = async (user: profileParameter[0], obj: profileParameter[1]) => {
    const res = await auth.updateProfile(user, obj)
    return res
}

const resetPassword = async (opts: Parameters<typeof auth.resetPassword>[0]) => {
    const res = await auth.resetPassword(opts)
    return res
}

const logout = async () => {
    const res = await auth.logout()
    return res
}

export {
    getCurrentUser,
    getVerifyCode,
    registerAuth,
    loginByPsd,
    loginByCode,
    updateProfile,
    resetPassword,
    logout,
    loginAnonymously
}