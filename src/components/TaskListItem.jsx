import { Checkbox, IconButton, ListItem, ListItemButton, ListItemSecondaryAction, ListItemText } from '@mui/material';
import PropTypes from 'prop-types';
import  DeleteForeverIcon  from '@mui/icons-material/DeleteForever';

const TaskListItem = ({task, handleTogglecomplete, handleDelete}) => {
  return (
    <ListItem key={task?.id} sx={{ display: "list-item" }} disablePadding>
            <ListItemButton onClick={() => handleTogglecomplete(task?.id)}>
              <ListItemText primary={task?.title} />
            </ListItemButton>
            <ListItemSecondaryAction>
              <Checkbox
                edge="end"
                checked={task?.complete}
                onChange={() => handleTogglecomplete(task?.id)}
              />
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDelete(task?.id)}
              >
                <DeleteForeverIcon color="error" />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
  )
}

//Prop types for component
TaskListItem.propTypes = {
  task : PropTypes.object, 
  handleTogglecomplete : PropTypes.func,
  handleDelete : PropTypes.func
}

export default TaskListItem