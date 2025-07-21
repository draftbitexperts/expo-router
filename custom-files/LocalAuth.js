import React, { useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

const BiometricAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleBiometricAuth = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    if (!hasHardware) {
      Alert.alert(
        'Error',
        'Your device does not support biometric authentication'
      );
      return;
    }

    const supportedAuthTypes =
      await LocalAuthentication.supportedAuthenticationTypesAsync();
    if (supportedAuthTypes.length === 0) {
      Alert.alert('Error', 'No biometric authentication methods available');
      return;
    }

    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    if (!isEnrolled) {
      Alert.alert('Error', 'No biometrics are enrolled on this device');
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate to continue',
      fallbackLabel: 'Use passcode',
      cancelLabel: 'Cancel',
    });

    if (result.success) {
      setIsAuthenticated(true);
      Alert.alert('Success', 'Authenticated successfully!');
    } else {
      Alert.alert('Authentication failed', 'Please try again');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{isAuthenticated ? 'Authenticated!' : 'Please authenticate'}</Text>
      <Button title="Authenticate" onPress={handleBiometricAuth} />
    </View>
  );
};

export { BiometricAuth };
