/**-------------------------------------------------------------------------------------------------
 * PROGRAM ID      : mapbox.js
 * DESCRIPTION     : 
 * AUTHOR          : liangjs
 * DATE            : Dec 23, 2016
 * VERSION NO      : 1.0
 * PARAMETERS      :
 * RETURN          :
 * USAGE NOTES     :
 * COMMENTS        :
---------------------------------------------------------------------------------------------------
 * CHANGE LOG      :
 * CHANGED BY      :
 * DATE            :
 * VERSION NO      :
 * CHANGES         :
--------------------------------------------------------------------------------------------------*/

"use strict";

import MapboxGL from 'mapbox-gl';
import EplActionCreator from 'actions/eplactioncreator';
import Basemap3DConfig from 'basemap3dconfig';

class Mapbox {
    constructor() {
        this.defaultConfig = {
            style: Basemap3DConfig.Mapbox.styles[0].style,
            center: [103.8466, 1.2767],
            zoom: 15,
            bearing: -12,
            pitch: 60,
            maxBounds: [[103.390274,1.12328],[104.149704,1.569475]],
        };

        this.config = {
            style: Basemap3DConfig.Mapbox.styles[0].style,
            center: this.defaultConfig.center,
            zoom: this.defaultConfig.zoom,
            bearing: this.defaultConfig.bearing,
            pitch: this.defaultConfig.pitch,
            maxBounds: this.defaultConfig.maxBounds
        };
        this.markers = [];
    }

    initialize(){
        this.map = new MapboxGL.Map({
            container: this.container,
            style: this.config.style,
            center: this.config.center,
            zoom: this.config.zoom,
            bearing: this.config.bearing,
            pitch: this.config.pitch,
            maxBounds: this.config.maxBounds
        });
        this.map.addControl(new MapboxGL.NavigationControl());


        this.loadingInProgress();
        if(this.map){
            this.map.off('load');
            this.map.on('load',(e) => {this.loadingComplete()});
        }
    }

    reset() {
        this.map.remove();
        this.config = this.defaultConfig;
        this.initialize();
    }

    destroy() {
        if(this.map){
            this.map.remove();
            this.map = null;
        }
        this.loadingComplete();
    }

    loadingInProgress(){
        EplActionCreator.toggleMainLoading(true);
    }

    loadingComplete(){
        EplActionCreator.toggleMainLoading(false);
    }

    convertToLngLat(coordinates){
        if(Array.isArray(coordinates)){
            if(coordinates[0] > 90){
                return [coordinates[0],coordinates[1]];
            } else {
                return [coordinates[1],coordinates[0]];
            }
        } 
        return coordinates;
    }

    isInitialized(){
        if(this.map){
            return true;   
        } else {
            return false;
        }
    }

    getMap(){
        return this.map;
    }

    flyTo(lngLat){
        var lnglat = this.convertToLngLat(lngLat);
        this.map.flyTo({center: lnglat});
    }

    panTo(lngLat){
        var lnglat = this.convertToLngLat(lngLat);
        this.map.panTo(lnglat, {
            'duration': 0
        });
    }

    addLayer(layerProp){
        this.map.addLayer(layerProp);
    }

    getLayer(id){
        return this.map.getLayer(id);
    }

    removeLayer(id){
        if(this.getLayer(id)){
            this.map.removeLayer(id);
        }
    }

    addMarker(icon,lngLat){
        var el = document.createElement('div');
        el.className = 'marker';
        el.style.backgroundImage = 'url(' + icon.icon + ')';
        el.style.width = icon.width + 'px';
        el.style.height = icon.height + 'px';
        var lnglat = this.convertToLngLat(lngLat);
        this.markers.push(new MapboxGL.Marker(el, {offset:[-15, -30]})
            .setLngLat(lnglat)
            .addTo(this.map));
    }

    removeMarkers(){
        this.markers.forEach((marker)=>{
            marker.remove();
        });
    }

    setPopup(lngLat,content){
        this.removePopup();
        this.popup = new MapboxGL.Popup({
            closeButton: true,
            closeOnClick: true
        });
        this.popup.setLngLat(lngLat);
        this.popup.setHTML(content);
        this.popup.addTo(this.map);
    }

    removePopup(){
        if(this.popup){
            this.popup.remove();
            this.popup = null;
        }
    }

    setContainer(dom){
        this.container = dom;
    }

    getContainer(){
        return this.dom;
    }

    setStyle(style){
        this.config.style = style;
        this.config.center = this.getCenter();
        this.config.zoom = this.getZoom();
        this.config.bearing = this.getBearing();
        this.config.pitch = this.getPitch();

        this.map.remove();  
        this.initialize();
    }

    getCenter() {
        return this.map.getCenter();
    }

    getZoom() {
        return this.map.getZoom();
    }
    
    getBearing() {
        return this.map.getBearing();
    }

    getPitch() {
        return this.map.getPitch();
    }

    getBounds() {
        return this.map.getBounds();
    }
}

export default new Mapbox();