import { LightningElement, track, wire } from 'lwc';

import getAccounts from '@salesforce/apex/ExploreCustomAccountController.getAccounts';
const DELAY = 300;

export default class LookupTwoPOC extends LightningElement {
    @track search = '';
    @track error;

    @track selectedAccount;
    @track showAccountsListFlag = false;

    @wire(getAccounts, { searchText: '$search' })
    accounts;

    handleKeyUp(event) {
        console.log('handleKeyUp');

        if (!this.showAccountsListFlag) {
            console.log('1');

            this.showAccountsListFlag = true;
            this.template
                .querySelector('.accounts_list')
                .classList.remove('slds-hide');
        }
        console.log('2');
        window.clearTimeout(this.delayTimeout);
        const searchKey = event.target.value;

        console.log(searchKey);

        // eslint-disable-next-line @lwc/lwc/no-async-operation
        this.delayTimeout = setTimeout(() => {
            this.search = searchKey;
            console.log('3');
            console.log(this.search);
        }, DELAY);
    }

    handleOptionSelect(event) {
        this.selectedAccount = event.currentTarget.dataset.name;
        this.template
            .querySelector('.selectedOption')
            .classList.remove('slds-hide');
        this.template
            .querySelector('.accounts_list')
            .classList.add('slds-hide');
        this.template
            .querySelector('.slds-combobox__form-element')
            .classList.add('slds-input-has-border_padding');
    }

    handleRemoveSelectedOption() {
        this.template
            .querySelector('.selectedOption')
            .classList.add('slds-hide');
        this.template
            .querySelector('.slds-combobox__form-element')
            .classList.remove('slds-input-has-border_padding');

        this.showAccountsListFlag = false;
    }
}