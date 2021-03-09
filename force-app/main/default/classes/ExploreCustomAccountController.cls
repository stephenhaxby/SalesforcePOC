public class ExploreCustomAccountController {
    
    @AuraEnabled
    public static List<Account> getAccounts(String searchText){

        System.debug('getAccounts: ' + searchText);

        return [
            SELECT Id, Name, AccountNumber
            FROM Account
            WHERE Name LIKE :searchText
        ];
    }
}