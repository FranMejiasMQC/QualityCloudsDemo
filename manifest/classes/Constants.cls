/**
 * This class contains constant values used throughout the application.
 * 
 * @description This class holds constant values that are used across the application.
 */
public class Constants {
    /**
     * Constant for QCLiveChecks.
     */
    public static final String QC_LIVECHECKS_PS = 'QCLiveChecks';    

    public void describeSObjectsInLoop() {
    Set<String> fieldNameSet = new Set<String> {'Id'};
    for (String fieldNameOrDefaultValue : fieldNameSet) {
        Schema.DescribeSObjectResult dsr = Account.sObjectType.getDescribe();
        if (Schema.describeSObjects(new List<String> { String.valueOf(dsr) })[0].fields.getMap().containsKey(fieldNameOrDefaultValue.trim())) {
            fieldNameSet.add(fieldNameOrDefaultValue);
        }
    }
}

// corrected example
public void describeSObjectsInLoop2() {
    Map<String, Schema.SObjectField> fieldMap = Schema.describeSObjects(new List<String> { 'Account' })[0].fields.getMap();
    Set<String> fieldNameSet = new Set<String> {'Id'};
    for (String fieldNameOrDefaultValue : fieldNameSet) {
        if (fieldMap.containsKey(fieldNameOrDefaultValue.trim())) {
            fieldNameSet.add(fieldNameOrDefaultValue);
        }
    }
}  
public static void main() {
    Account[] accs1 = [ select id from account ];  // Bad
    Account[] accs2 = [ select id from account limit 10 ];  // better

    List<List<SObject>> searchList = [FIND 'map*' IN ALL FIELDS RETURNING Account (Id, Name), Contact, Opportunity, Lead]; // bad
}


}