import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Login from './screens/Login';
import Home from './screens/Home';
import AuthContextProvider, { AuthContext } from './store/Context';
import Overlay from './components/Overlay';

const Stack = createNativeStackNavigator()

function Authenticated() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name='home' component={Home} />
    </Stack.Navigator>
  )
}

function Authenticate() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name='login' component={Login} />
    </Stack.Navigator>
  )
}

function Root() {
  const authContext = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        authContext.authenticate(storedToken)
      }
      setIsLoading(false);
    }
    fetchToken()
  }, [])

  if (isLoading) {
    return <Overlay />
  }

  return (
    <NavigationContainer>
      {!authContext.isAuthenticated && <Authenticate />}
      {authContext.isAuthenticated && <Authenticated />}
    </NavigationContainer>
  )
}


export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}