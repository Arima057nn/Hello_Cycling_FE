import { UserLoggedInterface } from "@/interfaces/user";
import { userApi } from "@/services/user-api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from "@react-native-firebase/auth";
import { router } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextProps {
  token: string | null;
  userLogged: UserLoggedInterface | null;
  onLogin: (userLogged: UserLoggedInterface) => void;
  onLogout: () => void;
}

export const AuthContext = createContext<Partial<AuthContextProps>>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [token, setToken] = useState<string | null>(null);

  const [userLogged, setUserLogged] = useState<UserLoggedInterface | null>();
  const storeData = async (token: string) => {
    try {
      await AsyncStorage.setItem("token", token);
    } catch (e) {
      console.log("error store token", e);
    }
  };

  const removeData = async () => {
    try {
      await AsyncStorage.removeItem("token");
    } catch (e) {
      console.log("error remove token", e);
    }
  };

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async (userAuth) => {
      if (!userAuth) {
        router.replace("/register");
        return;
      }
      const idToken = await userAuth.getIdToken();
      console.log("idToken", idToken);
      storeData(idToken);
      getInfoUser();
      setToken(idToken);
    });
    return unsubscribe; // Unsubscribe when component unmounts
  }, []);

  const login = (userLogged: UserLoggedInterface) => {
    setUserLogged(userLogged);
  };

  const logout = () => {
    removeData();
    setUserLogged(null);
    setToken(null);
  };
  const getInfoUser = async () => {
    const res = await userApi.getInfoUser();
    if (res?.status === 200) setUserLogged(res?.data);
  };
  const value = {
    userLogged,
    token,
    onLogin: login,
    onLogout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
