public class ContactAndLeadSearch {
    public static List<List<SObject>> searchContactsAndLeads(String searchString){
        
        //sould then find any contact or lead that matches the string as part of 
        //either the first or last name
    
        return [FIND :searchString IN ALL FIELDS 
                                      RETURNING Lead(Name), Contact(FirstName,LastName)];
    }
}