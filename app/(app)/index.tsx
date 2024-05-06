import { View } from "react-native";
import { Stack } from "expo-router";
import HomeHeader from "@/components/HomeHeader";
import ChatList from "@/components/ChatList";

const Page = () => {
  return (
    <View className="flex-1 bg-white">
      <Stack.Screen
        options={{
          header: () => <HomeHeader />,
        }}
      />
      <ChatList />
    </View>
  );
};

export default Page;
