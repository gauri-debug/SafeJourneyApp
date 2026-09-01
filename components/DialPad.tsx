import {View, Text, StyleSheet, TouchableOpacity, Dimensions, FlatList} from 'react-native';
import React from 'react';

interface DialPadProps {
  onPress: (item: string) => void;
}

const width = Dimensions.get('window').width;
const dialPadWidth = width * 0.4;
const dialPad = [
    '1', '2', '3',
    '4', '5', '6',
    '7', '8', '9',
    '0', 'delete',
];
export default function DialPad({ onPress }: { onPress: (item: string) => void }) {
    return (
        <FlatList 
            data={dialPad}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
            style={{ width: dialPadWidth, flexGrow: 0 }}
            columnWrapperStyle={styles.row}
            renderItem={({ item }) => (
                <TouchableOpacity style={[styles.button]} onPress={() => onPress(item)}>
                    <Text>{item}</Text>
                </TouchableOpacity>
            )}
        />
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#00ff66',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
    },
    row: {
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    indicatorWrapper: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#000',
        marginHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    indicator: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    filledIndicator: {
        backgroundColor: '#00ff66',
    },
    pinContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
});