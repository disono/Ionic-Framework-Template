/**
 * @author          Archie, Disono (webmonsph@gmail.com)
 * @link            https://webmons.com
 * @copyright       Webmons Development Studio. (webmons.com), 2018
 * @license         Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */

import {Component} from '@angular/core';
import {LoadingController, NavController} from 'ionic-angular';
import {AuthProvider} from "../../../providers/auth";
import {WBHelper} from "../../../libraries/helper";
import {WBConfig} from "../../../config";
import {WBViews} from "../../../libraries/views";
import {UserProvider} from "../../../providers/user";

declare let document;
declare let navigator;
declare let Camera;
declare let moment;

@Component({
  templateUrl: 'general.html'
})
export class GeneralSettingsPage {
  inputs: any;
  files: any;
  me = this.authProvider.user();

  constructor(public navCtrl: NavController, private authProvider: AuthProvider, private userProvider: UserProvider,
              private loadingCtrl: LoadingController) {
    this.init();
  }

  /**
   * Initialize
   */
  init() {
    let thisApp = this;
    thisApp.authInputs();
  }

  /**
   * Authenticated inputs
   */
  authInputs() {
    let thisApp = this;
    let user = this.authProvider.user();

    // inputs
    thisApp.inputs = {
      first_name: user.first_name,
      last_name: user.last_name,
      phone: (user.phone) ? user.phone : '',
      address: (user.address) ? user.address : '',
      birthday: (user.birthday) ? new Date(user.birthday).toISOString() : '',
      gender: ((user.gender) ? user.gender : 'Male'),
      email: user.email,
    };

    // files
    thisApp.files = null;
  }


  doSave($event, inputs) {
    $event.preventDefault();
    let thisApp = this;

    // check for values
    if (!inputs.first_name || !inputs.last_name || !inputs.email) {
      WBHelper.alert({
        title: 'Required Inputs',
        desc: 'Please check all the required fields.'
      });
      return;
    }

    // format birthday
    if (inputs.birthday) {
      inputs.birthday = moment(new Date(inputs.birthday)).format('MMMM DD YYYY');
    }

    // update the profile
    let loading = WBViews.loading(thisApp.loadingCtrl, 'Updating profile...');
    thisApp.userProvider.updateSettings({
      inputs: inputs,
      files: thisApp.files
    }).subscribe(function () {
      loading.dismiss();
      thisApp.authInputs();
    }, function (e) {
      // errors
      loading.dismiss();
      WBHelper.alert({
        title: 'Validation Errors',
        desc: WBHelper.getErrors(e)
      });
    });
  }

  /**
   * File camera
   */
  fileSelector() {
    let thisApp = this;

    if (WBConfig.isBrowser) {
      WBHelper.log('File selection is not supported on browser.');
      return;
    }

    navigator.camera.getPicture(function (fileURI) {
      if (!fileURI || fileURI == '') {
        WBHelper.alert({
          title: 'Camera Failed',
          desc: 'Failed to capture the image, please try again.'
        });

        return;
      }

      let img = "data:image/jpeg;base64," + fileURI;

      try {
        // set to image
        thisApp._setImage(document.getElementById('profileImage'), img);
      } catch (e) {
        WBHelper.alert({
          title: 'Camera Failed',
          desc: 'Image src failed to set, ' + e
        });
      }

      try {
        // set to input
        let blog = WBHelper.b64toBlob(img);
        thisApp.files = {profile_picture: {val: blog, filename: 'profile_picture.jpg'}};
      } catch (e) {
        WBHelper.alert({
          title: 'Camera Failed',
          desc: 'Failed to convert to blob, ' + e
        });
      }
    }, function (e) {
      // handle errors
      WBHelper.alert({
        title: 'Camera Failed',
        desc: e
      });
    }, {
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      mediaType: Camera.MediaType.PICTURE,
      encodingType: Camera.EncodingType.JPEG
    });
  }

  private _setImage(image, img) {
    image.src = img;
  }

}
