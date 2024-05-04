import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Redirect, useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { useAuth } from "@/context/authContext";

export default function SignUp() {
  const router = useRouter();
  const { register, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !password || !username || !profileUrl)
      return Alert.alert("Oops!", "Data belum lengkap");
    setLoading(true);
    register({ username, email, password, profileUrl });
    setLoading(false);
  };

  if (isAuthenticated) return <Redirect href={"/(app)"} />;

  return (
    <View
      className=" bg-white flex-1 px-5"
      style={{ paddingTop: Platform.OS === "ios" ? 40 : 45 }}
    >
      <Text className="text-3xl font-bold text-center mt-10 mb-5">Daftar</Text>
      <View className="flex-row items-center px-3 py-2 rounded-xl border border-neutral-200 mb-3">
        <Feather name="user" size={20} color={"gray"} />
        <TextInput
          placeholder="Username"
          placeholderTextColor={"gray"}
          className="flex-1 ml-2"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
      </View>
      <View className="flex-row items-center px-3 py-2 rounded-xl border border-neutral-200 mb-3">
        <Feather name="mail" size={20} color={"gray"} />
        <TextInput
          placeholder="Email"
          placeholderTextColor={"gray"}
          className="flex-1 ml-2"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View className="flex-row items-center px-3 py-2 rounded-xl border border-neutral-200 mb-3">
        <Feather name="lock" size={20} color={"gray"} />
        <TextInput
          placeholder="Password"
          placeholderTextColor={"gray"}
          className="flex-1 ml-2"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
      </View>
      <View className="flex-row items-center px-3 py-2 rounded-xl border border-neutral-200 mb-3">
        <Feather name="image" size={20} color={"gray"} />
        <TextInput
          placeholder="Link Foto Profil"
          placeholderTextColor={"gray"}
          className="flex-1 ml-2"
          value={profileUrl}
          onChangeText={(text) => setProfileUrl(text)}
        />
      </View>
      {loading ? (
        <View className="mb-3 h-[50] justify-center items-center bg-green-600 rounded-xl">
          <ActivityIndicator size={30} color={"white"} />
        </View>
      ) : (
        <TouchableOpacity
          className="h-[50] justify-center items-center bg-green-600 rounded-xl mb-3"
          onPress={handleRegister}
        >
          <Text className="text-white text-lg font-bold">Daftar</Text>
        </TouchableOpacity>
      )}
      <View className="flex-row items-center justify-center mt-5">
        <Text className="text-neutral-500">Sudah punya akun? </Text>
        <Text
          className="text-green-700 font-semibold"
          onPress={() => router.back()}
        >
          Login
        </Text>
      </View>
    </View>
  );
}
