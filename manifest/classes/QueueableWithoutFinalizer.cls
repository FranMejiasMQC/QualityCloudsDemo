public class QueueableWithoutFinalizer implements Queueable {
    public List<User> usersToUpdate;

    public QueueableWithoutFinalizer(List<User> usersToUpdate) {
        this.usersToUpdate = usersToUpdate;
    }

    public void execute(QueueableContext context) { // no Finalizer is attached
        update usersToUpdate;
    }
}