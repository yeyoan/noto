import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditIcon from "@material-ui/icons/EditOutlined";
import { MenuItem, Select, FormControl, InputLabel, ListItemIcon } from "@material-ui/core";

const EditNoteDialog = ({ note, editNote, notebooks, closeMenu }) => {
  const [open, setOpen] = useState(false);
  const [titleInput, setTitleInput] = useState(note.title);
  const [contentInput, setContentInput] = useState(note.content);
  const [values, setValues] = useState({
    notebook: note.notebook
  });

  const getNotebooks = () =>
    notebooks.map(notebook => (
      <MenuItem key={notebook.id} value={notebook}>
        {notebook.name}
      </MenuItem>
    ));

  const handleOpen = () => {
    setOpen(true);
    setTitleInput(note.title);
    setContentInput(note.content);
    setValues({
      notebook: note.notebook
    });
    closeMenu();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = event => {
    setValues({
      [event.target.name]: event.target.value
    });
  };

  const onSubmit = event => {
    event.preventDefault();
    editNote(note.id, titleInput, contentInput, values.notebook);
    setTitleInput("");
    setContentInput("");
    setOpen(false);
  };

  return (
    <div>
      <MenuItem onClick={handleOpen}>
        <ListItemIcon>
          <EditIcon />
        </ListItemIcon>
        Edit</MenuItem>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        onSubmit={onSubmit}
      >
        <DialogTitle id="form-dialog-title">Edit Note</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            value={titleInput}
            onChange={event => setTitleInput(event.target.value)}
            label="Title"
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
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditNoteDialog;
