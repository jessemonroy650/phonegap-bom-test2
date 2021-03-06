//
//  Date: 2016-02-15
//
var app = {
    version : '0.9.2',
    onDeviceReady : function() {
        document.getElementById('isstate').innerHTML = 'onDeviceReady';
        if (device.platform == "iOS") {
            // hide Exit button. They don't have one on iOS devices.
            document.getElementById('exitApp').classList.add("hidden");
            // deals with post-iOS-7 change that covers the status bar 
            document.body.style.marginTop = "20px";
        } else if (device.platform == 'Android') {
            // Get rid of 300ms delay 
            document.addEventListener('DOMContentLoaded', function() {
                FastClick.attach(document.body); 
            }, false);
            // Exit on [exit] button tap.
            document.getElementById('exitApp').addEventListener('click', function() {
                navigator.app.exitApp();
            });
        }
        // adjust font-size of element id'd 'uuid'
        document.getElementById('uuid').style.fontSize = 'medium';
        //
        document.getElementById('isstate').innerHTML = 'mid onDeviceReady';
        if (device.platform != 'browser') {
            phonegapStuff();
        } else {
            document.getElementById('deviceInformation').classList.add("hidden");
            document.getElementById('deviceInformationNot').classList.remove("hidden");
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
    // A bug in Phonegap does not allow us to use the `id=cordova`
    document.getElementById('acordova').innerHTML = device.cordova;
    document.getElementById('model').innerHTML = device.model;
    document.getElementById('platform').innerHTML = device.platform;
    document.getElementById('uuid').innerHTML = device.uuid;
    document.getElementById('version').innerHTML = device.version;
}
//
function isKnownDevice(obj) {
    var validPGDevices = [
        'armv7',
        'iPad',
        'iPhone',
        'iPod'
    ];
    var i = 0, result = -1, answer = false;
    for (i = 0; i < validPGDevices.length; i++){
        result = obj.search(validPGDevices[i]);
        //console.log(obj, validPGDevices[i], result);
        if (result != -1) { answer = validPGDevices[i]; break; }
    }

    return answer;
}

//
//    Entry Point
//
document.addEventListener('DOMContentLoaded', function() {
    var d = "";

    document.getElementById('appVersion').innerHTML = app.version;
    document.getElementById('navVersion').innerHTML = navigator.appVersion;
    d = isKnownDevice(navigator.platform);
    document.getElementById('isKnownDevice').innerHTML = d;
    // - https://videlais.com/2014/08/21/lessons-learned-from-detecting-apache-cordova/
    var isCordovaApp = (typeof window.cordova !== "undefined");
    document.getElementById('isCordovaApp').innerHTML = isCordovaApp;

    // Get the standard stuff
    screenStuff();
    navigatorStuff();
    jqueryStuff();

    // Is it a device we know?
    if ( isCordovaApp === true ) {
        // Wait for PhoneGap to load
        document.addEventListener("deviceready", app.onDeviceReady, false);
    } else {
        // This needs to be global so other modules can see it.
        device = {platform:'browser'};
        // Force the function.
        app.onDeviceReady();
    }
});
