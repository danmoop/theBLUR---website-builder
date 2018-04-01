const electron = require('electron')
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipc = require('electron').ipcMain;

const log = console.log;

let mainWindow;
let editorWindow;

app.on('ready', function createWindow () {

	mainWindow = new BrowserWindow({width: 1280, height: 768, frame: false, resizable: false});

	mainWindow.loadURL('file://' + __dirname + '/index.html');

	mainWindow.setIcon(__dirname + "/img/cf_logo.png");

	//mainWindow.toggleDevTools();

});

ipc.on('openEditor', function(event, directory){
	
	editorWindow = new BrowserWindow({width: 1600, height: 900, minWidth: 1000});
	
	//editorWindow.setMenu(null);

	editorWindow.loadURL('file://' + __dirname + '/pages/editor.html');

	//editorWindow.toggleDevTools();
	
	editorWindow._projectDirectory = directory;

	mainWindow.close();

});

ipc.on('openHome', function(event){
	mainWindow = new BrowserWindow({width: 1280, height: 768, frame: false, resizable: false});

	mainWindow.loadURL('file://' + __dirname + '/index.html');

	editorWindow.close();
});

ipc.on('exitApp', function(event){
	app.exit();
});

ipc.on('changeDocTitle', function(event){
	changeDocTitleWin = new BrowserWindow({width: 900, height: 600});
	changeDocTitleWin.loadURL('file://' + __dirname + '/pages/changeDocTitle.html');
});

ipc.on('docTitleChanged', function(event, title){
	editorWindow.webContents.send('docTitleChanged', title);
	changeDocTitleWin.close();
});

/* Components */

//--> /* Navbar menu */

ipc.on('showNavbarMenu', function(event){
	navbarWindow = new BrowserWindow({width: 1280, height: 768});
	navbarWindow.loadURL('file://' + __dirname + "/components/navbarWindow.html");
	//navbarWindow.setMenu(null);
});

ipc.on('append1nav', function(event){
	editorWindow.webContents.send('append1nav');
	navbarWindow.close();
});

ipc.on('append2nav', function(event){
    editorWindow.webContents.send('append2nav');
	navbarWindow.close();
});

ipc.on('append3nav', function(event){
    editorWindow.webContents.send('append3nav');
	navbarWindow.close();
});

//--> /* Article menu */

ipc.on('showArticleMenu', function(event){
	articleWindow = new BrowserWindow({width: 1280, height: 768});
	articleWindow.loadURL('file://' + __dirname + "/components/articleWindow.html");
	//articleWindow.setMenu(null);
});

ipc.on('append1article', function(event){
	editorWindow.webContents.send('append1article');
	articleWindow.close();
});

ipc.on('append2article', function(event){
    editorWindow.webContents.send('append2article');
	articleWindow.close();
});

ipc.on('append3article', function(event){
    editorWindow.webContents.send('append3article');
	articleWindow.close();
});

//--> /* Cover menu */

ipc.on('showCoverMenu', function(event){
	coverWindow = new BrowserWindow({width: 1280, height: 768});
	coverWindow.loadURL('file://' + __dirname + "/components/coverWindow.html");
});

ipc.on('append1cover', function(event){	
	editorWindow.webContents.send('append1cover');
	coverWindow.close();
});