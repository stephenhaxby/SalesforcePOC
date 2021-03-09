import { LightningElement, api, track } from 'lwc';

export default class UxDebouncedInput extends LightningElement {
    @api label = 'Lookup';
    @api placeholder = '';
    @api delay = 300;
    @api value;
    @api required = false;

    constructor() {
        super();
        this.timeout = null;
    }

    /*
        highlight field when lose focus and no value is entered
    */
    handleBlur(event) {
        if(this.value === ''){
            event.target.classList.add('slds-has-error');
            event.target.classList.add('isRequiredValid');
        }
    }

    /*
        onchange event handler
        Looks after debouncing
    */
    handleChange(event) {
        event.stopPropagation();
        window.clearTimeout(this.timeout);
        let searchTerm = event.target.value;
        this.timeout = window.setTimeout(() => {
            this.fireChange(searchTerm);
        }, this.delay);
    }

    /*
        Dispatches an event containing the search term
    */
    fireChange(changedValue) {
        let customChange = new CustomEvent('change', {
            detail: changedValue,
            bubbles: true,
            cancelable: true
        });
        this.dispatchEvent(customChange);
    }
}