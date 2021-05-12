import { LightningElement, wire } from 'lwc';
import { reduceErrors } from 'c/ldsUtils';
import FIRSTNAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LASTNAME_FIELD from '@salesforce/schema/Contact.LastName';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';

import getContacts from '@salesforce/apex/ContactController.getContacts';

const COLUMNS = [
    { label: 'First Name', fieldName: FIRSTNAME_FIELD.fieldApiName, type: 'text' },
    { label: 'Last Name', fieldName: LASTNAME_FIELD.fieldApiName, type: 'text' },
    { label: 'Email', fieldName: EMAIL_FIELD.fieldApiName, type: 'text' }
];
export default class ContactList extends LightningElement {
    columns = COLUMNS;
    contacts = [];
    errors;
    @wire(getContacts)
    wiredGetContacts({data, error}) {
        if (data) {
            this.contacts = data;
        } else if (error) {
            //this.errors = error;
            //console.log(JSON.parse(JSON.stringify(this.errors)));
            this.errors = reduceErrors(error);
        }
    }

    // get errors() {
    //     console.log(JSON.parse(JSON.stringify(this.errors)));
    //     return (this.errors) ?        
    //         reduceErrors(this.errors) : [];
    // }
}