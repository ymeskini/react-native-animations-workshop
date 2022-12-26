import * as React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";

import { StyleGuide } from "../components/StyleGuide";

export type Routes = {
  Examples: undefined;
  TheHeartOfTheMatter: undefined;
  Worklets: undefined;
  Transitions: undefined;
  PanGestures: undefined;
  HighOrderAnimation: undefined;
  CircularSlider: undefined;
  Graph: undefined;
  Swiping: undefined;
  DynamicSpring: undefined;
  // DragToSort: undefined;
  // Bezier: undefined;
  // ShapeMorphing: undefined;
  // Accordion: undefined;
};

export const examples = [
  {
    screen: "Worklets",
    title: "🐊 Worklets",
  },
  {
    screen: "Transitions",
    title: "🔁 Transitions",
  },
  {
    screen: "PanGestures",
    title: "💳 PanGesture",
  },
  {
    screen: "HighOrderAnimation",
    title: "🐎 High Order Animation",
  },
  {
    screen: "CircularSlider",
    title: "⭕️ Circular Slider",
  },
  {
    screen: "Graph",
    title: "📈 Graph Interactions",
  },
  {
    screen: "DynamicSpring",
    title: "👨‍🔬 Dynamic Spring",
  },
  {
    screen: "Swiping",
    title: "💚 Swiping",
  },
  //   {
  //     screen: "DragToSort",
  //     title: "📤 Drag To Sort",
  //   },
  //   {
  //     screen: "Bezier",
  //     title: "⤴️ Bézier",
  //   },
  //   {
  //     screen: "ShapeMorphing",
  //     title: "☺️ Shape Morphing",
  //   },
  //   {
  //     screen: "Accordion",
  //     title: "🗺 Accordion",
  //   },
] as const;

const styles = StyleSheet.create({
  container: {
    backgroundColor: StyleGuide.palette.background,
  },
  content: {
    paddingBottom: 32,
  },
  thumbnail: {
    backgroundColor: "white",
    padding: StyleGuide.spacing * 2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: StyleGuide.palette.background,
  },
  title: {
    ...StyleGuide.typography.headline,
  },
});

export const Examples = () => {
  const { navigate } = useNavigation<StackNavigationProp<Routes, "Examples">>();
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {examples.map((thumbnail) => (
        <RectButton
          key={thumbnail.screen}
          onPress={() => navigate(thumbnail.screen)}
        >
          <View style={styles.thumbnail}>
            <Text style={styles.title}>{thumbnail.title}</Text>
          </View>
        </RectButton>
      ))}
    </ScrollView>
  );
};
