import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text, Pressable, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FAB } from 'react-native-paper';
import { usePeople } from '../context/PeopleContext';
import { calcHeight, calcWidth, getFontSizeByWindowWidth } from '../helper/res';
import Person from '../components/Person';
import PAGES from '../constants/pages';
import { useIsFocused } from '@react-navigation/native';

function PeopleList({ navigation }) {
  const { people, multiDelete } = usePeople();
  const [deletionMode, setDeletionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const isFocused = useIsFocused();

  const updateTabBarVisibility = () => {
    navigation.getParent()?.setOptions({
      tabBarStyle: deletionMode ? { display: "none" } : {},
    });
  };

  useEffect(() => {
    if (isFocused) {
      updateTabBarVisibility();
    }
  }, [isFocused, deletionMode]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity 
          onPress={() => {
            setDeletionMode((prev) => !prev);
            setSelectedIds([]);
          }}
        >
          {deletionMode ?
            <Text style={[styles.bottomBarText, { fontWeight: "bold" }]}>
              Cancel
            </Text> :
            <Text style={[styles.bottomBarText,{paddingLeft:calcWidth(7)}]}>
              Edit
            </Text>
          }
        </TouchableOpacity>
      ),
    });
  }, [navigation, deletionMode]);
  
  

  const handleDeletePress = async () => {
    Alert.alert(
      "Delete Person",
      `Are you sure you want to delete the selected people?`,
      [
        {
          text: "Delete",
          onPress: () => {
            multiDelete(selectedIds);
            setSelectedIds([]);
            setDeletionMode(false);
          },
          style: "destructive",
        },
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  const renderBottomBar = () => {
    if (deletionMode) {
      return (
        <View style={styles.bottomBar}>
          <Pressable style={styles.bottomBarButton} onPress={handleDeletePress}>
            <Text style={styles.bottomBarText}>Delete</Text>
          </Pressable>
          <Pressable style={styles.bottomBarButton} onPress={()=>{
            setDeletionMode((prev) => !prev)
            setSelectedIds([]);
          }}>
            <Text style={styles.bottomBarText}>Cancel</Text>
          </Pressable>
        </View>
      );
    }
    return (
      <View style={styles.fabContainer}>
        <FAB
          icon="plus"
          onPress={() => navigation.navigate(PAGES.ADD_PEOPLE)}
        />
      </View>
    );
  };

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
      {renderBottomBar()}
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
    padding: calcWidth(1),
    borderRadius: calcWidth(1),
    elevation: 2,
    marginBottom: calcHeight(5),
    alignItems: "center",
    justifyContent: "center",
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    elevation: 2,
    paddingHorizontal: calcWidth(3),
    marginBottom: calcHeight(5),
    paddingTop: calcHeight(2),
  },
  bottomBarButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomBarText: {
    color: '#017bff',
    fontSize: getFontSizeByWindowWidth(15)
  },
  
});

export default PeopleList;
