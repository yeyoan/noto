import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { MenuItem, ListItemIcon, DialogContentText } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";

const DeleteNoteDialog = ({ noteTitle, deleteNote, closeMenu }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <MenuItem
        onClick={() => {
          setOpen(true);
          closeMenu();
        }}
      >
        <ListItemIcon>
          <DeleteIcon />
        </ListItemIcon>
        Delete note
      </MenuItem>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="form-dialog-title"
        onSubmit={deleteNote}
      >
        <DialogTitle id="form-dialog-title">Delete note</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {noteTitle} will be moved to trash.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteNote} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteNoteDialog;
