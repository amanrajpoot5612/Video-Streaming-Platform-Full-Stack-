import { createContext, useEffect, useState, useContext } from "react"
import axios from 'axios';
import axiosInstance from "../api/axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}) => {
    const [user , setUser] = useState(null);
    const [videos, setVideos] = useState([])
    const [loading, setLoading] = useState(true);

    // const fetchUser = async () => {
    //     try {
    //         const response = await axiosInstance.get('/users/current-user', {
    //             withCredentials: true
    //         });
    //         // setVideos(response.)
    //         setUser(response.data?.data?.user);

    //         setLoading(false);
    //     } catch (error) {
    //         setUser(null);
    //     }
    //     finally {
    //         setLoading(false);
    //     }
    // }

    const fetchUser = async () => {
  try {
    const response = await axiosInstance.get("/users/current-user", {
      withCredentials: true,
    });

    console.log("✅ Full response from backend:", response.data);
    console.log("📦 response.data.data:", response.data?.data);
    console.log("👤 response.data.data.user:", response.data?.data?.user);
    console.log("👤 username 1:", response.data?.data.username);

    setUser(response.data?.data); // This should be the full user object like {username, avatar, ...}

  } catch (error) {
    console.error("❌ Error fetching user:", error);
    setUser(null);
  } finally {
    setLoading(false);
  }
};


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