import React,{useRef} from 'react';
import { View, Text, Image, StyleSheet,TouchableOpacity } from 'react-native';
import { calcHeight,calcWidth } from '../helper/res';
import { Ionicons } from '@expo/vector-icons';
import CardMenu from './CardMenu';
import { usePeople } from '../context/PeopleContext';
import { useNavigation } from '@react-navigation/native';
import PAGES from '../constants/pages';

function Person({ name, description, birthday,id }) {
  birthday = birthday!=="" ?new Date(birthday):"";
  const { deletePerson } = usePeople();
  const [showMenu, setShowMenu] = React.useState(false);
  const navigation = useNavigation();

  const handleEditPerson = () => {
    navigation.navigate(PAGES.ADD_PEOPLE,{name,description,birthday,id});
    setShowMenu(false);
  }


  return (
    <TouchableOpacity style={styles.cardContainer} onPress={()=>setShowMenu(true)}>
      <View style={styles.textContainer}>
        <View style={{flexDirection:"row",justifyContent:"space-between"}}>
        <Text style={styles.name}>{name}</Text>
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
      editCard={handleEditPerson}
  />

    </TouchableOpacity>
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
