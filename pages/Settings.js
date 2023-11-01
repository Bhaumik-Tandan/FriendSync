import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import PAGES from '../constants/pages';
import { calcHeight } from '../helper/res';

function Settings({ navigation }) {

    const handleExport = () => {
    };

    const handleImport = () => {
    };

    return (
        <View>
            <TouchableOpacity
                style={styles.option}
                onPress={() => navigation.navigate(PAGES.ADD_CARD)}
            >
                <Text style={styles.optionText}>Add Card</Text>
                <AntDesign name="plus" size={calcHeight(3)} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={handleExport}>
                <Text style={styles.optionText}>Export</Text>
                <AntDesign name="upload" size={calcHeight(3)} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={handleImport}>
                <Text style={styles.optionText}>Import</Text>
                <AntDesign name="download" size={calcHeight(3)} color="black" />
            </TouchableOpacity>
        </View>
    );
}

const styles = {
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: calcHeight(2),
        backgroundColor: '#fff',
        margin: calcHeight(1),
    },
    optionText: {
        marginLeft: 10,
        fontSize: 18,
        color: '#333',
    },
};

export default Settings;