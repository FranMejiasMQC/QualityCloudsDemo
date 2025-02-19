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
        AsyncOptions options = new AsyncOptions();
        options.DuplicateSignature = System.QueueableDuplicateSignature.Builder()
                                .addId(UserInfo.getUserId())
                                .addString(TechDevLogHelper.generateRandomString(9))
                                .addInteger((Integer)Math.floor(Math.random() * (100 - 1 + 1)) + 1)
                                .build();
        options.MaximumQueueableStackDepth = 2;
        options.MinimumQueueableDelayInMinutes = 1;
        try {
            System.enqueueJob(new QueueableUpdateInstances(), options); 
        } catch (DuplicateMessageException e) {
            TechDevLogHelper.logException(e);
        }
    }
}