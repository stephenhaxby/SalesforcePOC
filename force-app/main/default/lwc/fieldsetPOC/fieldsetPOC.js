import { LightningElement, api, track, wire } from 'lwc';
import getFieldSetFieldsByFieldSetName from '@salesforce/apex/Utilities.getFieldSetFieldsByFieldSetName';
import getFieldSetNames from '@salesforce/apex/Utilities.getFieldSetNames';

import PRODUCT2_OBJECT from '@salesforce/schema/Product2';

export default class FieldsetPOC extends LightningElement {
   
    objectType = PRODUCT2_OBJECT;
    objectApiName = 'Product2';

    @track selectedFormTypeOption;

    @wire(getFieldSetFieldsByFieldSetName, {objectApiName: '$objectApiName', fieldSetName: '$selectedFormTypeOption'})
    wiredFieldsToFetchFieldSet;

    @wire(getFieldSetNames, {objectApiName: '$objectApiName'})
    wiredFieldSetNames;

    //Gets the field sets available for selection
    get formTypeOptions() {
        if (!this.wiredFieldSetNames || !this.wiredFieldSetNames.data) {
            return [];
        }

        var fieldSets = this.wiredFieldSetNames.data;

        var formTypes = [];
        for(var key in fieldSets){
            var item = {
                label: key,
                value: fieldSets[key]
            };
            formTypes.push(item);
        }

        return formTypes;
    }

    //Gets all the fields for the selected Fieldset
    get objectFields() {
        if (!this.wiredFieldsToFetchFieldSet || !this.wiredFieldsToFetchFieldSet.data) {
            return [];
        }

        var fieldSetData = this.wiredFieldsToFetchFieldSet.data;
        var fieldSetValues = [];

        //THIS WON'T WORK!?
        // for(var fieldSetDataItem in fieldSetData) {
        //     fieldSetValues.push(fieldSetDataItem.Path);
        // }

        var i;
        for (i = 0; i < fieldSetData.length; i++) {
            fieldSetValues.push(fieldSetData[i].Path);
        }

        return fieldSetValues;
    }

    getFieldSetFieldPath(fieldSetField){
        return fieldSetField.Path;
    }

    handleFormTypeChange(event){
        this.selectedFormTypeOption = event.detail.value;
        console.log(this.selectedFormTypeOption);
    }

    handleSubmit(event) {
        console.log(event.detail);    
    }    
    handleSuccess(event) {        
        console.log(event.detail);
    }
}
