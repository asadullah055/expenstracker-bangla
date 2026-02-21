import { createContext, useCallback, useMemo, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    // Function to update user data
    const updateUser = useCallback((userData) => {
        setUser(userData);
    }, []);
    // Function to clear user data (e.g., on logout)
    const clearUser = useCallback(() => {
        setUser(null);
    }, []);
    const contextValue = useMemo(
        () => ({
            user,
            updateUser,
            clearUser,
        }),
        [user, updateUser, clearUser]
    );
    return (
        <UserContext.Provider
            value={contextValue}
        >
            {children}
        </UserContext.Provider>

    )
}

export default UserProvider;
