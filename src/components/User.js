import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  ListItem,
  ListItemText,
  Avatar,
  ListItemAvatar,
  IconButton
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  avatar: {
    margin: 10
  }
}));

const User = ({ name }) => {
  const classes = useStyles();

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar className={classes.avatar}>{name.charAt(0)}{name.split(' ')[1].charAt(0)}</Avatar>
      </ListItemAvatar>
      <ListItemText primary={name} />
      <IconButton edge="end" aria-label="more">
        <ExpandMoreIcon />
      </IconButton>
    </ListItem>
  );
};

export default User;
