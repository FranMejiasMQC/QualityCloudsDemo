//TESTING QAT-536 AND QAT-539

public class DummyClassWithIssuesTest {
    @testMethod
    static void methodName(){
        
        Test.startTest();
        System.assertEquals(false, false);
        System.assertEquals(true, true);
        Test.stopTest();    
    }
}