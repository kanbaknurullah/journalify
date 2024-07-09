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
          <ThemedText style={styles.heading}>Welcome to Journalify!</ThemedText>
          <ThemedText style={styles.paragraph}>
            These Terms of Use ("Terms") govern your use of the Journalify
            mobile application ("App"). By using Journalify, you agree to these
            Terms and acknowledge that you have read and understood them. If you
            do not agree with these Terms, please do not use the App.
          </ThemedText>
          <ThemedText style={styles.subHeading}>Use of the App:</ThemedText>
          <ThemedText style={styles.paragraph}>
            a. You must be at least 13 years old to use Journalify.
          </ThemedText>
          <ThemedText style={styles.paragraph}>
            b. You are responsible for your use of Journalify and for complying
            with all applicable laws.
          </ThemedText>
          <ThemedText style={styles.paragraph}>
            c. You are responsible for maintaining the security of your account.
          </ThemedText>
          <ThemedText style={styles.paragraph}>
            d. You may not use Journalify in any way that could harm the app or
            its users.
          </ThemedText>
          <ThemedText style={styles.paragraph}>
            e. You may not use Journalify in any manner that is prohibited by
            any applicable laws or regulations.
          </ThemedText>
          <ThemedText style={styles.subHeading}>Privacy Policy:</ThemedText>
          <ThemedText style={styles.paragraph}>
            a. Your use of Journalify is also governed by our Privacy Policy,
            which can be found under privacy policy section of settings.
          </ThemedText>
          <ThemedText style={styles.subHeading}>
            Intellectual Property:
          </ThemedText>
          <ThemedText style={styles.paragraph}>
            a. The content and features available in Journalify are protected by
            intellectual property laws. You may not copy, modify, or distribute
            any content from Journalify without our explicit permission.
          </ThemedText>
          <ThemedText style={styles.subHeading}>Termination:</ThemedText>
          <ThemedText style={styles.paragraph}>
            a. We reserve the right to terminate or suspend your account and
            access to Journalify if you violate these Terms or engage in any
            activities that we consider harmful or inappropriate.
          </ThemedText>
          <ThemedText style={styles.subHeading}>Disclaimer:</ThemedText>
          <ThemedText style={styles.paragraph}>
            a. Journalify is provided "as is," without any warranties or
            guarantees of any kind, whether expressed or implied.
          </ThemedText>
          <ThemedText style={styles.subHeading}>
            Limitation of Liability:
          </ThemedText>
          <ThemedText style={styles.paragraph}>
            a. We are not liable for any damages resulting from your use or
            inability to use Journalify, including but not limited to direct,
            indirect, incidental, punitive, and consequential damages.
          </ThemedText>
          <ThemedText style={styles.subHeading}>Governing Law:</ThemedText>
          <ThemedText style={styles.paragraph}>
            a. These Terms are governed by and construed in accordance with the
            laws of Turkey.
          </ThemedText>
          <ThemedText style={styles.subHeading}>Changes to Terms:</ThemedText>
          <ThemedText style={styles.paragraph}>
            a. We may update these Terms at any time. Please check these Terms
            periodically for changes.
          </ThemedText>
          <ThemedText style={styles.subHeading}>Contact Us:</ThemedText>
          <ThemedText style={styles.paragraph}>
            a. If you have any questions or concerns regarding these Terms,
            please contact us at kanbaknurullah@gmail.com.
          </ThemedText>
          <ThemedText style={styles.footer}>
            By using Journalify, you agree to these Terms of Use. If you do not
            agree with these Terms, please discontinue using the App.
          </ThemedText>
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
});
