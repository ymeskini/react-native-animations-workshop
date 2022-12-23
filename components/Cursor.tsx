import * as React from "react";
import { StyleSheet, View } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  SharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
} from "react-native-reanimated";
import { canvas2Polar, clamp, polar2Canvas } from "react-native-redash";
import { StyleGuide } from "./StyleGuide";

interface CursorProps {
  r: number;
  strokeWidth: number;
  theta: SharedValue<number>;
}

export const Cursor = ({ strokeWidth, theta, r }: CursorProps) => {
  const center = { x: r, y: r };
  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { offsetX: number; offsetY: number }
  >({
    onStart: (event, ctx) => {
      // here we need to remember the offset of the cursor
      const { x, y } = polar2Canvas({ theta: theta.value, radius: r }, center);
      ctx.offsetX = x;
      ctx.offsetY = y;
    },
    onActive: (event, ctx) => {
      const { translationX, translationY } = event;
      const x = ctx.offsetX + translationX;
      const y1 = ctx.offsetY + translationY;
      const y =
        x < r
          ? y1
          : theta.value < Math.PI
          ? clamp(y1, 0, r - 0.001)
          : clamp(y1, r, 2 * r);
      const value = canvas2Polar({ x, y }, center).theta;
      theta.value = value > 0 ? value : 2 * Math.PI + value;
    },
  });

  const style = useAnimatedStyle(() => {
    const { x: translateX, y: translateY } = polar2Canvas(
      { theta: theta.value, radius: r },
      center
    );
    return {
      transform: [{ translateX }, { translateY }],
    };
  });
  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View
        style={[
          {
            ...StyleSheet.absoluteFillObject,
            width: strokeWidth,
            height: strokeWidth,
            borderRadius: strokeWidth / 2,
            borderColor: "white",
            borderWidth: 5,
            backgroundColor: StyleGuide.palette.primary,
          },
          style,
        ]}
      />
    </PanGestureHandler>
  );
};
