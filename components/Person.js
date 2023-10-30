import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { calcHeight,calcWidth } from '../helper/res';

function Person({ name, description, birthday }) {
  birthday = birthday!=="" ?new Date(birthday):"";
  return (
    <View style={styles.card}>
      <View style={styles.textContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.birthday}>{birthday!=='' &&
        birthday.getDate() + ' ' + birthday.toLocaleString('default', { month: 'short' }) + ' ' + birthday.getFullYear()
        }</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 4, // for Android shadow
    shadowColor: 'black', // for iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    margin: 40,
    width: calcWidth(30),
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
