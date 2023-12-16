import React from "react";
import {  View, TouchableOpacity, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { calcWidth, calcHeight } from "../helper/res";
import Modal from "react-native-modal";

const Menu = ({  visible, hideMenu,options}) => {
  
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
        {
          options.map((item)=><TouchableOpacity style={styles.menuItem} onPress={item.onClick}>
          {item.icon}
          <Text style={styles.menuText}>{item.title}</Text>
        </TouchableOpacity>)
        }
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
