import React, {createContext, useContext, useState} from "react";

const ContextNotify = createContext();

const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState([]);
    
    return (
        <ContextNotify.Provider
        value={{
            notification,
            setNotification,
          }}>
        {children}
        </ContextNotify.Provider>
    ) 
}

export const NotificationState = () => {
    return useContext(ContextNotify);
}

export default NotificationProvider;