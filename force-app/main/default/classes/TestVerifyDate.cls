@IsTest
private class TestVerifyDate {	
    @IsTest
    static void CheckDates(){
		//within 30
        Date date1 = system.today();
        Date date2 = system.today().addDays(5);
        String returnValue = String.valueOf(VerifyDate.CheckDates(date1, date2));
            
        //not within 30 
        Date date3 = system.today();
        Date date4 = system.today().addDays(35);        
        String returnValue2 = String.valueOf(VerifyDate.CheckDates(date3, date4));
    }
}