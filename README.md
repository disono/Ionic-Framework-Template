# Ionic Framework Project Template V3
is a starting blank template for Ionic Projects V3

# Libraries
* **jQuery:** [https://jquery.com](https://jquery.com)
* **MomentJS:** [http://momentjs.com](http://momentjs.com)
* **FontAwesome:** [http://fortawesome.github.io/Font-Awesome](http://fortawesome.github.io/Font-Awesome)
* **AnimateCSS:** [http://daneden.github.io/animate.css](http://daneden.github.io/animate.css)

# Cordova Plugins
* **Google Firebase Cloud Messaging Cordova Push Plugin**[https://github.com/fechanique/cordova-plugin-fcm](https://github.com/fechanique/cordova-plugin-fcm)
* **Cordova Local-Notification Plugin:** [https://github.com/katzer/cordova-plugin-local-notifications](https://github.com/katzer/cordova-plugin-local-notifications)
* **cordova-plugin-facebook4:** [https://github.com/jeduan/cordova-plugin-facebook4](https://github.com/jeduan/cordova-plugin-facebook4)

# NPM
* **ionic-image-loader**[https://github.com/zyra/ionic-image-loader](https://github.com/zyra/ionic-image-loader)

### Install Libraries
```sh
1. npm install

2. ionic cordova plugin add cordova-plugin-camera cordova-plugin-console cordova-plugin-contacts cordova-plugin-device cordova-plugin-device-motion cordova-plugin-device-orientation cordova-plugin-dialogs cordova-plugin-file cordova-plugin-file-transfer cordova-plugin-filepath cordova-plugin-geolocation cordova-plugin-inappbrowser cordova-plugin-media cordova-plugin-media-capture cordova-plugin-network-information cordova-plugin-splashscreen cordova-plugin-statusbar  cordova-plugin-vibration cordova-plugin-whitelist cordova-plugin-x-socialsharing cordova-plugin-x-toast phonegap-plugin-barcodescanner https://github.com/katzer/cordova-plugin-local-notifications

3. Update the FCM config
- You will need 2 generated files in the Firebase configuration process (see docs: https://firebase.google.com/docs/).
- Android compilation details, put your generated file 'google-services.json' in the project root folder.
- Details: https://github.com/fechanique/cordova-plugin-fcm

4. bower install

5. For facebook login (optional)
- Update your sr/lib/config.ts to facebook_auth: true
- cordova plugin add cordova-plugin-facebook4 --save --variable APP_ID="YOU_APP_ID" --variable APP_NAME="YOU_APPLICATION_NAME"
- Create App on facebook SDK API @ https://developers.facebook.com/apps

6. Update your package name at config.xml

7. Install NPM libraries
    npm install --save ionic-image-loader
    npm i --save @ionic-native/file
    npm i --save @ionic-native/transfer
    npm i --save @ionic-native/core
    npm i --save rxjs@5.0.0-beta.12
	npm i --save @ionic-native/file
```

### Crosswalk Plugin (optional)
```sh
cordova plugin add cordova-plugin-crosswalk-webview
cordova build android

/platforms/android/build/outputs/apk/android-x86-debug.apk
/platforms/android/build/outputs/apk/android-armv7-debug.apk

please refer to https://crosswalk-project.org/documentation/cordova.html
```

# Credits
Framework: [http://ionicframework.com/docs/v2](http://ionicframework.com/docs/v2)

# License
Ionic Framework Project Template V2 Beta is licensed under the Apache License (ASL) license. For more information, see the LICENSE file in this repository.
