import { StyleSheet } from 'react-native';
import { RouteDrawingProvider,useRouteContext } from '../../utils/useRouteDrawing';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View} from '@/components/Themed';
import { TouchableOpacity } from 'react-native';
import {useRouter} from 'expo-router';
import * as location from 'expo-location';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';


export default function IndexScreen() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  useEffect(() => {
    const checkExistingPin = async () => {
      try{
        const storedPin = await AsyncStorage.getItem('userPin');
        if (!storedPin) {
          // If no PIN is set, navigate to the SetPinScreen
          router.replace('/setPinScreen');
        }else {
          router.replace('/TrackingScreen')
        }
        setIsChecking(false);
      }
      catch (error) {
        alert('Error checking PIN: ');
        setIsChecking(false);
      }
    };
      checkExistingPin();
    }, []);
  if (isChecking) {
    return <View><Text>Loading...</Text></View>;
  }
  return null;
  const { isDrawingMode, finishDrawing, startDrawing } = useRouteContext();
  const handleStartJourney = async () => {
    try {
      const { status } = await location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied and the app cannot proceed.');
        return;
      }
      //Toggle to drawing state
      isDrawingMode ? finishDrawing() : startDrawing();
      //Navigatie to TrackingScreen where drawing happens
      router.push('/TrackingScreen');
    } catch (error) {
      console.error('Error requesting location permission:', error);
    }
  };
  return (
    <RouteDrawingProvider>
      <NavigationContainer>
          <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={handleStartJourney}>
              <Text style={styles.title}>Start Journey</Text>
            </TouchableOpacity>
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
          <EditScreenInfo path="app/(tabs)/index.tsx" />
        </View>
      </NavigationContainer>
    </RouteDrawingProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FF00FF',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  button: {
    backgroundColor: '#3cff00',
    padding: 10,
    borderRadius: 5,
  },
});
