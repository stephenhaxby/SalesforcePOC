import { LightningElement, api, track } from 'lwc';
import fetchExtendedLookUpValues from '@salesforce/apex/CustomLookUpController.fetchExtendedLookUpValues';

export default class UxQuickLookup extends LightningElement {
    @api objectApiName;
    @api iconName;
    @api label = 'Lookup';
    @api placeholder = '';
    @api queryField = null;
    @api fieldName;

    @track resultClass;
    @track selectedRecord = null;
    @track results = null;
    @track message = null;
    @track showSpinner = false;
    @track lastSearchValue;

    constructor() {
        super();
        this.switchResult(false);
    }

    handleSearchTerm(event) {
        let searchValue = event.detail;
        if (searchValue) {
            this.switchResult(true);
            this.message = 'Searching...';
            this.showSpinner = true;
            let searchParams = {
                searchKeyWord: searchValue,
                objectName: this.objectApiName,
                queryField: this.queryField
            };

            fetchExtendedLookUpValues(searchParams)
                .then(result => this.setResult(result))
                .catch(error => this.handleError(error));

        } else {
            this.switchResult(false);
            this.message = null;
            this.showSpinner = false;
            this.results = null;
        }
        this.lastSearchValue = searchValue;
    }

    setResult(newValues) {
        this.showSpinner = false;
        if (newValues && newValues.length > 0) {
            this.message = null;
            console.log(newValues);
            this.results = newValues;
        } else {
            this.message = 'no results found';
        }
    }

    /* Shows and hides the result area */
    switchResult(on) {
        this.resultClass = on
            ? 'slds-form-element slds-lookup slds-is-open'
            : 'slds-form-element slds-lookup slds-is-close';
    }

    handlePillRemove() {
        this.selectedRecord = null;
        this.dispatchSelectionResult();
        // Restore last results
        this.switchResult(this.lastSearchValue && this.results);
    }

    /* Sends back the result of a selection, compatible to extendedForm
       when the property fieldName is set
    */
    dispatchSelectionResult() {
        let eventName = this.fieldName ? 'valueChanged' : 'recordselected';
        let payload = {
            canceled: this.selectedRecord ? false : true,
            recordId: this.selectedRecord ? this.selectedRecord.Id : null,
            value: this.selectedRecord,
            name: this.fieldName
        };
        let selected = new CustomEvent(eventName, {
            detail: payload,
            bubbles: true,
            cancelable: true
        });
        this.dispatchEvent(selected);
    }

    handleError(error) {
        this.showSpinner = false;
        this.message = "Sorry didn't work!";
        let errorDispatch = new CustomEvent('failure', { detail: error });
        this.dispatchEvent(errorDispatch);
    }

    handleRecordSelect(event) {
        this.selectedRecord = event.detail;
        this.dispatchSelectionResult();
        this.switchResult(false);
    }
}
