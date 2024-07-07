import {
  View,
  Platform,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { Link, router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import React, { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Journal } from "./(tabs)";

export default function Modal() {
  const theme = useColorScheme() ?? "light";
  // If the page was reloaded or navigated to directly, then the modal should be presented as
  // a full screen page. You may need to change the UI to account for this.
  const isPresented = router.canGoBack();
  const params = useLocalSearchParams<{
    journal: string;
  }>();
  const journalInputRef = useRef<TextInput>(null);
  const [journal, setJournal] = useState<string>(
    params.journal ? JSON.parse(params.journal).title : ""
  );
  const [journals, setJournals] = useState<Journal[]>([]);
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("journals");
      if (jsonValue) {
        setJournals(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.log("Error getting journals");
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const storeData = async () => {
    if (params.journal) {
      let selectedJournal: Journal;
      selectedJournal = {
        id: JSON.parse(params.journal).id,
        title: journal,
        date: new Date(),
      };
      const jsonValue = await AsyncStorage.getItem("journals");
      const existingJournals = JSON.parse(jsonValue!);
      const newJournal = existingJournals?.filter(
        (item) => JSON.stringify(item) === params.journal!
      );
      const updatedJournals = existingJournals?.map((item) => {
        if (item === newJournal[0]) {
          return { ...item, title: journal };
        }
        return item;
      });
      try {
        await AsyncStorage.setItem("journals", JSON.stringify(updatedJournals));
        router.back();
      } catch (e) {
        console.log("Error saving journal");
      }
    } else {
      const newJournal: Journal = {
        id: journals.length + 1,
        title: journal,
        date: new Date(),
      };
      const newJournals = [...journals, newJournal];
      setJournals(newJournals);
      try {
        await AsyncStorage.setItem("journals", JSON.stringify(newJournals));
        router.back();
      } catch (e) {
        console.log("Error saving journal");
      }
    }
  };
  useEffect(() => {
    // Focus on the TextInput when step changes to 0 (assuming step 0 is the initial step)
    if (journalInputRef.current) {
      journalInputRef.current.focus();
    }
  }, []);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {/* Use `../` as a simple way to navigate to the root. This is not analogous to "goBack". */}
      {!isPresented && <Link href="../">Dismiss</Link>}
      {/* Native modals have dark backgrounds on iOS. Set the status bar to light content and add a fallback for other platforms with auto. */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      <ThemedView style={{ flex: 1, alignSelf: "stretch" }}>
        <ThemedView style={{ flex: 1, alignSelf: "stretch" }}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
            <ThemedView style={styles.stepContainer}>
              <ThemedText type="subtitle">What do you think of?</ThemedText>
              <TextInput
                ref={journalInputRef}
                placeholder="Journal"
                placeholderTextColor={
                  theme === "light" ? Colors.light.text : Colors.dark.text
                }
                multiline
                style={{
                  minHeight: 250,
                  maxHeight: "85%",
                  height: "auto",
                  width: "90%",
                  borderColor:
                    theme === "light"
                      ? Colors.light.tabIconSelected
                      : Colors.dark.tabIconSelected,
                  borderWidth: 1,
                  borderRadius: 10,
                  padding: 8,
                  color:
                    theme === "light" ? Colors.light.text : Colors.dark.text,
                }}
                value={journal}
                onChangeText={(text) => setJournal(text)}
              />
            </ThemedView>
            <TouchableOpacity
              onPress={() => {
                storeData();
              }}
              style={[
                styles.continueButton,
                {
                  backgroundColor:
                    theme === "light" ? Colors.light.icon : Colors.dark.icon,
                },
              ]}
            >
              <ThemedText
                darkColor={Colors.dark.buttonText}
                lightColor={Colors.light.buttonText}
              >
                Done
              </ThemedText>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ThemedView>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
    gap: 8,
    marginTop: 15,
    marginLeft: 15,
  },
  stepContainer: {
    gap: 8,
    alignItems: "center",
    alignSelf: "stretch",
    marginTop: 15,
  },
  continueButton: {
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: "90%",
    marginTop: "auto",
    bottom: 15,
  },
  createButton: {
    position: "absolute",
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: "90%",
    marginTop: "auto",
    bottom: 15,
  },
  itemContainer: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "center",
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 15,
  },
  iconImage: {
    width: 40,
    height: 40,
  },
});
