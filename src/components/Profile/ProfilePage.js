import React, { useState } from 'react';
import { Form, Input, Button, Image } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './profilepage.css'
import axios from '../../utils/axiosConfig'


const ProfilePage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [hidden, setHidden] = useState(false)

  const user = JSON.parse(localStorage.getItem('User'))

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateUser = await axios.put('/api/user', {
      name,
      email,
      currentPassword,
      newPassword,
      _id: user._id
    })
    localStorage.setItem('User', JSON.stringify(updateUser.data))
    console.log(updateUser)
    setName('')
    setEmail('')
    setNewPassword('')
    setImageUrl('')
  };

  return (
    <div className='profileBody'>
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
            <label htmlFor="password">Current Password</label>
            <input type="password" id="currentPassword" name="password" required={true} className='profileInput' placeholder="Enter your password" onChange={(e) => setCurrentPassword(e.target.value)} />
          </div>

          <div className="form-group">
            <label htmlFor="password">Update Password</label>
            <input type="password" id="password" name="password" className='profileInput' placeholder="Enter your password" onChange={(e) => setNewPassword(e.target.value)} />
          </div>

          <button className="btn-primary" type="submit" onClick={handleSubmit}>Save Changes</button>
        </form>
      </div>
    </div>
  )
}
export default ProfilePage;
