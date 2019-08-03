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
import Login from "./components/Login";
import Account from "./models/Account";

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
  const [users, setUsers] = useState(props.users);
  const [notes, setNotes] = useState(props.notes);
  const [notebooks, setNotebooks] = useState(props.notebooks);
  const [tags, setTags] = useState(props.tags);
  const [openNoteId, setOpenNoteId] = useState(1);
  const [dark, setDark] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});

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

  const openNote = id => {
    setOpenNoteId(id);
  };

  const addNote = note => {
    setNotes(notes.concat(note));
    say(`Successfully created ${note.title}`);
  };

  const editNote = (id, title, content, notebook) => {
    let copy = [...notes];
    let note = copy[copy.findIndex(note => note.id === id)];
    note.title = title;
    note.content = content;
    note.notebook = notebook;
    note.date = new Date();
    setNotes(copy);
    say(`${note.title} updated`);
  };

  const deleteNote = noteId => {
    let copy = [...notes];
    let note = copy[copy.findIndex(note => note.id === noteId)];
    note.deleted = true;
    setNotes(copy);
    setOpenNoteId(-1);
    say(`${note.title} moved to Trash`);
  };

  const restoreNote = noteId => {
    let copy = [...notes];
    let note = copy[copy.findIndex(note => note.id === noteId)];
    note.deleted = false;
    setNotes(copy);
    setOpenNoteId(-1);
    say(`${note.title} restored to ${note.notebook.name}`);
  };

  const addNotebook = notebook => {
    setNotebooks(notebooks.concat(notebook));
    say(`Successfully created ${notebook.name}`);
  };

  const renameNotebook = (id, name) => {
    let copy = [...notebooks];
    let notebook = copy[copy.findIndex(notebook => notebook.id === id)];
    notebook.name = name;
    setNotebooks(copy);
    say("Notebook renamed");
  };

  const deleteNotebook = id => {
    let copy = [...notebooks];
    let notebook = copy.find(notebook => notebook.id === id);
    copy.splice(copy.indexOf(notebook), 1);
    setNotebooks(copy);
    setPage(0);
    setOpenFolder("all");
    say(`Deleted ${notebook.name}`);
  };

  const addTag = (noteId, tagName) => {
    let tagFound = tags.find(tag => tag.name === tagName);
    if (!tagFound) {
      tagFound = new Tag(user, tagName);
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
        setPage(0);
        setOpenFolder("all");
      }
    }
  };

  const emptyTrash = () => {
    const recursiveDeletion = (all, trash) => {
      if (trash === 0) {
        setNotes(all);
        say("Trash emptied");
        return;
      }
      all.splice(all.findIndex(note => note.deleted), 1);
      recursiveDeletion(all, trash - 1);
    };
    recursiveDeletion([...notes], notes.filter(note => note.deleted).length);
  };

  const validateUser = (username, password) => {
    return users.find(
      user => user.email === username && user.password === password
    );
  };

  const say = message => {
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  };

  return (
    <ThemeProvider theme={dark ? darkTheme : lightTheme}>
      <CssBaseline />
      <div className={classes.root}>
        {loggedIn ? (
          <>
            <Sidebar
              user={{
                get: user,
                signOut: () => setLoggedIn(false)
              }}
              addNote={addNote}
              addNotebook={addNotebook}
              folder={{
                id: {
                  get: () => page,
                  set: id => setPage(id)
                },
                type: {
                  get: () => openFolder,
                  set: type => setOpenFolder(type)
                }
              }}
              notebooks={notebooks.filter(
                notebook => notebook.author.id === user.id
              )}
              tags={tags.filter(tag => tag.author.id === user.id)}
              theme={{ dark: dark, setDarkTheme: setDarkTheme }}
              search={{
                term: searchTerm,
                update: term => setSearchTerm(term)
              }}
            />
            <main className={classes.content}>
              <Bridge
                folder={{
                  id: page,
                  type: openFolder
                }}
                items={{
                  notes: {
                    all: notes.filter(note => note.author.id === user.id),
                    open: {
                      get: openNoteId,
                      set: openNote
                    }
                  },
                  notebooks: {
                    all: notebooks.filter(
                      notebook => notebook.author.id === user.id
                    ),
                    rename: renameNotebook,
                    delete: deleteNotebook
                  }
                }}
                trash={{ empty: emptyTrash }}
                tags={tags.filter(tag => tag.author.id === user.id)}
                searchTerm={{
                  value: searchTerm,
                  update: value => setSearchTerm(value)
                }}
              />
            </main>
            <NoteView
              note={notes.find(
                note => note.author.id === user.id && note.id === openNoteId
              )}
              editNote={editNote}
              deleteNote={deleteNote}
              restoreNote={restoreNote}
              notebooks={notebooks}
              tags={{ add: addTag, remove: removeTag }}
            />
          </>
        ) : (
          <Login
            user={{
              loggedIn: loggedIn,
              logIn: user => {
                setUser(user);
                setPage(0);
                setOpenFolder("all");
                setLoggedIn(true);
              },
              create: (name, email, password) => {
                let newAccount = new Account(name, email, password);
                setUsers(users.concat(newAccount));
                say("Successfully created account");
              },
              validate: validateUser
            }}
            say={say}
          />
        )}
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
          open={openSnackbar}
          autoHideDuration={3000}
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
