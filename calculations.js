module.exports = {
	getSliceSides(maxArea, minCount) {
		let ceil   = Math.floor(Math.sqrt(maxArea));
		let floor  = Math.floor(Math.sqrt(minCount ^ 2));
		let result = [];
		for (let i = 1; i <= maxArea; i++) {
			let j = maxArea / i;
			if (j % 1 === 0 && i * j >= minCount ^ 2) {
				result.push([i, j]);
			}
		}
	},
	getSlicePrices(slices, pick, pizza) {
		let y = pick[0],
				x = pick[1];

		slices.forEach(slice=>{

		})
	}
};
