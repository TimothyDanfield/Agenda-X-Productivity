import axios from 'axios'
import { API_URL } from '../configs/constants'

const getToken = () => {
    const token = JSON.parse(localStorage.getItem('Token'))
    return token ? token : ''
}

const instance = axios.create({
    baseURL: API_URL,
    timeout: 5000,
    headers: {
        'x-access-token': getToken(),
        "Content-Type": "application/json",
    }
})

export default instance