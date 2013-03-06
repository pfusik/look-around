var x = 114;
var y = 47;
var frames = 60;

var a = [
	[ 186,  217, -  9,    9,  217,   40, -  5 ],
	[  33,   50,   57, - 57,   50,    6,  129 ],
	[  33,   63, - 70, - 64, - 40,   83,  215 ],
	[   4,   14, - 19, - 19,   26,   45,  170 ]
];

var crystal = [
	[ 181,   94,  164, -162,   94,   14,  156 ],
	[  25,   65,    0,    0,   65,  100,    3 ],
	[  25,   65,    0,    0,   65,   30,  125 ],
	[  25,   65,    0,    0,   65,  170,  125 ]
];

var pentagon = [
	[  51,   97,    0,    0,   97,   79,    3 ],
	[  51,   97,    0,    0,   97,  142,   48 ],
	[  51,   97,    0,    0,   97,   18,   48 ],
	[  51,   97,    0,    0,   97,   41,  119 ],
	[  51,   97,    0,    0,   97,  118,  119 ]
];

var fern = [
	[ 186,  217, -  9,    9,  217,   40, -  5 ],
	[  33,   50,   57, - 57,   50,    6,  129 ],
	[  33,   63, - 70, - 64, - 40,   83,  215 ],
	[   4,   14, - 19, - 19,   26,   45,  170 ]
];

var tree = [
	[  76,   49,  124, - 88,  110,   14,   61 ],
	[  76,  118, -100,   64,   92,  151, -  3 ],
	[  12, - 14,   17, -115, - 28,  140,  209 ],
	[  12, -  8, - 17,  120, -  5,  143,   83 ],
	[  80, -163,    0,    0,  128,  223,   44 ]
];

var levy = [
	[ 128,  128, -128,  128,  128,   65,    0 ],
	[ 128,  128,  128, -128,  128,   63,  128 ]
];

function morph(t)
{
	for (var i in a)
		for (var j in a[i])
			a[i][j] = a[i][j] * 3 + t[i][j] >> 2;
	draw();
}

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
	document.getElementById("overflow").className = "hidden";
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	context.clearRect(0, 0, 640, 384);
	for (var i = 0; i < 330 * frames; i++) {
		var b = select();
		if (b != null) {
			var ox = x;
			x = (b[1] * ox >> 8) + (b[2] * y >> 8) + b[5];
			y = (b[3] * ox >> 8) + (b[4] * y >> 8) + b[6];
			if (x < 0 || x >= 256 || y < 0 || y >= 192)
				document.getElementById("overflow").className = "overflow";
			else
				context.fillRect(x * 2, y * 2, 2, 2);
		}
	}
}

function range(i, j)
{
	return "<input type='number' id='a" + i + j +
		"' min='-255' max='255' onchange='a[" + i + "][" + j + "] = parseInt(this.value); this.className = \"modified\"; draw()' />";
}

function onLoad()
{
	var html = "";
	for (var i in a) {
		html += "P=" + range(i, 0) +
			" x:=" + range(i, 1) + "x + " + range(i, 2) + "y + " + range(i, 5) +
			" y:=" + range(i, 3) + "x + " + range(i, 4) + "y + " + range(i, 6) +
			"<br />";
	}
	document.getElementById("div").innerHTML = html;
	draw();
}
