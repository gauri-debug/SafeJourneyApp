
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { useRouter } from 'expo-router';
import MapView,{Marker} from 'react-native-maps';
import * as location from 'expo-location';

export default function Placeholder(){
    const [userCoords, setUserCoords] = useState<location.LocationObjectCoords | null>(null);
    const router = useRouter();
    useEffect(() => {
    let locationSubscription: location.LocationSubscription | null = null;
    const startTracking = async () => {
        locationSubscription = await location.watchPositionAsync(
            {
                accuracy: location.LocationAccuracy.High,
                timeInterval: 5000,
                distanceInterval: 10,
            },
            (location) => {
                setUserCoords(location.coords);
            }
        );
    };

    startTracking();

    return () => {
        if (locationSubscription) {
            locationSubscription.remove();
        }
    };
}, []);

    return (
        <View style={styles.container}>
            <MapView style={styles.map} region={userCoords ? {
          latitude: userCoords.latitude,
          longitude: userCoords.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        } : undefined}>
         {userCoords && (
          <Marker 
            coordinate={{
              latitude: userCoords.latitude,
              longitude: userCoords.longitude,
            }}
            title="My Location"
            pinColor="red"
          />
        )}
        </MapView>
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
        flex: 1,
        width: '100%',
        height: '100%',
    },
});