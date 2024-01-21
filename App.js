import React, { useState, useEffect } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {Box,DialogContent,List,ListItem,ListItemText,Dialog,DialogTitle,Button,FormControl,TextField,} from '@mui/material';
import './App.css';
export default function App() {
  const [task, setTask] = useState([]);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const cancelTask = () => {
    setOpen(false);
    setTitle('');
    setSummary('');
  };
  const submitTask = () => {
    setTask([
      ...task,
      {
        title: title,
        summary: summary,
      },
    ]);
    localStorage.setItem(
      'tasks',
      JSON.stringify([
        ...task,
        {
          title: title,
          summary: summary,
        },
      ])
    );
    cancelTask();
  };

  const deleteTask = (index) => {
    const duplicateTask = [...task];
    duplicateTask.splice(index, 1);
    setTask(duplicateTask);
    localStorage.setItem('tasks', JSON.stringify(duplicateTask));
  };

  const loadSavedData = () => {
    const tasks = localStorage.getItem('tasks');
    if (tasks) setTask(JSON.parse(tasks));
  };

  useEffect(() => {
    loadSavedData();
  }, []);
  return (
    
    <div className="todo">
      <h1>Todo Application</h1>
      <List
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          width: '100%',
          maxWidth: 360,
          bgcolor: 'background.paper',
        }}>
        {task.map((item, index) => {
          return (
            <ListItem
              className="list-item"
              sx={{
                display: 'flex',
                border: '1px solid #ddd',
                borderRadius: '4px',
              }}
            >
              <ListItemText primary={item.title} secondary={item.summary} />
              <DeleteOutlineIcon
                onClick={() => deleteTask(index)}
                color="error"
                sx={{ cursor: 'pointer' }}
              />
            </ListItem>
          );
        })}
      </List>
      <Button onClick={() => setOpen(!open)} variant="contained">
        Add Task
      </Button>
      <Dialog onClose={() => setOpen(false)} open={open}>
        <DialogTitle>Add Task</DialogTitle>
        <DialogContent>
          <FormControl
            sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <TextField
              value={title}
              id="filled-basic"
              label="Title"
              variant="filled"
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              value={summary}
              id="filled-basic"
              label="Summary"
              variant="filled"
              onChange={(e) => setSummary(e.target.value)}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button onClick={cancelTask}>Cancel</Button>
              <Button onClick={submitTask} variant="contained">
                Create Task
              </Button>
            </Box>
          </FormControl>
        </DialogContent>
      </Dialog>
    </div>
  );
}
