import { app, BrowserWindow, session } from 'electron'; // Added session
import path from 'node:path';
import started from 'electron-squirrel-startup';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'NoteIt', // Set the window title
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true, // Enable contextIsolation
      // sandbox: true, // Consider for even tighter security, but might require more preload setup
    },
  });

  // In development, load the Expo dev server. In production, load the deployed web app.
  if (app.isPackaged) {
    // Production: load the live web app URL
    mainWindow.loadURL('https://noteit.expo.app');
  } else {
    // Development: load the local Expo dev server
    mainWindow.loadURL('http://localhost:8081');
    // Open the DevTools automatically in development
    mainWindow.webContents.openDevTools();
  }
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  // In development, modify the CSP to allow loading from the Expo dev server.
  // This must be done before the window is created.
  if (!app.isPackaged) {
    session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
      callback({
        responseHeaders: {
          ...details.responseHeaders,
          // This is a permissive CSP for development to allow HMR and other features from Expo.
          // For a production build loading local files, this should be much stricter.
          'Content-Security-Policy': [
            "default-src 'self' http://localhost:*; script-src 'self' http://localhost:* 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; connect-src 'self' http://localhost:* ws://localhost:*; img-src 'self' data:; font-src 'self' data:;"
          ],
        },
      });
    });
  }

  createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
