import { LightningElement, track } from 'lwc';

export default class LookupPOC extends LightningElement {

    @track selectedRecordId;
    @track validApplication = true;

    recordSelected(event){
        console.log(event.detail.canceled);
        console.log(event.detail.recordId);
        console.log(event.detail.value);

        this.selectedRecordId = event.detail.recordId;
    }

    handleSaveClick(event){
        console.log(this.selectedRecordId);
    }

    numberOfDwellingsChange(event){
        if(event.detail.value){
            this.validApplication = event.detail.value === "1";    
        }
        else {
            this.validApplication = true;
        }
    }

    estimatedCostChange(event){

    }
}