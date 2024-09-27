// React component

import React, { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]); // state to store tasks
  const [newTask, setNewTask] = useState(''); //state to handle new task input

  useEffect(() => {
    fetch('http://localhost:5001/tasks')
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error('Error fetching tasks:', err));
  }, []); // [] ensures it only runs on mount

  // function to handle adding a new task
  const addTask = async () => {
    if (newTask.trim() === '') {
      alert('Task cannot be empty');
      return;
    }
    const response = await fetch('http://localhost:5001/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: newTask }),
    });

    const task = await response.json();

    // update tasks list with new task after it has been successfully added
    setTasks([...tasks, task]);

    setNewTask(''); // clear input field
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <input
        type = "text"
        value = {newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder = "New Task"
      />
      <button onClick = {addTask}>Add Task</button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
