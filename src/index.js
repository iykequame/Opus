const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
const settings = require('electron-settings');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 960,
    height: 544,
    transparent: true,
    titleBarStyle: 'hidden',
    show: false,
    webPreferences: {
      experimentalFeatures: true,
    },
  });

  const { webContents } = win;
  webContents.on('did-finish-load', () => {
    webContents.setZoomFactor(1);
    webContents.setVisualZoomLevelLimits(1, 1);
    webContents.setLayoutZoomLevelLimits(0, 0);
  });

  webContents.on('new-window', (event) => {
    event.preventDefault();
  });

  // TODO directory preferences
  settings.set('active', {
    project: '/Users/paco/Dropbox/school/opus/',
    directory: '',
    file: '',
  });

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true,
  }));

  win.once('ready-to-show', () => {
    win.show();
  });

  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});


app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});