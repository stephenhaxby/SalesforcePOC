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

    /*
        Handler for the inputs search term change event
        Calls APEX class to get the search results
    */
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

    /*
        Sets the results area's values
    */
    setResult(newValues) {
        this.showSpinner = false;
        if (newValues && newValues.length > 0) {
            this.message = null;
            this.results = newValues;
        } else {
            this.message = 'no results found';
        }
    }

    /*
        Shows and hides the results area
    */
    switchResult(on) {
        this.resultClass = on
            ? 'slds-form-element slds-lookup slds-is-open'
            : 'slds-form-element slds-lookup slds-is-close';
    }

    /*
        Clears the selected record
    */
    handlePillRemove() {
        this.selectedRecord = null;
        this.dispatchSelectionResult();
        // Restore last results
        this.switchResult(this.lastSearchValue && this.results);
    }

    /* 
        Dispatches an event containing the selected record info
    */
    dispatchSelectionResult() {
        let payload = {
            canceled: this.selectedRecord ? false : true,
            recordId: this.selectedRecord ? this.selectedRecord.Id : null,
            value: this.selectedRecord
        };
        let selected = new CustomEvent('recordselected', {
            detail: payload,
            bubbles: true,
            cancelable: true
        });
        this.dispatchEvent(selected);
    }

    /*
        Displays error message and dispatches to a parent
    */
    handleError(error) {
        this.showSpinner = false;
        this.message = "Error returning search results.";
        let errorDispatch = new CustomEvent('failure', { detail: error });
        this.dispatchEvent(errorDispatch);
    }

    /*
        Sets the selected record
    */
    handleRecordSelect(event) {
        this.selectedRecord = event.detail;
        this.dispatchSelectionResult();
        this.switchResult(false);
    }
}
