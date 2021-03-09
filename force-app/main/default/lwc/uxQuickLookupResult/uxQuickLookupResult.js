import { LightningElement, api } from 'lwc';

export default class UxQuickLookupResult extends LightningElement {
    @api iconName;
    @api record;
    @api displayField;

    handleOnClick = () => {
        let Id = this.record.Id;        
        let Name = this.record[this.displayField];

        let payload = {
            detail: { Id: Id, Name: Name }
        };
        let selection = new CustomEvent('selection', payload);
        this.dispatchEvent(selection);
    };

    get recordName(){
        return this.record[this.displayField];
    }
}