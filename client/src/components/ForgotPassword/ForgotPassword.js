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
                const user = await axios.get(`/api/user?email=${email}`)
                setUser(user.data)
            } catch (error) {
                console.log(error)
            }
            
        } 
        getUser()
    }, [])

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        const updateUser = await axios.put(`/api/user/forgotPassword?email=${email}&&newPassword=${newPassword}&&securityAnswer=${securityAnswer}`)
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
    <div>
        <div>
            <form onSubmit={handleSubmitForm}>
                <h5>{user.securityQuestion}</h5>
                <input className='securityAnswer' placeholder='Your answer' value={securityAnswer} onChange={handleSecurityAnswer}></input>
                <input placeholder='New password' value={newPassword} onChange={handlePasswordChange}></input>
                <button>Submit</button>
            </form>
        </div>
    </div>
  )
}

export default ForgotPassword