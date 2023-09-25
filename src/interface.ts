import { app, BrowserWindow } from 'electron';
import * as path from 'node:path';

export function startElectron() {
    let win;
    app.whenReady().then(() => {
        win = new BrowserWindow({
            width: 1280,
            height: 720,
        });
        win.loadURL('http://localhost:3000');
        win.webContents.openDevTools();
    });
    return win;
}
