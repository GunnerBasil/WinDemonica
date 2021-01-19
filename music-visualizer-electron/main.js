// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron');
const path = require('path');

function createWindow () {
  // Create the browser window.
  let {width, height} = require('electron').screen.getPrimaryDisplay().size;
  const mainWindow = new BrowserWindow({
    width: width,
    height: height,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    },
    frame: false,
    focusable: false,
    movable: false,
    resizable: false
  });

  mainWindow.maximize();

  mainWindow.loadFile('index.html');
}

app.whenReady().then(() => {
	app.allowRendererProcessReuse = false;
  createWindow()
  
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  });
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})