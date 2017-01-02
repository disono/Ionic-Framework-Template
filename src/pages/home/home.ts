import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {WBLeafMap} from "../../lib/leafLetMap";

/**
 * @author Archie Disono
 * @url https://github.com/disono/Ionic-Framework-Template
 * @license Apache 2.0
 */

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public nav: NavController) {

  }

  ionViewDidEnter() {
    WBLeafMap.init('leafMap');
    WBLeafMap.addMarker(14.5995, 120.9842, {
      popup: {
        content: 'This is a content.'
      },
      icon: 'http://icons.iconarchive.com/icons/icons-land/vista-map-markers/64/Map-Marker-Marker-Inside-Chartreuse-icon.png'
    }, function (e) {
      console.log(this.getLatLng());
    });

    // on click map
    WBLeafMap.onClick(function (e) {
      WBLeafMap.addMarker(e.latlng.lat, e.latlng.lng, {
        popup: {
          content: 'This is a content.'
        },
        icon: 'http://icons.iconarchive.com/icons/icons-land/vista-map-markers/64/Map-Marker-Marker-Inside-Chartreuse-icon.png'
      }, function (e) {
        console.log(this.getLatLng());
      });
    });
  }

}
