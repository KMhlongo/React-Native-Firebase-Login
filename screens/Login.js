import { View, Text, StyleSheet, TextInput, Pressable, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useContext, useEffect, useState } from "react";

import { signUp, login } from '../components/Auth'
import { AuthContext } from '../store/Context'
import Overlay from "../components/Overlay";

function Login() {
    const [isLogin, setIsLogin] = useState(true)
    const [isAuthenticating, setIsAuthenticating] = useState(false)
    const [credentials, setCredentials] = useState({});
    const authContext = useContext(AuthContext)
    const [isValid, setIsValid] = useState({
        email: true,
        password: true
    })

    async function submit() {
        setIsAuthenticating(true)
        try {
            const token =
                isLogin ? await login(credentials.email, credentials.password) :
                    await signUp(credentials.email, credentials.password)
            authContext.authenticate(token)
        } catch (error) {
            Alert.alert('Authentication failed')
        }
        setIsAuthenticating(false)
    }

    function errorCheck() {
        var validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!credentials.email || !credentials.email.match(validEmail)) {
            setIsValid(prev => ({
                ...prev,
                email: false
            }))
            return
        } else if (!isLogin && (!credentials.password || credentials.password.length < 6 || credentials.password !== credentials.confirmPassword)) {
            setIsValid(prev => ({
                ...prev,
                password: false
            }))
            return
        }
        submit()
    }

    function onChangeCredentialHandler(identifier, value) {
        setIsValid(prev => ({
            ...prev,
            email: true,
            password: true
        }))
        setCredentials(prev => ({
            ...prev,
            [identifier]: value
        }))
    }

    function toggleForm() {
        setCredentials({})
        setIsValid(prev => ({
            ...prev,
            email: true,
            password: true
        }))
        setIsLogin(prev => !prev)
    }

    if (isAuthenticating) {
        return (
            <Overlay />
        )
    }

    return (
        <LinearGradient
            colors={['#8BC6EC', '#9599E2']}
            style={styles.container}>
            <View style={styles.loginContainer}>
                <TextInput
                    autoCapitalize='none'
                    autoCorrect={false}
                    style={[styles.input, !isValid.email && styles.invalidInput]}
                    placeholder='Email'
                    onChangeText={
                        onChangeCredentialHandler.bind(this, 'email')
                    }
                    keyboardType='email-address'
                    value={credentials.email}
                />
                <TextInput
                    style={[styles.input, !isValid.password && styles.invalidInput]}
                    placeholder='Password'
                    onChangeText={onChangeCredentialHandler.bind(this, 'password')}
                    secureTextEntry={true}
                    value={credentials.password} />
                {!isLogin &&
                    <TextInput
                        style={[styles.input, !isValid.password && styles.invalidInput]}
                        placeholder='Confirm Password'
                        onChangeText={onChangeCredentialHandler.bind(this, 'confirmPassword')}
                        secureTextEntry={true}
                        value={credentials.confirmPassword} />
                }
                <Text style={styles.errorText}>{!isValid.email && 'Invalid Email Address' || !isValid.password && 'Invalid Passwords or Passwords do no match'}</Text>
                <Pressable
                    onPress={errorCheck}
                    style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
                    <Text
                        style={[styles.text, styles.buttonText]}
                    >{isLogin ? 'Login' : 'Sign Up'}</Text>
                </Pressable>
                <Pressable
                    style={({ pressed }) => [pressed && styles.pressed]}
                    onPress={toggleForm}>
                    <Text
                        style={[styles.text, styles.altText]}>
                        {isLogin ? 'Sign Up' : 'Login'}
                    </Text>
                </Pressable>
            </View>
        </LinearGradient>
    )
}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginContainer: {
        width: '100%',
        padding: 24,
    },
    input: {
        backgroundColor: 'white',
        margin: 12,
        paddingHorizontal: 22,
        padding: 12,
        borderRadius: 22,
        fontSize: 16,
        overflow: 'hidden'
    },
    errorText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
        color: '#e56c72',
    },
    invalidInput: {
        backgroundColor: '#E29599',
        color: 'white',
    },
    button: {
        backgroundColor: '#7073A9',
        marginTop: 18,
        margin: 12,
        borderRadius: 22,
        paddingHorizontal: 22,
        padding: 12,
        elevation: 4,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowRadius: 2,
        shadowOffset: { width: 0, height: 2 }
    },
    text: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500'
    },
    buttonText: {
        color: 'white',
    },
    altText: {
        marginTop: 18,
        color: '#7073A9',
    },
    pressed: {
        opacity: 0.6
    }
})