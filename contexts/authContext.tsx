import AsyncStorage from "@react-native-async-storage/async-storage";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { router } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextProps {
  authState: {
    authenticated: boolean | null;
    user: FirebaseAuthTypes.User | null;
    token: string | null;
  };
  onLogin: (user: FirebaseAuthTypes.User, token: string) => void;
  onLogout: () => void;
}

export const AuthContext = createContext<Partial<AuthContextProps>>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    authenticated: boolean | null;
    user: FirebaseAuthTypes.User | null;
    token: string | null;
  }>({
    authenticated: null,
    user: null,
    token: null,
  });

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
      storeData(idToken);
      login(userAuth, idToken);
    });
    return unsubscribe; // Unsubscribe when component unmounts
  }, []);

  const login = (user: FirebaseAuthTypes.User, token: string) => {
    setAuthState({ authenticated: true, user, token });
  };
  const logout = () => {
    setAuthState({ authenticated: false, user: null, token: null });
  };

  const value = {
    authState,
    onLogin: login,
    onLogout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
