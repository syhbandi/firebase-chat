import React from "react";
import { Redirect, Stack } from "expo-router";
import { useAuth } from "@/context/authContext";
import { ActivityIndicator, View } from "react-native";

const AppLayout = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading)
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator size={40} color={"green"} />
      </View>
    );
  if (!isAuthenticated) return <Redirect href={"/sign-in"} />;
  return <Stack />;
};

export default AppLayout;
