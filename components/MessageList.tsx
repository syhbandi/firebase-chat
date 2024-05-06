import { View, Text, FlatList } from "react-native";
import React, { forwardRef } from "react";
import { MessageType } from "@/app/(app)/chatRoom";
import MessageItem from "./MessageItem";

type Props = {
  messages: MessageType[] | any[];
};

const MessageList = forwardRef<FlatList, Props>(({ messages }, ref) => {
  return (
    <FlatList
      ref={ref}
      data={messages}
      renderItem={({ item }) => <MessageItem message={item} />}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingTop: 10 }}
    />
  );
});

export default MessageList;
