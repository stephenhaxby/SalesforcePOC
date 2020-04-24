import { LightningElement, track } from 'lwc';

export default class LookupPOC extends LightningElement {

    @track selectedRecordId;
    @track validApplication = true;

    @track lotSize;
    @track lotSizeDisplay = '';
    @track zoning;
    @track zoningDisplay = '';

    @track metropolitanPlanningLevyCertificateRequired = false;

    @track numberOfDwellings;
    @track estimatedCost;

    recordSelected(event){
        // console.log(event.detail.canceled);
        // console.log(event.detail.recordId);
        // console.log(event.detail.value);

        this.selectedRecordId = event.detail.recordId;

        //TODO: To come from MuleSoft Integration
        this.lotSize = 290;
        this.lotSizeDisplay = this.lotSize + 'm2';

        this.zoning = 'CDZ1'
        this.zoningDisplay = 'Comprehensive Development Zone (Schedule 1) Epping';
    }

    get displayPropertyInformation(){
        return this.selectedRecordId;
    }

    get displayRequiredToApply(){
        console.log('displayRequiredToApply');
        return this.selectedRecordId
            && this.numberOfDwellings
            && this.estimatedCost;
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

        this.numberOfDwellings = event.detail.value;
    }

    estimatedCostChange(event){
        this.estimatedCost = event.detail.value;

        if(event.detail.value){
            this.metropolitanPlanningLevyCertificateRequired = event.detail.value > 1076000;
        }
        else {
            this.metropolitanPlanningLevyCertificateRequired = false;
        }
    }
}