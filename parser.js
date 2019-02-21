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
  let rows = inputData.split('\n');
  rows.pop();
  console.log(rows);
  for (let row of rows) {
    let columns = row
        .split(' ')
        .map(Number);
    //getColumnObject(columns);
  }
  return {};
};

// function getColumnObject(columns) {
//   return {
//     valera: columns[0]
//   };
// }