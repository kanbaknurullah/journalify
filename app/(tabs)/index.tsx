import {
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  FlatList,
} from "react-native";
import { HelloWave } from "@/components/HelloWave";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { useFocusEffect, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useState } from "react";
import { Swipeable } from "react-native-gesture-handler";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";

export type Journal = {
  id: number;
  title: string;
  date: Date;
};

const formatDate = (inputDate: Date) => {
  // Step 1: Parse the date string into a Date object
  const date = new Date(inputDate);

  // Step 2: Define arrays for day names and month names
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Step 3: Extract day of the week, month name, and day of the month
  const dayOfWeek = daysOfWeek[date.getUTCDay()];
  const monthName = monthsOfYear[date.getUTCMonth()];
  const dayOfMonth = date.getUTCDate();

  // Step 4: Construct the formatted date string
  const formattedDate = `${dayOfWeek}, ${monthName} ${dayOfMonth}`;

  return formattedDate;
};

export default function HomeScreen() {
  const theme = useColorScheme() ?? "light";
  const router = useRouter();
  const [journals, setJournals] = useState<Journal[]>([]);
  useFocusEffect(
    useCallback(() => {
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
      getData();
    }, [])
  );
  const renderRightActions = (progress, dragX, itemId, item) => {
    const specificJournal = item;
    const removeItem = async () => {
      try {
        const updatedJournals = [...journals];
        updatedJournals.splice(itemId, 1); // Remove item at index
        setJournals(updatedJournals);
        await AsyncStorage.setItem("journals", JSON.stringify(updatedJournals));
      } catch (e) {
        console.log("Error deleting journal:", e);
      }
    };

    return (
      <ThemedView
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          alignSelf: "stretch",
          marginRight: 10,
          gap: 10,
          marginTop: 10,
        }}
      >
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: 60,
            height: 60,
            borderRadius: 30,
            borderWidth: 1,
            borderColor: "#0a7ea4",
          }}
          onPress={() => {
            router.push({
              pathname: "/modal",
              params: {
                journal: JSON.stringify(
                  journals.find((item) => item === specificJournal)
                ),
              },
            });
          }}
        >
          <SimpleLineIcons name="pencil" size={25} color={"#0a7ea4"} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: 60,
            height: 60,
            borderRadius: 30,
            borderWidth: 1,
            borderColor: "red",
          }}
          onPress={removeItem}
        >
          <Ionicons name="trash-outline" size={25} color={"red"} />
        </TouchableOpacity>
      </ThemedView>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemedView style={{ flex: 1 }}>
        <ThemedView style={{ flex: 1 }}>
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">Journals</ThemedText>
            <HelloWave />
          </ThemedView>
          {journals?.length === 0 ? (
            <ThemedView style={styles.stepContainer}>
              <ThemedText>There is no journal to show.</ThemedText>
            </ThemedView>
          ) : (
            <FlatList
              data={journals}
              renderItem={({ item, index }) => {
                return (
                  <Swipeable
                    key={JSON.stringify(item)}
                    renderRightActions={(progress, dragX) =>
                      renderRightActions(progress, dragX, index, item)
                    }
                  >
                    <ThemedView
                      style={[
                        styles.itemContainer,
                        {
                          borderColor:
                            theme === "light"
                              ? Colors.light.tint
                              : Colors.dark.tint,
                          borderWidth: journals[index].id === item.id ? 2 : 1,
                        },
                      ]}
                    >
                      <ThemedView>
                        <ThemedText
                          style={{ fontWeight: "700", fontSize: 18 }}
                          ellipsizeMode="tail"
                          numberOfLines={1}
                        >
                          {journals[index].title}
                        </ThemedText>
                        <ThemedText style={{ fontSize: 14 }}>
                          {formatDate(journals[index].date)}
                        </ThemedText>
                      </ThemedView>
                    </ThemedView>
                  </Swipeable>
                );
              }}
              keyExtractor={(item) => JSON.stringify(item)}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 130 }}
            />
          )}
        </ThemedView>
        <TouchableOpacity
          onPress={() => {
            router.push({
              pathname: "/modal",
            });
          }}
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            borderColor: "#0a7ea4",
            borderWidth: 1,
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            right: 15,
            bottom: 15,
            backgroundColor: theme === "light" ? "#faf8f6" : "transparent",
          }}
        >
          <ThemedText
            style={{
              color: "#0a7ea4",
              fontWeight: "600",
              fontSize: 30,
              lineHeight: 30,
            }}
          >
            +
          </ThemedText>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => {
            router.push({
              pathname: "/modal",
            });
          }}
          style={[
            styles.createButton,
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
            Create new journal
          </ThemedText>
        </TouchableOpacity> */}
      </ThemedView>
    </SafeAreaView>
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
    justifyContent: "center",
    alignSelf: "stretch",
    marginTop: 15,
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
