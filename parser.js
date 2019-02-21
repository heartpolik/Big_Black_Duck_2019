const _ = require('lodash');
const fs = require('fs');
const config = require('config');
const helper = require('./helper');

let sets = helper.getSets();

for (let set of sets) {
  console.time(`== ${set} finished by`);
  let pathToFile = `${config.root}/source/${config.getSourceFileName(set)}`,
      inputData = fs.readFileSync(pathToFile, 'utf-8'),
      parsedData = parse(inputData);
  helper.writeParsedData({set, parsedData});
  console.timeEnd(`== ${set} finished by`);
}
console.log('===== All Work Done! =====');
process.exit(0);


/** @todo
 *
 * @param inputData
 * @returns {*}
 */
function parse(inputData) {
  let result = {global: {}, data: []};
  let rows = inputData.split('\n');
  rows.pop();

  for (let i  in rows) {
    let row = rows[i],
        column = !Number(i) ? row.split(' ') : row.split('');
    if (!Number(i)) {
      result.global['rows'] = Number(column[0]);
      result.global['columns'] = Number(column[1]);
      result.global['minEach'] = Number(column[2]);
      result.global['maxTotal'] = Number(column[3]);
      result.global.tCount = 0;
      result.global.mCount = 0;
    } else {
      result.data.push(column);
      result.global.tCount += _.filter(column, (data) => data === 'T').length;
      result.global.mCount += _.filter(column, (data) => data === 'M').length;
    }

  }
  return result;
}