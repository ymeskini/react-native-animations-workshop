import { View, StyleSheet, LayoutRectangle } from "react-native";
import { Card, Cards, CARD_HEIGHT, CARD_WIDTH } from "../components/Card";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
} from "react-native-reanimated";
import { useState } from "react";
import { clamp, withBouncing } from "react-native-redash";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

type GestureContext = { offsetX: number; offsetY: number };
type PanGestureProps = { width: number; height: number };

const PanGestures = ({ width, height }: PanGestureProps) => {
  const boundX = width - CARD_WIDTH;
  const boundY = height - CARD_HEIGHT;
  // step 1 create animated values
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  // step 2: create a gesture handler
  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    GestureContext
  >({
    onStart: (event, ctx) => {
      ctx.offsetX = translateX.value;
      ctx.offsetY = translateY.value;
    },
    // event contains velocity etc.
    // ctx is used to store state between events
    onActive: (event, ctx) => {
      translateX.value = clamp(ctx.offsetX + event.translationX, 0, boundX);
      translateY.value = clamp(ctx.offsetY + event.translationY, 0, boundY);
    },
    onEnd: (event) => {
      translateX.value = withBouncing(
        withDecay({
          velocity: event.velocityX,
          // clamp: [0, boundX],
        }),
        0,
        boundX
      );
      translateY.value = withBouncing(
        withDecay({
          velocity: event.velocityY,
          // clamp: [0, boundY],
        }),
        0,
        boundY
      );
    },
  });

  // step 3 animated styles
  const style = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <PanGestureHandler {...{ onGestureEvent }}>
        <Animated.View {...{ style }}>
          <Card card={Cards.Card1} />
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export const PanGestureView = () => {
  const [container, setContainer] = useState<null | LayoutRectangle>(null);
  return (
    <View
      style={styles.container}
      onLayout={({ nativeEvent: { layout } }) => setContainer(layout)}
    >
      {container && <PanGestures {...container} />}
    </View>
  );
};
