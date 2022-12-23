import { StyleSheet, Dimensions } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { mix } from "react-native-redash";

import type { Cards } from "./Card";
import { Card } from "./Card";
import { StyleGuide } from "./StyleGuide";

const { width } = Dimensions.get("window");
const origin = -(width / 2 - StyleGuide.spacing * 2);
const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    padding: StyleGuide.spacing * 4,
  },
});

interface AnimatedCardProps {
  transition: Readonly<Animated.SharedValue<number>>;
  index: number;
  card: Cards;
}

export const AnimatedCard = ({
  card,
  transition,
  index,
}: AnimatedCardProps) => {
  const style = useAnimatedStyle(() => {
    // const rotate = interpolate(
    //   transition.value,
    //   [0, 1],
    //   [0, ((index - 1) * Math.PI) / 6]
    // );
    const rotate = (index - 1) * mix(transition.value, 0, Math.PI / 6);

    return {
      transform: [
        { translateX: origin },
        { rotate: `${rotate}rad` },
        { translateX: -origin },
      ],
    };
  });
  return (
    <Animated.View key={card} style={[styles.overlay, style]}>
      <Card {...{ card }} />
    </Animated.View>
  );
};
