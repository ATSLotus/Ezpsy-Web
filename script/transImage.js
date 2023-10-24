import fs from 'fs'
import chalk from "chalk"

try {
    fs.cpSync("./src/assets/image", "./public/src/assets/image",  { recursive: true })
    console.log(chalk.greenBright("copy image success"))
} catch (error) {
    console.log(chalk.redBright("copy image error"))
}