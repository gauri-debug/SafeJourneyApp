
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';

export default function Placeholder(){
    const router = useRouter();
    return (
        <View style={styles.container}>
            <View style={styles.spacer} />
            <Text style={styles.placeholdertext}>Tracking in Progress</Text>
            <View style={styles.spacer} />
            <TouchableOpacity style={styles.button} onPress={() => router.push('/')}>
                <Text style={styles.text}>Stop! Safe journey completed</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    placeholdertext: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ff5500',
    },
    button: {
        backgroundColor: '#9500ff',
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderRadius: 5,
        marginBottom: 40,
    },
    spacer: {
        flex: 1,
    },
    text: {
        fontSize: 16,
        color: '#ffffff',
    },
});