import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
  Keyboard,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import ChatRoomHeader from "@/components/ChatRoomHeader";
import { Feather } from "@expo/vector-icons";
import { getRoomId } from "@/utils/constants";
import { useAuth } from "@/context/authContext";
import {
  DocumentData,
  Timestamp,
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { db } from "@/firebaseConfig";
import MessageList from "@/components/MessageList";

export type MessageType = {
  userId: string;
  text: string;
  profileUrl: string;
  senderName: string;
  createdAt: string;
};

const ChatRoom = () => {
  const { username, profileUrl, userId } = useLocalSearchParams<{
    userId: string;
    username: string;
    profileUrl: string;
  }>();
  const { user } = useAuth();
  const [messages, setMessages] = useState<
    MessageType[] | DocumentData[] | any[]
  >([]);
  const [message, setMessage] = useState("");
  const msgListRef = useRef<FlatList>(null);

  const createRoomIfNotExist = async () => {
    const roomId = getRoomId(user?.userId!, userId);

    try {
      await setDoc(doc(db, "rooms", roomId), {
        roomId,
        createAt: Timestamp.fromDate(new Date()),
      });
    } catch (error: any) {
      Alert.alert("Oopss", error.message);
    }
  };

  useEffect(() => {
    createRoomIfNotExist();

    const roomId = getRoomId(user?.userId!, userId);
    const roomDocRef = doc(db, "rooms", roomId);
    const messagesRef = collection(roomDocRef, "messages");
    const q = query(messagesRef, orderBy("createdAt", "asc"));

    const unsub = onSnapshot(q, (snapshot) => {
      let newMessages = snapshot.docs.map((doc) => doc.data());
      setMessages([...newMessages]);
    });

    const keyBoardListener = Keyboard.addListener("keyboardDidShow", () => {
      setTimeout(() => {
        msgListRef.current?.scrollToEnd({ animated: true });
      }, 200);
    });

    return () => {
      unsub();
      keyBoardListener.remove();
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      msgListRef.current?.scrollToEnd({ animated: true });
    }, 200);
  }, [messages]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    try {
      const roomId = getRoomId(user?.userId!, userId);
      const roomRef = doc(db, "rooms", roomId);
      const messageRef = collection(roomRef, "messages");

      await addDoc(messageRef, {
        userId: user?.userId,
        text: message.trim(),
        profileUrl: user?.profileUrl,
        senderName: user?.username,
        createdAt: Timestamp.fromDate(new Date()),
      });

      setMessage("");
    } catch (error: any) {
      Alert.alert("Oops!", error.message);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen
        options={{
          header: () => (
            <ChatRoomHeader username={username} profileUrl={profileUrl} />
          ),
        }}
      />
      <MessageList messages={messages} ref={msgListRef} />
      <View className="bg-white py-3 px-5 border-t border-neutral-200 flex-row items-center">
        <TextInput
          value={message}
          onChangeText={(text) => setMessage(text)}
          placeholder="Type message"
          className="text-base flex-1 border border-neutral-200 py-2 px-5 mr-2 rounded-full font-medium max-h-14"
          multiline={true}
        />
        <TouchableOpacity
          className="p-3 rounded-full bg-green-600"
          onPress={handleSendMessage}
        >
          <Feather name="send" size={20} color={"white"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatRoom;
