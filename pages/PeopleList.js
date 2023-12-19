import React, { useState, useLayoutEffect } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FAB } from "react-native-paper";
import { usePeople } from "../context/PeopleContext";
import { calcHeight, calcWidth } from "../helper/res";
import Person from "../components/Person";
import PAGES from "../constants/pages";

function PeopleList({ navigation }) {
  const { people } = usePeople();
  const [deletionMode, setDeletionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => setDeletionMode(!deletionMode)}>
          <Text style={{ color: "#017bff" }}>
            {deletionMode ? "Cancel" : "Edit"}
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, deletionMode]);

  return (
    <View style={styles.container}>
      {people && people.length > 0 ? (
        <FlatList
          data={people}
          renderItem={({ item }) => (
            <Person
              {...item}
              setSelectedIds={setSelectedIds}
              selectedIds={selectedIds}
              deletionMode={deletionMode}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
        />
      ) : (
        <TouchableOpacity
          style={styles.addPeopleButton}
          onPress={() => navigation.navigate(PAGES.ADD_PEOPLE)}
        >
          <Ionicons name="person-add-sharp" size={50} color="black" />
          <Text>Add People</Text>
        </TouchableOpacity>
      )}
      <View style={styles.fabContainer}>
        <FAB
          icon="plus"
          onPress={() => navigation.navigate(PAGES.ADD_PEOPLE)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  fabContainer: {
    position: "absolute",
    bottom: calcHeight(5),
    right: calcWidth(5),
  },
  addPeopleButton: {
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    marginBottom: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default PeopleList;
