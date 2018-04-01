const ipc = require('electron').ipcRenderer;

document.getElementById('append1cover').addEventListener('click', function(){
    ipc.send('append1cover');
});