import { LightningElement, api } from 'lwc';

export default class UxDebouncedInput extends LightningElement {
    @api label = 'Lookup';
    @api placeholder = '';
    @api delay = 300;
    @api value;
    @api fieldName = null;

    constructor() {
        super();
        this.timeout = null;
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
        let eventName = this.fieldName ? 'valueChanged' : 'change';
        let payload = this.fieldName
            ? { name: this.fieldName, value: this.changedValue }
            : changedValue;
        let customChange = new CustomEvent(eventName, {
            detail: payload,
            bubbles: true,
            cancelable: true
        });
        this.dispatchEvent(customChange);
    }
}
