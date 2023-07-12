public class DummyClassWithIssues {
    Account acc = [select id, name, createddate from account limit 1];
}