import { useLocalSearchParams, useRouter } from "expo-router";
import { WebView } from "react-native-webview";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useRef } from "react";

export default function WebViewScreen() {
  const { url, orderId } = useLocalSearchParams();
  const router = useRouter();
  const webViewRef = useRef(null);

  const handleNavigationStateChange = (navState) => {
    const { url } = navState;

    if (url.includes("resultCode=0")) {
      router.replace("/tabs");
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <WebView
        ref={webViewRef}
        source={{ uri: url }}
        onNavigationStateChange={handleNavigationStateChange}
        javaScriptEnabled
        domStorageEnabled
      />
    </SafeAreaView>
  );
}
