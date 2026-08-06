import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { router } from '@/.expo/types/router';

export default function AppGateway() {
  // 'loading' checks the vault, 'setup' creates a pin, 'verify' asks for it, 'unlocked' shows the app
  const [appState, setAppState] = useState<'loading' | 'setup' | 'verify' | 'unlocked'>('loading');
  const [pinInput, setPinInput] = useState('');

  useEffect(() => {
    const checkVault = async () => {
      // Look for a saved PIN on the device
      const storedPin = await SecureStore.getItemAsync('user_secure_pin');
      
      if (storedPin) {
        setAppState('verify'); // Found a PIN, ask them to enter it
      } else {
        setAppState('setup'); // No PIN found, first time opening app
      }
    };

    checkVault();
  }, []);

  const saveNewPin = async () => {
    if (pinInput.length === 4) {
      await SecureStore.setItemAsync('user_secure_pin', pinInput);
      setAppState('unlocked');
      setPinInput(''); // clear the input memory
    } else {
      alert('PIN must be exactly 4 digits.');
    }
  };

  const verifyExistingPin = async () => {
    const storedPin = await SecureStore.getItemAsync('user_secure_pin');
    if (pinInput === storedPin) {
      setAppState('unlocked');
      setPinInput('');
    } else {
      alert('Incorrect PIN. Try again.');
      setPinInput('');
    }
  };

  // --- RENDERING ROUTER ---

  if (appState === 'loading') {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  if (appState === 'unlocked') {
    router.push('/');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {appState === 'setup' ? 'Create a new PIN' : 'Enter your PIN'}
      </Text>
      
      <TextInput
        style={styles.input}
        keyboardType="number-pad"
        secureTextEntry={true} // hides the numbers like a password field
        maxLength={4}
        value={pinInput}
        onChangeText={setPinInput}
        placeholder="****"
      />
      
      <Button 
        title={appState === 'setup' ? 'Save PIN' : 'Unlock'} 
        onPress={appState === 'setup' ? saveNewPin : verifyExistingPin} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    width: '80%',
    borderRadius: 8,
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: 5,
  }
});
