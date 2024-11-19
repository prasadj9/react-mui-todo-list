import {
  Box,
  Button,
  List,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import TaskListItem from "./TaskListItem";

const MuiList = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  //Get all tasks from JSON Server
  const getTasks = async () => {
    await fetch("http://localhost:3000/lists")
      .then((response) => response.json())
      .then((data) => setTasks(data));
  };

  //Add task
  const addTask = async () => {
    const newTask = {
      id: getRandomBetween(),
      title: task,
      complete: false,
    };
    await fetch("http://localhost:3000/lists", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    })
      .then((response) => response.json())
      .then((data) => setTasks([...tasks, data])); //Add new Task to current tasks
    setTask("");
    setSnackbarMessage("Task added!");
    setOpenSnackbar(true);
  };

  const handleTaskChange = (event) => {
    setTask(event.target.value);
  };

   //Delete task
   const handleDelete = async (id) => {
    //Call API to delete tasks
    const confirmDelete = confirm("Are you sure you want to delete this task?");
    if (confirmDelete) {
      await fetch(`http://localhost:3000/lists/${id}`, {
        method: "DELETE",
      }).catch((error) => {
        console.log(error);
      });
      const updatedLists = tasks.filter((task) => task.id !== id);
      setTasks(updatedLists);
      setOpenSnackbar(true);
      setSnackbarMessage("Task Deleted!")
    }
  };

  //Toggle complete Task
  const handleTogglecomplete = (id) => {
    const updatedLists = tasks?.map((task) =>
      task.id === id ? { ...task, complete: !task.complete } : task
    );
    setTasks(updatedLists);
  };

  //Get random number for id
  function getRandomBetween(min = 100, max = 1000) {
    return String(Math.floor(Math.random() * (max - min + 1)) + min);
  }

  useEffect(() => {
    getTasks();
  }, []);

  //Handle close snackbar
  const handleClose = (e, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  }

  return (
    <Box
      sx={{ bgColor: "background.paper" }}
      mt={3}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Typography variant="h4" gutterBottom>
        List Items
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          maxWidth: 500,
        }}
      >
        <TextField
          label="New Task"
          variant="outlined"
          fullWidth
          value={task}
          sx={{ flex: 1, height : "100%" }}
          onChange={handleTaskChange}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ height: "100%", minHeight :"56px" }}
          onClick={addTask}
        >
          Add Task
        </Button>
      </Box>

      <List sx={{ listStyleType: "square", marginTop: 3 }}>
        {tasks.map((task) => (
          <TaskListItem
            key={task.id}
            task={task}
            handleTogglecomplete={handleTogglecomplete}
            handleDelete={handleDelete}
          />
        ))}
      </List>

      <Snackbar message={snackbarMessage} autoHideDuration={4000} open={openSnackbar} onClose={handleClose}/>
    </Box>
  );
};

export default MuiList;
