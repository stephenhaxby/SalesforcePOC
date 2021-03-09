public class BusScheduleCache {

    private Cache.OrgPartition part;
    
    public BusScheduleCache(){
        part = new Cache.OrgPartition('local.BusSchedule');
    }
    
    public void putSchedule(String busLine, Time[] schedule){
        part.put(busLine, schedule); 
    }
    
    public Time[] getSchedule(String busLine){
		
        Time[] cacheValue = (Time[])part.get(busLine);
        if(cacheValue == null){
            cacheValue = new List<Time>{
                Time.newInstance(8, 0, 0, 0),
                Time.newInstance(17, 0, 0, 0)};
        }
        return cacheValue;
    }
}