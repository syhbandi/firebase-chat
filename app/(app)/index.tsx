import { View, Text, Button } from "react-native";
import React from "react";
import { useAuth } from "@/context/authContext";
import { Stack } from "expo-router";
import HomeHeader from "@/components/HomeHeader";

const Page = () => {
  const { logout, user } = useAuth();

  return (
    <View className="flex-1 bg-white px-5">
      <Stack.Screen
        options={{
          header: () => <HomeHeader />,
        }}
      />
    </View>
  );
};

export default Page;
