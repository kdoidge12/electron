const electron = require('electron')
const countdown = require('./countdown.js')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const ipc = electron.ipcMain

const windows = []

app.on('ready',__ =>{
    [1,2,3].forEach(_ =>{let win = new BrowserWindow({
        height: 400,
        width: 400
    })

    win.loadURL('file://'+ __dirname + '/countdown.html')
    
    
    win.on('closed',__=>{
        win = null
    })
    windows.push(win)
    })
})

ipc.on('countdown-start',__=>{
    countdown(count =>{
        windows.forEach(win=>{
            win.webContents.send('countdown',count)            
        })
    })
})