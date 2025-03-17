import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { Provider } from 'react-redux';
import store from './store';
import '../global.css';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <ThemeProvider value={DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="+not-found" />
          <Stack.Screen name="auth/signIn" />
          <Stack.Screen name="auth/signUp" />
          <Stack.Screen name="auth/authenticateOTP" />
          <Stack.Screen name="tabs" />
          <Stack.Screen name="home/detailScreen" />
          <Stack.Screen name="payment" />
          <Stack.Screen name="payment/webview" />
          <Stack.Screen name="order" />
        </Stack>
        <StatusBar style="dark" />
      </ThemeProvider>
    </Provider>
  );
}
