## phonegap BOM
Phonegap BOM (Browser Object Model) and webview test

Date: 2016-02-15

This app was written with one goal in mind to demonstrate that phonegp is neither a webserver nor a webbrowser. This is a common misconception.




1. How to write a web mobile and mobile app in one code base.
    - checks `navigator.appVersion` for known devices.
2. Get the webview information on the `screen` - like width, height, etc.
3. Get the webview information about the `navigator` - like version, userAgent, etc.
4. Get the JQuery information about the `window` - like width, height, etc.
5. Get the Phonegap information, if available
6. Get the screen dimensions from a known Internet test
7. Get the link to the source for the App
8. Without using the inAppBrowser plugin
    - open a link in the app
    - open a link in the system browser
