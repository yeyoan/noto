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
  user,
  addNote,
  addNotebook,
  pageSetter,
  folderSetter,
  notebooks,
  tags,
  theme,
  search
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
      <User user={user} theme={theme} />
      <SearchBar search={search} folderSetter={folderSetter} />
      <NewNoteDialog user={user.get} addNote={addNote} notebooks={notebooks} />
      <Navigation
        user={user.get}
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
