import { LightningElement, track } from 'lwc';

export default class LookupPOC extends LightningElement {

    @track selectedRecordId;

    recordSelected(event){
        console.log('recordSelected');
        
        console.log(event.detail.canceled);//false
        console.log(event.detail.recordId);//0030I00001mXOD6QAO
        console.log(event.detail.value);//proxy
        console.log(event.detail.name);//null

        this.selectedRecordId = event.detail.recordId;
    }

    handleSaveClick(event){
        console.log('handleSaveClick');
        console.log(this.selectedRecordId);
    }
}