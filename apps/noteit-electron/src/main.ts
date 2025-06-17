import { app, BrowserWindow, session } from 'electron';
import { autoUpdater } from 'electron-updater';
import path from 'node:path';
import log from 'electron-log/main';

// Configure logging
log.initialize();
log.info('App starting...');

let mainWindow: BrowserWindow | null;

// --- Single Instance Lock ---
// This prevents multiple instances of the app from running.
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  log.warn('Another instance is already running. Quitting this instance.');
  app.quit();
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    log.info('Second instance detected. Focusing main window.');
    // Someone tried to run a second instance; we should focus our window.
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });

  const createWindow = () => {
    log.info('Creating main window...');
    // Create the browser window.
    mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      title: 'NoteIt',
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        contextIsolation: true,
      },
    });

    // Load the app content.
    if (app.isPackaged) {
      log.info('Loading production URL: https://noteit.expo.app');
      mainWindow.loadURL('https://noteit.expo.app');
    } else {
      log.info('Loading development URL: http://localhost:8081');
      mainWindow.loadURL('http://localhost:8081');
      mainWindow.webContents.openDevTools();
    }

    mainWindow.on('closed', () => {
      log.info('Main window closed event.');
      mainWindow = null;
    });
  };

  // --- App Lifecycle Events ---

  app.on('ready', () => {
    log.info('App is ready.');
    // In development, modify the CSP to allow loading from the Expo dev server.
    if (!app.isPackaged) {
      session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
        callback({
          responseHeaders: {
            ...details.responseHeaders,
            'Content-Security-Policy': [
              "default-src 'self' http://localhost:*; script-src 'self' http://localhost:* 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; connect-src 'self' http://localhost:* ws://localhost:*; img-src 'self' data:; font-src 'self' data:;"
            ],
          },
        });
      });
    }
    createWindow();

    // --- Auto-updater --- 
    log.info('Setting up auto-updater.');
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();

    autoUpdater.on('update-available', () => {
      log.info('Update available.');
    });

    autoUpdater.on('update-downloaded', () => {
      log.info('Update downloaded; will install now');
      autoUpdater.quitAndInstall();
    });

    autoUpdater.on('error', (err) => {
      log.error('Error in auto-updater. ' + err);
    });
  });

  app.on('window-all-closed', () => {
    log.info('Event: window-all-closed.');
    if (process.platform !== 'darwin') {
      log.info('Quitting app (not macOS).');
      app.quit();
    } else {
      log.info('Not quitting app (macOS).');
    }
  });

  app.on('activate', () => {
    log.info('Event: activate.');
    if (BrowserWindow.getAllWindows().length === 0) {
      log.info('No windows open, creating a new one.');
      createWindow();
    }
  });

    app.on('before-quit', () => {
    log.warn('Event: before-quit. App is preparing to quit.');
    // This is a good place to handle any cleanup before the app exits.
    // For example, you might want to save any unsaved data.
  });

  app.on('will-quit', (event) => {
    log.warn('Event: will-quit. App will quit now.');
  });
}
