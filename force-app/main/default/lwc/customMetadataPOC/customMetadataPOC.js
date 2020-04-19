import { LightningElement, api, track, wire } from 'lwc';

import getProductConfigurationNames from '@salesforce/apex/Utilities.productConfigurationGetAll';
import productConfigurationsGet from '@salesforce/apex/Utilities.productConfigurationsGet';
import getProduct from '@salesforce/apex/ProductHelper.getProduct';

import PRODUCT2_OBJECT from '@salesforce/schema/Product2';

export default class CustomMetadataPOC extends LightningElement {

    objectType = PRODUCT2_OBJECT;
    objectApiName = 'Product2';

    @api recordId;

    @track selectedFormTypeOption;
    @track trackedProductConfigurations = [];
    @track currentProductConfigurations;
    @track readOnlyMode = true;
    @track boarderBottom = 'borderBotton'

    product;

    @wire(getProduct, { recordId: '$recordId'})
    myProductWireFunction({data, error}){
        if(data){
            this.product = data;
            console.log(this.product);
            this.selectedFormTypeOption = data.ProductConfiguration__c;
        }
    }

    @wire(productConfigurationsGet, { name: '$selectedFormTypeOption' })
    myWireFunction({data, error}){
        this.currentProductConfigurations = data;
        this.setProductConfigurations(data);
    }

    @wire(getProductConfigurationNames)
    wiredProductConfigurationNames;

    get editIconVisible(){
        return !this.readOnlyMode;
    }

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
                        IsCheckbox : productSectionConfiguration.IsCheckbox,
                        PicklistValues : picklistValues,
                        Value : this.product[productSectionConfiguration.FieldName]
                    }
                    
console.log(newProductSectionConfiguration);

                newProductConfiguration.ProductSectionConfigurations.push(newProductSectionConfiguration);

                //console.log(productSectionConfiguration.Type);
            }

            productConfigurations.ProductConfigurations.push(newProductConfiguration);
        }

        //this.trackedProductConfigurations = data.ProductConfigurations;
        this.trackedProductConfigurations = productConfigurations.ProductConfigurations;
    }

    handleEditClick(event) {
        this.readOnlyMode = false;
        this.boarderBottom = '';
    }

    handleSaveClick(event){
        this.readOnlyMode = true;
        this.boarderBottom = 'borderBotton';
    }

    handleCancelClick(event){
        this.readOnlyMode = true;
        this.boarderBottom = 'borderBotton';
    }
}