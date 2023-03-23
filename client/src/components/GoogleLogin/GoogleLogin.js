import React, { useState, useEffect} from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import GoogleButton from 'react-google-button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3001'
})



function GoogleLogin() {
    const [user, setUser] = useState([]);
    const [profile, setProfile] = useState([]);
    const navigate = useNavigate()

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            setUser(codeResponse)
            getProfile(codeResponse)
        },
        onError: (error) => console.log('Login Failed:', error)
    });

    const getProfile = async (user) => {
        if (user) {
            const newProfile = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                    Accept: 'application/json'
                }
            })
            setProfile(newProfile.data)
            loginUser(newProfile.data)
        }
    }

    const loginUser = async (profile) => {
        try {
            const newUser = await instance.post(`/api/google`, {
                name: profile.name,
                email: profile.email
            });
            localStorage.setItem('User', JSON.stringify(newUser.data.user))
            localStorage.setItem('Token', JSON.stringify(newUser.data.token))
            navigate('/profile')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <GoogleButton onClick={() => login()} />
        </div>
    );
}
export default GoogleLogin;