import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { getFontSizeByWindowWidth, calcHeight, calcWidth } from "../helper/res";
import Modal from "react-native-modal";

const Menu = ({ visible, hideMenu, options, icon, menuTitle }) => {
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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={styles.menuHeader}>
            {icon()}
            <Text style={styles.menuTitle}>{menuTitle}</Text>
          </View>
          <TouchableOpacity onPress={hideMenu}>
            <View style={styles.cross}>
              <Entypo name="cross" size={calcHeight(3)} color="#828185" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.options}>
          {options.map((item, index) => (
            <TouchableOpacity
              style={[
                styles.menuItem,
                {
                  borderBottomColor:
                    index == options.length - 1 ? "transparent" : "#d3d3d3",
                },
              ]}
              onPress={item.onClick}
            >
              <Text style={styles.menuText}>{item.title}</Text>
              {item.icon}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
};

const styles = {
  menuItem: {
    flexDirection: "row",
    padding: calcHeight(1),
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    marginLeft: calcWidth(3),
  },
  menuText: {
    fontSize: getFontSizeByWindowWidth(13),
  },
  modalContent: {
    backgroundColor: "#f3f2f6",
    padding: calcHeight(2),
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  menuHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  menuTitle: {
    fontWeight: "bold",
    fontSize: getFontSizeByWindowWidth(15),
    color: "#333",
    marginLeft: calcWidth(4),
  },
  cross: {
    backgroundColor: "#e7e6ea",
    borderRadius: calcHeight(3),
    height: calcHeight(3),
    width: calcHeight(3),
  },
  options: {
    backgroundColor: "white",
    marginVertical: calcHeight(4),
    borderRadius: calcHeight(1),
  },
};

export default Menu;
