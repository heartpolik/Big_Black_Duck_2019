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
  let cnt = 0;
  let result = {
    n_books:0,
    n_libs:0,
    deadline:0,
    books_prices:[],
    libs:[]
  };
  let rows = inputData.split('\n');
  let o1st_str = rows.shift().split(' ');
  result.n_books = Number(o1st_str[0]);
  result.n_libs = Number(o1st_str[1]);
  result.deadline = Number(o1st_str[2]);
  result.books_prices = rows.shift().split(' ');
  while (rows.length) {
    let library = {
      n_books:0,
      time_reg:0,
      productivity:0,
      books:[],
      total_price:0,
      weight:0,
      power:0
    };
    let libData1 = rows.shift().split(' ');
    let libData2 = rows.shift();
    library.n_books = Number(libData1[0]);
    library.time_reg = Number(libData1[1]);
    library.productivity = Number(libData1[2]);
    if (library.time_reg < result.deadline){
      library.books = libData2.split(' ').sort();
      library.total_price = library.books.reduce(function(acc, val) { return Number(acc) + Number(result.books_prices[val]); }, 0);
      library.power = library.total_price/library.books.length;
      library.weight = library.power - library.time_reg + library.productivity;
      result.libs.push(library);
      console.log('result' + cnt++);
    }
  }
  return result;
}

