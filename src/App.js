import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Sidebar from "./components/Sidebar";
import NoteView from "./components/NoteView";
import Bridge from "./components/Bridge";
import { createMuiTheme, CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import purple from "@material-ui/core/colors/purple";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  content: {
    flexGrow: 1
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

  // OPTIONS: all, notebook, tag, trash
  const [openFolder, setOpenFolder] = useState("all");

  const setDarkTheme = value => {
    setDark(value);
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
  };

  const editNote = (id, title, content, notebook) => {
    let copy = [...notes];
    let note = copy[copy.findIndex(note => note.id === id)];
    note.title = title;
    note.content = content;
    note.notebook = notebook;
    setNotes(copy);
  };

  const deleteNote = noteId => {
    let copy = [...notes];
    let note = copy[copy.findIndex(note => note.id === noteId)];
    note.deleted = true;
    setNotes(copy);
    setOpenNote(-1);
  };

  const addNotebook = notebook => {
    setNotebooks(notebooks.concat(notebook));
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
          notebooks={notebooks}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
