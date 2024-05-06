import { View, Text } from "react-native";
import React from "react";
import { MessageType } from "@/app/(app)/chatRoom";
import { useAuth } from "@/context/authContext";

const MessageItem = ({
  message,
  index,
}: {
  message: MessageType;
  index: number;
}) => {
  const { user } = useAuth();
  return (
    <View
      className={`p-2 px-3 rounded-lg border  mb-2 font-semibold ${
        message.userId === user?.userId
          ? "bg-green-200 self-end border-green-300"
          : "bg-neutral-200 border-neutral-300 self-start"
      } ${!index ? "mt-2" : ""}`}
    >
      <Text className="text-base">{message.text}</Text>
    </View>
  );
};

export default MessageItem;
