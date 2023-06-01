import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { PanGestureView } from "./screens/PanGestures";
import { Worklets } from "./screens/Worklets";
import { Transitions } from "./screens/Transitions";
import { HighOrderAnimation } from "./screens/HighOrderAnimation";
import { Examples } from "./screens/Examples";
import { CircularSlider } from "./screens/CircularSlider";
import { Graph } from "./screens/Graph";
import { Swiping } from "./screens/Swiping";
import { DynamicSpring } from "./screens/DynamicSpring";
import { DragToSort } from "./screens/DragToSort";
import { CubicBezier } from "./screens/CubicBezier";
import { ShapeMorphing } from "./screens/ShapeMorphing";
import { Accordion } from "./screens/Accordion";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { View } from "react-native";

const Stack = createNativeStackNavigator();

const withSafeArea =
  (Component: React.ComponentType<any>) =>
  (props: React.ComponentProps<any>) => {
    const insets = useSafeAreaInsets();
    return (
      <View style={{ flex: 1, paddingTop: insets.top }}>
        <Component {...props} />
      </View>
    );
  };

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Examples">
            <Stack.Screen
              name="Examples"
              options={{
                headerShown: false,
              }}
              component={withSafeArea(Examples)}
            />
            <Stack.Screen name="Accordion" component={withSafeArea(Accordion)} />
            <Stack.Screen name="ShapeMorphing" component={withSafeArea(ShapeMorphing)} />
            <Stack.Screen name="CubicBezier" component={withSafeArea(CubicBezier)} />
            <Stack.Screen name="DragToSort" component={withSafeArea(DragToSort)} />
            <Stack.Screen name="DynamicSpring" component={withSafeArea(DynamicSpring)} />
            <Stack.Screen name="Swiping" component={withSafeArea(Swiping)} />
            <Stack.Screen name="Graph" component={withSafeArea(Graph)} />
            <Stack.Screen name="CircularSlider" component={withSafeArea(CircularSlider)} />
            <Stack.Screen
              name="HighOrderAnimation"
              component={withSafeArea(HighOrderAnimation)}
            />
            <Stack.Screen name="Transitions" component={withSafeArea(Transitions)} />
            <Stack.Screen name="Worklets" component={withSafeArea(Worklets)} />
            <Stack.Screen name="PanGestures" component={withSafeArea(PanGestureView)} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
