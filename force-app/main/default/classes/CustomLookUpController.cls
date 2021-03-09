public with sharing class CustomLookUpController {
    @AuraEnabled
    public static List<sObject> fetchExtendedLookUpValues(String searchKeyWord, String objectName, String queryField) {

        List<sObject> externalObjects = fetchExternalLookUpValues(searchKeyWord, objectName, queryField);

        return (externalObjects.size() != 0) ? externalObjects : fetchInternalLookUpValues(searchKeyWord, objectName, queryField);
    }

    public static List<sObject> fetchInternalLookUpValues(String searchKeyWord, String objectName, String queryField){
        List<sObject> returnList = new List <sObject>();
      
        String sQuery = 'select Id,'+  queryField + ' from ' + objectName + ' where ' + queryField + ' LIKE \'%' + searchKeyWord + '%\' LIMIT 10';

        try {
            List <sObject> lstOfRecords = Database.query(sQuery);
            for (sObject obj: lstOfRecords) {
                returnList.add(obj);
            }
        } 
        catch (Exception e) {
            throw new AuraHandledException('There was an error performing search for query: ' + sQuery + '\n' + e.getMessage());
        }

        return returnList;
    }

    //TODO: Perhaps remove this to a factory
    private static List<sObject> fetchExternalLookUpValues(String searchKeyWord, String objectName, String queryField){
        switch on objectName {
            when 'Contact' {
                return fetchExternalContacts(searchKeyWord, queryField);
            }
            when else {
                return new List<SObject>();
            }
        }
    }

    private static List<sObject> fetchExternalContacts(String searchKeyWorad, String queryField){
        MuleSoftResultExampleResults muleSoftResultExampleResults = new MuleSoftResultExampleResults();

        List<sObject> contacts = new List<Contact>();

        for (MuleSoftResultExample result : muleSoftResultExampleResults.ExampleResults) {
            Contact convertedContact = getConvertedContact(result);

            String searchFieldValue = String.valueOf(convertedContact.get(queryField));

            if(searchFieldValue.containsIgnoreCase(searchKeyWorad)){
                contacts.add(convertedContact);
            }
        }

        return contacts;
    }

    private static Contact getConvertedContact(MuleSoftResultExample result){
        Contact contact = new Contact(
            StreetNumber__c = result.StreetNumber,
            StreetName__c = result.StreetName,
            Suburb__c = result.Suburb,
            PostalCode__c = result.PostalCode
        );

        contact.recalculateFormulas();

        return contact;
    }

    private static List<Contact> getConvertedContacts(List<MuleSoftResultExample> results){
        List<Contact> contacts = new List<Contact>();

        for (MuleSoftResultExample result : results) {
            contacts.add(getConvertedContact(result));
        }

        return contacts;
    }

    public class MuleSoftResultExampleResults{
        public List<MuleSoftResultExample> ExampleResults { get; set; }

        MuleSoftResultExampleResults(){
            ExampleResults = new List<MuleSoftResultExample>();

            MuleSoftResultExample address1 = new MuleSoftResultExample();
            address1.StreetNumber = '75';
            address1.StreetName = 'Francis Street';
            address1.Suburb = 'Yarraville';
            address1.PostalCode = '3013';
            ExampleResults.add(address1);

            MuleSoftResultExample address2 = new MuleSoftResultExample();
            address2.StreetNumber = '77';
            address2.StreetName = 'Francis Street';
            address2.Suburb = 'Yarraville';
            address2.PostalCode = '3013';
            ExampleResults.add(address2);
        }
    }

    public class MuleSoftResultExample{
        //StreetNumber__c & " " & StreetName__c & " " & Suburb__c & " " & PostalCode__c
        public String StreetNumber { get; set; }
        public String StreetName { get; set; }
        public String Suburb { get; set; }
        public String PostalCode { get; set; }
    }
}