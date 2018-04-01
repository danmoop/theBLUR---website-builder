const ipc = require('electron').ipcRenderer;

document.getElementById('append1article').addEventListener('click', function(){
    ipc.send('append1article');
});

document.getElementById('append2article').addEventListener('click', function(){
    ipc.send('append2article');
});

document.getElementById('append3article').addEventListener('click', function(){
    ipc.send('append3article');
});