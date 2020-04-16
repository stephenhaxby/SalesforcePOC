public class ProductSectionConfiguration {

    //Enriched fields
    @AuraEnabled
    public String Label { get; set; }

    @AuraEnabled
    public String Type { get; set; }

    @AuraEnabled
    public String InputType { get {
        switch on Type {
            when 'BOOLEAN' {
                return 'checkbox';
            }
            //STRING
            when else {
                return 'text';
            }
        }
    }}

    @AuraEnabled
    public Boolean IsInput {
        get {
            return Type == 'STRING';
        }
    }

    @AuraEnabled
    public Boolean IsCombobox {
        get {
            return Type == 'PICKLIST';
        }
    }

    @AuraEnabled
    public Boolean IsCheckbox {
        get {
            return Type == 'BOOLEAN';
        }
    }

    @AuraEnabled
    public Map<String, String> PicklistValues { get; set; }

    //JSON fields
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
