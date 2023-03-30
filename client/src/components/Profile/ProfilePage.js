import React, { useState, useEffect } from 'react';
import { DatePicker, Space, Input, Button } from "antd";
import moment from 'moment'
import './profilepage.css'
import toast, { Toaster } from 'react-hot-toast'
import axios from '../../utils/axiosConfig'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle'


const ProfilePage = () => {
  const { RangePicker } = DatePicker
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('');
  const [selectedEvent, setSelectedEvent] = useState()
  const [openEvent, setOpenEvent] = useState(false)
  const [user, setUser] = useState('')
  const [refresh, setRefresh] = useState('')
  const [tasks, setTasks] = useState()
  const [taskSearch, setTaskSearch] = useState('')
  const [newEvent, setNewEvent] = useState({
    title: '',
    start: '',
    end: '',
    category: 'Work',
    location: '',
    description: '',
    startTime: '',
    endTime: ''
  })

  const users = JSON.parse(localStorage.getItem('User'))

  useEffect(() => {
    setRefresh(!refresh)
  }, [])

  useEffect(() => {
    const getUser = async () => {
      try {
        const userObj = await axios.get(`/user?_id=${users._id}`)
        setUser(userObj.data)
        setTasks(userObj.data.tasks)
      } catch (error) {
        console.log(error)
      }
    }
    getUser()
  }, [refresh])

  const handleUpdateEvent = async () => {
    await axios.put('/task', {
      title: newEvent.title ? newEvent.title : selectedEvent.title,
      start: newEvent.start ? newEvent.start : selectedEvent.start,
      end: newEvent.end ? newEvent.end : selectedEvent.end,
      category: newEvent.category ? newEvent.category : selectedEvent.category,
      location: newEvent.location ? newEvent.location : selectedEvent.location,
      description: newEvent.description ? newEvent.description : selectedEvent.description,
      _id: selectedEvent._id
    })
    handleClose()
    setRefresh(!refresh)
    toast.success("Event Updated")
  }

  const handleTaskSearch = (e) => {
    setTaskSearch(e)
    if (e.length === 0) {
      setTasks(user.tasks)
      return
    }
    setTasks(tasks.filter((task) => {
      return task.title.toLowerCase().includes(taskSearch.toLowerCase())
    }))
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`/user?name=${name}&&email=${email}&&currentPassword=${currentPassword}&&newPassword=${newPassword}&&_id=${users._id}`)
    setRefresh(!refresh)
    setName('')
    setEmail('')
    setNewPassword('')
    setCurrentPassword('')
    toast.success('User updated')
  };

  const handleEventSelected = (task) => {
    setSelectedEvent(task)
    setNewEvent({
      _id: task._id,
      start: task.start,
      end: task.end,
      title: task.title,
      category: task.category,
      description: task.description,
      location: task.location,
    })
    setOpenEvent(true)
  }

  const handleDelete = async (task) => {
    const taskid = task._id
    await axios.delete(`/task?_id=${users._id}&&taskid=${taskid}`)
    setRefresh(!refresh)
    toast.success('Note deleted')
    handleClose()
  }

  const handleClose = () => {
    setOpenEvent(false)
  }

  const getBackgroundColor = (event) => {
    let backgroundColor
    if (event.category === 'Personal') {
      backgroundColor = '#b1d199' //green
    }
    if (event.category === 'Work') {
      backgroundColor = '#aa9aff' //purple
    }
    if (event.category === 'School') {
      backgroundColor = '#f8aa4d' //orange
    }
    if (event.category === 'Appointment') {
      backgroundColor = '#ff7561' //red 
    }
    if (event.category === 'Other') {
      backgroundColor = '#63b4ff' //blue
    }

    return backgroundColor
  }
  return (
    <div className='profileBody'>
      {user.userType === 'User' ?
        <div className="profile-settings">
          <h1>Profile Settings</h1>
          <form className='profile-form'>
            <div className="profile-form-group">
              <label htmlFor="username">Update Name</label>
              <input type="text" id="name" name="name" value={name} className='profileInput' placeholder="Enter your name" onChange={(e) => setName(e.target.value)} />
            </div>

            <div className="profile-form-group">
              <label htmlFor="email">Update Email</label>
              <input type="email" id="email" name="email" value={email} className='profileInput' placeholder="Enter your email address" onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="profile-form-group">
              <label htmlFor="password">Update Password</label>
              <input type="password" id="password" name="password" value={newPassword} className='profileInput' placeholder="Enter your password" onChange={(e) => setNewPassword(e.target.value)} />
            </div>

            <div className="profile-form-group">
              <label htmlFor="password">Current Password</label>
              <input type="password" id="currentPassword" name="password" value={currentPassword} required={true} className='profileInput' placeholder="Enter your password" onChange={(e) => setCurrentPassword(e.target.value)} />
            </div>

            <button className="btn-primary" type="submit" onClick={handleSubmit}>Save Changes</button>
          </form>
        </div>
        :
        <div className="profile-settings">
          <h1>Profile Settings</h1>
          <form className='profile-form-group'>
            <div className="profile-form-group">
              <label htmlFor="username">Name</label>
              <div className='profileInput'>{user.name}</div>
            </div>

            <div className="profile-form-group">
              <label htmlFor="email">Email</label>
              <div className='profileInput'>{user.email}</div>
            </div>

          </form>
        </div>
      }
      <div className='taskContainer'>
        <Dialog
          onClose={handleClose}
          open={openEvent}
        >
          <DialogTitle>Event Details</DialogTitle>
          <DialogContent className='dialogContent'>
            <Input
              style={{ width: "200px", height: '30px', marginBottom: '10px' }}
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              placeholder="Enter Task Name"
            />
            <br />
            <Input
              style={{ width: "200px", height: '30px', marginBottom: '10px' }}
              value={newEvent.location}
              onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
              placeholder="Location"
            />
            <select
              value={newEvent.category}
              placeholder="Select a category"
              onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
              style={{ marginLeft: '10px', width: "200px", borderRadius: '5px', borderColor: 'lightgray', height: '30px', marginBottom: '10px' }}
            >
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Appointment">Appointment</option>
              <option value="School">School</option>
              <option value="Other">Other</option>
            </select>

            <Space direction="vertical" size={12}>
              <RangePicker
                showTime={{
                  format: 'hh:mm A',
                }}
                style={{ marginBottom: '10px' }}
                placeholder={[newEvent.start, newEvent.end]}
                format="YYYY-MM-DD hh:mm A"
                onOk={(value) => setNewEvent({ ...newEvent, start: value[0].format(), end: value[1].format() })}
              />
            </Space>
            <br />
            <Input.TextArea
              style={{ width: "500px", height: '90px', marginBottom: '10px' }}
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              placeholder="Description"
            />
          </DialogContent>
          <DialogActions>
            <Button type="primary" onClick={() => handleDelete(selectedEvent)} style={{ marginLeft: '10px', backgroundColor: 'red' }}>
              Delete
            </Button>
            <Button type="primary" onClick={handleClose} style={{ marginLeft: '10px' }}>
              Cancel
            </Button>
            <Button type="primary" onClick={(selectedEvent) => handleUpdateEvent(selectedEvent)} style={{ marginLeft: '10px' }}>
              Update Task
            </Button>
          </DialogActions>
        </Dialog>
        <h1>Tasks</h1>
        <div className="profile-form-group">
          <input type="text" name="taskSearch" value={taskSearch} onChange={(e) => handleTaskSearch(e.target.value)} className='profileInput' placeholder='Search for a task' />
        </div>
        {tasks && tasks.map((task, index) => {
          let startDate = new Date(task.start).toString()
          let endDate = new Date(task.end).toString()
          let convertedStartDate = moment(startDate).format("MM-DD-YYYY")
          let convertedEndDate = moment(endDate).format("MM-DD-YYYY")
          return (
            <div key={index} >
              <div className='profileTask' style={{ boxShadow: `5px 5px 5px ${getBackgroundColor(task)}` }} onClick={() => handleEventSelected(task)}>
                <div>
                  <h5 style={{ margin: '0' }}>Task: {task.title}</h5>
                  <br></br>
                  <p className='pTasks'>Task Category: {task.category}</p>
                  <p className='pTasks'>Date(s): {convertedStartDate} - {convertedEndDate}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <Toaster />
    </div>
  )
}
export default ProfilePage;
