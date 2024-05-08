import { View, Text, StatusBar, TouchableOpacity } from "react-native";
import React from "react";
import { Stack, router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { useAuth } from "@/context/authContext";
import { Image } from "expo-image";
import { blurhash } from "@/utils/constants";

const profile = () => {
  const { user } = useAuth();
  return (
    <View className="flex-1 bg-white px-5">
      <StatusBar barStyle={"dark-content"} />
      <Stack.Screen
        options={{ title: "Profile", headerShadowVisible: false }}
      />
      <View className="items-center mb-5">
        <Image
          source={{
            uri: user?.profileUrl,
          }}
          placeholder={blurhash}
          contentFit="cover"
          transition={1000}
          className="h-24 w-24 rounded-full"
        />
      </View>

      <View className="py-2 border-b border-neutral-200">
        <Text className="font-medium text-neutral-400">Username</Text>
        <Text className="font-semibold text-neutral-700 text-lg">
          {user?.username}
        </Text>
      </View>
      <View className="py-2 border-b border-neutral-200">
        <Text className="font-medium text-neutral-400">Email</Text>
        <Text className="font-semibold text-neutral-700 text-lg">
          {user?.email}
        </Text>
      </View>
    </View>
  );
};

export default profile;
