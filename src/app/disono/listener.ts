import {IonRouterOutlet} from "@ionic/angular";

declare let navigator;

export class ListenerHelper {
    private rootPages: string[] = [
        'DashboardPage',
        'LoginPage',

        'GeneralPage',
        'SecurityPage'
    ];

    constructor() {

    }

    public onBackButton(self) {
        let _self = this;

        document.addEventListener("backbutton", async function () {
            // close alert
            try {
                const element = await self.alertCtrl.getTop();
                if (element) {
                    element.dismiss().then(() => {
                    });
                    return;
                }
            } catch (error) {

            }

            // close loading
            try {
                const element = await self.loadingCtrl.getTop();
                if (element) {
                    return;
                }
            } catch (error) {

            }

            // close picker
            try {
                const element = await self.pickerCtrl.getTop();
                if (element) {
                    element.dismiss().then(() => {
                    });
                    return;
                }
            } catch (error) {

            }

            // close action sheet
            try {
                const element = await self.actionSheetCtrl.getTop();
                if (element) {
                    element.dismiss().then(() => {
                    });
                    return;
                }
            } catch (error) {

            }

            // close popover
            try {
                const element = await self.popOverCtrl.getTop();
                if (element) {
                    element.dismiss().then(() => {
                    });
                    return;
                }
            } catch (error) {

            }

            // close modal
            try {
                const element = await self.modalCtrl.getTop();
                if (element) {
                    element.dismiss().then(() => {
                    });
                    return;
                }
            } catch (error) {

            }

            // close side menu
            try {
                const element = await self.menuCtrl.getOpen();
                if (element !== null) {
                    this.menu.close();
                    return;
                }
            } catch (error) {

            }

            self.routerOutlets.forEach((outlet: IonRouterOutlet) => {
                let isRouteFound = false;

                if (outlet) {
                    if (typeof outlet.activatedRoute.component === 'function') {
                        for (let i = 0; i < _self.rootPages.length; i++) {
                            if (outlet.activatedRoute.component.name === _self.rootPages[i]) {
                                isRouteFound = true;
                            }
                        }
                    }

                    if (isRouteFound === true) {
                        navigator.app.exitApp();
                        return;
                    }

                    if (outlet.canGoBack()) {
                        outlet.pop().then(() => {
                        });
                        return;
                    }

                    if (!outlet.canGoBack()) {
                        navigator.app.exitApp();
                        return;
                    }
                }

            });
        }, false);
    }
}