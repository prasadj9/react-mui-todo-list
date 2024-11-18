import {
  Box,
  Button,
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import React, { useEffect, useState } from "react";

const MuiList = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('')

  const getList = async () => {
    await fetch("http://localhost:3000/lists")
      .then((response) => response.json())
      .then((data) => setTasks(data));
  };

  const handleTaskChange = (event) => {
    setTask(event.target.value);
  };

  const handleTogglecomplete = (id) => {
    const updatedLists = tasks.map(task => (
      task.id === id ? {...task, complete : !task.complete} : task
    ))
    setTasks(updatedLists)
  }
  
  useEffect(() => {
    getList();
  }, []);
  return (
    <Box
      sx={{ bgColor: "background.paper" }}
      mt={3}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Typography variant="h4" gutterBottom>List Items</Typography>
      
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 2, // Adds space between TextField and Button
          width: "100%",
          maxWidth: 500,
        }}
      >

      <TextField
      label="New Task"
      variant="outlined"
      fullWidth
      value={task}
      sx={{flex: 1}}
      onChange={handleTaskChange}
      />
      <Button variant="contained" color="primary" sx={{height : "1000%"}}>Add Task</Button>
      </Box>

      <List sx={{ listStyleType: "decimal", marginTop : 3 }}>
        {tasks.map((list) => (
          <ListItem
            key={list.id}
            sx={{ display: "list-item" }}
            disablePadding
            
          >
            <ListItemButton>
              <ListItemText primary={list.title} />
            </ListItemButton>
            <ListItemSecondaryAction>
            <Checkbox
                edge="end"
                checked={list.complete}
                onChange={() => handleTogglecomplete(list.id)}
              />
              <IconButton edge="end" aria-label="delete">
                <DeleteForeverIcon color="error" />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default MuiList;
