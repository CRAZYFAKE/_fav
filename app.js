let mainWindow,
    windowList = [];
const electron = require('electron')
const {
    app, // 控制应用生命周期的模块。
    BrowserWindow, // 创建原生浏览器窗口的模块。
    dialog //创建原生dialog
} = electron;
const ipcMain = electron.ipcMain; //主进程


ipcMain.on('asynchronous-message', function(event, arg) {
    switch (arg) {
        case 'login_success':
            //关闭上一个窗口
            windowList.pop();
            //创建窗口
            let favWindow = new BrowserWindow({
                width: 1500,
                height: 1000,
                center: true,
                autoHideMenuBar: true,
                show: true,
                maximizable: true
            });
            favWindow.webContents.openDevTools();
            favWindow.loadURL(`file://${__dirname}/app/html/fav.html`);
            windowList.push(favWindow);
            favWindow.show();
            event.sender.send('asynchronous-reply', arg + '-reply');
            favWindow.on('closed', () => {
                favWindow = null;
                app.quit();
            })
            break;
        default:
            break;
    }
});

// 保持一个对于 window 对象的全局引用，如果你不这样做，
// 当 JavaScript 对象被垃圾回收， window 会被自动地关闭
class nrj_app {
    constructor() {
        var shouldQuit = app.makeSingleInstance(function(commandLine, workingDirectory) {
            // 当另一个实例运行的时候，这里将会被调用，我们需要激活应用的窗口
            if (mainWindow) {
                if (mainWindow.isMinimized()) mainWindow.restore();
                mainWindow.focus();
            }
            return true;
        });

        // 这个实例是多余的实例，需要退出
        if (shouldQuit) {
            app.quit();
            return;
        } else {
            //无其他实例时初始化
            this.init();
        }
    }

    init() {
        let _self = this;
        app.on('ready', function() {
            mainWindow = new BrowserWindow({
                center: true,
                frame: false,
                transparent: true,
                autoHideMenuBar: true,
                skipTaskbar: true,
                show: false,
                resizable: false
            })
            mainWindow.loadURL(`file://${__dirname}/app/html/loading.html`);
            mainWindow.show();
            windowList.push(mainWindow);
            _self.openLogin();
            mainWindow.hide();
            mainWindow.on('closed', () => {
                mainWindow = null;
            })
        });
    }
    openLogin() {
        // width: 390,
        //     height: 520,
        let loginWindow = new BrowserWindow({
            width: 600,
            height: 800,
            center: true,
            frame: false,
            transparent: true,
            autoHideMenuBar: true,
            show: false,
            resizable: false,

        });
        loginWindow.webContents.openDevTools();
        loginWindow.loadURL(`file://${__dirname}/app/html/login.html`);
        loginWindow.show();
        windowList.push(loginWindow);
        loginWindow.on('closed', () => {
            loginWindow = null;
        })
    }

}

new nrj_app();