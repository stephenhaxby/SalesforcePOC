public class ProductHelper {
    @AuraEnabled(cacheable = true)
    public static Product2 getProduct(String recordId){
        //01t0I000006x2QfQAI	
        Product2 product = [
            SELECT Id, ProductConfiguration__c, CheckboxField__c, TextFieldOne__c, TextFieldTwo__c, TextFieldThree__c
            FROM Product2
            WHERE Id = :recordId
        ];

        return product;
    }
}