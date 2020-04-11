public class FieldSetField {

    @AuraEnabled
    public Boolean Required { get; set; }
    
    @AuraEnabled
    public String Label { get; set; }

    @AuraEnabled
    public String Path { get; set; }

    @AuraEnabled
    public String Type { get; set; }

    public FieldSetField(Schema.FieldSetMember fieldSetMember) {
        this.Required = fieldSetMember.required;
        this.Label = fieldSetMember.label;
        this.Path = fieldSetMember.fieldpath;
        this.Type = fieldSetMember.type.name();
    }
}
