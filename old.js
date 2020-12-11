
const lodash = require('lodash');
const fs = require('fs');


const writableStream = fs.createWriteStream('./output2.sh')
// const teams = require('./big_team.json');
let teams = [];

const fileName = process.argv[2];
try{
teams = fs.readFileSync(fileName, 'utf8');
} catch (e) {
    console.log('Error:', e.stack);
}
const parsedTeams = JSON.parse(teams);

function printMemoryUsage(){
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
};

lodash.map(parsedTeams, (team, key) => {
    return writableStream.write(`curl https://www.balldontlie.io/api/v1/players/${key} && \n`);
});

    // return writableStream.write(`User id is ${team.user_id} \n`);
printMemoryUsage();
writableStream.end();
