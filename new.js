'use strict'
const fs = require('fs');
const StreamArray = require( 'stream-json/streamers/StreamArray');

const fileName = process.argv[2]

async function getCurlCommands(query) {
    return new Promise( (resolve, reject) => {
        const readableStream = fs.createReadStream(query);
        const jsonStream = StreamArray.withParser();
        const writableStream = fs.createWriteStream('./output.sh');

        readableStream.pipe(jsonStream.input);

        jsonStream.on('data',({key, value}) => {
            const data = `curl -X GET 'https://www.balldontlie.io/api/v1/players/${key}' & \n`
            writableStream.write(data);
        })
        jsonStream.on('end', () => {
            console.log('All Done');
            printMemoryUsage();
        });
        writableStream.on("finish", resolve);
    })
}

function printMemoryUsage(){
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
};



(async () => {
    try {
        await getCurlCommands(fileName);
    } catch (err){
        console.error('caught error  : ', err);
    }
})();
