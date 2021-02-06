const { ipcRenderer } = require('electron');

var pop = document.getElementById("pathOfProject");
var nop = document.getElementById("nameOfProject");
var ipop = document.getElementById("iconPathOfProject");
var nope = document.getElementById("nameOfProjectExecutable");

var plat = document.getElementById("platform");
var arch = document.getElementById("arch");

var adv = document.getElementById("advFlags");

var cmd = "electron-packager ";

function tADV() {
  var x = document.getElementById("advOpt");
  if (x.style.display === "none") {
    x.style.display = "block";
	document.getElementById("toADV").innerHTML = "Hide Advanced Options"
  } else {
    x.style.display = "none";
	document.getElementById("toADV").innerHTML = "Show Advanced Options"
  }
}

function defVar() {
	pop = document.getElementById("pathOfProject");
	nop = document.getElementById("nameOfProject");
	ipop = document.getElementById("iconPathOfProject");
	nope = document.getElementById("nameOfProjectExecutable");

	plat = document.getElementById("platform");
	arch = document.getElementById("arch");

	adv = document.getElementById("advFlags");
}

function genCMD() {
	if (pop.value == "") {
		console.error("Path of Project is undefined. Unable to generate command.");
	} else {
		
		cmd = cmd.concat(pop.value);
		
		if (adv.value == "") {
			console.log("Leaving optional flags unchanged. (No input)");
		} else {
			cmd = cmd.concat(" " + adv.value);
		}
		if (nop.value == "") {
			console.log("Leaving project name blank. (No input)");
		} else {
			cmd = cmd.concat(" --appname='" + nop.value + "'");
		}
		
		if (ipop.value == "") {
			console.log("Leaving project icon unchanged. (No input)");
		} else {
			cmd = cmd.concat(" --icon='" + ipop.value + "'");
		}
		
		if (nope.value == "") {
			console.log("Leaving project executable name unchanged. (No input)");
		} else {
			cmd = cmd.concat(" --executable-name='" + nope.value + "'");
		}
		
		cmd = cmd.concat(" --platform='" + plat.value + "'");
		cmd = cmd.concat(" --arch='" + arch.value + "'");
		
		cmd = pop.value + "\/node_modules\/.bin\/" + cmd
		console.log(cmd);
		ipcRenderer.send('buildApp', cmd);
	}
}
