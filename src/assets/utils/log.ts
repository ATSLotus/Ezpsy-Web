import log from "loglevel"

// @ts-ignore
if(env.state) {
    log.setDefaultLevel('WARN')
} else {
    log.setDefaultLevel("INFO")
}

export default log