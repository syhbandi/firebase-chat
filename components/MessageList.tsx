import { FlatList } from "react-native";
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
      renderItem={({ item, index }) => (
        <MessageItem message={item} index={index} />
      )}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 20 }}
    />
  );
});

export default MessageList;
