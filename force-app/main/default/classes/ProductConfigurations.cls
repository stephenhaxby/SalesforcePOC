public class ProductConfigurations {

    @AuraEnabled
    public List<ProductConfiguration> ProductConfigurations { get; set; }

    public ProductConfigurations() {
        ProductConfigurations = new List<ProductConfiguration>();
    }
}
