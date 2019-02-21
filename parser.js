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

  rows
      .forEach((row, i) => {
        let column = !Number(i) ? row.split(' ') : row.split('');
        if (i) {
          result.global = Number(column[0]);
        } else {
          result.data.push(column);
        }
      });
  return result;
}

