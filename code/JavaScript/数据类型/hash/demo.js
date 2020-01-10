//
function hash(str) {
	str += "";
	var arr = new Array, len = str.length;
	var arg = Math.SQRT2.toFixed(9) - 0;
	forEach(function (x) { arr[x] = 0; });
	for (var i = 0; i < str.length; i++) calc(str.charCodeAt(i));
	forEach(function (x) {
		arr[x] = arr[x].toString(16);
		if (arr[x].length < 2) arr[x] = "0" + arr[x];
	});
	arr.reverse();
	return arr.join("");
	function calc(nmb) {
		var c = nmb & 255, next = nmb >> 8;
		forEach(function (x) {
			var h = (x ? arr[x - 1] : 0) + arr[x] + x + len + c;
			h += (h / arg).toFixed(9).slice(-3) - 0;
			arr[x] = h & 255;
		});
		if (next > 0) calc(next);
	}
	function forEach(func) { for (var i = 0; i < 16; i++) func(i); }
}
console.log(hash('zhaixiang'))