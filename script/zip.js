import compressing from "compressing"
import chalk from "chalk"
import * as fs from "fs"

const BASE_DIRECTORY = "./dist"
const ZIP_PATH = "./zips"

const dirs = fs.readdirSync(ZIP_PATH)
const reg = /dist[0-9]+.zip/
const len = dirs.length
let max = -1
for(let i = 0; i < len; i++) {
    const dir = dirs[0]
    if(reg.test(dir)) {
        const index = parseInt(dirs[i].replace(".zip", "").replace("dist", ""))
        if(max < index)
            max = index
    }
}
let next_index = 0
if(max >= 0)
    next_index = max + 1

console.log(chalk.yellowBright("INDEX"), chalk.blueBright(next_index))

compressing.zip.compressDir(`${BASE_DIRECTORY}`, `${ZIP_PATH}/dist${next_index}.zip`, {
    ignoreBase: true,
}).then(async () => {
    console.log(chalk.greenBright(`打包完成`))
}).catch(() => {
    console.log(chalk.redBright(`打包失败`))
})