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
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import DeleteIcon from "@material-ui/icons/Delete";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles(theme => ({
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

const Navigation = ({ pageSetter, folderSetter, notebooks, tags }) => {
  const classes = useStyles();
  const [selected, setSelected] = useState({ id: 0, folder: 'all' });
  const [openNotebooks, setOpenNotebooks] = useState(false);
  const [openTags, setOpenTags] = useState(false);

  const getNotebooks = () => {
    return notebooks.map((notebook, index) => {
      return (
        <ListItem
          button
          onClick={onClick(notebook.id, 'notebook')}
          selected={selected.id === notebook.id && selected.folder === 'notebook'}
          key={index}
          className={classes.nested}
        >
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
          onClick={onClick(tag.id, 'tag')}
          selected={selected.id === tag.id && selected.folder === 'tag'}
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

  const onClick = (page, folder) => {
    return () => {
      pageSetter(page);
      folderSetter(folder)
      setSelected({ id: page, folder: folder });
    };
  };

  return (
    <List>
      <ListItem button onClick={onClick(0, 'all')} selected={selected.id === 0 && selected.folder === 'all'}>
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
        </List>
      </Collapse>
      <ListItem
        button
        onClick={onDropDownClick(openTags, setOpenTags)}
      >
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
      <ListItem button onClick={onClick(-1, 'trash')} selected={selected.id === -1 && selected.folder === 'trash'}>
        <ListItemIcon>
          <DeleteIcon />
        </ListItemIcon>
        <ListItemText primary="Trash" />
      </ListItem>
    </List>
  );
};

export default Navigation;
