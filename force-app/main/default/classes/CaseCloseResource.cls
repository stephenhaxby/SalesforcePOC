@RestResource(urlMapping='/case/*/close')
global with sharing class CaseCloseResource {
	
    @HttpPost
    global static void closeCase(String reason){
        
        RestRequest req = RestContext.request;
        String[] uriParts = req.requestURI.split('/');
        
        Set<Id> caseIds = new Set<Id>();
        caseIds.add(uriParts[2]);

        CaseService.closeCases(caseIds, reason);
    }
}