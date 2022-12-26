import { useState } from "react";
import { View, StyleSheet, LayoutRectangle } from "react-native";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { Card, Cards, CARD_WIDTH, CARD_HEIGHT } from "../../components/Card";

import { DraggableCard } from "./DraggableCard";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    position: "absolute",
    top: 0,
    left: 0,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  },
});

export const DynamicSpring = () => {
  const [container, setContainer] = useState<null | LayoutRectangle>(null);
  const translate = {
    x: useSharedValue(0),
    y: useSharedValue(0),
  };
  const translateX2 = useDerivedValue(() => withSpring(translate.x.value));
  const translateY2 = useDerivedValue(() => withSpring(translate.y.value));
  const style2 = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX2.value },
        { translateY: translateY2.value },
      ],
    };
  });

  const style3 = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: withSpring(translateX2.value) },
        { translateY: withSpring(translateY2.value) },
      ],
    };
  });

  return (
    <View
      onLayout={({ nativeEvent: { layout } }) => setContainer(layout)}
      style={styles.container}
    >
      <Animated.View style={[styles.card, style3]}>
        <Card card={Cards.Card3} />
      </Animated.View>
      <Animated.View style={[styles.card, style2]}>
        <Card card={Cards.Card2} />
      </Animated.View>
      {container && <DraggableCard translate={translate} {...container} />}
    </View>
  );
};
