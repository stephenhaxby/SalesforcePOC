public with sharing class CustomLookUpController {
    @AuraEnabled
    public static List<sObject> fetchExtendedLookUpValues(String searchKeyWord, String objectName, String queryField) {

        System.debug('searchKeyWord: ' + searchKeyWord);
        System.debug('objectName: ' + objectName);
        System.debug('queryField: ' + queryField);
       
        List<sObject> returnList = new List <sObject>();
      
        String sQuery =  'select Id,Name,'+  queryField + ' from ' + objectName + ' where ' + queryField + ' LIKE \'%' + searchKeyWord + '%\' LIMIT 10';
        
        System.debug(sQuery);

        try {
            List <sObject> lstOfRecords = Database.query(sQuery);
            for (sObject obj: lstOfRecords) {
                returnList.add(obj);
            }
        } catch (Exception e) {
            throw new AuraHandledException('That didn\'n work:'+sQuery+'\n'+e.getMessage());
        }
        return returnList;
    }
}
