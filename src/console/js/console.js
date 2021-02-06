const { ipcRenderer } = require('electron');

var consoleLog = document.getElementById("consoleLog");

//ipcRenderer.send('console-ready');

ipcRenderer.on('clearConsole', (event) => {
    consoleLog.innerHTML = "";
});

ipcRenderer.on('log', (event, msg) => {
    consoleLog.innerHTML += "<p>" + msg + "</p>";
});

ipcRenderer.on('error', (event, msg) => {
    consoleLog.innerHTML += "<p style='color:red'>" + msg + "</p>";
});
