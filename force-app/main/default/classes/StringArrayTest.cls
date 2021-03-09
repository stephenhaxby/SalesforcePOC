public class StringArrayTest {
    public static List<String> generateStringArray(Integer numberOfStrings){
        List<String> results = new List<String>();
        
        for(Integer i = 0; i < numberOfStrings; i++){
            results.add('Test ' + i);
        }
        
        return results;
    }
}