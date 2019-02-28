module.exports = {
	getSliceSides(maxArea, minCount) {
		let ceil = Math.floor(Math.sqrt(maxArea));
		let minArea = minCount * 2;
		// let floor  = Math.floor(Math.sqrt(minCount ^ 2));
		let result = [];
		for (let q = maxArea; q >= minArea; q--) {
			for (let i = 1; i <= q; i++) {
				let j = q / i;
				if (j % 1 === 0 && i * j == q) {
					result.push({ x: i, y: j });
				}
			}
		}
		return result;
	},
	wayToPick(bound, pick) {
		// console.log("pick",pick);
		// console.log("bound",bound);
		let result = [];
		for (let xb = bound.x; xb <= pick.x; xb++) {
			for (let yb = bound.y; yb <= pick.y; yb++) {
				result.push({ x: xb, y: yb });
			}
		}
		// console.log("result", result);
		return result;
	},

	getBounds(X, Y, pizza) {
		let xi = X;
		let yi = Y;
		let i;
		// for(let i = xi; i>=0; i--){
		// 	if(pizza[yi][i] === "*"){
		// 		xi = --i;
		// 		break;
		// 	}		
		// }
		// for(let j = yi; j>=0; j--){
		// 	if(pizza[j][xi] === "*"){
		// 		yi = --j;
		// 		break;
		// 	}
		// }
		do {
			i = pizza[yi][xi];
			xi--;
		}
		while (xi >= 0 && i !== "*") 
		xi++;
		// {
		// 	i = pizza[yi][xi];
		// 	xi--;
		// }
		do
		{
			i = pizza[yi][xi];
			yi--;
		}
		while (yi >= 0 && i !== "*") 
		yi++;
		// {
		// 	i = pizza[yi][xi];
		// 	yi--;
		// }
		
		// xi++;
		
		// yi++;
		console.log("xyrow", xi,yi);
		return { x: xi, y: yi }
	},
	checkArea(x1, y1, x2, y2, good, bad, pizza) {
		let sum = 0;
		let sumG = 0;
		let sumB = 0;
		for (let x = x1; x <= x2; x++) {
			for (let y = y1; y <= y2; y++) {
				switch (pizza[y][x]) {
					case good:
						sum++;
						sumG++;
						break;
					case bad:
						sum--;
						sumB++;
						break;
				}
			}
		}
		return {sum, sumG, sumB};
	},

	getSlicePrices(slices, pick, pizza, good, bad, min) {
		let y = pick.y,
			x = pick.x;
		let result = [];

		let bounds = this.getBounds(x, y, pizza);
		let wtp = this.wayToPick(bounds, pick);
		console.log("p",pizza);
		console.log("pick",pick);
		console.log("bounds",bounds);
		// console.log("wtp",wtp);
		// console.log("slices",slices);
		wtp.forEach(point => {
			slices.forEach(slice => {
				let x1 = point.x;
				let x2 = slice.x + point.x - 1;
				let y1 = point.y;
				let y2 = slice.y + point.y - 1;
				// console.log(pizza[y2][x2]);
				if (pizza[y2] && pizza[y2][x2]) {
					let price = this.checkArea(x1, y1, x2, y2, good, bad, pizza);
					if(price.sumB >= min && price.sumG >= min)
					result.push({ x1, y1, x2, y2, price:  price.sum, bc:price.sumB, gc:price.sumG})
				}
			})
		});
		// console.log("prices_rez", result);
		return result;
	},

	setArea(x1, y1, x2, y2, pizza, symbol="*") {
		for (let y = y1; y <= y2; y++) {
			for (let x = x1; x <= x2; x++) {
				pizza[y][x] = symbol;
			}
		}
		return pizza;
	}
};
