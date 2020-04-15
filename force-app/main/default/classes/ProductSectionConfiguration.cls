public class ProductSectionConfiguration {

    public String FieldName { get; set; }
    public Boolean Required { get; set; }
    public VisibilityCondition VisibilityCondition { get; set; }
    public RequiredCondition RequiredCondition { get; set; }

    public ProductSectionConfiguration() {

    }

    public class VisibilityCondition {
        public String DependantField { get; set; }
        public Condition Condition { get; set; }
    }

    public class RequiredCondition {
        public String DependantField { get; set; }
        public Condition Condition { get; set; }
    }

    public class Condition {
        public String Type { get; set; }
        public String Operator { get; set; }
        public String Value { get; set; }
    }
}
