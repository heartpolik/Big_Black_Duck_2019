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
      a: `${set}_example.txt`,
      b: `${set}_read_on.txt`,
      c: `${set}_incunabula.txt`,
      d: `${set}_tough_choices.txt`,
      e: `${set}_so_many_books.txt`,
      f: `${set}_libraries_of_the_world.txt`,
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
