import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Feather'; // Import icons from 'react-native-vector-icons'
import {setLocalStoreData,getLocalStoreData} from '../helper/localStorage';

function AddPeople({ navigation }) {
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState(new Date());
  const [description, setDescription] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleAddPerson = async () => {
    console.log('Name:', name);
    console.log('Birthday:', birthday);
    console.log('Description:', description);
    const people = await getLocalStoreData('people');
    const newPerson = {
      name,
      birthday,
      description,
    };
    const updatedPeople = people? [...people, newPerson]:[newPerson];
    await setLocalStoreData('people',updatedPeople);
    navigation.navigate('PeopleList');
  };

  const onDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setBirthday(selectedDate);
      setShowDatePicker(false); // Close the date picker after selecting a date
    }
  };

  const formatDate = date => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={text => setName(text)}
        keyboardType="default"
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={text => setDescription(text)}
        keyboardType="default"
        multiline
      />
      <View style={styles.birthdayContainer}>
        <Text style={styles.label}>Birthday</Text>
        {Platform.OS=='android' &&<TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <View style={styles.calendarIcon}>
            <Icon name="calendar" size={20} color="#007AFF" />
          </View>
        </TouchableOpacity>}
        {Platform.OS=='android'?<Text style={styles.dateText}>{formatDate(birthday)}</Text>: <DateTimePicker
          testID="dateTimePicker"
          value={birthday}
          mode="date"
          display="default"
          onChange={onDateChange}
          maximumDate={new Date()}
          style={styles.datePicker}
        />}
      </View>
      {(showDatePicker) && (
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
        title="Add Person"
        onPress={handleAddPerson}
        color="#007AFF"
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white', // Set a background color
  },
  input: {
    height: 40,
    borderColor: 'lightgray', // Use a lighter color for the border
    borderWidth: 1,
    borderRadius: 8, // Add rounded corners
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
  calendarIcon: {
    padding: 8,
  },
  dateText: {
    fontSize: 16,
  },
  datePicker: {
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#007AFF', // iOS blue color
    color: 'white',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
});

export default AddPeople;
