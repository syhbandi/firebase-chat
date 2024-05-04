import { View, Text, Pressable, Alert } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { useAuth } from "@/context/authContext";
import { Image } from "expo-image";
import { blurhash } from "@/utils/constants";

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";

const HomeHeader = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Anda akan keluar",
      [
        {
          text: "Tidak",
          style: "cancel",
        },
        {
          text: "Oke",
          style: "default",
          onPress: () => logout(),
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View className="pt-10 bg-green-600 px-5 pb-3 flex-row items-center justify-between">
      <StatusBar style="light" />
      <Text className="font-bold text-white text-2xl">ChatApp</Text>
      <Menu>
        <MenuTrigger>
          <Image
            source={{ uri: user?.profielUrl }}
            placeholder={blurhash}
            contentFit="cover"
            transition={1000}
            className="h-8 w-8 rounded-full"
          />
        </MenuTrigger>

        <MenuOptions
          optionsContainerStyle={{
            borderRadius: 5,
            padding: 5,
            marginTop: 35,
          }}
        >
          <MenuOption text="Profil" />
          <MenuOption onSelect={handleLogout} text="Logout" />
        </MenuOptions>
      </Menu>
    </View>
  );
};

export default HomeHeader;
