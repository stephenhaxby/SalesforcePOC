import { LightningElement, track } from 'lwc';

export default class LookupPOC extends LightningElement {

    @track selectedRecordId;

    recordSelected(event){
        this.selectedRecordId = event.detail.recordId;
    }

    handleSaveClick(event){
        console.log('handleSaveClick');
        console.log(this.selectedRecordId);
    }
}