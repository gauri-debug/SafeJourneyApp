import {useState} from 'react';
import {LatLng} from 'react-native-maps';
import * as turf from '@turf/turf';
const DISTANCE_THRESHOLD = 0.0001;
const useRouteDrawing = () => {
    const [routeCoordinates, setRouteCoordinates] = useState<{ latitude: number; longitude: number }[]>([]);
    const [isDrawingMode, setIsDrawingMode] = useState(false);
    const [simplifiedRoute, setSimplifiedRoute] = useState<any>(null);

    const handlePanDrag = (e: { nativeEvent: { coordinate: LatLng } }) => {
        if (!isDrawingMode) return;
        const newCoord = e.nativeEvent.coordinate;
        setRouteCoordinates((prevCoords) => {
            if (prevCoords.length === 0) {
                return [newCoord];
            }
            const lastCoord = prevCoords[prevCoords.length - 1];
            const latDiff = Math.abs(newCoord.latitude - lastCoord.latitude);
            const lngDiff = Math.abs(newCoord.longitude - lastCoord.longitude);
            if (latDiff > DISTANCE_THRESHOLD || lngDiff > DISTANCE_THRESHOLD) {
                return [...prevCoords, newCoord];
            }
            return prevCoords;
        });
    };
    const clearRoute = () => {
        setRouteCoordinates([]);
    };
    const startDrawing = () => {
        setIsDrawingMode(true);
        setRouteCoordinates([]); // Optional: clear the old line when they start a new one
        setSimplifiedRoute(null);
    };
    const finishDrawing = () => {
        setIsDrawingMode(false);
        
        // We can only simplify if they actually drew a line!
        if (routeCoordinates.length > 1) {
            const geoJsonCoordinates = routeCoordinates.map(c => [c.longitude, c.latitude]);
            const rawLine = turf.lineString(geoJsonCoordinates);
            const compressedLine = turf.simplify(rawLine, { tolerance: 0.001, highQuality: false });
            
            // Save it to state so the rest of your app can use it
            setSimplifiedRoute(compressedLine);
        }
    };
    const toggleDrawingMode = () => {
        setIsDrawingMode((prev) => !prev);
    };
    return { routeCoordinates, isDrawingMode, handlePanDrag, clearRoute, toggleDrawingMode, startDrawing, finishDrawing };
};
