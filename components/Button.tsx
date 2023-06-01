import * as React from "react";
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";

import { StyleGuide } from "./StyleGuide";
import { Text } from "./Text";

interface ButtonProps {
  label: string;
  primary?: boolean;
  onPress: () => void;
}

const styles = StyleSheet.create({
  container: {
    padding: StyleGuide.spacing * 2,
  },
  label: {
    textAlign: "center",
  },
});

export const Button = ({ label, primary, onPress }: ButtonProps) => {
  const color = primary ? "white" : undefined;
  const backgroundColor = primary ? StyleGuide.palette.primary : undefined;
  return (
    <TouchableOpacity {...{ onPress }}>
      <SafeAreaView style={{ backgroundColor }} accessible>
        <View style={styles.container}>
          <Text type="headline" style={[styles.label, { color }]}>
            {label}
          </Text>
        </View>
      </SafeAreaView>
    </TouchableOpacity>
  );
};
