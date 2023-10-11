module.exports = async (globalConfig) => {
    
    testServer.close(() => {
        console.log('closing test server')
    });
}
