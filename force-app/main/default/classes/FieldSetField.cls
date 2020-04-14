public class FieldSetField {

    @AuraEnabled
    public Boolean Required { get; set; }
    
    @AuraEnabled
    public String Label { get; set; }

    @AuraEnabled
    public String Path { get; set; }

    @AuraEnabled
    public String Type { get; set; }

    @AuraEnabled
    public String HelpText { get; set; }

    @AuraEnabled
    public String HelpTextCondition { get; set; }

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

    public FieldSetField(Schema.FieldSetMember fieldSetMember, String helpText) {
        this.Required = fieldSetMember.required;
        this.Label = fieldSetMember.label;
        this.Path = fieldSetMember.fieldpath;
        this.Type = fieldSetMember.type.name();

        if(!String.isBlank(helpText) && helpText.contains('{')){
            this.HelpText = helpText.substringBefore('{');
            this.HelpTextCondition = '{' + helpText.substringAfter('{');
        }
        else{
            this.HelpText = helpText;
        }
    }
}
