import React, { useState } from 'react';
import { Calendar, DatePicker, Button, Input, Select } from 'antd';
import moment from 'moment';
const { Option } = Select;
const App = () => {
  const [date, setDate] = useState(moment());
  const [taskName, setTaskName] = useState('');
  const [category, setCategory] = useState('');
  const [reminderTime, setReminderTime] = useState('');
  const handleDateChange = (date) => {
    setDate(date);
  };
  const handleTaskNameChange = (e) => {
    setTaskName(e.target.value);
  };
  const handleCategoryChange = (value) => {
    setCategory(value);
  };
  const handleReminderTimeChange = (value) => {
    setReminderTime(value);
  };
return (
  <div>
    <Calendar onSelect={handleDateChange} value={date} />
    <Input placeholder="Task Name" onChange={handleTaskNameChange} />
    <Select placeholder="Category" onChange={handleCategoryChange}>
      <Option value="work">Work</Option>
      <Option value="personal">Personal</Option>
      <Option value="other">Other</Option>
    </Select>
    <Select placeholder="Reminder Time" onChange={handleReminderTimeChange}>
      <Option value="1 hour before">1 hour before</Option>
      <Option value="2 hours before">2 hours before</Option>
      <Option value="1 day before">1 day before</Option>
    </Select>
    <Button type="primary">Create Task</Button> 
  </div>  
); 
export default App;