const Notification = ({message, errorFlag}) => {
    if (message === null) {
        return null;
    }

    return (
        <div className={errorFlag ? "failure" : "success"}>
            {message}
        </div>
    );
};

export default Notification;