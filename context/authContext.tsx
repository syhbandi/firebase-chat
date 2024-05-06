import { auth, db } from "@/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";

const AuthContext = createContext<{
  user: UserType | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  register: (credential: {
    username: string;
    email: string;
    password: string;
    profileUrl: string;
  }) => void;
  isAuthenticated?: boolean;
  loading: boolean;
}>({
  user: null,
  login: () => {},
  logout: () => {},
  register: () => null,
  isAuthenticated: false,
  loading: true,
});

// hook biar bisa ambil isi session (user dll)
export function useAuth() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }
  return value;
}

export type UserType = {
  userId?: string;
  username?: string;
  email?: string;
  profileUrl?: string;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user: UserType | any) => {
      if (user) {
        setIsAuthenticated(true);
        setUser({ ...user, userId: user.uid });
        updateUserData(user.uid);
        setLoading(false);
      } else {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
      }
    });
    return unsub;
  }, []);

  const updateUserData = async (uid: string) => {
    const docSnap = await getDoc(doc(db, "users", uid));
    const data = docSnap.data();
    setUser((current) => ({
      ...current!,
      username: data?.username,
      profileUrl: data?.profileUrl,
    }));
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
    } catch (error: any) {
      let msg = error.message;
      if (error.message.includes("(auth/invalid-email)"))
        msg = "Alamat email tidak valid";
      if (error.message.includes("(auth/invalid-credential)"))
        msg = "Email atau password salah";
      if (error.message.includes("(auth/too-many-requests)"))
        msg =
          "Terlalu banyak percobaan login, silakan setel ulang password atau tunggu beberapa saat lagi";
      Alert.alert("Login gagal!", msg);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const register = async ({
    username,
    email,
    password,
    profileUrl,
  }: {
    username: string;
    email: string;
    password: string;
    profileUrl: string;
  }) => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(db, "users", response.user.uid), {
        username,
        profileUrl,
        userId: response.user.uid,
      });
      setLoading(false);
    } catch (error: any) {
      let msg = error.message;
      if (error.message.includes("(auth/invalid-email)"))
        msg = "Alamat email tidak valid";
      if (error.message.includes("(auth/weak-password)"))
        msg = "Password tidak boleh kurang dari 6 karakter";
      if (error.message.includes("(auth/email-already-in-use)"))
        msg = "email sudah digunakan";
      Alert.alert("Login gagal!", msg);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await signOut(auth);
    } catch (error) {
      Alert.alert("Oops...", "Gagal melakukan logout");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, register, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
