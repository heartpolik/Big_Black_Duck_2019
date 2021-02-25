const _ = require('lodash')
/** @todo
 *
 * @param inputData
 * @returns {*}
 */
module.exports = async (params) => {

  let features = ['time_reg', 'productivity', 'power', 'n_books', 'weight'];

  let tree = {};
  params.libs.forEach((lib, i) => {
    features.forEach(ftr => {
      if (!tree.hasOwnProperty(ftr)) tree[ftr] = {} ;
      if (tree[ftr].hasOwnProperty(lib[ftr])) {
        tree[ftr][lib[ftr]].push(i)
      } else {
        tree[ftr][lib[ftr]] = [];
        tree[ftr][lib[ftr]].push(i)
      }
    })
  })
  // console.log(tree);
  let mp = [], mpl = 0;
  Object.keys(tree).forEach(trk=>{
    mp.push([Object.keys(tree[trk]).length, trk]);
  })
  mp.sort((a,b)=>{ return b[0]-a[0];})
  console.log(mp);

  let bestKey = Object.keys(tree[mp[0][1]]).sort((a,b)=>{return Number(b)-Number(a)}).shift();
  let bestLibs = tree[mp[0][1]][bestKey]
bestLibs = bestLibs.concat(tree[mp[1][1]][bestKey]);
 bestLibs = bestLibs.concat(tree[mp[2][1]][bestKey]);
 bestLibs = bestLibs.concat(tree[mp[3][1]][bestKey]);
  console.log(bestKey);
  console.log(bestLibs);
  console.log(params.libs[bestLibs[0]]);


  let timeLeft = params.deadline;
  let libProcesses = {
    libOnCheck : [],
    libChecked : []
  }
  let libsCount = 0;
  let libsResult = [];
  for (let d = 0; d <= timeLeft; d++){
    if (libProcesses.libOnCheck[0] && libProcesses.libOnCheck[0].time_reg === 0)
    {

      let libtotransfer = libProcesses.libOnCheck[0]

      libProcesses.libChecked.push(libtotransfer);
      libProcesses.libOnCheck.pop();
      let libData = {
        index: libtotransfer.libId,
        booksCount:0,
        books :[],
      }
      libsResult.push(libData);
    }

    if (libProcesses.libOnCheck.length === 0) {
      let libId = bestLibs.shift();
      if (libId) {
        libProcesses.libOnCheck.push(params.libs[libId]);
        libProcesses.libOnCheck[0].libId = libId;
        libProcesses.libOnCheck[0].time_reg--;
        libsCount++;
      }
      // libData.index = libProcesses.libOnCheck[0].id;
    } else {
      libProcesses.libOnCheck[0].time_reg--;
    }

    libProcesses.libChecked.forEach((lib, i)=>{
      let takenBooks = lib.books.splice(0, lib.productivity);
      // console.log(takenBooks);
      libsResult[i].books.push(...takenBooks);
      libsResult[i].booksCount = libsResult[i].books.length;
      // console.log(libsResult[i].booksCount);
    })
  }


  return {libsCount, libsResult};

  // mp.forEach(param=>{
  //   console.log(param[1]);
  //   console.log(Object.keys(tree[param[1]]).sort((a,b)=> b-a).shift());
  // })



}
