import { LightningElement, track } from 'lwc';

export default class LookupPOC extends LightningElement {

    @track selectedRecordId;

    recordSelected(event){
        console.log(event.detail.canceled);
        console.log(event.detail.recordId);
        console.log(event.detail.value);

        this.selectedRecordId = event.detail.recordId;
    }

    handleSaveClick(event){
        console.log(this.selectedRecordId);
    }
}