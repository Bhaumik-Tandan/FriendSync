import React,{useRef} from 'react';
import { View, Text, Image, StyleSheet,TouchableOpacity } from 'react-native';
import { calcHeight,calcWidth } from '../helper/res';
import { Ionicons } from '@expo/vector-icons';
import CardMenu from './CardMenu';
import { usePeople } from '../context/PeopleContext';
import ViewShot from 'react-native-view-shot';
import shareContent from '../helper/shareContent';

function Person({ name, description, birthday,id }) {
  birthday = birthday!=="" ?new Date(birthday):"";
  const { deletePerson } = usePeople();
  const [showMenu, setShowMenu] = React.useState(false);
  const viewShotRef = useRef();

  const sharePerson = async () => {
    if(!viewShotRef.current) return;
    const fileUri= await viewShotRef.current.capture();
    await shareContent({imageUri:fileUri,message:`Hey meet ${name}!`,title:`${name}`});
  };

  return (
    <ViewShot
    options={{ format: 'jpg', quality: 0.9 }}
    ref={viewShotRef}
    >
    <View style={styles.cardContainer}>
      <View style={styles.textContainer}>
        <View style={{flexDirection:"row",justifyContent:"space-between"}}>
        <Text style={styles.name}>{name}</Text>
        <TouchableOpacity onPress={() => setShowMenu(true)}>
                        <Ionicons
                            name="ellipsis-vertical-outline"
                            size={calcHeight(3)}
                            color="black"
                        />
                    </TouchableOpacity>
                    </View>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.birthday}>{birthday!=='' &&
        birthday.getDate() + ' ' + birthday.toLocaleString('default', { month: 'short' }) + ' ' + birthday.getFullYear()
        }</Text>
      </View>
      <CardMenu
      visible={showMenu}
      hideMenu={() => setShowMenu(false)}
      onDelete={() => deletePerson({id})}
      handleShare={() => sharePerson()}
      setShowEditCard={() => setShowMenu(false)}
  />

    </View>
    </ViewShot>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'white',
    borderRadius: calcWidth(2),
    elevation: 4, // for Android shadow
    shadowColor: 'black', // for iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    width: calcWidth(40),
    marginHorizontal: calcWidth(2),
    marginVertical: calcHeight(2)
  },
  textContainer: {
    padding: 10,
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    marginTop: 5,
  },
  birthday: {
    fontSize: 14,
    color: 'gray',
  },
});

export default Person;
