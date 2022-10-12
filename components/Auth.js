import axios from "axios";
import { API_KEY } from "@env"

const SIGN_IN_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='
const SIGN_UP_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='

export async function signUp(email, password) {
    const response = await axios.post(
        SIGN_UP_URL + API_KEY,
        {
            email: email,
            password: password,
            returnSecureToken: true,
        }
    )
    .then((response) => {
        const token = response.data.idToken;
        return token
    })
    .catch((error) => {
        throw Error
    })
    return response
}

export async function login(email, password) {
    const response = await axios.post(
        SIGN_IN_URL + API_KEY,
        {
            email: email,
            password: password,
            returnSecureToken: true,
        }
    )
    .then((response) => {
        const token = response.data.idToken;
        return token
    })
    .catch((error) => {
        throw Error
    })
    return response
}
