// const express = require('express')
// const http = require('http')
// const path = require('path')
// const chalk = require('chalk')
import express from "express"
import http from "http"
import path from "path"
import chalk from "chalk"

const app = express()
const server = http.createServer(app)

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials","true");
    next()
});
app.use(express.static("./dist"))

const port = 8888

server.listen(port, function () {
    console.log(chalk.greenBright(`The server is running now !`));
    console.log(chalk.yellowBright(`Open the next URL with your browser:`));
    console.log(chalk.blue(`\thttp://localhost:${port}`));
    console.log(chalk.blue(`\thttp://127.0.0.1:${port}`));
})