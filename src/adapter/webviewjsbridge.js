
//reference from  https://github.com/marcuswestin/WebViewJavascriptBridge
function setupWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
    if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
    window.WVJBCallbacks = [callback];
    var WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'https://__bridge_loaded__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
}

function adapter(request, responseCallBack) {
     setupWebViewJavascriptBridge(function (bridge) {
         bridge.callHandler("onAjaxRequest",request,(response)=>{
             responseCallBack(response)
         })
     })
}
//build环境定义全局变量
KEEP("build", () => {
    window.wjsbAdapter= adapter
})
KEEP("!build", () => {
    module.exports = adapter;
})
