import {
  View,
  Platform,
  StyleSheet,
  useColorScheme,
  ScrollView,
} from "react-native";
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import React from "react";

export default function TermsAndConditions() {
  const theme = useColorScheme() ?? "light";
  // If the page was reloaded or navigated to directly, then the modal should be presented as
  // a full screen page. You may need to change the UI to account for this.
  const isPresented = router.canGoBack();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {/* Use `../` as a simple way to navigate to the root. This is not analogous to "goBack". */}
      {!isPresented && <Link href="../">Dismiss</Link>}
      {/* Native modals have dark backgrounds on iOS. Set the status bar to light content and add a fallback for other platforms with auto. */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      <ThemedView style={{ flex: 1, alignSelf: "stretch" }}>
        <ScrollView contentContainerStyle={styles.container}>
          <ThemedView style={styles.contentContainer}>
            <ThemedText style={styles.paragraph}>
              This Privacy Policy describes how Journalify ("we," "us," or
              "our") collects, uses, and shares your personal information when
              you use our mobile application ("App"). By using Journalify, you
              agree to the terms of this Privacy Policy.
            </ThemedText>
            <ThemedText style={styles.subHeading}>
              Information We Collect
            </ThemedText>
            <ThemedText style={styles.paragraph}>
              a. Information You Provide: When you use Journalify, we may
              collect information that you directly provide, such as your name,
              email address, and other contact information.
            </ThemedText>
            <ThemedText style={styles.paragraph}>
              b. Automatically Collected Information: We may use third-party
              services, including Google Analytics, to collect information about
              your use of the App. This information may include your device
              type, operating system, IP address, and usage patterns. Google
              Analytics uses cookies and similar tracking technologies to
              collect this data. You can learn more about how Google Analytics
              collects and processes data in their Privacy Policy.
            </ThemedText>
            <ThemedText style={styles.subHeading}>
              Use of Your Information
            </ThemedText>
            <ThemedText style={styles.paragraph}>
              a. We may use the information we collect to:
            </ThemedText>
            <ThemedText style={styles.paragraph}>
              i. Provide and maintain the App.
            </ThemedText>
            <ThemedText style={styles.paragraph}>
              ii. Analyze and improve the App's performance.
            </ThemedText>
            <ThemedText style={styles.paragraph}>
              iii. Monitor usage and trends.
            </ThemedText>
            <ThemedText style={styles.paragraph}>
              b. We do not sell or share your personal information with third
              parties except as described in this Privacy Policy.
            </ThemedText>
            <ThemedText style={styles.subHeading}>
              Third-Party Services
            </ThemedText>
            <ThemedText style={styles.paragraph}>
              a. Google Analytics: We may use Google Analytics to help us
              understand how users interact with our App. Google Analytics may
              collect information about your use of the App, and their use of
              this data is governed by their Privacy Policy.
            </ThemedText>
            <ThemedText style={styles.subHeading}>Security</ThemedText>
            <ThemedText style={styles.paragraph}>
              a. We take reasonable measures to protect your information from
              unauthorized access, disclosure, alteration, or destruction.
            </ThemedText>
            <ThemedText style={styles.subHeading}>Your Choices</ThemedText>
            <ThemedText style={styles.paragraph}>
              a. You can control and manage the information we collect through
              the settings on your device or by contacting us.
            </ThemedText>
            <ThemedText style={styles.subHeading}>
              Changes to this Privacy Policy
            </ThemedText>
            <ThemedText style={styles.paragraph}>
              a. We may update this Privacy Policy to reflect changes to our
              information practices. We will notify you of any changes by
              posting the new Privacy Policy on this page.
            </ThemedText>
            <ThemedText style={styles.subHeading}>Contact Us</ThemedText>
            <ThemedText style={styles.paragraph}>
              a. If you have any questions or concerns regarding this Privacy
              Policy, please contact us at kanbaknurullah@gmail.com.
            </ThemedText>
          </ThemedView>
        </ScrollView>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 15,
  },
  contentContainer: {
    marginBottom: 20,
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
});
