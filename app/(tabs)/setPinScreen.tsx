import {useState, useEffect} from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DialPad from '../../components/DialPad';
import { View } from '@/components/Themed';
import { StyleSheet } from 'react-native';

export default function SetPinScreen() {
    const [code, setCode] = useState<string[]>([]);
    const router = useRouter();
    const pinLength = 4;
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

    useEffect(() => {
        if (code.length === pinLength) {
            const savePin = async () => {
                const pin = code.join('');
                await AsyncStorage.setItem('userPin', pin);
                alert ('PIN set successfully!');
                router.replace('/'); // Navigate to the main screen after saving the PIN
            };
            savePin();
        }
    }, [code]);
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
};

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
