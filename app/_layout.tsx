import { colors } from "@/constants/styles";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";


export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { primary, secondary } = colors[colorScheme || "light"];
  return (
    <Stack>
      <Stack.Screen 
            name="index"
            options={{
              title: "Math App",
              headerTintColor:secondary,
              headerStyle: {
                backgroundColor: primary
              },
              headerTitleStyle: {
                fontSize: 24,
                color: secondary
              },
              headerShown: true,
            }} />
      <Stack.Screen 
            name="play"
            options={{
              title: "Play",
              headerTintColor:secondary,
              headerStyle: {
                backgroundColor: primary
              },
              headerTitleStyle: {
                fontSize: 24,
                color: secondary
              },
              headerShown: true,
            }} />
      <Stack.Screen 
            name="settings"
            options={{
              title: "Settings",
              headerTintColor:secondary,
              headerStyle: {
                backgroundColor: primary
              },
              headerTitleStyle: {
                fontSize: 24,
                color: secondary
              },
              headerShown: true,
            }} />
      <Stack.Screen 
            name="leaderboard"
            options={{
              title: "Leaderboard",
              headerTintColor:secondary,
              headerStyle: {
                backgroundColor: primary
              },
              headerTitleStyle: {
                fontSize: 24,
                color: secondary
              },
              headerShown: true,
            }} />
      <Stack.Screen 
            name="results"
            options={{
              title: "Results",
              headerTintColor:secondary,
              headerStyle: {
                backgroundColor: primary
              },
              headerTitleStyle: {
                fontSize: 24,
                color: secondary
              },
              headerShown: true,
            }} />
      <Stack.Screen 
            name="selectMode"
            options={{
              title: "Select Mode",
              headerTintColor:secondary,
              headerStyle: {
                backgroundColor: primary
              },
              headerTitleStyle: {
                fontSize: 24,
                color: secondary
              },
              headerShown: true,
            }} />
      <Stack.Screen 
            name="customize"
            options={{
              title: "Custom",
              headerTintColor:secondary,
              headerStyle: {
                backgroundColor: primary
              },
              headerTitleStyle: {
                fontSize: 24,
                color: secondary
              },
              headerShown: true,
            }} />
    </Stack>
  );
}
