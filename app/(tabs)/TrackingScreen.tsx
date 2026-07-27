
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { useRouter } from 'expo-router';
import mapView from 'react-native-maps';
import MapView from "react-native-maps";

export default function Placeholder(){
    const router = useRouter();
    return (
        <View style={styles.container}>
            <MapView style={styles.map} />
            <TouchableOpacity style={styles.button} onPress={() => router.push('/PinVerification')}>
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
    map: {
        width: '100%',
        height: '100%',
    },
});