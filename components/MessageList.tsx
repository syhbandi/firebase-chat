import { View, Text, FlatList } from "react-native";
import React from "react";
import { MessageType } from "@/app/(app)/chatRoom";
import MessageItem from "./MessageItem";

type Props = {
  messages: MessageType[] | any[];
};

const MessageList = ({ messages }: Props) => {
  return (
    <FlatList
      data={messages}
      renderItem={({ item }) => <MessageItem message={item} />}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingTop: 20, paddingHorizontal: 20 }}
    />
  );
};

export default MessageList;
