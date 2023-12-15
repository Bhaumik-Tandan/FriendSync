import React from "react";
import { Alert, View, TouchableOpacity, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { calcWidth, calcHeight } from "../helper/res";
import Modal from "react-native-modal";

const Menu = ({ editCard, visible, hideMenu, onDelete,name }) => {
  const deleteAlert = () => {
    hideMenu();
    Alert.alert(
      "Delete Person",
      `Are you sure you want to delete ${name}?`,
      [
        {
          text: "Delete",
          onPress: onDelete,
          style: "destructive",
        },
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <Modal
      isVisible={visible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.5}
      onBackdropPress={hideMenu}
      onBackButtonPress={hideMenu}
      propagateSwipe={true}
      swipeDirection={["down"]}
      onSwipeComplete={hideMenu}
      style={styles.modal}
    >
      <View style={styles.modalContent}>
        <TouchableOpacity style={styles.menuItem} onPress={editCard}>
          <Ionicons name="create-outline" size={calcWidth(8)} color="blue" />
          <Text style={styles.menuText}>Edit Person</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={deleteAlert}>
          <Ionicons name="trash-outline" size={calcWidth(8)} color="red" />
          <Text style={styles.menuText}>Delete Person</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = {
  menuItem: {
    flexDirection: "row",
    paddingVertical: calcHeight(1),
    alignItems: "center",
    justifyContent: "center",
  },
  menuText: {
    fontSize: calcHeight(2),
    paddingHorizontal: calcHeight(1),
  },
  modalContent: {
    backgroundColor: "white",
    padding: 16,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
};

export default Menu;
