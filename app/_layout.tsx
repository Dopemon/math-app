import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen 
            name="index"
            options={{
              title: "Math App",
              headerTitleStyle: {
                fontSize: 24,
              },
              headerShown: true,
            }} />
      <Stack.Screen 
            name="play"
            options={{
              title: "Play",
              headerTitleStyle: {
                fontSize: 24,
              },
              headerShown: true,
            }} />
      <Stack.Screen 
            name="settings"
            options={{
              title: "Settings",
              headerTitleStyle: {
                fontSize: 24,
              },
              headerShown: true,
            }} />
      <Stack.Screen 
            name="leaderboard"
            options={{
              title: "Leaderboard",
              headerTitleStyle: {
                fontSize: 24,
              },
              headerShown: true,
            }} />
      <Stack.Screen 
            name="results"
            options={{
              title: "Results",
              headerTitleStyle: {
                fontSize: 24,
              },
              headerShown: true,
            }} />
      <Stack.Screen 
            name="selectMode"
            options={{
              title: "Select Mode",
              headerTitleStyle: {
                fontSize: 24,
              },
              headerShown: true,
            }} />
    </Stack>
  );
}
