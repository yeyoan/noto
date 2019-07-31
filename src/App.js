import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Sidebar from "./components/Sidebar";
import NoteView from "./components/NoteView";
import Bridge from "./components/Bridge";
import { createMuiTheme, CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  content: {
    flexGrow: 1
  }
}));

const theme = createMuiTheme({
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

  // OPTIONS: all, notebook, tag, trash
  const [openFolder, setOpenFolder] = useState("all");

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
    let copy = [...notes]
    let note = copy[copy.findIndex(note => note.id === id)]
    note.title = title
    note.content = content
    note.notebook = notebook
    setNotes(copy)
  }

  const deleteNote = noteId => {
    notes.find(note => note.id === noteId).deleted = true;
    setOpenNote(-1);
  };

  const addNotebook = notebook => {
    setNotebooks(notebooks.concat(notebook));
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <Sidebar
          addNote={addNote}
          addNotebook={addNotebook}
          pageSetter={pageSetter}
          folderSetter={folderSetter}
          notebooks={notebooks}
          tags={tags}
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
