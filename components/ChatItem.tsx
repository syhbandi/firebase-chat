import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { blurhash, getRoomId } from "@/utils/constants";
import { Image } from "expo-image";
import { UserType, useAuth } from "@/context/authContext";
import { useRouter } from "expo-router";
import {
  collection,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@/firebaseConfig";

type PropsType = {
  item: UserType;
};

const ChatItem = ({ item }: PropsType) => {
  const router = useRouter();
  const [lastMessage, setLastMessage] = useState<any>(null);
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleOpenRoom = () => {
    router.push({
      pathname: "/chatRoom",
      params: {
        ...item,
      },
    });
  };

  useEffect(() => {
    const roomId = getRoomId(user?.userId!, item.userId!);
    const roomDocRef = doc(db, "rooms", roomId);
    const messagesRef = collection(roomDocRef, "messages");
    const q = query(messagesRef, orderBy("createdAt", "desc"), limit(1));

    const unsub = onSnapshot(q, (snapshot) => {
      setLoading(true);
      let messages = snapshot.docs.map((doc) => doc.data());
      if (messages.length) {
        setLastMessage(messages[0]);
      }
      setLoading(false);
    });

    return unsub;
  }, []);

  const formatedDate = () => {
    if (!lastMessage) return "";
    const messageDate = new Date(lastMessage?.createdAt?.seconds * 1000);
    const format = new Intl.DateTimeFormat("id", {
      dateStyle: "short",
    }).format(messageDate);
    return format;
  };

  console.log();

  return (
    <TouchableOpacity
      className="flex-row py-3 px-5 items-center"
      onPress={handleOpenRoom}
    >
      <Image
        source={{
          uri: item.profileUrl,
        }}
        placeholder={blurhash}
        contentFit="cover"
        transition={1000}
        className="h-12 w-12 rounded-full"
      />

      <View className="ml-4 flex-1">
        <View className="flex-row justify-between items-center">
          <Text className="font-semibold text-neutral-800 text-lg">
            {item.username}
          </Text>
          <Text className="ml-auto self-start text-neutral-500 font-semibold">
            {loading ? "Loading" : formatedDate()}
          </Text>
        </View>
        <Text className="font-medium text-neutral-400" numberOfLines={1}>
          {loading
            ? "Loading"
            : lastMessage?.text
            ? lastMessage.userId === user?.userId
              ? "You: " + lastMessage.text
              : lastMessage.text
            : "Say hi 👋"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatItem;
