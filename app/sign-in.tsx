import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { Redirect, useRouter } from "expo-router";
import { useAuth } from "@/context/authContext";
import { StatusBar } from "expo-status-bar";

export default function SignIn() {
  const router = useRouter();
  const { isAuthenticated, login, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password)
      return Alert.alert("Oopss!", "Email dan password tidak boleh kosong");
    login(email, password);
  };

  if (isAuthenticated) return <Redirect href={"/"} />;

  return (
    <View className=" bg-white flex-1  justify-center px-5">
      <StatusBar style="dark" />
      <Text className="text-3xl font-bold text-center mb-5">Login</Text>
      <View className="flex-row items-center px-3 py-2 rounded-xl border border-neutral-200 mb-3">
        <Feather name="mail" size={20} color={"gray"} />
        <TextInput
          placeholder="Email"
          placeholderTextColor={"gray"}
          className="flex-1 ml-2 font-semibold"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View className="flex-row items-center px-3 py-2 rounded-xl border border-neutral-200 mb-3">
        <Feather name="lock" size={20} color={"gray"} />
        <TextInput
          placeholder="Password"
          placeholderTextColor={"gray"}
          className="flex-1 ml-2 font-semibold"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
      </View>
      <Text className="text-neutral-500 text-right mb-5 font-semibold">
        Lupa Password?
      </Text>
      {loading ? (
        <View className="mb-3 h-[50] justify-center items-center bg-green-600 rounded-xl">
          <ActivityIndicator size={30} color={"white"} />
        </View>
      ) : (
        <TouchableOpacity
          className="h-[50] justify-center items-center bg-green-600 rounded-xl mb-3"
          onPress={handleLogin}
        >
          <Text className="text-white text-lg font-bold">Login</Text>
        </TouchableOpacity>
      )}
      <View className="flex-row items-center justify-center mt-5">
        <Text className="text-neutral-500 font-semibold">
          Belum punya akun?{" "}
        </Text>
        <Text
          className="text-green-700 font-bold"
          onPress={() => router.push("/sign-up")}
        >
          Daftar
        </Text>
      </View>
    </View>
  );
}
