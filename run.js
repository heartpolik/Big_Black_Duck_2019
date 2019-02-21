const _ = require('lodash')
/** @todo
 *
 * @param inputData
 * @returns {*}
 */
module.exports = async ({global, data}) => {
  let result = [];
  let x = Math.floor(global.rows / 5), y = Math.floor(global.columns / 5);

  let x1 = x, x2 = x, y1 = y, y2 = y;

  let iter = 0;
  while (data[y2] && data[y2][x2]) {
    iter++;
    let {success, slice} = getSlices({x1, x2, y1, y2});
    console.log({x1, x2, y1, y2});
    console.log({success, slice});
    if (success) {
      result.push(slice);
      clear({x1, x2, y1, y2});
      x1 = slice.x2 + 1;
      x2 = slice.x2 + 1;
      y1 = slice.y2 + 1;
      y2 = slice.y2 + 1;
    } else {
      x1++;
      x2++;
      y1++;
      y2++;
    }
  }
  console.log("========>>>>>>>>>>>>>" + result.length);
  return result;

  function dec(value) {
    return value - 1;
  }

  function inc(value) {
    return value + 1;
  }


  function getSlices({x1, x2, y1, y2}, step, strategy) {
    strategy = strategy || inc;
    step = step || 'y';
    if (!(data[y2] && data[y2][x2])) {
      return {success: false};
    }
    let {repeat, valid} = validate({x1, y1, x2, y2});

    if (valid) {
      return {success: true, slice: {x1, y1, x2, y2}};
    }
    else if (repeat) {
      console.log(x2);
      if (step === 'x') {
        x2 = inc(x2);
        step = ['x','y'][_.random(0,1)]
      } else {
        y2 = inc(y2);
        step = ['x','y'][_.random(0,1)]
      }
      //[][_.random(0,1)]
      return getSlices({x1, x2, y1, y2}, step, strategy.name === 'inc' ? dec : inc)
    }
    return {success: false};
  }


  function clear({x1, y1, x2, y2}) {
    for (let _y = y1; _y <= y2; _y++) {
      for (let _x = x1; _x <= x2; _x++) {
        data[_y][_x] = undefined;
      }
    }
  }

  function validate({x1, y1, x2, y2}) {
    let res = {T: 0, M: 0};
    for (let _y = y1; _y <= y2; _y++) {
      for (let _x = x1; _x <= x2; _x++) {
        if (!(data[_y] && data[_y][_x])) continue;
        let v = data[_y][_x];
        res[v]++;
        if (!v) return {repeat: false, valid: false};
      }
    }
    let totalCount = res.T + res.M;

    if (totalCount > global.maxTotal) {
      return {repeat: false, valid: false};
    }
    else if (res.T < global.minEach || res.M < global.minEach) {
      return {repeat: true, valid: false};
    }
    return {repeat: false, valid: true}
  }
};

