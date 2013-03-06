var x = 57;
var y = 24;
var frames = 15;

var a = [
	[ 186,  108, -  4,    4,  108,   21, -  2 ],
	[  33,   25,   28, - 28,   25,    3,   64 ],
	[  28,   31, - 35, - 32, - 20,   42,  111 ],
	[   9,    7, -  9, - 11,   13,   22,   88 ]
];

function select()
{
	var r = Math.random() * 256;
	for (var i in a) {
		var b = a[i];
		if (r < b[0])
			return b;
		r -= b[0];
	}
	return null;
}

function draw()
{
	for (var i in a) {
		for (var j in a[i]) {
			document.getElementById("a" + i + j).value = a[i][j];
		}
	}
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	context.clearRect(0, 0, 640, 384);
	for (var i = 0; i < 400 * frames; i++) {
		var b = select();
		if (b != null) {
			var ox = x;
			x = (b[1] * ox >> 7) + (b[2] * y >> 7) + b[5];
			y = (b[3] * ox >> 7) + (b[4] * y >> 7) + b[6];
			context.fillRect(x * 4, y * 4, 4, 4);
		}
	}
}

function range(i, j, min, max)
{
	return "<input type='number' id='a" + i + j +
		"' min='" + min + "' max='" + max +
		"' onchange='a[" + i + "][" + j + "] = parseInt(this.value); this.className = \"modified\"; draw()' />";
}

function onLoad()
{
	var html = "";
	for (var i in a) {
		html += "P=" + range(i, 0, 0, 255) +
			" x:=" + range(i, 1, -128, 127) + "x + " + range(i, 2, -128, 127) + "y + " + range(i, 5, -128, 127) +
			" y:=" + range(i, 3, -128, 127) + "x + " + range(i, 4, -128, 127) + "y + " + range(i, 6, -128, 127) +
			"<br />";
	}
	document.getElementById("div").innerHTML = html;
	draw();
}
