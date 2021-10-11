const fs = require('fs');
const util = require('util');
const path = require('path');
const db = require('../db/db.json')
const filePath = path.join(__dirname, "../db/db.json")
// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);

const writeToFile = (destination, content) => {
    fs.writeFile(destination, JSON.stringify(content), (err) => {
        err ? console.error(err) : console.info(`\nData written to ${destination}`)
    })
}


const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            console.log("Data=", data);
            const parsedData = JSON.parse(data);
            console.log("parsedData:", parsedData)
            parsedData.push(content);
            console.log("pushedContent=", parsedData)
            writeToFile(file, parsedData);
        }
    });
};



module.exports = { readFromFile, readAndAppend, writeToFile };