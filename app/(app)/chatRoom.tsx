import { View, Text } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import ChatRoomHeader from "@/components/ChatRoomHeader";

const ChatRoom = () => {
  const { username, profileUrl } = useLocalSearchParams<{
    username: string;
    profileUrl: string;
  }>();

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen
        options={{
          header: () => (
            <ChatRoomHeader username={username} profileUrl={profileUrl} />
          ),
        }}
      />
      <Text>{username}</Text>
    </View>
  );
};

export default ChatRoom;
