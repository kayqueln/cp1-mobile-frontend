import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { extendTheme, NativeBaseProvider } from "native-base";
import { useEffect } from "react";
import "react-native-reanimated";
import { AuthProvider } from "../contexts/AuthContext";
import { TaskProvider } from "../contexts/TaskContext";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../../assets/fonts/Inter-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const newColorTheme = {
    accent: {
      "50": "#E4E8F6",
      "100": "#D5DBF1",
      "200": "#B7C1E7",
      "300": "#98A7DC",
      "400": "#7A8DD2",
      "500": "#5B73C8",
      "600": "#3B55B0",
      "700": "#2D4086",
      "800": "#1F2C5C",
      "900": "#111832",
      "950": "#0A0E1D",
    },
  };

  const theme = extendTheme({
    colors: newColorTheme,
    components: {
      Button: {
        variants: {
          rounded: ({ colorScheme }: { colorScheme: any }) => {
            return {
              bg: `${colorScheme}.500`,
            };
          },
        },
      },
    },
  });

  return (
    <NativeBaseProvider theme={theme}>
      <TaskProvider>
        <AuthProvider>
          <Stack>
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(root)" options={{ headerShown: false }} />
          </Stack>
        </AuthProvider>
      </TaskProvider>
    </NativeBaseProvider>
  );
}
