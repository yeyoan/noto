import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AddCircle from "@material-ui/icons/AddCircle";
import { Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  leftIcon: {
    marginRight: theme.spacing(1)
  }
}));

const CreateButton = ({ onClick }) => {
  const classes = useStyles();

  return (
    <Button
      onClick={onClick}
      size="large"
      color="primary"
      className={classes.button}
    >
      <AddCircle className={classes.leftIcon} />
      New Note
    </Button>
  );
};

export default CreateButton;
