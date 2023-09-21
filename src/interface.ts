import { app, BrowserWindow, contextBridge } from 'electron'
import * as path from 'node:path'

app.whenReady().then(() => {
    const win = new BrowserWindow({
        width: 1280,
        height: 720,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        },
    });
    win.loadFile('../public/index.html');
    win.webContents.openDevTools();
});