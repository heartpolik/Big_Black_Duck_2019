/** @todo
 *
 * @param inputData
 * @returns {*}
 */
module.exports = async ({global, data}) => {
  let result = [];
  let min = global.tCount < global.mCount ? 'T' : 'M';

  for (let y in data) {
    let row = data[y];
    for (let x in row) {
      let v = row[x];
      if (v === min) {
        x = Number(x);
        y = Number(y);
        let slice = getSlice({x1: x, x2: x, y1: y, y2: y}, 'x')
        if (slice) {
          result.push(slice);
        }
      }
      // if (result.length){
				// console.log(result);
				// process.exit(0);
      // }

		}
  }

	// result.length

  return result;

  function getSlice({x1, x2, y1, y2}, step) {
		// 0 3 2 6
		// 11 33 14 37
		// 0 75 2 78
		// 0 85 2 88
		// 1 0 4 3

		if (valid({x1, y1, x2, y2})) {
			for (let _y = y1; _y <= y2; _y++) {
        for (let _x = x1; _x <= x2; _x++) {
          if (!(data[_y] && data[_y][_x])) continue;
          data[_y][_x] = undefined;
        }
      }

			return {x1, y1, x2, y2};
		}
    else {
      if (step === 'x') {
        x2++;
        if (x2 > 100) {
          return '';
        }
        step = 'y'
      } else {
        y2++;
				if (y2 > 100) {
					return '';
				}
        step = 'x'
      }
			return getSlice({x1, x2, y1, y2}, step)
    }
  }

  function valid({x1, y1, x2, y2}) {
    let res = {T: 0, M: 0};
    for (let _y = y1; _y <= y2; _y++) {
      for (let _x = x1; _x <= x2; _x++) {
        if (!(data[_y] && data[_y][_x])) continue;
        let v = data[_y][_x];
        res[v]++;
        if(!v) return false;
      }
    }
    let totalCount = res.T + res.M;

    if (totalCount > global.maxTotal) {
      return false;
    }
    else if (res.T < global.minEach || res.M < global.minEach) {
      return false;
    }
    return true
  }
};

