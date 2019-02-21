module.exports = {
  root: `${__dirname}/..`,
  sets: ['a', 'b', 'c', 'd', 'e'],
  /** @todo
   *
   * @param set
   * @returns {*}
   */
  getSourceFileName(set) {
    return {
      a: `${set}_example.in`,
      b: `${set}_.in`,
      c: `${set}_.in`,
      d: `${set}_.in`,
      e: `${set}_.in`,
    }[set]
  },
  filesToZip: [
    'run.js',
    'index.js',
    'parser.js',
    'helper.js',
    'package.json',
    'config/default.js',
  ]
};