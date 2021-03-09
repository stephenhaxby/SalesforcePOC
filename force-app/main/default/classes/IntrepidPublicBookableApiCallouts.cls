public class IntrepidPublicBookableApiCallouts {
    public static HttpResponse makeGetCallout() {
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://api.intrepidgroup.travel/products/109215/Departures/');
        request.setMethod('GET');
        request.setTimeout(120000);
        request.setHeader('X-Api-Key', '78A99DEA-BF60-47CF-831D-238C8A6753C3');
        request.setHeader('Accept', 'application/json');
        request.setHeader('Content-Type', 'application/json');
        
        HttpResponse response = http.send(request);
        
        //Un-Typed
        if (response.getStatusCode() == 200) { 
			//Deserialize JSON into a String Map
            Map<String, Object> results = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());

            //We know we have a list of 'departures' so get those and loop over them
            List<Object> departures = (List<Object>) results.get('departures');
            for (Object departure: departures) {
                //Cast the departure into another String Map
                Map<String, Object> departureMap = (Map<String, Object>)departure;
                
                //Read out each property by it's string name
                System.debug(LoggingLevel.ERROR, departureMap.get('code')); 
            } 
        }
        
        //Typed (IntrepidGroupDepartureAvailability class was generated using http://json2apex.herokuapp.com/)
        if (response.getStatusCode() == 200) { 
            IntrepidGroupDepartureAvailability departures = 
                (IntrepidGroupDepartureAvailability) JSON.deserialize(response.getBody(), IntrepidGroupDepartureAvailability.class);
            
            for(IntrepidGroupDepartureAvailability.Departures departure: departures.Departures){
                System.debug(LoggingLevel.ERROR, departure.code);
            }
        }
                
        return response;
    }	
}