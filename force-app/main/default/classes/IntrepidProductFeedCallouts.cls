public class IntrepidProductFeedCallouts {
    public static HttpResponse makeGetCallout() {
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://api.peakadventuretravel.com/Feed/FeedService.svc/product/intrepid/9/78A99DEA-BF60-47CF-831D-238C8A6753C3/');
        request.setMethod('GET');
        request.setTimeout(120000);
        request.setHeader('Accept', 'application/xml');
        
        HttpResponse response = http.send(request);

        //NOTE: All this doesn't work as Salesforce only allow 6MB max... Feed is 20+...
        
        /*
        // If the request is successful, parse the JSON response.
        if (response.getStatusCode() == 200) {
            
            XMLSerializer xmlSerilizer = new XMLSerializer();            
            object output = xmlSerilizer.deSerializeUnTyped(response.getBody());

            System.debug(LoggingLevel.ERROR, output);
          }
    	*/
        
        System.debug(LoggingLevel.ERROR, response.getStatusCode());
        System.debug(LoggingLevel.ERROR, response);
        //System.debug(LoggingLevel.ERROR, response.getHeader('Location'));
        
        return response;
    }
}