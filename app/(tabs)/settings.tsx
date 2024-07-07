import {
  StyleSheet,
  ScrollView,
  Linking,
  TouchableOpacity,
  useColorScheme,
  Share,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import * as Application from "expo-application";

export default function TabTwoScreen() {
  const router = useRouter();
  const theme = useColorScheme() ?? "light";
  const appVersion = Application.nativeApplicationVersion;
  const shareApp = async () => {
    try {
      const result = await Share.share({
        message:
          "Check out Jounalify - Your ultimate journaling app! Download it here: ${app url}",
        // You can also include other data like URL or title:
        // title: 'Packupify App',
        // url: 'https://your-app-url.com',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // Shared successfully
          console.log(`Shared via ${result.activityType}`);
        } else {
          // Shared
          console.log("Shared");
        }
      } else if (result.action === Share.dismissedAction) {
        // Dismissed
        console.log("Share dismissed");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemedView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container}>
          <ThemedText type="title">Settings</ThemedText>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "stretch",
              gap: 15,
              marginVertical: 15,
            }}
            onPress={shareApp}
          >
            <Ionicons
              name="share-social-outline"
              size={26}
              color={theme === "light" ? "black" : "white"}
            />
            <ThemedText>Share App</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "stretch",
              gap: 15,
              marginVertical: 15,
            }}
            onPress={() => {}}
          >
            <Ionicons
              name="star-outline"
              size={26}
              color={theme === "light" ? "black" : "white"}
            />
            <ThemedText>Rate Us</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "stretch",
              gap: 15,
              marginVertical: 15,
            }}
            onPress={() => {
              const subject = "Feedback for Jounalify App";
              const emailUrl = `mailto:kanbaknurullah@gmail.com?subject=${encodeURIComponent(
                subject
              )}`;
              Linking.openURL(emailUrl);
            }}
          >
            <MaterialCommunityIcons
              name="message-alert-outline"
              size={26}
              color={theme === "light" ? "black" : "white"}
            />
            <ThemedText>Share feedback</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "stretch",
              gap: 15,
              marginVertical: 15,
            }}
            onPress={() => {
              router.push("/terms-and-conditions");
            }}
          >
            <Ionicons
              name="document-text-outline"
              size={26}
              color={theme === "light" ? "black" : "white"}
            />
            <ThemedText>Terms and Conditions</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "stretch",
              gap: 15,
              marginVertical: 15,
            }}
            onPress={() => {
              router.push("/privacy-policy");
            }}
          >
            <Ionicons
              name="document-lock-outline"
              size={26}
              color={theme === "light" ? "black" : "white"}
            />
            <ThemedText>Privacy Policy</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "stretch",
              gap: 15,
              marginVertical: 15,
            }}
            onPress={() => {
              Linking.openURL(
                "https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"
              );
            }}
          >
            <Octicons
              name="law"
              size={26}
              color={theme === "light" ? "black" : "white"}
            />
            <ThemedText>End User License Agreement</ThemedText>
          </TouchableOpacity>
          <ThemedView
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "stretch",
              gap: 15,
              marginVertical: 15,
            }}
          >
            <Ionicons
              name="information-circle-outline"
              size={26}
              color={theme === "light" ? "black" : "white"}
            />
            <ThemedText style={{ fontSize: 12, flex: 1 }}>
              Your data is stored locally on your device to enhance user
              experience. Deleting the app will result in removal of your all
              locally stored journal details on your device.
            </ThemedText>
          </ThemedView>
          <ThemedView
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "stretch",
              gap: 15,
              marginVertical: 15,
            }}
          >
            <Octicons
              name="versions"
              size={26}
              color={theme === "light" ? "black" : "white"}
            />
            <ThemedText style={{ fontSize: 12, flex: 1 }}>
              Version {appVersion}
            </ThemedText>
          </ThemedView>
        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 15,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 5,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
  },
  footer: {
    fontSize: 16,
    marginTop: 20,
    color: "gray",
    fontStyle: "italic",
  },
  createButton: {
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: "90%",
    bottom: 15,
  },
});
