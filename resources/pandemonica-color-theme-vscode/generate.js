const fs = require('fs');

const colors = [
	["background", "#05031B"],
	["foreground", "#e3dfe1"],
	["cursor", "#e3dfe1"],
	["color0", "#05031B"],
	["color1", "#595766"],
	["color2", "#ba3d4a"],
	["color3", "#797885"],
	["color4", "#A87D84"],
	["color5", "#A19DA6"],
	["color6", "#C2BBC2"],
	["color7", "#e3dfe1"],
	["color8", "#9e9c9d"],
	["color9", "#595766"],
	["color10", "#ba3d4a"],
	["color11", "#797885"],
	["color12", "#A87D84"],
	["color13", "#A19DA6"],
	["color14", "#C2BBC2"],
	["color15", "#e3dfe1"]
];

fs.readFile("./template.json", 'utf8', function (err,data) {
	if (err) {
	  return console.log(err);
	}

	var result = data;
	for (var i = 0; i < colors.length; i++) {
		var replace = "{" + colors[i][0] + "}";
		var re = new RegExp(replace,"g");
		result = result.replace(re, colors[i][1]);
	}
  
	fs.writeFile("themes/Pandemonica-color-theme.json", result, 'utf8', function (err) {
	   if (err) return console.log(err);
	});
  });