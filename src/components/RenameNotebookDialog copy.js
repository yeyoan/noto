import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditIcon from "@material-ui/icons/EditOutlined";
import {
  ListItemIcon,
  MenuItem
} from "@material-ui/core";

const RenameNotebookDialog = ({ id, name, rename, setAnchorEl }) => {
  const [open, setOpen] = useState(false);
  const [nameInput, setNameInput] = useState(name);

  const onSubmit = event => {
    event.preventDefault();
    rename(id, nameInput);
    setNameInput("");
    setOpen(false);
  };

  return (
    <div>
      <MenuItem
        onClick={() => {
          setOpen(true);
          setNameInput(name)
          setAnchorEl();
        }}
      >
        <ListItemIcon>
          <EditIcon />
        </ListItemIcon>
        Rename notebook
      </MenuItem>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="form-dialog-title"
        onSubmit={onSubmit}
      >
        <DialogTitle id="form-dialog-title">Rename notebook</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            value={nameInput}
            onChange={event => setNameInput(event.target.value)}
            label="Name"
            variant="outlined"
            name="name"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={onSubmit} color="primary">
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RenameNotebookDialog;
