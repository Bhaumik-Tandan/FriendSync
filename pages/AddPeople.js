import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/Feather"; // Import icons from 'react-native-vector-icons'
import { FAB } from "react-native-paper";
import { usePeople } from "../context/PeopleContext";
import { calcHeight, calcWidth, getFontSizeByWindowWidth } from "../helper/res";
import { AntDesign,FontAwesome } from "@expo/vector-icons";
import { Feather } from '@expo/vector-icons'; 
import * as ImagePicker from 'expo-image-picker';
import Menu from "../components/Menu";
import { Ionicons } from "@expo/vector-icons";
import PAGES from "../constants/pages";

function AddPeople({ navigation, route }) {
  const {
    name: routeName,
    description: routeDescription,
    birthday: routeBirthday,
    image: routeImage,
    id,
  } = route.params || {};
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState(new Date());
  const [description, setDescription] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { handleAddPeople, handleEditPerson } = usePeople();
  const [image, setImage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const hideMenu=()=>{
    setModalVisible(false);
  }

  async function handleTakePhoto() {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
  
    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your camera!");
      return;
    }
  
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing:true,
      aspect: [4, 3], // Optional: you can specify the aspect ratio for the image editor
      quality: 1,
    });
  
      if(result.assets[0].uri)
      setImage(result.assets[0].uri);
  }

  async function handlePickPhoto() {
    // Request permission to access the photo library
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    // Check if permission is granted
    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photo library!");
      return;
    }
  
    // Launch the image picker to select a photo
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true, // Allows the user to edit the photo
      aspect: [4, 3], // Optional: you can specify the aspect ratio for the image editor
      quality: 1, // Optional: quality of the selected image, 1 being the highest
    });
  
  
    // If an image is selected, set the image URI
    if (result.assets[0].uri) {
      setImage(result.assets[0].uri);
    }
  }
  

  const options = [
    {
        title: "Take Photo",
        onClick: handleTakePhoto,
        icon: <Feather name="camera" size={calcWidth(8)} color="black" />,
    },
    {
        title: "Choose Photo",
        onClick: handlePickPhoto,
        icon: <FontAwesome name="photo" size={calcWidth(8)} color="black" />,
    },
    ...(
        image
            ? [{
                  title: "Delete Photo",
                  onClick: () => setImage(""),
                  icon: (
                      <FontAwesome
                          name="photo"
                          size={calcWidth(8)}
                          color="black"
                      />
                  ),
              }]
            : []
    ),
];


  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: id ? "Edit Person" : "Add Person",
    });
  }, [navigation]);

  const handleAddPerson = async () => {
    const newPerson = {
      name,
      birthday,
      description,
      image
    };
    if (id) await handleEditPerson({ id, ...newPerson });
    else await handleAddPeople([newPerson]);
    navigation.navigate(PAGES.PEOPLE_LIST);
  };

  React.useEffect(() => {
    if (routeName) {
      setName(routeName);
    }
    if (routeDescription) {
      setDescription(routeDescription);
    }
    if (routeBirthday) {
      setBirthday(routeBirthday);
    }
    if(routeImage)
    setImage(routeImage);
  }, [routeName, routeDescription, routeBirthday,routeImage]);

  const onDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setBirthday(selectedDate);
      setShowDatePicker(false); // Close the date picker after selecting a date
    }
  };

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.imageContainer,{
          backgroundColor: image?"transparent":"grey",
        }]}
        onPress={() => setModalVisible(true)}
        
      >
       {image? <Image
          source={{uri:image}}
          style={{width: calcWidth(90), height: calcHeight(20)}}
          />:<View style={styles.imageBox}>
          <Ionicons
            name="person"
            size={calcHeight(10)}
            color="black"
            style={styles.image}
          />
        </View>}
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
        keyboardType="default"
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={(text) => setDescription(text)}
        keyboardType="default"
        multiline
      />
      <View style={styles.birthdayContainer}>
        <Text style={styles.label}>Birthday</Text>
        {Platform.OS == "android" && (
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <View style={styles.calendarIcon}>
              <Icon name="calendar" size={20} color="#007AFF" />
            </View>
            <Text style={styles.dateText}>{formatDate(birthday)}</Text>
          </TouchableOpacity>
        )}
        {Platform.OS == "ios" && (
          <DateTimePicker
            testID="dateTimePicker"
            value={birthday}
            mode="date"
            display="default"
            onChange={onDateChange}
            maximumDate={new Date()}
            style={styles.datePicker}
          />
        )}
      </View>
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={birthday}
          mode="date"
          display="default"
          onChange={onDateChange}
          maximumDate={new Date()}
          style={styles.datePicker}
        />
      )}
      <Button
        title={id ? "Edit Person" : "Add Person"}
        onPress={handleAddPerson}
        color="#007AFF"
        style={styles.button}
      />
      <View style={styles.fabContainer}>
        <FAB
          icon={() => <AntDesign name="adduser" size={24} color="black" />}
          onPress={() => navigation.navigate(PAGES.ADD_FROM_CONTACT)}
        />
      </View>
      <Menu
        visible={modalVisible}
        hideMenu={hideMenu}
        options={options}
        icon={()=><Ionicons
          name="person"
          size={calcHeight(3)}
          color="black"
          style={styles.image}
        />}
        menuTitle={"Edit Picture"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: calcHeight(2),
    backgroundColor: "white", // Set a background color,
  },
  input: {
    height: calcHeight(4),
    borderColor: "lightgray", // Use a lighter color for the border
    borderWidth: calcWidth(0.2),
    borderRadius: calcWidth(1), // Add rounded corners
    marginBottom: calcHeight(1),
    padding: calcHeight(1),
  },
  birthdayContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: calcHeight(3),
  },
  label: {
    marginRight: calcWidth(3),
    fontSize: getFontSizeByWindowWidth(15),
  },
  calendarIcon: {
    padding: calcWidth(1),
  },
  dateText: {
    fontSize: getFontSizeByWindowWidth(12),
  },
  datePicker: {
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "#007AFF", // iOS blue color
    color: "white",
    padding: calcHeight(1),
    borderRadius: calcHeight(1),
    marginTop: calcHeight(1),
  },
  fabContainer: {
    position: "absolute",
    bottom: calcHeight(5), // 5% of the device height
    right: calcWidth(5), // 5% of the device width
  },
  imageContainer: {
    alignItems: "center", // This will center align items horizontally
    justifyContent: "center", // This will center align items vertically
    marginBottom: calcHeight(2),
    padding: calcHeight(2),
  },
  imageBox: {
    backgroundColor: "white",
    justifyContent: "center", // Center align children vertically
    alignItems: "center", // Center align children horizontally
    borderRadius: calcWidth(30),
    padding: calcHeight(2),
    modalView: {
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor: "rgba(0,0,0,0.5)", // Dimmed background
    }
  },
});

export default AddPeople;
