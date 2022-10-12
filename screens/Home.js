import { View, Text, Button, StyleSheet } from "react-native";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from '@env'

import { AuthContext } from "../store/Context";

function Home() {
    const [message, setMessage] = useState()
    const [loading, setLoading] = useState(true)
    const authContext = useContext(AuthContext)
    const token = authContext.token

    useEffect(() => {
        axios.get(`${BASE_URL}message.json?auth=${token}`)
            .then((response) => {
                setMessage(response.data)
                setLoading(false)
            })
    }, [])

    if (loading) return <></>

    return (
        <View style={styles.cotainer}>
            <Text>
                {message}
            </Text>
            <Button title='Log Out' onPress={() => {
                authContext.logOut()
            }} />
        </View>
    )

}

export default Home;

const styles = StyleSheet.create({
    cotainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})