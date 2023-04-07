//listener to determinate if the PWA is installed or not

var beforeInstallPrompt = null;
window.addEventListener("beforeinstallprompt", eventHandler, errorHandler);

function eventHandler(event){
    beforeInstallPrompt = event;   
    document.getElementById('installBtn').removeAttribute('disabled');     
}

function errorHandler(e){
    console.log('error: ' + e);
}

function install(){
    if(beforeInstallPrompt) beforeInstallPrompt.prompt();
}