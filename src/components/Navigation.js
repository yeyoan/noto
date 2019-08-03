import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse
} from "@material-ui/core";
import NoteIcon from "@material-ui/icons/Note";
import BookIcon from "@material-ui/icons/Book";
import BookIconOutlined from "@material-ui/icons/BookOutlined";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import DeleteIcon from "@material-ui/icons/Delete";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import NewNotebookDialog from "./NewNotebookDialog";

const useStyles = makeStyles(theme => ({
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

const Navigation = ({ user, addNotebook, folder, notebooks, tags }) => {
  const classes = useStyles();
  const [openNotebooks, setOpenNotebooks] = useState(false);
  const [openTags, setOpenTags] = useState(false);

  const getNotebooks = () => {
    return notebooks.map((notebook, index) => {
      return (
        <ListItem
          button
          onClick={onClick(notebook.id, "notebook")}
          selected={
            folder.id.get() === notebook.id && folder.type.get() === "notebook"
          }
          key={index}
          className={classes.nested}
        >
          <ListItemIcon>
            <BookIconOutlined />
          </ListItemIcon>
          <ListItemText primary={notebook.name} />
        </ListItem>
      );
    });
  };

  const getTags = () => {
    return tags.map((tag, index) => {
      return (
        <ListItem
          button
          onClick={onClick(tag.id, "tag")}
          selected={folder.id.get() === tag.id && folder.type.get() === "tag"}
          key={index}
          className={classes.nested}
        >
          <ListItemText primary={tag.name} />
        </ListItem>
      );
    });
  };

  const onDropDownClick = (value, setter) => {
    return () => {
      setter(!value);
    };
  };

  const onClick = (id, type) => {
    return () => {
      folder.id.set(id);
      folder.type.set(type);
    };
  };

  return (
    <List>
      <ListItem
        button
        onClick={onClick(0, "all")}
        selected={folder.id.get() === 0 && folder.type.get() === "all"}
      >
        <ListItemIcon>
          <NoteIcon />
        </ListItemIcon>
        <ListItemText primary="All Notes" />
      </ListItem>
      <ListItem
        button
        onClick={onDropDownClick(openNotebooks, setOpenNotebooks)}
      >
        <ListItemIcon>
          <BookIcon />
        </ListItemIcon>
        <ListItemText primary="Notebooks" />
        {openNotebooks ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openNotebooks} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {getNotebooks()}
          <NewNotebookDialog
            user={user}
            className={classes.nested}
            addNotebook={addNotebook}
          />
        </List>
      </Collapse>
      <ListItem button onClick={onDropDownClick(openTags, setOpenTags)}>
        <ListItemIcon>
          <LocalOfferIcon />
        </ListItemIcon>
        <ListItemText primary="Tags" />
        {openTags ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openTags} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {getTags()}
        </List>
      </Collapse>
      <ListItem
        button
        onClick={onClick(-1, "trash")}
        selected={folder.id.get() === -1 && folder.type.get() === "trash"}
      >
        <ListItemIcon>
          <DeleteIcon />
        </ListItemIcon>
        <ListItemText primary="Trash" />
      </ListItem>
    </List>
  );
};

export default Navigation;
