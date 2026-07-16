import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const dialPad = [
    '1', '2', '3',
    '4', '5', '6',
    '7', '8', '9',
    ' ', '0', 'delete',
];
function DialPad() {
    return (<FlatList
        data={dialPad}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        renderItem={({ item }) => (
            <TouchableOpacity>
                <Text>{item}</Text>
            </TouchableOpacity>
        )}
    />
    );
}
export default function PinVerification() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Enter your PIN</Text>
            <DialPad />
            <TouchableOpacity style={styles.button}>
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
        backgroundColor: '#9500ff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
    },
});