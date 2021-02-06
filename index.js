const electron = require('electron');
console.log("Electron Ready");
const url = require("url");
console.log("URL Ready");
const path = require("path");
console.log("Path Ready");
const packager = require('electron-packager')
console.log("Electron-Packager Ready");
const { exec } = require("child_process");
console.log("Exec Ready");
const {app, BrowserWindow, Menu, ipcMain, webContents} = electron;
console.log("All Modules Ready");

var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

let mainWindow;

let logWindow;

app.on('ready', function() {
	console.log("App Ready");
	mainWindow = new BrowserWindow({
		webPreferences: {
            nodeIntegration: true
        }
	});
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, "src/index.html"),
		protocol: "file:",
		slashes: true
	}));
	
	const mainMenu = Menu.buildFromTemplate(mainMenuTemp);
	Menu.setApplicationMenu(mainMenu);
});

const mainMenuTemp = [
	{
		label: "File",
		submenu: [
			{
				label: "Exit",
				click: function() {
					app.quit();
				}
			}
		]
	},
	{
      label: 'Edit',
      submenu: [
        {
          label: 'Undo',
          accelerator: 'CmdOrCtrl+Z',
          role: 'undo'
        },
        {
          label: 'Redo',
          accelerator: 'Shift+CmdOrCtrl+Z',
          role: 'redo'
        },
        {
          type: 'separator'
        },
        {
          label: 'Cut',
          accelerator: 'CmdOrCtrl+X',
          role: 'cut'
        },
        {
          label: 'Copy',
          accelerator: 'CmdOrCtrl+C',
          role: 'copy'
        },
        {
          label: 'Paste',
          accelerator: 'CmdOrCtrl+V',
          role: 'paste'
        },
        {
          label: 'Select All',
          accelerator: 'CmdOrCtrl+A',
          role: 'selectall'
        },
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Reload',
          accelerator: 'CmdOrCtrl+R',
          click: function(item, focusedWindow) {
            if (focusedWindow)
              focusedWindow.reload();
          }
        },
        {
          label: 'Toggle Full Screen',
          accelerator: (function() {
            if (process.platform === 'darwin')
              return 'Ctrl+Command+F';
            else
              return 'F11';
          })(),
          click: function(item, focusedWindow) {
            if (focusedWindow)
              focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
          }
        },
        {
          label: 'Toggle Developer Tools',
          accelerator: (function() {
            if (process.platform === 'darwin')
              return 'Alt+Command+I';
            else
              return 'Ctrl+Shift+I';
          })(),
          click: function(item, focusedWindow) {
            if (focusedWindow)
              focusedWindow.toggleDevTools();
          }
        },
      ]
    },
    {
      label: 'Window',
      role: 'window',
      submenu: [
        {
          label: 'Minimize',
          accelerator: 'CmdOrCtrl+M',
          role: 'minimize'
        },
        {
          label: 'Close',
          accelerator: 'CmdOrCtrl+W',
          role: 'close'
        },
      ]
    },
    {
      label: 'Help',
      role: 'help',
      submenu: [
        {
          label: 'About',
          click: function() {
			  	mainWindow.loadURL(url.format({
					pathname: path.join(__dirname, "src/about.html"),
					protocol: "file:",
					slashes: true
				}));
		  }
        },
      ]
    },
]

function openLogWindow() {
	logWindow = new BrowserWindow({
		webPreferences: {
            nodeIntegration: true
        },
		width: 800, 
		height: 300
	});
	logWindow.loadURL(url.format({
		pathname: path.join(__dirname, "src/console/index.html"),
		protocol: "file:",
		slashes: true
	}));
}

ipcMain.on('buildApp', (event, cmd) => {
	openLogWindow();
	logWindow.webContents.send('log', "Build Started: " + date + " " + time);
	logWindow.webContents.send('log', cmd);
    console.log(cmd);
	exec(cmd, (error, data, getter) => {
		if(error){
			logWindow.webContents.send('error', "Error: " + error.message);
			console.log("error",error.message);
			return;
		}
		if(getter){
			logWindow.webContents.send('log', "Complete. It is now safe to exit Electron Builder. " + data);
			console.log("Complete. It is now safe to exit Electron Builder. ",data);
			return;
		}
		});
});