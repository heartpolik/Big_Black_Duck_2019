const fs = require('fs');
const config = require('config');
const {execFileSync} = require('child_process');

module.exports = {

  getSets() {
    let args = process.argv;
    args.splice(0, 2);
    let [set] = args;
    let sets = set && config.sets.includes(set) ? [set] : config.sets;
    console.log("Sets : " + sets);
    return sets;
  },

  writeParsedData({set, parsedData}) {
    fs.writeFileSync(`${config.root}/parsed/${set}.json`, JSON.stringify(parsedData));
  },

  getParsedData(set) {
    try {
      return require(`${config.root}/parsed/${set}.json`);
    } catch (e) {
      console.error('getParsedData::No file found! ==> ' + `${config.root}/parsed/${set}.json`);
      process.exit(0);
    }
  },

  writeResult({set, outputData}) {
    fs.writeFileSync(`${config.root}/results/${set}.out`, outputData);
  },

  zipFiles() {
    const command = `zip`;
    execFileSync(command, [
      `${config.root}/results/sourceFiles`,
      ...config.filesToZip
          .map((fileName) => {
            return `${config.root}/${fileName}`
          })]
    );
  },

  /**
   * @todo
   * @param data - json
   * @returns {string}
   */
  convertResult(data=[]) {
    let str = '',
        result = [];
    str += data.length;
    // for (let {x1, y1, x2, y2} of data) {
    //   str += '\n' + [y1, x1, y2, x2].join(' ');
    // }
    return str;
  }

};