import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import NewNote from "./NewNote";
import {
  Slide,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from "@material-ui/core";
import Note from "../models/Note";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const NewNoteDialog = ({ addNote, notebooks }) => {
  const [open, setOpen] = useState(false);
  const [titleInput, setTitleInput] = useState("");
  const [contentInput, setContentInput] = useState("");
  const [values, setValues] = useState({
    notebook: ""
  });

  const getNotebooks = () => {
    return notebooks.map((notebook, index) => {
      return (
        <MenuItem key={index} value={notebook}>
          {notebook.name}
        </MenuItem>
      );
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = event => {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value
    }));
  };

  const onSubmit = event => {
    event.preventDefault();
    const newNote = new Note(titleInput, contentInput, values.notebook);
    addNote(newNote);
    setTitleInput("");
    setContentInput("");
    setValues("");
    setOpen(false);
  };

  return (
    <div>
      <NewNote onClick={handleClickOpen} />
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        aria-labelledby="form-dialog-title"
        onSubmit={onSubmit}
      >
        <DialogTitle id="form-dialog-title">New Note</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            value={titleInput}
            onChange={event => setTitleInput(event.target.value)}
            label="Title"
            type="email"
            variant="outlined"
            name="title"
            fullWidth
          />
          <TextField
            id="outlined-multiline-static"
            value={contentInput}
            onChange={event => setContentInput(event.target.value)}
            label="Content"
            multiline
            rows="8"
            margin="normal"
            variant="outlined"
            name="content"
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel htmlFor="notebook">Notebook</InputLabel>
            <Select
              value={values.notebook}
              onChange={handleChange}
              inputProps={{
                name: "notebook",
                id: "notebook"
              }}
            >
              {getNotebooks()}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onSubmit} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NewNoteDialog;
