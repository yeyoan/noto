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
import ls from "local-storage";

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

  const [searchTerm, setSearchTerm] = useState("");

  // Data states
  const [users, setUsers] = useState(ls("users") || props.users);
  const [notes, setNotes] = useState(ls("notes") || props.notes);
  const [notebooks, setNotebooks] = useState(
    ls("notebooks") || props.notebooks
  );
  const [tags, setTags] = useState(ls("tags") || props.tags);

  // UI states
  const [dark, setDark] = useState(ls("theme") || false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Account states
  const [loggedIn, setLoggedIn] = useState(ls("loggedIn"), false);
  const [user, setUser] = useState(ls("user"), {});

  // Navigation states
  const [folderType, setFolderType] = useState("all");
  const [folderId, setFolderId] = useState(0);
  const [openNoteId, setOpenNoteId] = useState(1);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  // Note handlers

  const addNote = note => {
    let newNotes = notes.concat(note);
    ls("notes", newNotes);
    setNotes(newNotes);
    say(`Successfully created ${note.title}`);
  };

  const editNote = (id, title, content, notebook) => {
    let copy = [...notes];
    let note = copy[copy.findIndex(note => note.id === id)];
    note.title = title;
    note.content = content;
    note.notebook = notebook;
    note.date = new Date();
    ls("notes", copy);
    setNotes(copy);
    say(`${note.title} updated`);
  };

  const deleteNote = noteId => {
    let copy = [...notes];
    let note = copy[copy.findIndex(note => note.id === noteId)];
    note.deleted = true;
    ls("notes", copy);
    setNotes(copy);
    setOpenNoteId(-1);
    say(`${note.title} moved to Trash`);
  };

  const restoreNote = noteId => {
    let copy = [...notes];
    let note = copy[copy.findIndex(note => note.id === noteId)];
    note.deleted = false;
    ls("notes", copy);
    setNotes(copy);
    setOpenNoteId(-1);
    say(`${note.title} restored to ${note.notebook.name}`);
  };

  // Notebook handlers

  const addNotebook = notebook => {
    let newNotebooks = notebooks.concat(notebook);
    ls("notebooks", newNotebooks);
    setNotebooks(newNotebooks);
    say(`Successfully created ${notebook.name}`);
  };

  const renameNotebook = (id, name) => {
    let copy = [...notebooks];
    let notebook = copy[copy.findIndex(notebook => notebook.id === id)];
    notebook.name = name;
    ls("notebooks", copy);
    setNotebooks(copy);
    say("Notebook renamed");
  };

  const deleteNotebook = id => {
    let copy = [...notebooks];
    let notebook = copy.find(notebook => notebook.id === id);
    copy.splice(copy.indexOf(notebook), 1);
    ls("notebooks", copy);
    setNotebooks(copy);
    setFolderId(0);
    setFolderType("all");
    say(`Deleted ${notebook.name}`);
  };

  // Tag handlers

  const addTag = (noteId, tagName) => {
    let tagFound = tags.find(tag => tag.name === tagName);
    if (!tagFound) {
      tagFound = new Tag(user, tagName);
      let newTags = tags.concat(tagFound);
      ls("tags", newTags);
      setTags(newTags);
    }
    let copy = [...notes];
    let note = copy[copy.findIndex(note => note.id === noteId)];
    note.tags = note.tags.concat(tagFound);
    ls("notes", copy);
    setNotes(copy);
  };

  const removeTag = (noteId, tagName) => {
    let copy = [...notes];
    let note = copy[copy.findIndex(note => note.id === noteId)];
    let tag = note.tags.find(tag => tag.name === tagName);
    note.tags.splice(note.tags.indexOf(tag), 1);
    ls("notes", copy);
    setNotes(copy);
    if (
      !notes.some(
        note => note.tags.findIndex(tag => tag.name === tagName) !== -1
      )
    ) {
      let copyTags = [...tags];
      let tagId = tag.id;
      copyTags.splice(copyTags.findIndex(tag => tag.name === tagName), 1);
      ls("tags", copyTags);
      setTags(copyTags);
      if (folderType === "tag" && folderId === tagId) {
        setFolderId(0);
        setFolderType("all");
      }
    }
  };

  const emptyTrash = () => {
    const recursiveDeletion = (all, trash) => {
      if (trash === 0) {
        ls("notes", all);
        setNotes(all);
        say("Trash emptied");
        return;
      }
      all.splice(all.findIndex(note => note.deleted), 1);
      recursiveDeletion(all, trash - 1);
    };
    recursiveDeletion([...notes], notes.filter(note => note.deleted).length);
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
                signOut: () => {
                  ls("loggedIn", false);
                  setLoggedIn(false);
                }
              }}
              addNote={addNote}
              addNotebook={addNotebook}
              folder={{
                id: {
                  get: () => folderId,
                  set: id => setFolderId(id)
                },
                type: {
                  get: () => folderType,
                  set: type => setFolderType(type)
                }
              }}
              notebooks={notebooks.filter(
                notebook => notebook.author.id === user.id
              )}
              tags={tags.filter(tag => tag.author.id === user.id)}
              theme={{
                dark: dark,
                setDarkTheme: value => {
                  ls("theme", value);
                  setDark(value);
                }
              }}
              search={{
                term: searchTerm,
                update: term => setSearchTerm(term)
              }}
            />
            <main className={classes.content}>
              <Bridge
                folder={{
                  id: folderId,
                  type: folderType
                }}
                items={{
                  notes: {
                    all: notes.filter(note => note.author.id === user.id),
                    open: {
                      get: openNoteId,
                      set: id => setOpenNoteId(id)
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
                ls("user", user);
                setUser(user);
                setFolderId(0);
                setFolderType("all");
                ls("loggedIn", true);
                setLoggedIn(true);
              },
              create: (name, email, password) => {
                let newAccount = new Account(name, email, password);
                let newUsers = users.concat(newAccount);
                ls("users", newUsers);
                setUsers(newUsers);
                say("Successfully created account");
              },
              validate: (email, password) =>
                users.find(
                  user => user.email === email && user.password === password
                )
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
