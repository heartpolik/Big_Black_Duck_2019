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

	getBounds(X,Y){
		let row = pizza[Y];
		let xi = X;
		let yi = Y;
		let i = "";
		while (xi >=0 && i!=="*") {
			i = row[xi];
			xi--;
		}
		while(yi >=0 && i!=="*"){
			i=pizza[yi][xi];
			yi--;
		}
		return {xi, yi}
	},
	getSlicePrices(slices, pick, pizza, good, bad) {
		let y = pick[0],
				x = pick[1];

		let bounds = getBounds(pick[0], pick[1]);
		slices.forEach(slice=>{


		})
	}
};
