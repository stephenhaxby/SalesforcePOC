import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
import arcGIS from '@salesforce/resourceUrl/ArcGIS';

export default class VicMap extends LightningElement {

    renderedCallback() {
        Promise.all([
            //require(["esri/Map", "esri/views/MapView", "esri/layers/WMTSLayer", "esri/Graphic"], function(
            loadScript(this, arcGIS + '/Map.js'),
            // loadScript(this, arcGIS + '/MapView.js'),
            // loadScript(this, arcGIS + '/WMTSLayer.js'),
            // loadScript(this, arcGIS + '/Graphic.js'),

            loadStyle(this, arcGIS + '/main.css')
        ])
            .then(() => {
                this.initializeVicMap();
            })
            .catch(error => {
                console.log('ERROR!');
                
                console.log(error);

                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error loading D3',
                        message: error.message,
                        variant: 'error'
                    })
                );
            });
    }

    initializeVicMap() {
        console.log('TEST!');        
    }
}