const jsonfile = require('jsonfile')
const moment = require('moment'); 
const simpleGit = require('simple-git');
const rn = require('random-number');
const FILE_PATH = './data.json';

const makeCommit = n => {
    if(n===0) return simpleGit().push();

    const x = {min: 0, max: 54, integer: true};
    const y = {min: 0, max: 6, integer: true};
    rn(x,y);
    const z = {min: 20, max: 100, integer: true };
    
    const DATE = moment().subtract(rn(z), 'd').add(1, 'd').add(x, 'w').add(y, 'd').format();
    const data = {
        date: DATE
    }
    console.log(DATE);
    jsonfile.writeFile(FILE_PATH, data, ()=>{
        simpleGit().add([FILE_PATH]).commit(DATE, {'--date': DATE },
        makeCommit.bind(this, --n));
    });
}
makeCommit(20);