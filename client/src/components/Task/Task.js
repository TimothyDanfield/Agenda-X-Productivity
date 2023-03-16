import React, { useState, useEffect } from "react";
import { DatePicker, Button, Input, Select, Space, TimePicker } from "antd";
import { Calendar, dateFnsLocalizer, momentLocalizer } from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import axios from '../../utils/axiosConfig'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle'
import './task.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import toast, { Toaster } from 'react-hot-toast'
const { Option } = Select;

const locales = {
  "en-US": require("date-fns/locale/en-US")
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
})

const DnDCalendar = withDragAndDrop(Calendar)


const Task = () => {
  const [user, setUser] = useState()
  const [refresh, setRefresh] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState()
  const [openEvent, setOpenEvent] = useState(false)
  const [openSlot, setOpenSlot] = useState(false)
  const [tasksOnCalendar, setTasksOnCalendar] = useState([])
  const [newEvent, setNewEvent] = useState({
    title: '',
    start: '',
    end: '',
    category: 'Work',
    startTime: '',
    endTime: ''
  })

  const { RangePicker } = DatePicker

  const _id = JSON.parse(localStorage.getItem('Id'))

  useEffect(() => {
    const getUser = async () => {
      const userObj = await axios.get(`/api/user?_id=${_id}`)
      setUser(userObj.data)
      setTasksOnCalendar(userObj.data.tasks)

    }
    getUser()
  }, [refresh])
  console.log(newEvent)
  const handleClose = () => {
    setOpenEvent(false)
    setOpenSlot(false)
  }

  const handleAddEvent = async () => {
    const task = await axios.post('/api/task', {
      title: newEvent.title,
      start: newEvent.start,
      end: newEvent.end,
      category: newEvent.category,
      _id
    })
    handleClose()
    setRefresh(!refresh)
    toast.success("Event Added")
  }

  const handleUpdateEvent = async () => {
    const updateTask = await axios.put('/api/task', {
      title: newEvent.title ? newEvent.title : selectedEvent.title,
      start: newEvent.start ? newEvent.start : selectedEvent.start,
      end: newEvent.end ? newEvent.end : selectedEvent.end,
      category: newEvent.category ? newEvent.category : selectedEvent.category,
      _id: selectedEvent._id
    })
    handleClose()
    setRefresh(!refresh)
    toast.success("Event Updated")
  }

  const eventPropGetter = (event) => {
    let backgroundColor
    if (event.category === 'Personal') {
      backgroundColor = 'green'
    }
    if (event.category === 'Work') {
      backgroundColor = 'blue'
    }

    return { style: { backgroundColor } }
  }

  const events = tasksOnCalendar.map((task) => {
    return {
      title: task.title,
      start: new Date(task.start),
      end: new Date(task.end),
      category: task.category,
      _id: task._id
    }
  })

  const handleDragEvent = async ({ event, start, end }) => {
    const updatedEvent = { ...event, start: start, end: end, _id: event._id }
    const changeEvent = await axios.put('/api/task', {
      title: event.title,
      start: start,
      end: end,
      category: event.category,
      _id: event._id
    })
    setRefresh(!refresh)
  }

  const handleResize = async ({ event, start, end }) => {
    const updatedEvent = { ...event, start: start, end: end, _id: event._id }
    const changeEvent = await axios.put('/api/task', {
      title: event.title,
      start: start,
      end, end,
      category: event.category,
      _id: event._id
    })
    setRefresh(!refresh)
  }

  const handleEventSelected = (event) => {
    setSelectedEvent(event)
    setNewEvent({
      _id: event._id,
      start: event.start,
      end: event.end,
      title: event.title,
      category: event.category,
    })
    setOpenEvent(true)
  }

  const handleSlotSelected = (slotInfo) => {
    setNewEvent({...newEvent,
      title: '',
      start: '',
      end: '',
    })
    setOpenSlot(true)
  }

  const handleDelete = async () => {
    const deletedTask = await axios.delete(`/api/task?_id=${_id}&&taskid=${selectedEvent._id}`)
    handleClose()
    setRefresh(!refresh)
    toast.success('Note deleted')
  }

  return (
    <div className='calendar'>
      <div>
        <DnDCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          timeslots={4}
          style={{ height: 550, margin: '50px' }}
          eventPropGetter={eventPropGetter}
          resizable={true}
          selectable={true}
          onSelectEvent={(event) => handleEventSelected(event)}
          onSelectSlot={(slotInfo) => handleSlotSelected(slotInfo)}
          step={15}

          onEventResize={({ event, start, end }) => handleResize({ event, start, end })}
          onEventDrop={({ event, start, end }) => handleDragEvent({ event, start, end })}
        />
      </div>

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
          <select
            value={newEvent.category}
            placeholder="Select a category"
            onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
            style={{ width: "200px", borderRadius: '5px', borderColor: 'lightgray', height: '30px', marginBottom: '10px' }}
          >
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
          </select>

          <Space direction="vertical" size={12}>
            <RangePicker
              showTime={{
                format: 'HH:mm',
              }}
              format="YYYY-MM-DD HH:mm"
              onOk={(value) => setNewEvent({ ...newEvent, start: value[0].format(), end: value[1].format() })}
            />
          </Space>
        </DialogContent>
        <DialogActions>
        <Button type="primary" onClick={handleDelete} style={{ marginLeft: '10px', backgroundColor: 'red' }}>
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

      <Dialog
        onClose={handleClose}
        open={openSlot}
      >
        <DialogTitle>New Event</DialogTitle>
        <DialogContent>
          <Input
            style={{ width: "200px", height: '30px', marginBottom: '10px' }}
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            placeholder="Enter Task Name"
          />
          <br />
          <select
            value={newEvent.category}
            placeholder="Select a category"
            onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
            style={{ width: "200px", borderRadius: '5px', borderColor: 'lightgray', height: '30px', marginBottom: '10px' }}
          >
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
          </select>

          <Space direction="vertical" size={12}>
            <RangePicker
              showTime={{
                format: 'HH:mm',
              }}
              format="YYYY-MM-DD HH:mm"
              onOk={(value) => setNewEvent({ ...newEvent, start: value[0].format(), end: value[1].format() })}
            />
          </Space>
        </DialogContent>
        <DialogActions>
        <Button type="primary" onClick={handleClose} style={{ marginLeft: '10px' }}>
          Cancel
        </Button>
        <Button type="primary" onClick={handleAddEvent} style={{ marginLeft: '10px' }}>
          Create Task
        </Button>
        </DialogActions>
      </Dialog>
      <Toaster />
    </div>

  );
};

export default Task;


