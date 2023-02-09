import React, { createContext, useReducer, useContext } from 'react';

const initialState = {
  message: null,
  errorFlag: false,
};
let timeout = null;

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'setNotification':
      return action.payload;
    case 'removeNotification':
      return { message: null, errorFlag: false };
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    initialState
  );
  /* eslint-disable react/jsx-no-constructed-context-values */
  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {children}
    </NotificationContext.Provider>
  );
  /* eslint-enable react/jsx-no-constructed-context-values */
};

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[0];
};

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[1];
};

export const useSendNotification = () => {
  const dispatch = useNotificationDispatch();
  return async (message, errorFlag, seconds) => {
    clearTimeout(timeout);
    dispatch({ type: 'setNotification', payload: { message, errorFlag } });
    timeout = setTimeout(() => {
      dispatch({ type: 'removeNotification' });
    }, seconds * 1000);
  };
};

export default NotificationContext;
