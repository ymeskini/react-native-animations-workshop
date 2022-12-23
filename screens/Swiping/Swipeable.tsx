import { forwardRef, Ref, useImperativeHandle } from "react";
import { Dimensions, StyleSheet } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  SharedValue,
  useAnimatedGestureHandler,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { snapPoint } from "react-native-redash";
import { A, ProfileModel } from "./Profile";
import { Profile } from "./Profile";

const { width, height } = Dimensions.get("window");
interface SwiperProps {
  onSwipe: () => void;
  profile: ProfileModel;
  onTop: boolean;
  scale: SharedValue<number>;
}

export type Swiper = {
  swipeLeft: () => void;
  swipeRight: () => void;
};

const swipe = (
  translateX: SharedValue<number>,
  dest: number,
  velocity: number,
  onSwipe: () => void
) => {
  "worklet";
  translateX.value = withSpring(
    dest,
    { velocity, restSpeedThreshold: dest === 0 ? 0.01 : 100 },
    () => {
      if (dest !== 0) {
        runOnJS(onSwipe)();
      }
    }
  );
};

const snapPoints = [-A, 0, A];

export const Swipeable = forwardRef(
  ({ profile, onTop, onSwipe, scale }: SwiperProps, ref: Ref<Swiper>) => {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    useImperativeHandle(ref, () => ({
      swipeLeft: () => {
        swipe(translateX, -A, 25, onSwipe);
      },
      swipeRight: () => {
        swipe(translateX, A, 25, onSwipe);
      },
    }));
    const onGestureHandler = useAnimatedGestureHandler<
      PanGestureHandlerGestureEvent,
      {
        x: number;
        y: number;
      }
    >({
      onStart: (_, ctx) => {
        ctx.x = translateX.value;
        ctx.y = translateY.value;
      },
      onActive: ({ translationX, translationY }, ctx) => {
        translateX.value = ctx.x + translationX;
        translateY.value = ctx.y + translationY;
        scale.value = interpolate(
          translateX.value,
          [-width / 2, 0, width / 2],
          [1, 0.95, 1],
          Extrapolate.CLAMP
        );
      },
      onEnd: ({ velocityX, velocityY }) => {
        const dest = snapPoint(translateX.value, velocityX, snapPoints);
        swipe(translateX, dest, velocityX, onSwipe);
      },
    });
    return (
      <PanGestureHandler onGestureEvent={onGestureHandler}>
        <Animated.View style={StyleSheet.absoluteFill}>
          <Profile
            profile={profile}
            onTop={onTop}
            translateX={translateX}
            translateY={translateY}
            scale={scale}
          />
        </Animated.View>
      </PanGestureHandler>
    );
  }
);
