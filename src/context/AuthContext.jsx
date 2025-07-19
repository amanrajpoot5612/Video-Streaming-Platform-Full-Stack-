import { createContext, useEffect, useState, useContext } from "react"
import axios from 'axios';
import axiosInstance from "../api/axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}) => {
    const [user , setUser] = useState(null);
    const [videos, setVideos] = useState([])
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        try {
            const response = await axiosInstance.get('/users/current-user', {
                withCredentials: true
            });
            // setVideos(response.)
            setUser(response.data);
            setLoading(false);
        } catch (error) {
            setUser(null);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);

    const Logout = async() => {
        try{
            await axiosInstance.post('/users/logout', {
                withCredentials: true
            })
            setUser(null);
            // setVideos([]);
        }
        catch(err){
            console.error("Logout Error:", err);
            // Handle error if needed
        }
    }

  return (
    <AuthContext.Provider value={{
        user,
        setUser,
        // videos,
        // setVideos,
        loading,
        Logout
    }}>
        {children}
    </AuthContext.Provider>
  )
}

// export default AuthContext