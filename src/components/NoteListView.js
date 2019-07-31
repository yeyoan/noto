import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  ListItem,
  ListItemText,
  List,
  Container,
  Typography,
  Box
} from "@material-ui/core";
import { distanceInWordsToNow } from "date-fns";

const useStyles = makeStyles(theme => ({
  header: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(6)
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  tertiary: {
    marginTop: theme.spacing(1)
  },
  textItem: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}));

const NoteList = ({ notes, noteSetter }) => {
  const [selectedNote, setSelectedNote] = useState(1);
  const classes = useStyles();

  const truncate = content => {
    const charLength = 100;
    if (content.indexOf("\n") === -1) {
      return content.length < charLength
        ? content
        : `${content.slice(0, charLength)}...`;
    }
    return truncate(content.substring(0, content.indexOf("\n")));
  };

  const getItems = () =>
    notes.map((note, index) => (
      <ListItem
        button
        selected={selectedNote === note.id}
        onClick={() => {
          noteSetter(note.id);
          setSelectedNote(note.id);
        }}
        key={index}
        divider
      >
        <ListItemText
          disableTypography
          className={classes.textItem}
          primary={<Typography variant="subtitle1">{note.title}</Typography>}
          secondary={
            <Box>
              <Box color="text.secondary">{truncate(note.content)}</Box>
              <Box color="text.hint" className={classes.tertiary}>
                <Typography variant="caption">
                  {distanceInWordsToNow(note.date, { addSuffix: true })}
                </Typography>
              </Box>
            </Box>
          }
        />
      </ListItem>
    ));

  if (notes.length > 0) {
    return <List component="nav">{getItems()}</List>;
  }
  return (
    <Container>
      <Typography variant="caption">Empty</Typography>
    </Container>
  );
};

const NoteListView = ({ name, notes, noteSetter }) => {
  const classes = useStyles();

  return (
    <Box style={{ maxHeight: "100%", overflowY: "auto" }}>
      <Container>
        <Typography className={classes.header} variant="h6">
          {name}
        </Typography>
        <Box color="text.secondary">
          <Typography variant="subtitle2">
            {notes.length} {notes.length === 1 ? "note" : "notes"}
          </Typography>
        </Box>
      </Container>
      <NoteList notes={notes} noteSetter={noteSetter} />
    </Box>
  );
};

export default NoteListView;
