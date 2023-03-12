import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Image } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './profilepage.css'
import toast, { Toaster } from 'react-hot-toast'
import axios from '../../utils/axiosConfig'


const ProfilePage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('');
  const [user, setUser] = useState('')
  const [refresh, setRefresh] = useState('')

  const id = JSON.parse(localStorage.getItem('User'))._id

  useEffect(() => {
    const getUser = async () => {
      try {
        const userObj = await axios.get(`/api/user?_id=${id}`)
        setUser(userObj.data)
      } catch (error) {
        console.log(error)
      }
    }
    getUser()
  }, [refresh])


  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateUser = await axios.put(`/api/user?name=${name}&&email=${email}&&currentPassword=${currentPassword}&&newPassword=${newPassword}&&_id=${user._id}`)
    localStorage.setItem('User', JSON.stringify(updateUser.data.user))
    localStorage.setItem('Token', JSON.stringify(updateUser.data.token))
    toast.success('Successfully updated information')
    setRefresh(!refresh)
    setName('')
    setEmail('')
    setNewPassword('')
  };

  return (
    <div className='profileBody'>
      <div className='taskContainer'>
        <h1>Tasks:</h1>
        {user && user.tasks.map((task, index) => {
          return (
            <div key={index}>
              <div className='profileTask'>
                <div>
                  <h5 style={{ margin: '0' }}>Task: {task.taskName}</h5>
                  <p>Category: {task.category}</p>
                </div>
                <div>
                  <p>Reminder Time:</p>
                  <p>{task.reminderTime}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="profile-settings">
        <h1>Profile Settings</h1>
        <form>
          <div className="form-group">
            <label htmlFor="username">Update Name</label>
            <input type="text" id="name" name="name" className='profileInput' placeholder="Enter your name" onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="form-group">
            <label htmlFor="email">Update Email</label>
            <input type="email" id="email" name="email" className='profileInput' placeholder="Enter your email address" onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="form-group">
            <label htmlFor="password">Update Password</label>
            <input type="password" id="password" name="password" className='profileInput' placeholder="Enter your password" onChange={(e) => setNewPassword(e.target.value)} />
          </div>

          <div className="form-group">
            <label htmlFor="password">Current Password</label>
            <input type="password" id="currentPassword" name="password" required={true} className='profileInput' placeholder="Enter your password" onChange={(e) => setCurrentPassword(e.target.value)} />
          </div>

          <button className="btn-primary" type="submit" onClick={handleSubmit}>Save Changes</button>
        </form>
      </div>
      <Toaster />
    </div>
  )
}
export default ProfilePage;
