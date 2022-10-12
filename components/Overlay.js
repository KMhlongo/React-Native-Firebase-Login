import { ActivityIndicator, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

function Overlay() {
    return (
        <LinearGradient
            colors={['#8BC6EC', '#9599E2']}
            style={styles.container}>
            <ActivityIndicator size="large" />
        </LinearGradient>
    )
}

export default Overlay;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})