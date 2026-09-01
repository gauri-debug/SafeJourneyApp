import {createContext, useState, useRef, useContext} from 'react';

interface TimerContextType {
    startOffRouteTimer: () => void;
    clearOffRouteTimer: () => void;
}

const TimerContext = createContext<TimerContextType | null>(null);

export const TimerProvider = ({ children }: { children: React.ReactNode }) => {
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const startOffRouteTimer = () => {
        if (timerRef.current) return; // Timer is already running
        timerRef.current = setTimeout(() => {
            alert("You have been off the route for too long!");
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
