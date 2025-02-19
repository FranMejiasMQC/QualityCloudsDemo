/**
 * @description       : Run a new update instances process
 * @author            : Fran Mejías
 * @group             : 
 * @last modified on  : 18-02-2025
 * @last modified by  : Fran Mejías
 * Modifications Log 
 * Ver   Date         Author   Modification
 * 1.0   18-02-2025   Fran Mejías   Initial Version
**/
public with sharing class ScheduleInstancesUpdate implements Schedulable {
    /**
    * @description execute method. Update instances. 
    */
    public void execute(SchedulableContext context) {
        try {
            System.enqueueJob(new QueueableUpdateInstances(), options); 
        } catch (DuplicateMessageException e) {
            TechDevLogHelper.logException(e);
        }
    }
}
