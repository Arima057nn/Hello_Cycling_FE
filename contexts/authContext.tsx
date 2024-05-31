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
      // saving error
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
      getInfoUser(idToken);
      storeData(idToken);
      setToken(idToken);
    });
    return unsubscribe; // Unsubscribe when component unmounts
  }, []);

  const login = (userLogged: UserLoggedInterface) => {
    setUserLogged(userLogged);
  };

  const getInfoUser = async (token: string) => {
    const res = await userApi.getInfoUser();
    if (res?.status === 200) login(res?.data);
  };
  const value = {
    userLogged,
    token,
    onLogin: login,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
