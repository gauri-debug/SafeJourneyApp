import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal, Alert, TextInput, NativeSyntheticEvent} from 'react-native';
import { useState, useRef } from 'react';

type KeyPressEvent = {
    nativeSyntheticEvent: {
        key: string;
    };
};
export default function PinVerification() {
    const [pin, setPin] = useState(['','','','']);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const inputRef = useRef<Array<TextInput | null>>([]);

    const handlePinModal = () => {
        setPin(['','','','']);
        setIsModalVisible(true);
    };
    const handleChangeText = (text: string, index: number) => {
        const newPin = [...pin];
        newPin[index] = text;
        setPin(newPin);
        if (text && index < 3) {
            inputRef.current[index + 1]?.focus();
        }
        if (text && index==3){
            const enteredPin = newPin.join('');
            handleVerifyPin(enteredPin);
        }
    };
    const handleKeyPress = (event: KeyPressEvent, index: number) => {
        if (event.nativeSyntheticEvent.key === 'Backspace' && !pin[index] && index > 0) {
            inputRef.current[index - 1]?.focus();
        }
    };
    const handleVerifyPin = (enteredPin: string) => {
        const correctPin = '1234';
        if (enteredPin === correctPin) {
            setIsModalVisible(false);
            Alert.alert('Success', 'Journey completed successfully!');
            navigation.navigate('/');
        } else {
            Alert.alert('Error', 'Incorrect PIN. Please try again.');
            setPin(['','','','']);
            inputRef.current[0]?.focus();
        }
    }
}