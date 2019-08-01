import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import User from "./User";
import SearchBar from "./SearchBar";
import Navigation from "./Navigation";
import { Drawer } from "@material-ui/core";
import NewNoteDialog from "./NewNoteDialog";

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 280,
    flexShrink: 0
  },
  drawerPaper: {
    width: 280
  }
}));

const Sidebar = ({
  addNote,
  addNotebook,
  pageSetter,
  folderSetter,
  notebooks,
  tags,
  theme,
  searchTerm
}) => {
  const classes = useStyles();

  return (
    <Drawer
      variant="permanent"
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper
      }}
      anchor="left"
      style={{ backgroundColor: "red" }}
    >
      <User name="John Doe" theme={theme} />
      <SearchBar searchTerm={searchTerm} folderSetter={folderSetter} />
      <NewNoteDialog addNote={addNote} notebooks={notebooks} />
      <Navigation
        addNotebook={addNotebook}
        pageSetter={pageSetter}
        folderSetter={folderSetter}
        notebooks={notebooks}
        tags={tags}
      />
    </Drawer>
  );
};

export default Sidebar;
