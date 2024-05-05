import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { Image } from "expo-image";
import { blurhash } from "@/utils/constants";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type Props = {
  profileUrl: string;
  username: string;
};

const ChatRoomHeader = ({ username, profileUrl }: Props) => {
  const router = useRouter();
  return (
    <View className="pt-10 flex-row items-center justify-between px-5 pb-3 bg-green-600">
      <StatusBar style="light" />
      <TouchableOpacity
        className="flex-row gap-2 items-center"
        onPress={() => router.back()}
      >
        <Feather name="arrow-left" size={24} color={"white"} />
        <Image
          source={{
            uri: profileUrl,
          }}
          placeholder={blurhash}
          contentFit="cover"
          transition={1000}
          className="h-8 w-8 rounded-full"
        />
        <Text className="font-semibold text-xl text-white" numberOfLines={1}>
          {username}
        </Text>
      </TouchableOpacity>
      <View className="flex-row gap-5">
        <TouchableOpacity>
          <Feather name="phone" size={24} color={"white"} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="video" size={24} color={"white"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatRoomHeader;
