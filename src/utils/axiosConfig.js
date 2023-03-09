import axios from 'axios'

const getToken = () => {
    const user = JSON.parse(localStorage.getItem('User'))
    return user ? user.token : ''
}

const instance = axios.create({
    baseURL: `http://localhost:3001`,
    timeout: 5000,
    headers: {
        'x-access-token': getToken(),
        "Content-Type": "application/json"
    }
})

export default instance