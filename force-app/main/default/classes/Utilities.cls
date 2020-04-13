public class Utilities
{
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
}