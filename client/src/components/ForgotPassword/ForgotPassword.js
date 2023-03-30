import React from 'react'
import { useEffect, useState } from 'react'
import axios from '../../utils/axiosConfig'
import { useNavigate } from 'react-router-dom'

const ForgotPassword = () => {
    const [user, setUser] = useState('')
    const [securityAnswer, setSecurityAnswer] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const navigate = useNavigate()

    const email = JSON.parse(localStorage.getItem('ForgotPassword'))

    useEffect(() => {
        const getUser = async () => {
            try {
                const user = await axios.get(`/user?email=${email}`)
                setUser(user.data)
            } catch (error) {
                console.log(error)
            }

        }
        getUser()
    }, [])
    
    const handleSubmitForm = async (e) => {
        e.preventDefault();
        await axios.put(`/user/forgotPassword?email=${email}&&newPassword=${newPassword}&&securityAnswer=${securityAnswer}`)
        localStorage.clear()
        navigate('/login')
    };

    const handleSecurityAnswer = (e) => {
        setSecurityAnswer(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setNewPassword(e.target.value)
    }

    return (
        <div style={{ paddingTop: '25%' }}>
            <form onSubmit={handleSubmitForm}>
                <h5>{user && user.securityQuestion}</h5>
                <input className='securityAnswer' placeholder='Your answer' value={securityAnswer} onChange={handleSecurityAnswer}></input>
                <input placeholder='New password' value={newPassword} onChange={handlePasswordChange}></input>
                <button className='forgotPwdButton'>Submit</button>
            </form>
        </div>
    )
}

export default ForgotPassword