public class ContactSearch {

    public static List<Contact> searchForContacts(String lastName, String postCode){
        
        return [
            SELECT ID, Name 
            FROM Contact
        	WHERE LastName =: lastName
        	AND MailingPostalCode =: postCode];
    }
}