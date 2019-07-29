import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import { Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  leftIcon: {
    marginRight: theme.spacing(1)
  }
}));

const NewNote = () => {
  const classes = useStyles();

  return (
    <Button variant='text' size="large" color="primary" className={classes.button}>
      <NoteAddIcon className={classes.leftIcon} />
      New Note
    </Button>
  );
};

export default NewNote;
