import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { setLocalStoreData } from '../helper/localStorage';
function AddPeople({ navigation }) {
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState(new Date());
  const [description, setDescription] = useState('');

  const handleAddPerson = () => {
    console.log('Name:', name);
    console.log('Birthday:', birthday);
    console.log('Description:', description);
    navigation.goBack();
  };

  const onDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setBirthday(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={text => setName(text)}
      />
      <View style={styles.birthdayContainer}>
        <Text style={styles.label}>Birthday</Text>
        <DateTimePicker
          testID="dateTimePicker"
          value={birthday}
          mode="date"
          display="default"
          onChange={onDateChange}
          maximumDate={new Date()}
        />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={text => setDescription(text)}
        multiline
      />
      <Button title="Add Person" onPress={handleAddPerson} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
  },
  birthdayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    marginRight: 10,
    fontSize: 16,
  },
});

export default AddPeople;
