import { LightningElement, track, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getLocations from '@salesforce/apex/LeafletExample.getLocations';

export default class EsriLeafletExample extends LightningElement {

    @track showMap = false;
    @track locations;
    @track center;

    initiated = false;
    // getCurrentLocationOnLoad() {
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition((position) => {
    //             this.center = {};
    //             // set location to center the map like below
    //             this.center.latitude = position.coords.latitude;
    //             this.center.longitude = position.coords.longitude;
    //         });
    //     } else {
    //         const evt = new ShowToastEvent({
    //             title: 'Geolocation is not supported by browser',
    //             message: 'Check your browser options or use another browser',
    //             variant: 'error',
    //         });
    //         this.dispatchEvent(evt);
    //     }
    // }

    getLocations(center) {
        getLocations({ centerLat: center.latitude, centerLong: center.longitude })
            .then(result => {
                console.log('SUCCESS!');
                console.log(JSON.parse(JSON.stringify(result)));

                this.locations = result;
                this.locations.forEach(location => {
                    console.log(JSON.parse(JSON.stringify(location)));
                    //location.content = 'Test';
                    //location.content = 'This is ' + location.name + '<br/><di style="text-align:center"><a href="/' + location.locationId + '" target="_blank">View Record</a></div>'
                });
                console.log('-->locations', this.locations);
                this.showMap = true;
            })
            .catch(error => {
                this.error = error;
                console.log('ERROR!');
                console.log(JSON.parse(JSON.stringify(this.error)));
            });
    }

    renderedCallback() {
        if (!this.initiated) {
            // this.getCurrentLocationOnLoad();

            //set london bridge as center for example
            this.center = {};
            this.center.latitude = -37.6092;
            this.center.longitude = 145.10909;
            this.getLocations(this.center);
            this.initiated = true;
        }
    }
}