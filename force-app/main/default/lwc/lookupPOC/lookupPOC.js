import { LightningElement, track } from 'lwc';

export default class LookupPOC extends LightningElement {

    @track selectedRecordId;
    @track metropolitanPlanningLevyCertificateRequired = false;

    @track lotSize;
    @track lotSizeDisplay = '';
    @track zoning;
    @track zoningDisplay = '';   

    @track numberOfDwellings;
    @track estimatedCost;

    maxMPC = 1076000;
    maxNumberOfDwellings = 1;
    maxLotSize = 300;
    aloudZones = ['CDZ1', 'CDZ3', 'CDZ4', 'GRZ1'];

    get displayPropertyInformation(){
        return this.selectedRecordId;
    }

    get displayRequiredToApply(){
        return this.selectedRecordId
            && this.numberOfDwellings
            && this.estimatedCost;
    }

    get validApplication(){
        //// aloudZones = ['CDZ1', 'CDZ3', 'CDZ4', 'GRZ1'];

        return this.numberOfDwellingsValid()
            && this.lotSizeValid()
            && this.estimatedCostValid()
            && (this.selectedRecordId);
    }

    //EVENTS
    recordSelected(event){
        this.selectedRecordId = event.detail.recordId;

        //TODO: To come from MuleSoft Integration
        this.lotSize = 290;
        this.lotSizeDisplay = this.lotSize + 'm2';

        this.zoning = 'CDZ1'
        this.zoningDisplay = 'Comprehensive Development Zone (Schedule 1) Epping';
    }

    handleSaveClick(event){
        console.log(this.selectedRecordId);
    }

    numberOfDwellingsChange(event){
        this.numberOfDwellings = event.detail.value;
    }

    estimatedCostChange(event){
        this.estimatedCost = event.detail.value;

        if(event.detail.value){
            this.metropolitanPlanningLevyCertificateRequired = event.detail.value > this.maxMPC;
        }
        else {
            this.metropolitanPlanningLevyCertificateRequired = false;
        }
    }

    //HELPER METHODS
    numberOfDwellingsValid(){
        return this.numberOfDwellings && parseInt(this.numberOfDwellings) == this.maxNumberOfDwellings;
    }

    lotSizeValid(){
        return this.lotSize && this.lotSize < this.maxLotSize;
    }

    estimatedCostValid(){
        return this.estimatedCost && parseInt(this.estimatedCost) > 0;
    }
}