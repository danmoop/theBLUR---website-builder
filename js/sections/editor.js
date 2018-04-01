const remote = require('electron').remote;
const ipc = require('electron').ipcRenderer;
const dialog = require('electron').remote.dialog;
const fs = require('fs');
const shell = require('electron').shell;
var log = console.log;
const window = require('electron').remote.getCurrentWindow();
const defaultHTMLPage = require('../model/defaultHTMLPage');

const navbar = require('../model/navbars/navbarBrand');
const navbar2 = require('../model/navbars/navbar2');
const navbar3 = require('../model/navbars/navbar3');
const article = require('../model/articles/article1');
const article2 = require('../model/articles/article2');
const article3 = require('../model/articles/article3');
const cover1 = require('../model/covers/cover1');
const cube = require('../model/webGL/cube');


var beautify_html = require('js-beautify').html;
/*
* editorWindow
*/

document.getElementById('quitBtn').addEventListener('click', function(){
    ipc.send('exitApp'); // app.close();
});

document.getElementById('openDirectory').addEventListener('click', function(){
    shell.openItem(window._projectDirectory); // it opens project directory
});

document.getElementById('openHome').addEventListener('click', function(){

    var firstPart = defaultHTMLPage.split("<body>")[0];

    var result = firstPart + "<body>" + document.getElementById('content').innerHTML + "</body>\n</html>";
    
    fs.writeFile(window._projectDirectory+"\\index.html", result, err => {
        if(err) dialog.showErrorBox("Error", err);
    });

    ipc.send('openHome');
});

fs.readdir(window._projectDirectory, function(err, files){
    files.forEach(file =>{
        /*if(file.includes(".cfact"))
            document.getElementById('editorTitle').innerHTML = file.split(".")[0];*/
        
        if(file == "index.html")
            fs.readFile(window._projectDirectory+"\\index.html", function(err, data){
                //document.getElementById('content').innerHTML = data.toString();
                document.getElementById('content').innerHTML = /<body.*?>([\s\S]*)<\/body>/.exec(data.toString())[1];
            });
    });

});

document.getElementById('viewInBrow').addEventListener('click', function(){
    shell.openItem(window._projectDirectory+"\\index.html");
});

document.getElementById('saveBtn').addEventListener('click', function(){

    var firstPart = defaultHTMLPage.split("<body>")[0];

    var result = firstPart + "<body>" + document.getElementById('content').innerHTML + "</body>\n</html>";

    var finalResult = beautify_html(result).replace('<canvas width="1584" height="842" style="width: 1584px; height: 842px;"></canvas>', '');

    fs.writeFile(window._projectDirectory+"\\index.html", beautify_html(finalResult), err => {
        if(err) dialog.showErrorBox("Error", err);

        document.getElementById('saved_notify').innerHTML = "Saved!";

        setTimeout(function(){
            document.getElementById('saved_notify').innerHTML = "";
        }, 1000);
    });
    
});

document.getElementById('viewDesktop').addEventListener('click', function(){
    document.getElementById('content').style.width = "100%";
});

document.getElementById('viewTablet').addEventListener('click', function(){
    document.getElementById('content').style.width = "50%";
});

document.getElementById('viewPhone').addEventListener('click', function(){
    document.getElementById('content').style.width = "30%";
});

/* Component menus */

document.getElementById('appendNavbarMenu').addEventListener('click', function(){
    ipc.send('showNavbarMenu');
    document.getElementById('toggler').click();
});

document.getElementById('appendArticleMenu').addEventListener('click', function(){
    ipc.send('showArticleMenu');
    document.getElementById('toggler').click();
});

document.getElementById('appendCoverMenu').addEventListener('click', function(){
    ipc.send('showCoverMenu');
    document.getElementById('toggler').click();
});

document.getElementById('appendWebGL').addEventListener('click', function(){

   var element = document.createElement("script");
   element.innerHTML = cube;
   document.getElementById('content').appendChild(element);
});

/* Misc */
document.getElementById('appendDivider').addEventListener('click', function(){
    var element = document.createElement("hr");
    document.getElementById('content').appendChild(element);
    document.getElementById('toggler').click();
});

document.getElementById('changeDocTitle').addEventListener('click', function(){
    ipc.send('changeDocTitle');
});

ipc.on('docTitleChanged', function(event, title){
    document.title = title;
});

/* Components */


//--> Navs

ipc.on('append1nav', function(event){
    var element = document.createElement("div");
    element.innerHTML = navbar;
    document.getElementById('content').appendChild(element);
});

ipc.on('append2nav', function(event){
    var element = document.createElement("div");
    element.innerHTML = navbar2;
    document.getElementById('content').appendChild(element);
});

ipc.on('append3nav', function(event){
    var element = document.createElement("div");
    element.innerHTML = navbar3;
    document.getElementById('content').appendChild(element);
});

//--> Articles

ipc.on('append1article', function(event){
    var element = document.createElement("div");
    element.innerHTML = article;
    document.getElementById('content').appendChild(element);
});

ipc.on('append2article', function(event){
    var element = document.createElement("div");
    element.innerHTML = article2;
    document.getElementById('content').appendChild(element);
});

ipc.on('append3article', function(event){
    var element = document.createElement("div");
    element.innerHTML = article3;
    document.getElementById('content').appendChild(element);
});

//--> Covers

ipc.on('append1cover', function(event){
    var element = document.createElement("div");
    element.innerHTML = cover1;
    document.getElementById('content').appendChild(element);
});