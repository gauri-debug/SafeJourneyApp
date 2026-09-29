import {useState, useEffect} from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DialPad from '../../components/DialPad';
import { View } from '@/components/Themed';
import { StyleSheet, TextInput } from 'react-native';

export default function SetPinScreen() {
    const [code, setCode] = useState<string[]>([]);
    const [email, setEmail] = useState<string | null>(null);
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
            const saveSetupData = async () => {
                const pin = code.join('');
                await AsyncStorage.setItem('userPin', pin);
                await AsyncStorage.setItem('userEmail', email || '');
                alert ('PIN and email set successfully!');
                router.replace('/'); // Navigate to the main screen after saving the PIN
            };
            saveSetupData();
        }
    }, [code]);

    return (
            <View style={styles.container}>
                <TextInput style={styles.input} 
                placeholder="Emergency contact email" 
                value={email || ''} onChangeText={setEmail} 
                keyboardType="email-address" 
                autoCapitalize="none" />
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
    input: {
        width: '80%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
});
