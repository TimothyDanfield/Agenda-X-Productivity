import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Image } from 'semantic-ui-react';
import moment from 'moment'
import { FaRegTimesCircle, FaPen } from 'react-icons/fa'
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

  const _id = JSON.parse(localStorage.getItem('Id'))

  useEffect(() => {
    const getUser = async () => {
      try {
        const userObj = await axios.get(`/api/user?_id=${_id}`)
        setUser(userObj.data)
      } catch (error) {
        console.log(error)
      }
    }
    getUser()
  }, [refresh])


  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateUser = await axios.put(`/api/user?name=${name}&&email=${email}&&currentPassword=${currentPassword}&&newPassword=${newPassword}&&_id=${_id}`)
    toast.success('Successfully updated information')
    setRefresh(!refresh)
    setName('')
    setEmail('')
    setNewPassword('')
    setCurrentPassword('')
    toast.success('User updated')
  };

  const handleDelete = async (task) => {
    const taskid = task._id
    const deletedTask = await axios.delete(`/api/task?_id=${_id}&&taskid=${taskid}`)
    setRefresh(!refresh)
    toast.success('Note deleted')
}

  return (
    <div className='profileBody'>
      <div className='taskContainer'>
        <h1>Tasks:</h1>
        {user && user.tasks.map((task, index) => {
          let startDate = new Date(task.start).toString()
          let endDate = new Date(task.end).toString()
          let convertedStartDate = moment(startDate).format("MM-DD-YYYY")
          let convertedEndDate = moment(endDate).format("MM-DD-YYYY")
          return (
            <div key={index}>
              <div className='profileTask'>
                <div>
                  <h5 style={{ margin: '0' }}>Task: {task.title}</h5>
                  <p className='pTasks'>Task Category: {task.category}</p>
                  <p className='pTasks'>Date(s): {convertedStartDate} - {convertedEndDate}</p>
                </div>
                <div>
                  <FaRegTimesCircle className='delete' onClick={() => handleDelete(task)} />
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
            <input type="text" id="name" name="name" value={name} className='profileInput' placeholder="Enter your name" onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="form-group">
            <label htmlFor="email">Update Email</label>
            <input type="email" id="email" name="email" value={email} className='profileInput' placeholder="Enter your email address" onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="form-group">
            <label htmlFor="password">Update Password</label>
            <input type="password" id="password" name="password" value={newPassword} className='profileInput' placeholder="Enter your password" onChange={(e) => setNewPassword(e.target.value)} />
          </div>

          <div className="form-group">
            <label htmlFor="password">Current Password</label>
            <input type="password" id="currentPassword" name="password" value={currentPassword} required={true} className='profileInput' placeholder="Enter your password" onChange={(e) => setCurrentPassword(e.target.value)} />
          </div>

          <button className="btn-primary" type="submit" onClick={handleSubmit}>Save Changes</button>
        </form>
      </div>
      <Toaster />
    </div>
  )
}
export default ProfilePage;
