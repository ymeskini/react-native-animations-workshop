import { View, StyleSheet } from "react-native";
import Animated, { useDerivedValue } from "react-native-reanimated";
import { ReText, round } from "react-native-redash";
import { StyleGuide } from "../../components/StyleGuide";

const styles = StyleSheet.create({
  date: {
    ...StyleGuide.typography.title3,
    textAlign: "center",
  },
  price: {
    ...StyleGuide.typography.title2,
    textAlign: "center",
  },
});


export interface DataPoint {
  coord: {
    x: number;
    y: number;
  };
  data: {
    x: number;
    y: number;
  };
}

interface LabelProps {
  point: Readonly<
    Animated.SharedValue<{
      coord: {
        x: number;
        y: number;
      };
      data: {
        x: number;
        y: number;
      };
    }>
  >;
}

export const Label = ({ point }: LabelProps) => {
  const date = useDerivedValue(() => {
    return new Date(point.value.data.x).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      weekday: "long",
      year: "numeric",
    });
  });

  const price = useDerivedValue(() => {
    return `${round(point.value.data.y, 2).toLocaleString("en-US", {
      currency: "USD",
    })}`;
  });

  return (
    <View>
      <ReText style={styles.date} text={date} />
      <ReText style={styles.price} text={price} />
    </View>
  );
};
