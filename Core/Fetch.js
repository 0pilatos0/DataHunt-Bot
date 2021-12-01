const https = require('https');
require('dotenv').config()

module.exports = async function Fetch(url){
    return new Promise((resolve, reject) => {
        https.get(url, {
            headers: {
                cookie: process.env.ADVENTOFCODECOOKIE
            }
        }, (response) => {
            let data = ''

            response.on('data', (chunk) => {
                data += chunk
            })

            response.on('end', () => {
                return resolve(JSON.parse(data))
            })
        })
    })
}