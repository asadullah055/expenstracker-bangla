import { createContext, useContext, useEffect, useState } from "react";

const WorkspaceContext = createContext();

export const WorkspaceProvider = ({ children }) => {
    const [currentWorkspace, setCurrentWorkspace] = useState(() => {
        const saved = localStorage.getItem("currentWorkspace");
        return saved ? JSON.parse(saved) : null;
    });

    // Persist on change
    useEffect(() => {
        if (currentWorkspace) {
            localStorage.setItem(
                "currentWorkspace",
                JSON.stringify(currentWorkspace)
            );
        }
    }, [currentWorkspace]);

    return (
        <WorkspaceContext.Provider
            value={{ currentWorkspace, setCurrentWorkspace }}
        >
            {children}
        </WorkspaceContext.Provider>
    );
};

export const useWorkspace = () => useContext(WorkspaceContext);
