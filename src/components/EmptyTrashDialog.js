import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { MenuItem, ListItemIcon, DialogContentText } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForeverOutlined";

const EmptyTrashDialog = ({ emptyTrash, closeMenu }) => {
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
          <DeleteForeverIcon />
        </ListItemIcon>
        Empty Trash
      </MenuItem>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="form-dialog-title"
        onSubmit={emptyTrash}
      >
        <DialogTitle id="form-dialog-title">Empty Trash?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to empty the trash? All items in the trash
            will be permanently deleted and cannot be restored.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={emptyTrash} color="primary">
            Empty
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EmptyTrashDialog;
