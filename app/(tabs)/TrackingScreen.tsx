
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { useRouter } from 'expo-router';
import MapView,{Marker,Polyline} from 'react-native-maps';
import * as location from 'expo-location';
import * as turf from '@turf/turf';
import { RouteDrawingProvider, useRouteContext } from './useRouteDrawing';
import { subscribe } from "expo-router/build/link/linking";

export default function MapScreen(){
    const [userCoords, setUserCoords] = useState<location.LocationObjectCoords | null>(null);
    const router = useRouter();
    const { 
    routeCoordinates, isDrawingMode, handlePanDrag, clearRoute, startDrawing, finishDrawing, simplifiedRoute} = useRouteContext();
    useEffect(() => {
        let isMounted = true; 
        let locationSubscription: location.LocationSubscription | null = null;
        const startTracking = async () => {
            const sub = await location.watchPositionAsync(
                {
                    accuracy: location.LocationAccuracy.High,
                    timeInterval: 5000,
                    distanceInterval: 10,
                },
                (location) => {
                    if (isMounted)
                        setUserCoords(location.coords);
                }
        );
        if(!isMounted)
            sub.remove();
        else 
            locationSubscription = sub;
    };
    startTracking();

    return () => {
        if (locationSubscription) {
            locationSubscription.remove();
        }
    };
},[]);
    useEffect(() => {
        if(isDrawingMode) return;
        if(!userCoords || !routeCoordinates || routeCoordinates.length===0) return;
        const turfUserPoint = turf.point([userCoords.longitude, userCoords.latitude]);
        const geoJsonCoordinates = routeCoordinates.map((c) => [c.longitude, c.latitude]);
        const turfRouteLine = turf.lineString(geoJsonCoordinates);
        const distance = turf.pointToLineDistance(turfUserPoint, turfRouteLine, { units: 'meters' });
        if (distance > 50) {
            alert("You are off the route!");
        }
    }, [userCoords, routeCoordinates, isDrawingMode]);
    return (
    <View style={styles.container}>
      {userCoords ? (
        <MapView 
          style={styles.map} 
          onPanDrag={handlePanDrag} 
          scrollEnabled={!isDrawingMode} 
          showsUserLocation={true} 
          initialRegion={{
            latitude: userCoords.latitude, 
            longitude: userCoords.longitude, 
            latitudeDelta: 0.005, 
            longitudeDelta: 0.005
          }}
        >
          <Marker
            coordinate={{
              latitude: userCoords.latitude,
              longitude: userCoords.longitude,
            }}
            title="My Location"
            pinColor="red"
          />

          <Polyline 
            coordinates={routeCoordinates} 
            strokeColor="#f1440f" 
            strokeWidth={4} 
          />
        </MapView>

      ) : (

        // 3. Show this while waiting for the GPS
        <Text style={{ marginTop: 50, textAlign: 'center' }}>Finding your location...</Text>
        
      )}

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