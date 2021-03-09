public with sharing class RequiredDocumentsController {
    
    @AuraEnabled(cacheable = true)
    public static List<RequiredDocument> getRequredDocuments(String productId, Map<String, String> conditionalFields){
        List<RequiredDocument> requiredDocuments = new List<RequiredDocument>();

        //TODO: REPLACE TEST DATA
        RequiredDocument requiredDocument1 = new RequiredDocument('asdf1234', 'Application', 'Some info about the application', '#');
        requiredDocuments.add(requiredDocument1);

        RequiredDocument requiredDocument2 = new RequiredDocument('asdf1235', 'Title', 'Title (Within last 3 months)', '#');
        requiredDocuments.add(requiredDocument2);

        RequiredDocument requiredDocument3 = new RequiredDocument('asdf1236', 'Plans', 'Architectural plans or Developer Approved Plans', '#');
        requiredDocuments.add(requiredDocument3);

        RequiredDocument requiredDocument4 = new RequiredDocument('asdf1237', 'MCP', 'Memorandum of Common Provision (MCP) if referenced as a restriction on title', '#');
        requiredDocuments.add(requiredDocument4);

        String requiredConditionString = '{\"PropertyName\" : \"cost__c\", \"Operator\" : \">\", \"Value\" : \"1076000\", \"Type\" : \"NUMBER\" }';
        RequiredDocumentCondition requiredDocumentCondition = (RequiredDocumentCondition)JSON.deserialize(requiredConditionString, RequiredDocumentCondition.class);

        if(displayRequiredDocument(conditionalFields, requiredDocumentCondition)){
            RequiredDocument requiredDocument5 = new RequiredDocument('asdf1238', 'Metropolitan Planning Levy certificate', 'If the project valued over $1,076,000? If Yes, a current Metropolitan Planning Levy certificate must be provided with this application', '#');
            requiredDocuments.add(requiredDocument5);
        }

        return requiredDocuments;
    }

    @AuraEnabled(cacheable = true)
    public static RequiredPayment getRequiredPayment(){

        //TODO: REPLACE TEST DATA
        return new RequiredPayment('Payment', 'Prescribed application fee', 1726.95);
    }

    private static Boolean displayRequiredDocument(Map<String, String> conditionalFields, RequiredDocumentCondition requiredDocumentCondition){
        if(conditionalFields.containsKey(requiredDocumentCondition.PropertyName)){
            if(requiredDocumentCondition.Type == 'NUMBER'){
                Decimal value = Decimal.valueOf(conditionalFields.get(requiredDocumentCondition.PropertyName));
                Decimal conditionalValue = Decimal.valueOf(requiredDocumentCondition.Value);
                switch on requiredDocumentCondition.Operator {
                    when '>' {
                        return value > conditionalValue;
                    }
                }
            }
        }

        return false;
    }

    public class RequiredDocumentCondition {
        public String PropertyName { get; set; }

        public String Operator { get; set; }

        public String Value { get; set; }

        public String Type { get; set; }
    }

    public class RequiredPayment{
        public RequiredPayment(String name, String description, Decimal amount){
            this.Name = name;
            this.Description = description;
            this.Amount = amount.format();
        }

        @AuraEnabled
        public String Name { get; set; }

        @AuraEnabled
        public String Description { get; set; }

        @AuraEnabled
        public String Amount { get; set; }
    }

    public class RequiredDocument{
        public RequiredDocument(String id, String name, String description, String knowledgeArticleLink){
            this.Id = id;
            this.Name = name;
            this.Description = description;
            this.KnowledgeArticleLink = knowledgeArticleLink;
        }

        @AuraEnabled
        public String Id { get; set; }

        @AuraEnabled
        public String Name { get; set; }

        @AuraEnabled
        public String Description { get; set; }

        @AuraEnabled
        public String KnowledgeArticleLink { get; set; }
    }
}