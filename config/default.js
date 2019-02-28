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
      a: `${set}_example.txt`,
      b: `${set}_lovely_landscapes.txt`,
      c: `${set}_memorable_moments.txt`,
      d: `${set}_pet_pictures.txt`,
      e: `${set}_shiny_selfies.txt`,
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
