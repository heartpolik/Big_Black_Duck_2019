const fs = require('fs');
const config = require('config');
const helper = require('./helper');
const run = require('./run');

let sets = helper.getSets();

(async () => {
  await helper.zipFiles();

  for (let set of sets) {
    console.time(`== ${set} finished by`);
    let inputData = helper.getParsedData(set);

    let result = await run(inputData);

    let outputData = helper.convertResult(result);

    helper.writeResult({set, outputData});
    console.timeEnd(`== ${set} finished by`);
  }
  console.log('===== All Work Done! =====');
  process.exit(0);

})();
