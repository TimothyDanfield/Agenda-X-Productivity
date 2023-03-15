import React, { useState } from "react";
import { DatePicker, Button, Input, Select, Badge } from "antd";
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
//import DatePicker from 'react-datepicker'
import moment from "moment";
import axios from '../../utils/axiosConfig'
import './task.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
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

const events = [
  {
    title: "big Meeting",
    allDay: true,
    start: new Date(2023, 3, 14),
    end: new Date(2023, 3, 16)
  }
]

const Task = () => {
  const [date, setDate] = useState(moment());
  const [taskName, setTaskName] = useState("");
  const [category, setCategory] = useState("");
  const [reminderTime, setReminderTime] = useState("");
  const [tasksOnCalendar, setTasksOnCalendar] = useState([])
  const [newEvent, setNewEvent] = useState({
    title: '',
    end: '',
    start: '',
    category: ''
  })

  const handleAddEvent = () => {
    setTasksOnCalendar([...tasksOnCalendar, newEvent])
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

  console.log(newEvent)

  return (
    <div className='calendar'>
      <div>
        <Calendar localizer={localizer} events={tasksOnCalendar}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500, margin: '50px' }}
          eventPropGetter={eventPropGetter}
        />
      </div>
      <div className='calendarForm'>
        <Input
          style={{ width: "200px" }}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
          placeholder="Enter Task Name"
        />

        <select
          showSearch
          placeholder="Select a category"
          optionFilterProp="children"
          onChange={(value) => setNewEvent({ ...newEvent, category: value })}
          style={{ width: "200px", borderRadius: '5px', borderColor: 'lightgray' }}
        >
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
        </select>

        <DatePicker placeholder="Start Date" style={{ marginRight: '10px' }}
          select={newEvent.start}
          onChange={(start) => setNewEvent({ ...newEvent, start: start.toDate() })}
        />

        <DatePicker placeholder="End Date"
          select={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end: end.toDate() })} />

        <Button type="primary" onClick={handleAddEvent} style={{ marginLeft: '10px' }}>
          Create Task

        </Button>
      </div>
    </div>

  );
};

export default Task;


