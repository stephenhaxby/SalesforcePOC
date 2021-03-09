import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
//import leaflet from '@salesforce/resourceUrl/Leaflet';
import leaflet from '@salesforce/resourceUrl/EsriLeaflet';

export default class EsriLeafletMap extends LightningElement {
    @api markers;
    @api center;
    @api zoom;
    @api icon;
    
    renderedCallback() {
        Promise.all([
            loadScript(this, leaflet + '/leaflet.js'),
            loadScript(this, leaflet + '/esri-leaflet.js'),
            loadStyle(this, leaflet + '/leaflet.css')
        ])
            .then(() => {
                this.initializeleaflet();
                console.log('initializeleaflet complete');
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error loading D3',
                        message: error.message,
                        variant: 'error'
                    })
                );
            });
    }

    initializeleaflet() {

        const mapRoot = this.template.querySelector(".map-root");

        var map = L.map(mapRoot).setView([-37.6092, 145.10909], 18);
        L.esri.basemapLayer("Streets").addTo(map);

        const latlong = [-37.6092, 145.10909];

        L.esri.tiledMapLayer({
            url: 'https://base.maps.vic.gov.au/wmts/CARTO_WM/EPSG:3857/{z}/{x}/{y}.png',
            tileSize: 512
        }).addTo(map);




        let options;
        if (this.icon) {
            //custom marker
            let customMarker = L.icon({
                iconUrl: this.icon,
                iconSize: [40, 45], // size of the icon
                shadowSize: [50, 64], // size of the shadow
                shadowAnchor: [4, 62],  // the same for the shadow
            });

            options = { icon: customMarker };
        }

        let markerLayers = [];
        // this.markers.forEach(marker => {
        //     markerLayers.push(L.marker([marker.latitude, marker.longitude], options).bindPopup(marker.content));
        // });

        markerLayers.push(L.marker([-37.6092, 145.10909], options));

        L.layerGroup(markerLayers).addTo(map);



        // L.esri.featureLayer({
        //     url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/Earthquakes_Since1970/MapServer/0',
        //     pointToLayer: function (geojson, latlng) {
        //       return L.marker(latlng, {
        //         icon: icon
        //       });
        //     }
        //   }).addTo(map); 

        // L.esri.featureLayer({
        //     url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/Earthquakes_Since1970/MapServer/0',
        //     pointToLayer: function (geojson, latlng) {
        //       return L.marker(latlng, {
        //         icon: icon
        //       });
        //     }
        //   }).addTo(map);



        // var map = L.map(mapRoot).setView([45.528, -122.680], 13);
        // L.esri.basemapLayer("Gray").addTo(map);
  
        //To show parks feature layer with a clickable popup
        // var parks = L.esri.featureLayer({
        //   url: "https://services.arcgis.com/rOo16HdIMeOBI4Mb/arcgis/rest/services/Portland_Parks/FeatureServer/0",
        //   style: function () {
        //     return { color: "#70ca49", weight: 2 };
        //   }
        // }).addTo(map);
  
        // var popupTemplate = "<h3>{NAME}</h3>{ACRES} Acres<br><small>Property ID: {PROPERTYID}<small>";
  
        // parks.bindPopup(function(e){
        //   return L.Util.template(popupTemplate, e.feature.properties)
        // });
    }
}