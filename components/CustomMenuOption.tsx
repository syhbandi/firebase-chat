import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { MenuOption } from "react-native-popup-menu";

const CustomMenuOption = ({
  text,
  onPress,
}: {
  text: string;
  onPress?: () => void;
}) => {
  return (
    <MenuOption
      style={{
        paddingVertical: 10,
        paddingHorizontal: 15,
      }}
      onSelect={onPress}
    >
      <Text className="font-semibold text-neutral-700">{text}</Text>
    </MenuOption>
  );
};

export default CustomMenuOption;
