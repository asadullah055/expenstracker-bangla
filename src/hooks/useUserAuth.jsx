import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { API_PATHS } from "../utils/apiPaths";
import axiosInstance from './../utils/axiosInstance';

export const useUserAuth = () => {
    const { updateUser, clearUser } = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(() => {
        const accessToken = localStorage.getItem("token");
        if (!accessToken) {
            clearUser();
            navigate("/login");
            return;
        }
        let isMounted = true;

        const fetchUerInfo = async () => {
            try {
                const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);
                if (isMounted && response.data) {
                    updateUser(response.data);
                }
            } catch (error) {
                console.error("Error fetching user info:", error);
                if (isMounted) {
                    clearUser();
                    navigate("/login");
                }

            }
        }
        fetchUerInfo();
        return () => {
            isMounted = false;
        }
    }, [navigate, updateUser, clearUser]);
}  
