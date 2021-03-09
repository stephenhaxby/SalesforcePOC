import { LightningElement, api } from 'lwc';

export default class RequiredDocument extends LightningElement {
    @api name;
    @api description;
    @api knowledgeArticleLink;
    @api iconName;
}