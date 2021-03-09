import { LightningElement, api, wire, track } from 'lwc';

import getRequiredDocuments from '@salesforce/apex/RequiredDocumentsController.getRequredDocuments';
import getRequiredPayment from '@salesforce/apex/RequiredDocumentsController.getRequiredPayment';

export default class RequiredDocumentList extends LightningElement {
    
    @api productId = '123';
    @api applicationConditionalFields = { cost__c: 1076001 };

    @track requiredDocuments;
    @track requiredPayment;

    @wire(getRequiredDocuments, { productId: '$productId', conditionalFields: '$applicationConditionalFields' })
    wiredRequiredDocuments({ error, data }) {
        if (data) {
            this.requiredDocuments = data;
        } else if (error) {
            let errorDispatch = new CustomEvent('failure', { detail: error });
            this.dispatchEvent(errorDispatch);
        }
    }

    @wire(getRequiredPayment)
    wiredRequredPayment({ error, data }) {
        if (data) {
            this.requiredPayment = data;
        } else if (error) {
            let errorDispatch = new CustomEvent('failure', { detail: error });
            this.dispatchEvent(errorDispatch);
        }
    }

    get displayPaymentRequired(){
        return this.requiredPayment != null;
    }
    
    get paymentHeading(){
        return (this.requiredPayment) ? this.requiredPayment.Name : null;
    }

    get paymentDetails(){
        return (this.requiredPayment) ? this.requiredPayment.Description + ' $' + this.requiredPayment.Amount : null;
    }
}