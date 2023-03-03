import React, { useState } from "react";
import { Calendar, DatePicker, Button, Input, Select } from "antd";
import moment from "moment";
const { Option } = Select;
const Task = () => {
  const [date, setDate] = useState(moment());
  const [taskName, setTaskName] = useState("");
  const [category, setCategory] = useState("");
  const [reminderTime, setReminderTime] = useState("");
  const [tasksOnCalendar, setTasksOnCalendar] = useState({});
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

  // Create Task Functionality:

  const createTask = () => {
    if (!taskName || !category || !reminderTime) return;

    let taskObj = {
      name: taskName,
      category: category,
      reminderTime: reminderTime,
      date: date.format("YYYY-MM-DD"),
    };

    console.log("Task Created", taskObj);

    alert("Task Created!");
    let newTasksOnCalendarObj = Object.assign({}, tasksOnCalendar);
    newTasksOnCalendarObj[date.format("YYYY-MM-DD")]
      ? newTasksOnCalendarObj[date.format("YYYY-MM-DD")].push(taskObj)
      : (newTasksOnCalendarObj[date.format("YYYY-MM-DD")] = [taskObj]);
    console.log("newTasksOnCalendar", newTasksOnCalendarObj);

    resetForm();
    setTasksOnCalendar(newTasksOnCalendarObj)
  };

  const resetForm = () => {
    setDate(moment());

    setTaskName("");

    setCategory("");

    setReminderTime("");
  };

  // add color code to different categories || add completed or not completed
  return (
    <div>
      <br />

      <br />

      <Calendar onPanelChange={setDate} tasksData={tasksOnCalendar} />
      <Input
        value={taskName}
        style={{ width: "200px" }}
        onChange={handleTaskNameChange}
        placeholder="Enter Task Name"
      />
      <Select
        value={category}
        style={{ width: "200px" }}
        placeholder="Category"
        onChange={handleCategoryChange}
      >
        <Option value="Work">Work</Option>
        <Option value="Personal">Personal</Option>
      </Select>

      <Select value={reminderTime} onChange={handleReminderTimeChange}>
        <Option style={{ width: "200px" }} value="1 hour before">
          1 hour before
        </Option>
        <Option style={{ width: "200px" }} value="2 hours before">
          2 hours before
        </Option>
      </Select>
      <DatePicker defaultValue={moment()} onChange={handleDateChange} />
      <Button type="primary" onClick={createTask}>
        Create Task
      </Button>
    </div>
  );
};
export default Task;
