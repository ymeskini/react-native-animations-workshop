import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { AnimatedCard } from "../components/AnimatedCard";
import { Button } from "../components/Button";
import { cards } from "../components/Card";
import { StyleGuide } from "../components/StyleGuide";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StyleGuide.palette.background,
    justifyContent: "flex-end",
  },
});

const useSpring = (state: number | boolean) => {
  const sharedValue = useSharedValue(0);
  useEffect(() => {
    sharedValue.value = Number(state);
  }, [state, sharedValue]);
  return useDerivedValue(() => {
    return withSpring(sharedValue.value);
  });
};

const useTiming = (state: number | boolean) => {
  const sharedValue = useSharedValue(0);
  useEffect(() => {
    sharedValue.value = Number(state);
  }, [state, sharedValue]);
  return useDerivedValue(() => {
    return withTiming(sharedValue.value, { duration: 600 });
  });
};

export const Transitions = () => {
  // with reanimated but we don't know the state in react the button stays Reset
  const toggled = useSharedValue(0);
  // with react controlling the state
  // const [toggled, setToggle] = useState(false);
  // const transition = useTiming(toggled);

  const transition = useDerivedValue(() => {
    return withSpring(toggled.value);
  });

  // useEffect(() => {
  //   isToggled.value = Number(toggled);
  // }, [toggled, isToggled]);

  // const transition = useDerivedValue(() => {
  //   // with bouncing
  //   // return withSpring(isToggled.value);

  //   // without bouncing
  //   return withTiming(isToggled.value);
  // });

  return (
    <View style={styles.container}>
      {cards.slice(0, 3).map((card, index) => (
        <AnimatedCard key={card} {...{ index, card, transition }} />
      ))}
      <Button
        label={toggled ? "Reset" : "Start"}
        primary
        onPress={() => {
          // with react
          // setToggle((prev) => !prev);

          // with reanimated
          toggled.value = Number(!toggled.value);
        }}
      />
    </View>
  );
};
