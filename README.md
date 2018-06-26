### Ionic Template
is a starting blank template for Ionic Projects V4

### Libraries (Optional)
* **jQuery:** [https://jquery.com](https://jquery.com)
* **AnimateCSS:** [http://daneden.github.io/animate.css](http://daneden.github.io/animate.css)
* **CryptoJS:** [https://github.com/brix/crypto-js](https://github.com/brix/crypto-js)
* **SocketIO Client:** [https://github.com/socketio/socket.io-client](https://github.com/socketio/socket.io-client)

### Cordova Plugins
* **PhoneGap Toast plugin:** [https://github.com/EddyVerbruggen/Toast-PhoneGap-Plugin](https://github.com/EddyVerbruggen/Toast-PhoneGap-Plugin)
* **cordova-plugin-dialogs:** [https://github.com/apache/cordova-plugin-dialogs](https://github.com/apache/cordova-plugin-dialogs)
* **Cordova Local-Notification Plugin:** [https://github.com/katzer/cordova-plugin-local-notifications](https://github.com/katzer/cordova-plugin-local-notifications)
* **Google Firebase Cloud Messaging Cordova Push Plugin**[https://github.com/fechanique/cordova-plugin-fcm](https://github.com/fechanique/cordova-plugin-fcm)
* **cordova-plugin-facebook4:** [https://github.com/jeduan/cordova-plugin-facebook4](https://github.com/jeduan/cordova-plugin-facebook4)

### How to install
```sh
1. $ npm install

2. Update the FCM config (optional)
- You will need 2 generated files in the Firebase configuration process (see docs: https://firebase.google.com/docs/).
- Android compilation details, put your generated file 'google-services.json' in the project root folder.
- Details: https://github.com/fechanique/cordova-plugin-fcm

3. For facebook login (optional)
- Update your sr/lib/config.ts to facebook_auth: true
- ionic cordova plugin add cordova-plugin-facebook4 --save --variable APP_ID="YOU_APP_ID" --variable APP_NAME="YOU_APPLICATION_NAME"
- Create App on facebook SDK API @ https://developers.facebook.com/apps
- Update the strings.xml on /platforms/android/app/src/main/res/values and the plugin details on /plugin
<string name="fb_app_id">ID</string>
<string name="fb_app_name">NAME</string>

4. Update your package name at config.xml

5. Install Plugins
$ ionic cordova plugin add cordova-plugin-camera cordova-plugin-file cordova-plugin-dialogs

6. Add platform and run
$ ionic cordova platform add android
$ ionic cordova run android
```

### Crosswalk Plugin (optional)
[https://github.com/crosswalk-project/cordova-plugin-crosswalk-webview](https://github.com/crosswalk-project/cordova-plugin-crosswalk-webview)

```sh
cordova plugin add cordova-plugin-crosswalk-webview
cordova build android

/platforms/android/build/outputs/apk/android-x86-debug.apk
/platforms/android/build/outputs/apk/android-armv7-debug.apk
```

### Credits
Framework: [http://ionicframework.com/docs](http://ionicframework.com/docs)

### License
Ionic Framework Project Template is licensed under the Apache License (ASL) license. For more information, see the LICENSE file in this repository.
