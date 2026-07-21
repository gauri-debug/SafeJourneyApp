import React, { useState, useCallback } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useFocusEffect } from "expo-router/react-navigation";

const width = Dimensions.get('window').width;
const dialPadWidth = width * 0.4;
const dialPad = [
    '1', '2', '3',
    '4', '5', '6',
    '7', '8', '9',
    '0', 'delete',
];

function DialPad({ onPress }: { onPress: (item: string) => void }) {
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

export default function PinVerification() {
    const pinLength = 4;
    const [code, setCode] = useState<string[]>([]);
    const router = useRouter();
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
            <TouchableOpacity style={styles.button} onPress={() => router.push('/')}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        </View>
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