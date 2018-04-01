const ipc = require('electron').ipcRenderer;
const remote = require('electron').remote;
const dialog = require('electron').remote.dialog;
const fs = require('fs');
const path = require('path');
const shell = require('electron').shell;
const defaultHTMLPage = require('../model/defaultHTMLPage');

const log = console.log;

/*
* mainWindow
*/

document.getElementById('newProj').addEventListener('click', function(){
    dialog.showOpenDialog({
        properties: ['openFile', 'openDirectory']
    }, function (directory) {
        if (directory)
        {
            var threePath = path.join(__dirname, '..', 'external', 'three.min.js');
            var bootstrapPath = path.join(__dirname, '..', '..', 'css', 'external', 'bootstrap.min.css');
            var uikitPath = path.join(__dirname, '..', '..', 'css', 'external', 'uikit.css');


            fs.mkdir(directory[0]+"\\js");
            fs.mkdir(directory[0]+"\\css");
            fs.mkdir(directory[0]+"\\img");

            fs.readFile(threePath, function(err, data)
			{
                fs.writeFile(directory[0]+'\\js\\three.js', data.toString(), err => {
                    if(err) dialog.showErrorBox("Error", err); // Create js/three.js
                });
            });

            fs.readFile(bootstrapPath, function(err, data)
            {
                fs.writeFile(directory[0]+'\\css\\bootstrap.min.css', data.toString(), err => {
                    if(err) dialog.showErrorBox("Error", err); // Create css/bootstrap.min.css
                });
            });

            fs.readFile(uikitPath, function(err, data)
            {
                fs.writeFile(directory[0]+"\\css\\uikit.css", data.toString(), err => {
                    if(err) dialog.showErrorBox("Error", err); // Create css/uikit.css
                });
            });

            fs.writeFile(directory[0]+"\\Project.cfact", "", err => {
                if(err) dialog.showErrorBox("Error", err); // Create Project.cfact
            });

            fs.writeFile(directory[0]+"\\js\\app.js", "", err => {
                if(err) dialog.showErrorBox("Error", err); // Create js/app.js
            });

            fs.writeFile(directory[0]+"\\index.html", defaultHTMLPage, err => {
                if(err) dialog.showErrorBox("Error", err); // Create index.html
            });

            dialog.showMessageBox({
                message: 'Created successfully: ' + directory[0],
                buttons:['Ok']
            }, function(response){
                if(response === 0)
                    ipc.send('openEditor', directory[0]);
            });
        }
    });
});

document.getElementById('openProj').addEventListener('click', () => {
    dialog.showOpenDialog({
        filters: [{ name:'CFProject', extensions:['cfact'] }],
        properties: ['openFile']
    }, function(directory, file){
        var _path = directory[0].split('\\');

        var result = "";

        for(var i = 0; i < _path.length - 1; i++)
        {
            result = result + _path[i]+"\\";
        }

        ipc.send('openEditor', result);
    });
});

document.getElementById('exitBtn').addEventListener('click', function() {
    ipc.send('exitApp');
});