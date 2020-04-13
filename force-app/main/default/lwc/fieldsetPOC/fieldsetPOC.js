import { LightningElement, api, track, wire } from 'lwc';
import getFieldSetFieldsByFieldSetName from '@salesforce/apex/Utilities.getFieldSetFieldsByFieldSetName';
import getFieldSetNames from '@salesforce/apex/Utilities.getFieldSetNames';

import PRODUCT2_OBJECT from '@salesforce/schema/Product2';

export default class FieldsetPOC extends LightningElement {
   
    objectType = PRODUCT2_OBJECT;
    objectApiName = 'Product2';

    @track selectedFormTypeOption;
    @track trackedFieldsetValues = [];
    @track currentFieldSetValues;

    @wire(getFieldSetFieldsByFieldSetName, {objectApiName: '$objectApiName', fieldSetName: '$selectedFormTypeOption'})
    myWireFunction({data, error}){
        this.currentFieldSetValues = data;
        
        this.setFieldSetValues(this.currentFieldSetValues);
    }

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
    setFieldSetValues(data) {
        // if (!this.wiredFieldsToFetchFieldSet || !this.wiredFieldsToFetchFieldSet.data) {
        //     this.trackedFieldsetValues = [];
        // }

        if(!data){
            return;
        }

        var fieldSetData = data;
        var fieldSetValues = [];

        //THIS WON'T WORK!?
        // for(var fieldSetDataItem in fieldSetData) {
        //     fieldSetValues.push(fieldSetDataItem.Path);
        // }

        var i;
        for (i = 0; i < fieldSetData.length; i++) {
            //HAVE TO CONVERT THIS INTO A NEW OBJECT SO WE CAN UPDATE IT
            var newFieldSetField = {
                InputType : fieldSetData[i].InputType,
                Required : fieldSetData[i].Required,
                Label : fieldSetData[i].Label,
                Path : fieldSetData[i].Path,
                Type : fieldSetData[i].Type,
                HelpText : fieldSetData[i].HelpText
            };

            if(newFieldSetField.HelpText) {
                var helpTextObject = JSON.parse(newFieldSetField.HelpText);

                const parentElement = this.template.querySelector("lightning-input[data-id=" + helpTextObject.parent + "]");
                if(parentElement && parentElement.checked) {
                    newFieldSetField.Required = true;
                }
                else {
                    continue;
                }
            }

            //console.log(newFieldSetField);

            fieldSetValues.push(newFieldSetField);
        }

        this.trackedFieldsetValues = fieldSetValues;
    }

    updateFieldValue(event) {
        // const fieldLabel = event.target.label || '';
        // const updatedValue = event.target.value || '';
        // const updatedField = this.updatedFields.find(f => f.label.toLowerCase() === fieldLabel.toLowerCase());

        this.setFieldSetValues(this.currentFieldSetValues);
    }

    getFieldSetFieldPath(fieldSetField){
        return fieldSetField.Path;
    }

    handleFormTypeChange(event){
        this.selectedFormTypeOption = event.detail.value;
    }

    handleSubmit(event) {
        console.log(event.detail);    
    }    
    handleSuccess(event) {        
        console.log(event.detail);
    }
}
