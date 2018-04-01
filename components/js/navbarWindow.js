const ipc = require('electron').ipcRenderer;

document.getElementById('append1nav').addEventListener('click', function(){
    ipc.send('append1nav');
});

document.getElementById('append2nav').addEventListener('click', function(){
    ipc.send('append2nav');
});

document.getElementById('append3nav').addEventListener('click', function(){
    ipc.send('append3nav');
});