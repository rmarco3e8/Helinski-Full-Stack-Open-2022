import { createContext, useReducer, useContext } from 'react';

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'setNotification':
      return action.payload;
    case 'removeNotification':
      return null;
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[0];
};

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[1];
};

let timeout = null;
// test for part 7
export const useSendNotification = () => {
  const dispatch = useNotificationDispatch();
  return async (message, seconds) => {
    clearTimeout(timeout);
    dispatch({ type: 'setNotification', payload: message });
    timeout = setTimeout(() => {
      dispatch({ type: 'removeNotification' });
    }, seconds * 1000);
  };
};

export default NotificationContext;
