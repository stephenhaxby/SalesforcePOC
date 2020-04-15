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
        console.log(data);

        var productConfigurations = {
            ProductConfigurations : []
        };

        for(var i = 0; i < data.ProductConfigurations.length; i++) {

            var productConfiguration = data.ProductConfigurations[i];

            var newProductConfiguration = {
                Label : productConfiguration.Label,
                ProductSectionConfiguration : productConfiguration.ProductSectionConfiguration,
                ProductSectionConfigurations : []
            }

            for(var j = 0; j < productConfiguration.ProductSectionConfigurations.length; j++){
                var productSectionConfiguration = productConfiguration.ProductSectionConfigurations[j];

                var picklistValues = [];
                for(var key in productSectionConfiguration.PicklistValues){
                    var item = {
                        label: key,
                        value: productSectionConfiguration.PicklistValues[key]
                    };
                    picklistValues.push(item);
                }

                var newProductSectionConfiguration = {
                        Label : productSectionConfiguration.Label,
                        FieldName : productSectionConfiguration.FieldName,
                        Required : productSectionConfiguration.Required,
                        InputType : productSectionConfiguration.InputType,
                        IsInput : productSectionConfiguration.IsInput,
                        IsCombobox : productSectionConfiguration.IsCombobox,
                        PicklistValues : picklistValues
                    }
                    
                newProductConfiguration.ProductSectionConfigurations.push(newProductSectionConfiguration);
            }

            productConfigurations.ProductConfigurations.push(newProductConfiguration);
        }

        console.log('3');
        console.log(productConfigurations);

        //this.trackedProductConfigurations = data.ProductConfigurations;
        this.trackedProductConfigurations = productConfigurations.ProductConfigurations;
    }
}