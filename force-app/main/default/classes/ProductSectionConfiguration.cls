public class ProductSectionConfiguration {

    @AuraEnabled
    public String FieldName { get; set; }

    @AuraEnabled
    public Boolean Required { get; set; }

    @AuraEnabled
    public VisibilityCondition VisibilityCondition { get; set; }

    @AuraEnabled
    public RequiredCondition RequiredCondition { get; set; }

    public ProductSectionConfiguration() {

    }

    public class VisibilityCondition {

        @AuraEnabled
        public String DependantField { get; set; }

        @AuraEnabled
        public Condition Condition { get; set; }
    }

    public class RequiredCondition {

        @AuraEnabled
        public String DependantField { get; set; }

        @AuraEnabled
        public Condition Condition { get; set; }
    }

    public class Condition {

        @AuraEnabled
        public String Type { get; set; }

        @AuraEnabled
        public String Operator { get; set; }

        @AuraEnabled
        public String Value { get; set; }
    }
}
