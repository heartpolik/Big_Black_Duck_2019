module.exports = {
  root: `${__dirname}/..`,
  sets: ['a', 'b', 'c', 'd', 'e', 'f'],
  /** @todo
   *
   * @param set
   * @returns {*}
   */
  getSourceFileName(set) {
    return {
      a: `${set}.txt`,
      b: `${set}.txt`,
      c: `${set}.txt`,
      d: `${set}.txt`,
      e: `${set}.txt`,
      f: `${set}.txt`,
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
