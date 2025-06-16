import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  isElectron: true,
});

// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
