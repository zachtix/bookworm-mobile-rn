import SafeScreen from "@/components/SafeScreen";
import { SplashScreen, Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";

import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";
import Loader from "@/components/Loader";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();

  const { checkAuth, user, token, isLoading } = useAuthStore();

  const [fontLoaded] = useFonts({
    "JetBrainsMono-Medium": require("@/assets/fonts/JetBrainsMono-Medium.ttf"),
  });
  useEffect(() => {
    if (fontLoaded) SplashScreen.hideAsync();
  }, [fontLoaded]);

  useEffect(() => {
    checkAuth();
  }, []);

  // useEffect(() => {
  //   if (isLoading) return;

  //   if (!segments.length) return;

  //   const inAuthScreen = segments[0] === "(auth)";
  //   // const isSignedIn = user && token;
  //   const isSignedIn = !!user && !!token;

  //   if (!isSignedIn && !inAuthScreen) router.replace("(auth)");
  //   else if (isSignedIn && inAuthScreen) router.replace("(tabs)");
  // }, [user, token, segments, isLoading]);

  useEffect(() => {
    if (isLoading) return;
    if (!segments.length) return;

    const inAuthScreen = segments[0] === "(auth)";
    const isSignedIn = !!user && !!token;

    if (!isSignedIn && !inAuthScreen) {
      router.replace("(auth)");
    }

    if (isSignedIn && inAuthScreen) {
      router.replace("(tabs)");
    }
  }, [user, token, segments, isLoading]);
  if (isLoading) {
    // return <Loader />;
    return null;
  }
  return (
    <SafeAreaProvider>
      <SafeScreen>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
        </Stack>
      </SafeScreen>
      <StatusBar barStyle={"dark-content"} />
    </SafeAreaProvider>
  );
}
