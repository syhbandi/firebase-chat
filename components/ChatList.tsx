import { View, Text, FlatList, ActivityIndicator, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import ChatItem from "./ChatItem";
import { UserType, useAuth } from "@/context/authContext";
import { usersRef } from "@/firebaseConfig";
import { getDocs, query, where } from "firebase/firestore";

const ChatList = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.userId) getUsers();
  }, []);

  const getUsers = async () => {
    setLoading(true);
    try {
      const q = query(usersRef, where("userId", "!=", user?.userId));
      const querySnapshot = await getDocs(q);
      const usersData: any[] = [];
      querySnapshot.forEach((doc) => {
        usersData.push(doc.data());
      });
      setUsers(usersData);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      Alert.alert("Gagal", error.message);
    } finally {
      setLoading(false);
    }
  };

  console.log(users, user?.userId);

  return (
    <View className="flex-1 pt-3">
      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size={40} color={"green"} />
        </View>
      ) : !users.length ? (
        <Text>Tidak menemukan data</Text>
      ) : (
        <FlatList
          data={users}
          renderItem={({ item }) => <ChatItem item={item} />}
        />
      )}
    </View>
  );
};

export default ChatList;
