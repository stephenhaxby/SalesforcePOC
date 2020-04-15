public class ProductConfiguration {

    @AuraEnabled
    public String Label { get; set; }

    @AuraEnabled
    public String ProductSectionConfiguration { get; set; }

    // @AuraEnabled
    // public List<ProductSectionConfiguration> ProductSectionConfigurations { get; set; }

    public ProductConfiguration() {

    }
}
