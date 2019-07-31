import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Sidebar from "./components/Sidebar";
import NoteView from "./components/NoteView";
import Bridge from "./components/Bridge";
import {
  createMuiTheme,
  CssBaseline,
  Snackbar,
  IconButton
} from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import purple from "@material-ui/core/colors/purple";
import CloseIcon from "@material-ui/icons/Close";
import Tag from "./models/Tag";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  content: {
    flexGrow: 1
  },
  close: {
    padding: theme.spacing(0.5)
  }
}));

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: purple["200"]
    }
  }
});

const lightTheme = createMuiTheme({
  palette: {
    type: "light"
  }
});

function App(props) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [notes, setNotes] = useState(props.notes);
  const [notebooks, setNotebooks] = useState(props.notebooks);
  // eslint-disable-next-line
  const [tags, setTags] = useState(props.tags);
  const [openNote, setOpenNote] = useState(1);
  const [dark, setDark] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // OPTIONS: all, notebook, tag, trash
  const [openFolder, setOpenFolder] = useState("all");

  const setDarkTheme = value => {
    setDark(value);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const pageSetter = pageNumber => {
    setPage(pageNumber);
  };

  const folderSetter = folder => {
    setOpenFolder(folder);
  };

  const noteSetter = noteId => {
    setOpenNote(noteId);
  };

  const addNote = note => {
    setNotes(notes.concat(note));
    setSnackbarMessage(`Successfully created ${note.title}`);
    setOpenSnackbar(true);
  };

  const editNote = (id, title, content, notebook) => {
    let copy = [...notes];
    let note = copy[copy.findIndex(note => note.id === id)];
    note.title = title;
    note.content = content;
    note.notebook = notebook;
    note.date = new Date();
    setNotes(copy);
    setSnackbarMessage(`${note.title} updated`);
    setOpenSnackbar(true);
  };

  const deleteNote = noteId => {
    let copy = [...notes];
    let note = copy[copy.findIndex(note => note.id === noteId)];
    note.deleted = true;
    setNotes(copy);
    setOpenNote(-1);
    setSnackbarMessage(`${note.title} moved to Trash`);
    setOpenSnackbar(true);
  };

  const restoreNote = noteId => {
    let copy = [...notes];
    let note = copy[copy.findIndex(note => note.id === noteId)];
    note.deleted = false;
    setNotes(copy);
    setOpenNote(-1);
    setSnackbarMessage(`${note.title} restored to ${note.notebook.name}`);
    setOpenSnackbar(true);
  };

  const addNotebook = notebook => {
    setNotebooks(notebooks.concat(notebook));
    setSnackbarMessage(`Successfully created ${notebook.name}`);
    setOpenSnackbar(true);
  };

  const addTag = (noteId, tagName) => {
    let tagFound = tags.find(tag => tag.name === tagName);
    if (!tagFound) {
      tagFound = new Tag(tagName);
      setTags(tags.concat(tagFound));
    }
    let copy = [...notes];
    let note = copy[copy.findIndex(note => note.id === noteId)];
    note.tags = note.tags.concat(tagFound);
    setNotes(copy);
  };

  const removeTag = (noteId, tagName) => {
    let copy = [...notes];
    let note = copy[copy.findIndex(note => note.id === noteId)];
    let tag = note.tags.find(tag => tag.name === tagName);
    note.tags.splice(note.tags.indexOf(tag), 1);
    setNotes(copy);
    if (
      !notes.some(
        note => note.tags.findIndex(tag => tag.name === tagName) !== -1
      )
    ) {
      let copyTags = [...tags];
      let tagId = tag.id;
      copyTags.splice(copyTags.findIndex(tag => tag.name === tagName), 1);
      setTags(copyTags);
      if (openFolder === "tag" && page === tagId) {
        setOpenFolder("all");
      }
    }
  };

  return (
    <ThemeProvider theme={dark ? darkTheme : lightTheme}>
      <div className={classes.root}>
        <CssBaseline />
        <Sidebar
          addNote={addNote}
          addNotebook={addNotebook}
          pageSetter={pageSetter}
          folderSetter={folderSetter}
          notebooks={notebooks}
          tags={tags}
          theme={{ dark: dark, setDarkTheme: setDarkTheme }}
        />
        <main className={classes.content}>
          <Bridge
            page={page}
            openFolder={openFolder}
            notes={notes}
            notebooks={notebooks}
            tags={tags}
            noteSetter={noteSetter}
          />
        </main>
        <NoteView
          note={notes.filter(note => note.id === openNote)[0]}
          editNote={editNote}
          deleteNote={deleteNote}
          restoreNote={restoreNote}
          notebooks={notebooks}
          tags={{ add: addTag, remove: removeTag }}
        />
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">{snackbarMessage}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="close"
              color="inherit"
              className={classes.close}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
