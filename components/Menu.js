import React from "react";
import {  View, TouchableOpacity, Text } from "react-native";
import { Entypo } from '@expo/vector-icons'; 
import { getFontSizeByWindowWidth, calcHeight, calcWidth } from "../helper/res";
import Modal from "react-native-modal";

const Menu = ({  visible, hideMenu,options,icon,menuTitle}) => {
  
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
        <View style={{
          flexDirection:"row",
          justifyContent:"space-between"
        }}>
        <View style={styles.menuHeader}>
        {icon()}
        <Text style={styles.menuTitle}>{menuTitle}</Text>
        </View>
        <TouchableOpacity
        onPress={hideMenu}>
        <View style={styles.cross}>
        <Entypo name="cross" size={calcHeight(3)} color="#828185" />
        </View>
        </TouchableOpacity>
        </View>
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
    justifyContent:"space-between"
  },
  menuTitle:{ 
    fontWeight: 'bold',
     fontSize: getFontSizeByWindowWidth(15), 
     color: '#333',
     marginLeft:calcWidth(4)
     },
     cross:{
      backgroundColor:"#e7e6ea",
      borderRadius:calcHeight(3),
      height:calcHeight(3),
      width:calcHeight(3)
     }
};

export default Menu;
