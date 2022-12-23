import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  withTiming,
  withRepeat,
  useSharedValue,
  Easing,
} from "react-native-reanimated";
import { withPause } from "react-native-redash";

import { Button } from "../components/Button";
import { ChatBubble } from "../components/ChatBubble";
import { StyleGuide } from "../components/StyleGuide";

const easing = Easing.inOut(Easing.ease);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: StyleGuide.palette.background,
  },
});

export const HighOrderAnimation = () => {
  const [play, setPlay] = useState(false);
  const paused = useSharedValue(!play);
  const progress = useSharedValue<null | number>(null);
  // useEffect(() => {
  //   progress.value = withPause(
  //     withRepeat(withTiming(1, { duration: 1000, easing }), -1, true),
  //     paused
  //   );
  // }, [paused, progress]);
  return (
    <View style={styles.container}>
      <ChatBubble progress={progress} />
      <Button
        label={play ? "Pause" : "Play"}
        primary
        onPress={() => {
          setPlay((prev) => !prev);
          paused.value = !paused.value;
          if (progress.value === null) {
            progress.value = withPause(
              withRepeat(
                withTiming(1, {
                  easing,
                  duration: 1000,
                }),
                -1,
                true
              ),
              paused
            );
          }
        }}
      />
    </View>
  );
};
