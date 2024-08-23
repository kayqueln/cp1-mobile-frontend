import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../api";
import { useNavigation } from "expo-router";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { Alert } from "react-native";

interface User {
  idUsuario: number;
  nome: string;
  cpf: string;
  email: string;
  senha: string;
  perfil: string;
}

interface AuthContextData {
  user: User | null;
  loading: boolean;
  signIn: (data: SignInData) => Promise<void>;
  signOut: () => void;
}

interface SignInData {
  email: string;
  password: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStorageData = async () => {
      const storedUser = await AsyncStorage.getItem("@cp1:user");
      const storedToken = await AsyncStorage.getItem("@cp1:token");

      if (storedUser && storedToken) {
        api.defaults.headers.Authorization = `Bearer ${storedToken}`;
        setUser(JSON.parse(storedUser));
      }

      setLoading(false);
    };

    loadStorageData();
  }, []);

  const signIn = async ({ email, password }: SignInData) => {
    try {
      const response = await api.post("/login/token", {
        email,
        senha: password,
      });

      if (response.status === 200) {
        const { token } = response.data;

        await AsyncStorage.setItem("@cp1:user", JSON.stringify(user));
        await AsyncStorage.setItem("@cp1:token", token);

        api.defaults.headers.Authorization = `Bearer ${token}`;

        const userData = (await api.get(`/usuario/email/${email}`)).data;

        setUser(userData);

        navigation.navigate("(root)");
      }
    } catch (err) {
      Alert.alert("Essa conta não existe, tente novamente!");

      console.error(err);
    }
  };

  const signOut = async () => {
    await AsyncStorage.clear();
    setUser(null);

    navigation.navigate("(auth)");
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

export const useAuth = () => {
  return useContext(AuthContext);
};
