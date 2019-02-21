module.exports = {
	getSliceSides(maxArea, minCount) {
		let ceil   = Math.floor(Math.sqrt(maxArea));
		let floor  = Math.floor(Math.sqrt(minCount ^ 2));
		let result = [];
		for (let i = 1; i <= maxArea; i++) {
			let j = maxArea / i;
			if (j % 1 === 0 && i * j >= minCount ^ 2) {
				result.push({x: i, y: j});
			}
		}
	},

	wayToPick(bound, pick) {
		let result = [];
		for (let xb = bound.x; xb <= pick.x; xb++) {
			for (let yb = bound.y; yb >= pick.y; yb++) {
				result.push({x: xb, y: yb})
			}
		}
		return result;
	},
	getBounds(X, Y) {
		let row = pizza[Y];
		let xi  = X;
		let yi  = Y;
		let i   = "";
		while (xi >= 0 && i !== "*") {
			i = row[xi];
			xi--;
		}
		while (yi >= 0 && i !== "*") {
			i = pizza[yi][xi];
			yi--;
		}
		return {x: xi, y: yi}
	},
	checkArea(x1, y1, x2, y2, good, bad, pizza) {
		let sum = 0;
		for (let x = x1; x <= x2; x++) {
			for (let y = y1; y <= y2; y++) {
				switch (pizza[x][y]) {
					case good:
						sum++;
						break;
					case bad:
						sum--;
				}
			}
		}
		return sum;
	},
	getSlicePrices(slices, pick, pizza, good, bad) {
		let y      = pick[0],
				x      = pick[1];
		let result = [];

		let bounds = getBounds(x, y);
		let wtp    = wayToPick(bounds, pick);
		wtp.forEach(point => {
			slices.forEach(slice => {
				let x1 = point.x;
				let x2 = slice.x + point.x;
				let y1 = point.y;
				let y2 = slice.y + point.y;
				if (pizza[x2][y2]) {
					result.push({x1, y1, x2, y2, price: checkArea(x1, y1, x2, y2, good, bad, pizza)})
				}
			})
		});
		return result;
	}
};
