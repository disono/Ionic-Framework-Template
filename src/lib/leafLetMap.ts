import * as jQ from "jquery";
import {WBConfig} from "./config";

declare let google;
declare let L;

/**
 * @description LeafLetJS
 * @file leafLetMap.ts
 *
 * @author Archie Disono
 * @url https://github.com/disono/Ionic-Framework-Template
 * @license Apache 2.0
 */

let _WBLeafMap = (function () {
  let _markers = [];

  return {
    map: null,

    lat: 14.5995,
    lng: 120.9842,
    zoom: 14,

    /**
     * Initialize map
     *
     * @param id
     * @returns
     */
    init: function (id) {
      if (!document.getElementById(id)) {
        return;
      }

      // reset markers
      _markers = [];

      // leaf map
      this.map = L.map(id).setView([this.lat, this.lng], this.zoom);

      // use map box for tiles
      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + WBConfig.map_box_token, {
        maxZoom: this.zoom,
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="http://mapbox.com">Mapbox</a>',
        id: 'mapbox.streets'
      }).addTo(this.map);

      return this.map;
    },

    /**
     * Search
     *
     * @param id
     */
    search: function (id) {
      let input = document.getElementById(id);
      if (!input) {
        return;
      }

      let searchBox = new google.maps.places.SearchBox(input);

      searchBox.addListener('places_changed', function () {
        let places = searchBox.getPlaces();

        if (places.length == 0) {
          return;
        }

        let group = L.featureGroup();

        places.forEach(function (place) {
          group.addLayer(WBLeafMap.addMarker(place.geometry.location.lat(), place.geometry.location.lng(), {
            popup: {
              content: place.formatted_address
            },
            icon: 'http://icons.iconarchive.com/icons/icons-land/vista-map-markers/64/Map-Marker-Marker-Inside-Chartreuse-icon.png'
          }, function (e) {
            console.log(this.getLatLng());
          }));
        });

        group.addTo(WBLeafMap.map);
        WBLeafMap.map.fitBounds(group.getBounds());
      });
    },

    /**
     * Direction routing
     *
     * @param wayPointsList
     * @param callback
     */
    route: function (wayPointsList, callback) {
      let routingControl = L.Routing.control({
        waypoints: wayPointsList,
        plan: L.Routing.plan(wayPointsList, {
          createMarker: function (i, wp) {
            let marker = L.marker(wp.latLng, {
              draggable: false
            });

            marker.on('click', function (e) {
              console.log(this.getLatLng());
            });

            return marker;
          }
        }),
        draggableWaypoints: false,
        addWaypoints: false
      }).addTo(this.map);

      // instruction hide
      jQ('.leaflet-routing-container').remove();

      // list of routes found
      routingControl.on('routesfound', function (e) {
        // e.routes[0].summary.totalDistance;
        // e.routes[0].summary.totalTime;
        // e.routes[0].instructions

        callback(e);
      });
    },

    /**
     * Add marker
     *
     * @param lat
     * @param lng
     * @param data
     * @param clickCallback
     * event on click: this.getLatLng()
     */
    addMarker: function (lat, lng, data, clickCallback) {
      let options = {
        icon: null
      };
      if (data) {
        // icon marker
        if (data.icon) {
          options.icon = new L.icon({
            iconUrl: data.icon,
            iconSize: [64, 64]
          });
        }
      }

      // marker with options
      let marker = L.marker([lat, lng], options).addTo(this.map);

      if (data) {
        // popup marker
        if (data.popup) {
          marker.bindPopup(data.popup.content);
        }
      }

      // on marker click
      if (clickCallback) {
        // event
        // this.getLatLng()
        marker.on('click', clickCallback);
      }

      _markers.push(marker);

      this.centerMap(null, null);
      return marker;
    },

    /**
     * On map click
     * event: e.latlng
     *
     * @param callback
     */
    onClick: function (callback) {
      this.map.on('click', callback);
    },

    /**
     * Delete markers
     */
    deleteMarker: function () {
      for (let i = 0; i < _markers.length; i++) {
        this.map.removeLayer(_markers[i]);
      }

      _markers = [];
    },

    /**
     * Center map
     *
     * @param lat
     * @param lng
     */
    centerMap: function (lat, lng) {
      let listLatLng = [];

      for (let i = 0; i < _markers.length; i++) {
        listLatLng.push([_markers[i]._latlng.lat, _markers[i]._latlng.lng]);
      }

      let bounds = new L.LatLngBounds(listLatLng);
      this.map.fitBounds(bounds);
    },

    /**
     * Calculate distance
     *
     * @param lat_from
     * @param lng_from
     * @param lat_des
     * @param lng_des
     * @returns {number}
     */
    calDistance: function (lat_from, lng_from, lat_des, lng_des) {
      // km
      let R = 6371;
      let dLat = WBLeafMap.toRad(lat_des - lat_from);
      let dLon = WBLeafMap.toRad(lng_des - lng_from);

      lat_from = WBLeafMap.toRad(lat_from);
      lat_des = WBLeafMap.toRad(lat_des);

      let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat_from) * Math.cos(lat_des);
      let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      let d = R * c;

      if (d) {
        return parseFloat(d.toFixed(1));
      }

      return 0;
    },

    /**
     * Converts numeric degrees to radians
     *
     * @param Value
     * @returns {number}
     */
    toRad: function (Value) {
      return Value * Math.PI / 180;
    }
  }
}());

export let WBLeafMap = _WBLeafMap;
