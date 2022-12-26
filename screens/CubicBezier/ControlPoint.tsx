import { View } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  SharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
} from "react-native-reanimated";
import { clamp } from "react-native-redash";

export const CONTROL_POINT_RADIUS = 20;

interface ControlPointProps {
  x: SharedValue<number>;
  y: SharedValue<number>;
  min: number;
  max: number;
}

export const ControlPoint = ({ x, y, max, min }: ControlPointProps) => {
  const style = useAnimatedStyle(() => ({
    transform: [
      { translateX: x.value - CONTROL_POINT_RADIUS },
      { translateY: y.value - CONTROL_POINT_RADIUS },
    ],
  }));

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {
      x: number;
      y: number;
    }
  >({
    onStart: (_, ctx) => {
      ctx.x = x.value;
      ctx.y = y.value;
    },
    onActive: (event, ctx) => {
      x.value = clamp(ctx.x + event.translationX, min, max);
      y.value = clamp(ctx.y + event.translationY, min, max);
    },
  });
  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View
        style={[
          {
            position: "absolute",
            width: CONTROL_POINT_RADIUS * 2,
            height: CONTROL_POINT_RADIUS * 2,
          },
          style,
        ]}
      />
    </PanGestureHandler>
  );
};
