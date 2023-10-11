// const express = require('express');
// const http = require('http');
// const app = require('./server/server')
// const server = http.createServer(app);

module.exports = () => {
    // global.testServer = require('./server/server.js')
    // global.testServer = server;
    // console.log("global: ", global)
    global.testServer = require('./server/server')
    console.log('global test server: ', global.testServer.__proto__)

}