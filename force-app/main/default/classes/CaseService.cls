public class CaseService {
    public static void closeCases(Set<Id> caseIds, String closeReason){
        
        List<Case> cases = [
            SELECT Id 
            FROM Case 
            WHERE Id IN : caseIds
        ];
        
        for(Case caseToClose : cases){
            caseToClose.Status = 'Closed';
            caseToClose.Reason = closeReason;
        }
        
        update cases;
    }
}