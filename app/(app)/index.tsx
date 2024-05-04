import { View } from "react-native";
import React from "react";
import { useAuth } from "@/context/authContext";
import { Stack } from "expo-router";
import HomeHeader from "@/components/HomeHeader";
import ChatList from "@/components/ChatList";

const Page = () => {
  const { logout, user } = useAuth();

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen
        options={{
          header: () => <HomeHeader />,
        }}
      />
      <ChatList />
    </View>
  );
};

export default Page;
