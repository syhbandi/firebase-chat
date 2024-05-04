import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { blurhash } from "@/utils/constants";
import { Image } from "expo-image";
import { UserType } from "@/context/authContext";
import { useRouter } from "expo-router";

type PropsType = {
  user: UserType;
};

const ChatItem = ({ user }: PropsType) => {
  const router = useRouter();

  const handleOpenRoom = () => {
    router.push({
      pathname: "/chatRoom",
      params: {
        ...user,
      },
    });
  };

  return (
    <TouchableOpacity
      className="flex-row py-3 px-5 items-center"
      onPress={handleOpenRoom}
    >
      <Image
        source={{
          uri: user.profileUrl,
        }}
        placeholder={blurhash}
        contentFit="cover"
        transition={1000}
        className="h-12 w-12 rounded-full"
      />

      <View className="ml-4 flex-1">
        <View className="flex-row justify-between items-center">
          <Text className="font-semibold text-neutral-800 text-base">
            {user.username}
          </Text>
          <Text className="ml-auto self-start text-neutral-500 text-xs font-semibold">
            Time
          </Text>
        </View>
        <Text className="font-medium text-neutral-400" numberOfLines={1}>
          last message
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatItem;
