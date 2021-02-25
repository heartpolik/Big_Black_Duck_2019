const { intersection } = require('lodash');
const _ = require('lodash')
/** @todo
 *
 * @param inputData
 * @returns {*}
 */
module.exports = async (data) => {
  const {intersections} = data;
  const intersectionList = Object.keys(intersections);
  const operable = intersectionList.length;
const resultArray = [operable];
  intersectionList.forEach((intr) =>{
resultArray.push(intr);
resultArray.push(intersections[intr].length);
intersections[intr].forEach((intrItem)=>{
  resultArray.push(intrItem + ' ' + (Math.floor(Math.random() *1.8)+1));
})
  })
  return resultArray;

  // mp.forEach(param=>{
  //   console.log(param[1]);
  //   console.log(Object.keys(tree[param[1]]).sort((a,b)=> b-a).shift());
  // })



}
