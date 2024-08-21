import { useContext, createContext, useState, useEffect} from "react";
import axios from "axios";
import url from "../utils/urls";
import PropTypes from 'prop-types';
import Loading from "../components/Loading";


const AuthContext = createContext({
  isAuthenticated: false,
  getAccessToken: () => {},
  saveUser: () => {},
  getRefreshToken: () => {},
  getUser: () => {},
  logout: () => {},
})

const AuthProvider = ({ children }) => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const requestNewAccessToken = async (refreshToken) => {
    try{
      const response = await axios.post(`${url.backend}/refresh-token`,null, {
        headers: {
          "Authorization": `Bearer ${refreshToken}`
        }
      });
      if(response.status === 200) {
        return response.data.accessToken
      }
      else{
        throw new Error(response.data.message)
      }
    }catch(error){
      console.log(error);
      return null
    }
  }
  
  const getUserInfo = async (accessToken) => {
    try{
      const response = await axios.get(`${url.backend}/userdata`, {
        headers: {
          "Authorization": `Bearer ${accessToken}`
        }
      });
      if(response.status === 200) {
        return response.data
      }
      else{
        throw new Error(response.data.message)
      }
    }catch(error){
      console.log(error);
      return null
    }
  }
  const checkAuth = async () => {
    setLoading(true);
    if(accessToken) {
      const userInfo = await getUserInfo(accessToken);
      if(userInfo) {
        saveSession(userInfo, accessToken, getRefreshToken());
      }
     }else{
      const token = getRefreshToken();
      if(token) {
        const newAccessToken = await requestNewAccessToken(token);
        if(newAccessToken) {
          const userInfo = await getUserInfo(newAccessToken);
          if(userInfo) {
            saveSession(userInfo, newAccessToken, token);
          }
        }
      }
    }
    setLoading(false);
    return null;
  }

  const getAccessToken = () => {
    return accessToken;
  }

  const getRefreshToken = () => {
    const tokenData = localStorage.getItem("Token");
    if(tokenData) {
      const token = JSON.parse(tokenData);
      return token;
    }
    return null;
  }

  const saveSession = (userInfo, accessToken, refreshToken) => {
    setAccessToken(accessToken);
    localStorage.setItem("Token", JSON.stringify(refreshToken));
    setIsAuthenticated(true);
    setUser(userInfo);
  }

  const saveUser = (userData) => {
    saveSession(userData.user, userData.accessToken, userData.refreshToken);
  }

  const getUser = () => {
    return user;
  }

  const logout = async (refreshToken) => {
    try{
      const response = await axios.delete(`${url.backend}/logout`, {
        headers: {
          "Authorization": `Bearer ${refreshToken}`
        }
      })

      if(response.status === 200) {
        localStorage.removeItem("Token");
        setIsAuthenticated(false);
        setAccessToken("");
        setUser({});
      }
    }catch(error){
      console.log(error);
    }
  }

  useEffect(() => {
    checkAuth();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AuthContext.Provider value={{isAuthenticated, getAccessToken, getRefreshToken, saveUser, getUser, logout}}>
      {loading ? <Loading /> : children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node
}

export default AuthProvider

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext)