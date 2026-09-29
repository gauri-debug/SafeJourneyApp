import React, {createContext, useRef, useContext} from 'react';
import { sendEmergencyEmail } from './emergencyEmail';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface TimerContextType {
    startOffRouteTimer: (currentLocation: string) => void;
    clearOffRouteTimer: () => void;
}

const TimerContext = createContext<TimerContextType | null>(null);

export const TimerProvider = ({ children }: { children: React.ReactNode }) => {
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const startOffRouteTimer = (currentLocation: string) => {
        if (timerRef.current) clearTimeout(timerRef.current); // Timer is already running
        timerRef.current = setTimeout(async () => {
            alert("You have been off the route for too long!");
            try {
                const userEmail = await AsyncStorage.getItem('userEmail');
                if (userEmail) {
                    await sendEmergencyEmail(currentLocation, userEmail);
                } else {
                    alert('You have no emergency contact information.');
                }
            } catch (error) {
                console.error('Error sending emergency email:', error);
            }
            timerRef.current = null; // Reset the timer reference after alert
        }, 120000); // 2 minutes
    };
    const clearOffRouteTimer = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    };
    
    return (
        <TimerContext.Provider value={{ startOffRouteTimer, clearOffRouteTimer }}>
            {children}
        </TimerContext.Provider>
    );
};
export const useTimer = () => {
    const context = useContext(TimerContext);
    if (!context) {
        throw new Error('useTimer must be used within a TimerProvider');
    }
    return context;
}
