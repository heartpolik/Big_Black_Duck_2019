const c = require('./calculations');

/** @todo
 *
 * @param inputData
 * @returns {*}
 */
module.exports = async ({global, data}) => {
	let result = [];
	let bad    = global.tCount < global.mCount ? 'T' : 'M';
	let good   = global.tCount >= global.mCount ? 'T' : 'M';
	let data2 = JSON.parse(JSON.stringify(data));

	let slices = c.getSliceSides(global.maxTotal, global.minEach);
	console.log(data);
	console.log("goo->", good, "baa->", bad);
	console.log("slices",slices);
	console.log(global);
	let gcount = 0;
	for (let x = 0; x < global.columns; x++) {
		for (let y = 0; y < global.rows; y++) {
			// console.log("coo->",data[y][x]);
			if (data[y][x] === bad) {
				let prices     = c.getSlicePrices(slices, {y,x}, data, good, bad, global.minEach);
				// console.log("price",prices);
				let maxPricePc = {};
				let price      = 0;
				let bc      = 100;
				prices.forEach(pc => {
					if (pc.price > price) {
						if(bc > pc.bc){
						price      = pc.price;
						bc      = pc.bc;
						maxPricePc = pc;
					}
					}
				});
				// console.log("max", maxPricePc);
				c.setArea(maxPricePc.x1, maxPricePc.y1, maxPricePc.x2, maxPricePc.y2, data);
				c.setArea(maxPricePc.x1, maxPricePc.y1, maxPricePc.x2, maxPricePc.y2, data2, String(gcount));
				console.log(data);
				console.log(data2);
				result.push({
					x1:maxPricePc.x1,
					y1:maxPricePc.y1,
					x2:maxPricePc.x2,
					y2:maxPricePc.y2,
					price:maxPricePc.price,
					sm:gcount
				})
			}
			gcount++;
		}
	}


	console.log(data);
	console.log(data2);
	console.log("RESULT", result);
	return result;
};

