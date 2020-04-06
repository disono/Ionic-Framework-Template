/**
 * @author          Archie, Disono (webmonsph@gmail.com)
 * @link            https://webmons.com
 * @copyright       Archie Disono - Webmons Development Studio. (webmons.com), 2018
 * @license         Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */

import {Component, OnInit} from '@angular/core';
import {ActionSheetController, NavController, Events} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ViewHelper} from "../../../../disono/view";
import {AuthService} from "../../../../services/auth/auth.service";
import {AuthSocialService} from "../../../../services/auth/auth.social.service";
import {SettingsService} from "../../../../services/app/settings.service";
import {NavigatorHelper} from "../../../../disono/navigator";
import {UserService} from "../../../../services/auth/user.service";
import * as moment from "moment";
import {FormHelper} from "../../../../disono/form";
import {SecurityHelper} from "../../../../disono/security";

declare let Camera;

@Component({
    selector: 'app-general',
    templateUrl: './general.page.html',
    styleUrls: ['./general.page.scss'],
})
export class GeneralPage implements OnInit {
    private inputs: FormGroup;
    private files = {profile_picture: {val: null, filename: null}};
    private submitAttempt: boolean = false;
    private settings = null;

    private countries = [];
    private cities = [];
    private me = this.authService.user();

    private inputErrorMsg = this.setInputErrorMsg();

    constructor(
        private navCtrl: NavController,
        private formBuilder: FormBuilder,
        private viewHelper: ViewHelper,
        private authService: AuthService,
        private userService: UserService,
        private authSocialService: AuthSocialService,
        private settingService: SettingsService,
        private navigatorHelper: NavigatorHelper,
        private formHelper: FormHelper,
        private actionSheetController: ActionSheetController,
        private events: Events,
        private securityHelper: SecurityHelper
    ) {

    }

    ngOnInit() {
        this.formInputs();
    }

    ionViewDidEnter() {
        this.submitAttempt = false;
        this.settings = null;
        this.countries = [];
        this.cities = [];
        this.me = this.authService.user();
        this.inputErrorMsg = this.setInputErrorMsg();
        this.sync();
        this.listenToEvents();
    }

    private formInputs() {
        this.inputs = this.formBuilder.group({
            first_name: [this.me.first_name, Validators.required],
            last_name: [this.me.last_name, Validators.required],
            phone: [this.me.phone, Validators.required],
            gender: [this.me.gender, Validators.required],
            birthday: [this.me.birthday ? moment(new Date(this.me.birthday)).format('MMMM DD, YYYY') : null, Validators.required],
            address: [this.me.address, Validators.required],
            country_id: [this.me.country_id, Validators.required],
            city_id: [this.me.city_id, Validators.required],
        });
    }

    private sync() {
        let self = this;

        self.viewHelper.loadingPresent('Syncing...').then(() => {
            self.authService.sync().subscribe((response) => {
                self.viewHelper.loadingDismiss().then(() => {
                    self.settings = response.data.setting;
                    self.me = self.authService.user();
                });
            }, (e) => {
                self.viewHelper.loadingDismiss().then(() => {

                });
            });
        });

        self.fetchCountries();
    }

    private fetchCountries() {
        let self = this;
        self.settingService.countries().subscribe((response) => {
            self.countries = response.data;
            self.inputs.controls['country_id'].setValue(self.me.country_id);

            if (self.me.country_id) {
                self.fetchCities(self.me.country_id);
            }
        }, (e) => {

        });
    }

    private fetchCities(country_id) {
        let self = this;
        self.settingService.cities(country_id).subscribe((response) => {
            self.cities = response.data;
        }, (e) => {

        });
    }

    private selectPhotoAction() {
        let self = this;
        let actionSheet = self.actionSheetController.create({
            header: 'Select Photo',
            buttons: [{
                text: 'Camera',
                icon: 'camera',
                handler: () => {
                    self.selectPhoto(Camera.PictureSourceType.CAMERA);
                }
            }, {
                text: 'Library',
                icon: 'grid',
                handler: () => {
                    self.selectPhoto(Camera.PictureSourceType.PHOTOLIBRARY);
                }
            }, {
                text: 'Cancel',
                icon: 'close',
                role: 'cancel',
                handler: () => {
                    console.log('Cancel clicked');
                }
            }]
        });

        actionSheet.then((result) => {
            result.present().then(() => {

            });
        });
    }

    private selectPhoto(sourceType) {
        let self = this;
        self.formHelper.selectPhoto({
            imgId: 'profilePhoto',
            sourceType: sourceType
        }).then(results => {
            self.files = self.setFiles(results);
        }).catch((e) => {
            self.navigatorHelper.alert({
                title: 'Photo selection failed',
                desc: e
            });
        });
    }

    private setFiles(results) {
        return {profile_picture: {val: results.image, filename: results.filename}};
    }

    private doSave() {
        let self = this;
        self.submitAttempt = true;

        // reset validation messages
        self.inputErrorMsg = this.setInputErrorMsg();

        // is form inputs valid
        if (!self.inputs.valid) {
            return;
        }

        self.viewHelper.loadingPresent('Saving...').then(() => {
            self.userService
                .updateGeneralSettings({
                    inputs: self.inputs.value,
                    files: self.files
                })
                .subscribe(function (response) {
                    self.viewHelper.loadingDismiss().then(() => {
                        self.submitAttempt = false;
                        self.securityHelper.saveAuth(response.data);
                    });
                }, function (e) {
                    self.viewHelper.loadingDismiss().then(() => {
                        self.submitAttempt = true;
                        self.navigatorHelper.inputErrors(e, self.inputErrorMsg);
                    });
                });
        });
    }

    private setInputErrorMsg() {
        return {
            first_name: {msg: 'Please enter a valid first name.', valid: true},
            last_name: {msg: 'Please enter a valid last name.', valid: true},
            phone: {msg: 'Please enter a valid mobile number.', valid: true},
            gender: {msg: 'Please enter a valid gender.', valid: true},
            address: {msg: 'Please enter a valid address.', valid: true},
            birthday: {msg: 'Please enter a valid birthday.', valid: true},
            country_id: {msg: 'Please enter a valid country.', valid: true},
            city_id: {msg: 'Please enter a valid city.', valid: true},
        };
    }

    private listenToEvents() {
        let self = this;
        self.events.subscribe('tabSettingLeave', () => {
            self.events.unsubscribe('tabSettingLeave', null);
        });
    }

}
