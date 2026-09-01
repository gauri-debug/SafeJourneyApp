import React, { useState, useCallback, useEffect } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useFocusEffect } from "expo-router/react-navigation";
import { useTimer } from '../../utils/TimerContext';
import AsyncStorage from '@react-native-async-storage/async-storage/lib/typescript/AsyncStorage';
import DialPad from '../../components/DialPad';

export default function PinVerification() {
    const pinLength = 4;
    const [code, setCode] = useState<string[]>([]);
    const router = useRouter();
    const { clearOffRouteTimer } = useTimer()
    useEffect(() => {
        const checkPin = async () => {
            const storedPin = await AsyncStorage.getItem('userPin');   
            if (code.length === pinLength) {
                const enteredPin = code.join('');
                if (enteredPin === storedPin) {
                    console.log('PIN verified successfully!');
                    clearOffRouteTimer(); // Clear the off-route timer on successful PIN entry
                router.push('/'); // Navigate to the main screen
            } else {
                alert('Incorrect PIN. Please try again.');
                setCode([]); // Reset the code
            }
        }
        };
        checkPin();
    }, [code]);
    useFocusEffect(
        useCallback(() => {
            // This runs when the screen comes into focus
            setCode([]);

            // Optional: return a cleanup function if you ever need one when leaving the screen
            return () => {}; 
        }, [])
    );
    const onPress = (item: string) => {
        if (item === 'delete') {
            setCode(prev => prev.slice(0, -1));
        } else {
            setCode(prev => {
                if (prev.length < pinLength) {
                    return [...prev, item];
                }
                return prev;
            });
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.pinContainer}>
                {[...Array(pinLength)].map((_, index) => {
                    const isFilled = index < code.length;
                    return (
                        <View key={index} style={[styles.indicatorWrapper]}> 
                            {isFilled ? (
                                <View style={[styles.indicator, styles.filledIndicator]} />
                            ) : (
                                <View style={styles.indicator} />
                            )}
                        </View>
                    );
                })}
            </View>
            <DialPad onPress={onPress}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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