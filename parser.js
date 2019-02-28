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
  let result = {photosCount: {}, v: [], h: []};
  let rows = inputData.split('\n');
  rows.pop();

  rows
      .forEach((row, i) => {
        if (!i) {
          result.photosCount = Number(row.trim());
        } else {
          let column = row.split(' '),
              obj = {
                tags: {}
              },
              orientation = column.shift().toLowerCase(),
              tagsCount = Number(column.shift()),
              tags = column.reduce((memo, tag) => {
                memo[tag] = true;
                return memo
              }, {});
          Object.assign(obj, {tagsCount, tags});
          result[orientation].push(tags);
        }
      });
  return result;
}

