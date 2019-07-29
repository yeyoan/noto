import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Sidebar from "./components/Sidebar";
import NoteView from "./components/NoteView";
import Bridge from "./components/Bridge";
import { Grid, createMuiTheme, CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

const theme = createMuiTheme({
  palette: {
    type: "light"
  }
});

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));

function App({ dnotes, dnotebooks, dtags }) {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [notes, setNotes] = useState(dnotes);
  const [notebooks, setNotebooks] = useState(dnotebooks);
  const [tags, setTags] = useState(dtags);

  const pageSetter = pageNumber => {
    setPage(pageNumber);
  };

  const addNote = note => {
    setNotes(notes.concat(note));
  };

  const addNotebook = notebook => {
    setNotebooks(notebooks.concat(notebook));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container className={classes.root}>
        <Grid item>
          <Sidebar
            addNote={addNote}
            pageSetter={pageSetter}
            notebooks={notebooks}
            tags={tags}
          />
        </Grid>
        <Grid item xs={4}>
          <Bridge page={page} notes={notes} notebooks={notebooks} tags={tags} />
        </Grid>
        <Grid item xs={6}>
          <NoteView note={notes[0]} />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
