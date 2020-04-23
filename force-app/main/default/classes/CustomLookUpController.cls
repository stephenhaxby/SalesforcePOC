public with sharing class CustomLookUpController {
    @AuraEnabled
    public static List<sObject> fetchExtendedLookUpValues(String searchKeyWord, String objectName, String queryField) {
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
}
