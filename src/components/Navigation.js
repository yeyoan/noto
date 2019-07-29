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

const Navigation = ({ pageSetter, notebooks, tags }) => {
  const classes = useStyles();
  const [selectedPage, setSelectedPage] = useState(1);
  const [openNotebooks, setOpenNotebooks] = useState(false);
  const [openTags, setOpenTags] = useState(false);

  const getNotebooks = () => {
    return notebooks.map((notebook, index) => {
      const i = 2 + (index + 1) / 10;
      return (
        <ListItem
          button
          onClick={onClick(i)}
          selected={selectedPage === i}
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
      const i = 3 + (index + 1) / 10;
      return (
        <ListItem
          button
          onClick={onClick(i)}
          selected={selectedPage === i}
          key={index}
          className={classes.nested}
        >
          <ListItemText primary={tag} />
        </ListItem>
      );
    });
  };

  const onDropDownClick = (value, setter, pageNumber) => {
    return () => {
      setter(!value);
    };
  };

  const onClick = page => {
    return () => {
      pageSetter(page);
      setSelectedPage(page);
    };
  };

  return (
    <List>
      <ListItem button onClick={onClick(1)} selected={selectedPage === 1}>
        <ListItemIcon>
          <NoteIcon />
        </ListItemIcon>
        <ListItemText primary="All Notes" />
      </ListItem>
      <ListItem
        button
        onClick={onDropDownClick(openNotebooks, setOpenNotebooks, 2)}
        selected={selectedPage === 2}
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
        onClick={onDropDownClick(openTags, setOpenTags, 3)}
        selected={selectedPage === 3}
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
      <ListItem button onClick={onClick(4)} selected={selectedPage === 4}>
        <ListItemIcon>
          <DeleteIcon />
        </ListItemIcon>
        <ListItemText primary="Trash" />
      </ListItem>
    </List>
  );
};

export default Navigation;
