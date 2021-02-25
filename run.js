const { intersection } = require('lodash');
const _ = require('lodash')
/** @todo
 *
 * @param inputData
 * @returns {*}
 */
module.exports = async (data) => {
  const {D, cars, intersections, streets} = data;
  
  // for(let i = 0; i < D; i++){
    const intersectionsLoad = {};
    for (car of cars){
      let firstStreet = Object.keys(car.streets).shift();
      // intersectionsLoad[streets[firstStreet]] && intersectionsLoad[streets[firstStreet].finishPiont].groupLoad 
      // ? intersectionsLoad[streets[firstStreet].finishPiont].groupLoad++ 
      // : (intersectionsLoad[streets[firstStreet].finishPiont].groupLoad = 1);

      _.result(intersectionsLoad, [streets[firstStreet].finishPiont, firstStreet ]) 
      ? intersectionsLoad[streets[firstStreet].finishPiont][firstStreet]++ 
      : _.set(intersectionsLoad, [streets[firstStreet].finishPiont, firstStreet], 1);

      car.streets.firstStreet = undefined;
    }
    console.log(`load ${JSON.stringify(intersectionsLoad)}`);
  // }
  const intersectionList = Object.keys(intersections);
  const operable = intersectionList.length;
const resultArray = [operable];
  intersectionList.forEach((intr, q) =>{
    resultArray.push(intr);
    resultArray.push(intersections[intr].length);


intersections[intr].forEach((intrItem, i)=>{
  if(q === 0){
    console.log(intr);
    _.result(intersectionsLoad, [intr, intrItem], 1)
    resultArray.push(intrItem + ' ' + _.result(intersectionsLoad, [intr, intrItem], 1));
    }
    else { 
      resultArray.push(intrItem + ' ' + (Math.floor(Math.random() *1.5)+1));
    }
  
})
  })
  return resultArray;

  // mp.forEach(param=>{
  //   console.log(param[1]);
  //   console.log(Object.keys(tree[param[1]]).sort((a,b)=> b-a).shift());
  // })



}
