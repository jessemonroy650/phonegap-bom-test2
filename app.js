//
//
//
var app = {
    onDeviceReady : function() {
        // console.log('onDeviceReady');
        document.getElementById('isstate').innerHTML = 'onDeviceReady';
        if (device.platform === "iOS") {
            // hide Exit button. They don't have one on iOS devices.
            document.getElementById('exitApp').classList.add("hidden");
            /* deals with post-iOS-7 change that covers the status bar */
            document.body.style.marginTop = "20px";
        } else if (device.platform === 'Android') {
            document.getElementById('uuid').style.fontSize = 'medium';
            document.getElementById('exitApp').addEventListener('click', function() {
                navigator.app.exitApp();
            });
        }
        screenStuff();
        navigatorStuff();
        jqueryStuff();
        document.getElementById('isstate').innerHTML = 'mid onDeviceReady';
        if (device.platform !== 'browser') {
            phonegapStuff();
        }
        document.getElementById('isstate').innerHTML = 'onDeviceReady done.';
    }
};

/*
    window.location.href returns the href (URL) of the current page
    window.location.hostname returns the domain name of the web host
    window.location.pathname returns the path and filename of the current page
    window.location.protocol returns the web protocol used (http:// or https://)
    window.location.assign loads a new document
*/
function screenStuff() {
    var screenStuff = "" +
    "<p class=r />screen.width: "       + screen.width +
	"<p class=g />screen.height: "      + screen.height +
	"<p class=b />screen.availWidth: "  + screen.availWidth +
	"<p class=r />screen.availHeight: " + screen.availHeight +  
	"<p class=g />screen.colorDepth: "  + screen.colorDepth + 
	"<p class=b />screen.pixelDepth: "  + screen.pixelDepth;  

    document.getElementById('screenStuff').innerHTML = screenStuff;
}
//
function navigatorStuff() {
    var navigatorStuff = "" +
	"<p class=a />navigator.appCodeName: "   + navigator.appCodeName +
	"<p class=p />navigator.appName: "       + navigator.appName +
	"<p class=a />navigator.appVersion: "    + navigator.appVersion +
	"<p class=p />navigator.cookieEnabled: " + navigator.cookieEnabled +  
	"<p class=a />navigator.language: "      + navigator.language +
	"<p class=p />navigator.userAgent: "     + navigator.userAgent +
	"<p class=a />navigator.platform: "      + navigator.platform + 
	"<p class=p />navigator.onLine: "        + navigator.onLine;  

    document.getElementById('navigatorStuff').innerHTML = navigatorStuff;
}
//
function jqueryStuff() {
    var jqueryStuff = "" +
	"<p class=r />JQuery version is: "     +  $.fn.jquery +
    "&nbsp;<p />" +
	"<p class=p />$(window).innerWidth: "  + $(window).innerWidth() +
	"<p class=a />$(window).innerHeight: " + $(window).innerHeight() +
	"<p class=p />$(window).outerWidth: "  + $(window).outerWidth() +
	"<p class=a />$(window).outerHeight: " + $(window).outerHeight();

    document.getElementById('jqueryStuff').innerHTML = jqueryStuff;
}
//
function phonegapStuff() {
    document.getElementById('acordova').innerHTML = device.cordova;
    document.getElementById('model').innerHTML = device.model;
    document.getElementById('platform').innerHTML = device.platform;
    document.getElementById('uuid').innerHTML = device.uuid;
    document.getElementById('version').innerHTML = device.version;
}
//
function isBrowser(obj, string) {
    return obj.match(string);
}


document.addEventListener("deviceready", app.onDeviceReady, false);

document.addEventListener('DOMContentLoaded', function() {
    
    var v = isBrowser(navigator.appVersion, 'X11');
    //
    // This is truthy, not absolute.
    if ( v == 'X11' ) {
       document.getElementById('isbrowser').innerHTML = v;
        device = {platform:'browser'};
        app.onDeviceReady();
    } else {
        document.getElementById('isbrowser').innerHTML = 'not X11';
        //console.log('not X11');
        // Wait for PhoneGap to load
        // app.onDeviceReady();
        document.addEventListener("deviceready", app.onDeviceReady, false);
    }
});
