import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

function AddPeople({ navigation }) {
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [description, setDescription] = useState('');

  const handleAddPerson = () => {
    // Here, you can save the person's information to your local storage or database.
    // You can use AsyncStorage, SQLite, or any other storage method of your choice.
    // For simplicity, we'll just log the entered data for now.
    console.log('Name:', name);
    console.log('Birthday:', birthday);
    console.log('Description:', description);

    // You can navigate back to the list of people or any other relevant screen after adding the person.
    navigation.goBack(); // Navigates back to the previous screen.
  };

  return (
    <View>
      <Text>Add New Person</Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={text => setName(text)}
      />
      <TextInput
        placeholder="Birthday"
        value={birthday}
        onChangeText={text => setBirthday(text)}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={text => setDescription(text)}
        multiline
      />
      <Button title="Add Person" onPress={handleAddPerson} />
    </View>
  );
}

export default AddPeople;
