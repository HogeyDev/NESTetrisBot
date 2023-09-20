import { app, BrowserWindow } from 'electron'

app.whenReady().then(() => {
    const win = new BrowserWindow({
        width: 1280,
        height: 720
    });
    win.loadFile('../public/index.html');
    win.webContents.openDevTools();
});