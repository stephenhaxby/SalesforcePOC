import { LightningElement, api, track, wire } from 'lwc';

import getProductConfigurationNames from '@salesforce/apex/Utilities.productConfigurationGetAll';
import productConfigurationsGet from '@salesforce/apex/Utilities.productConfigurationsGet';
import productSectionConfigurationsGet from '@salesforce/apex/Utilities.productSectionConfigurationsGet';

import PRODUCT2_OBJECT from '@salesforce/schema/Product2';

export default class CustomMetadataPOC extends LightningElement {

    objectType = PRODUCT2_OBJECT;
    objectApiName = 'Product2';

    @track selectedFormTypeOption;
    @track trackedProductConfigurations = [];
    @track currentProductConfigurations;

    @wire(productConfigurationsGet, {name: '$selectedFormTypeOption'})
    myWireFunction({data, error}){
        if(data){
            console.log('1');
            console.log(data);
        }
        
        this.currentProductConfigurations = data;

        this.setProductConfigurations(data);
    }

    @wire(getProductConfigurationNames)
    wiredProductConfigurationNames;

    // //Gets the field sets available for selection
    get formTypeOptions() {
         if (!this.wiredProductConfigurationNames || !this.wiredProductConfigurationNames.data) {
             return [];
         }

        var fieldSets = this.wiredProductConfigurationNames.data;

        var formTypes = [];
        for(var key in fieldSets){
            var item = {
                label: fieldSets[key],
                value: key
            };
            formTypes.push(item);
        }

        return formTypes;
    }

    handleFormTypeChange(event){
        this.selectedFormTypeOption = event.detail.value;
    }

    setProductConfigurations(data) { 
        if(!data){
            return;
        }

        console.log('2');
        // console.log(data);

        // var i;
        // for (i = 0; i < data.ProductConfigurations.length; i++) {
        //     console.log(data.ProductConfigurations[i]);
        // }

        this.trackedProductConfigurations = data.ProductConfigurations;
    }
}