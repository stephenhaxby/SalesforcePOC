public class Utilities
{
    //FIELD SET FUNCTIONS
    @AuraEnabled(cacheable = true)
    public static Map<String, String> getFieldSetNames(String objectApiName)
    {
        Map<String, Schema.FieldSet> fieldSets = getFieldSets(objectApiName);

        Map<String, String> fieldSetNames = new Map<String, String>();
        
        for (String fieldSetMember : fieldSets.keySet())
        {
            fieldSetNames.put(fieldSets.get(fieldSetMember).label, fieldSetMember);
        }

        return fieldSetNames;
    }

    @AuraEnabled(cacheable = true)
    public static List<FieldSetField> getFieldSetFieldsByFieldSetName(String objectApiName, String fieldSetName)
    {
        List<Schema.FieldSetMember> fieldSetMembers = getFieldSets(objectApiName).get(fieldSetName).getFields();
        Map<String, Schema.SObjectField> fieldDescribeTokens = Schema.getGlobalDescribe().get(objectApiName).getDescribe().fields.getMap();

        List<FieldSetField> fields = new List<FieldSetField>();

        for (Schema.FieldSetMember fieldSetMember : fieldSetMembers)
        {
            fields.add(new FieldSetField(fieldSetMember, fieldDescribeTokens.get(fieldSetMember.getFieldPath()).getDescribe().getInlineHelpText()));
        }

        return fields;
    }

    private static Map<String, Schema.FieldSet> getFieldSets(String objectApiName)
    {
        return ((SObject)Type.forName(objectApiName).newInstance()).getSObjectType().getDescribe().FieldSets.getMap();
    }

    //CUSTOM METADATA FUNCTIONS
    @AuraEnabled(cacheable = true)
    public static Map<String, String> productConfigurationGetAll(){
        List<ProductConfiguration__mdt> productConfigurations = [
            SELECT Label, DeveloperName
            FROM ProductConfiguration__mdt
        ];

        Map<String, String> configurations = new Map<String, String>();

        for(ProductConfiguration__mdt productConfiguration : productConfigurations){
            configurations.put(productConfiguration.DeveloperName, productConfiguration.Label);
        }

        return configurations;
    }

    @AuraEnabled(cacheable = true)
    public static ProductConfigurations productConfigurationsGet(String name){
        ProductConfiguration__mdt productConfigurationMetadata = [
            SELECT Label, DeveloperName, Configuration__c
            FROM ProductConfiguration__mdt
            WHERE DeveloperName = :name
        ];

        ProductConfigurations productConfigurations = 
            (ProductConfigurations)JSON.deserialize(productConfigurationMetadata.Configuration__c, ProductConfigurations.class);

        Map<String, Schema.SObjectField> fieldDescribeTokens = Schema.getGlobalDescribe().get('Product2').getDescribe().fields.getMap();

        for(ProductConfiguration productConfiguration : productConfigurations.ProductConfigurations){

            productConfiguration.ProductSectionConfigurations = new List<ProductSectionConfiguration>();

            List<ProductSectionConfiguration> productSectionConfigurations = 
                productSectionConfigurationsGet(productConfiguration.ProductSectionConfiguration).ProductSectionConfigurations;

            for(ProductSectionConfiguration productSectionConfiguration : productSectionConfigurations){

                Schema.DescribeFieldResult field = fieldDescribeTokens.get(productSectionConfiguration.FieldName).getDescribe();
                
                productSectionConfiguration.Label = field.getLabel();
                productSectionConfiguration.Type = field.getType().name();

                if(field.getType().name() == 'PICKLIST'){
                    productSectionConfiguration.PicklistValues = new Map<String,String>();

                    List<Schema.PicklistEntry> picklistFields = field.getPicklistValues();

                    for(Schema.PicklistEntry picklistEntry : picklistFields){
                        productSectionConfiguration.PicklistValues.put(picklistEntry.value, picklistEntry.label);
                    }
                }
            }

            productConfiguration.ProductSectionConfigurations.addAll(productSectionConfigurations);
        }

        return productConfigurations;
    }

    @AuraEnabled(cacheable = true)
    public static ProductSectionConfigurations productSectionConfigurationsGet(String name){
        ProductSectionConfiguration__mdt productSectionConfiguration = [
            SELECT Label, DeveloperName, Configuration__c
            FROM ProductSectionConfiguration__mdt
            WHERE DeveloperName = :name
        ];

        ProductSectionConfigurations productSectionConfigurations = 
            (ProductSectionConfigurations)JSON.deserialize(productSectionConfiguration.Configuration__c, ProductSectionConfigurations.class);
        
        return productSectionConfigurations;
    }
}