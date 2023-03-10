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

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Examples">
        <Stack.Screen name="Examples" component={Examples} />
        <Stack.Screen name="Accordion" component={Accordion} />
        <Stack.Screen name="ShapeMorphing" component={ShapeMorphing} />
        <Stack.Screen name="CubicBezier" component={CubicBezier} />
        <Stack.Screen name="DragToSort" component={DragToSort} />
        <Stack.Screen name="DynamicSpring" component={DynamicSpring} />
        <Stack.Screen name="Swiping" component={Swiping} />
        <Stack.Screen name="Graph" component={Graph} />
        <Stack.Screen name="CircularSlider" component={CircularSlider} />
        <Stack.Screen
          name="HighOrderAnimation"
          component={HighOrderAnimation}
        />
        <Stack.Screen name="Transitions" component={Transitions} />
        <Stack.Screen name="Worklets" component={Worklets} />
        <Stack.Screen name="PanGestures" component={PanGestureView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
