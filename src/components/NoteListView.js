import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  ListItem,
  ListItemText,
  List,
  Container,
  Typography,
  Box,
  IconButton,
  Grid,
  Menu,
  MenuItem,
  ListItemIcon
} from "@material-ui/core";
import { distanceInWordsToNow } from "date-fns";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import RenameNotebookDialog from "./RenameNotebookDialog copy";
import EmptyTrashDialog from "./EmptyTrashDialog";

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
  return <Container />;
};

const NoteListView = ({ name, notes, noteSetter, menu, notebooks, trash }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const getMenu = () => {
    if (!menu || (menu !== "notebook" && notes.length === 0)) {
      return <div />;
    } else {
      return (
        <div>
          <IconButton onClick={event => setAnchorEl(event.currentTarget)}>
            <MoreHorizIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            {menu === "notebook" ? (
              <div>
                <RenameNotebookDialog
                  id={notebooks.id}
                  name={name}
                  rename={notebooks.rename}
                  setAnchorEl={() => setAnchorEl(null)}
                />
                {notes.length === 0 ? (
                  <MenuItem
                    onClick={() => {
                      setAnchorEl(null);
                      notebooks.delete(notebooks.id);
                    }}
                  >
                    <ListItemIcon>
                      <DeleteIcon />
                    </ListItemIcon>
                    Delete notebook
                  </MenuItem>
                ) : (
                  <div />
                )}
              </div>
            ) : (
              <EmptyTrashDialog
                emptyTrash={trash.empty}
                closeMenu={() => setAnchorEl(null)}
              />
            )}
          </Menu>
        </div>
      );
    }
  };

  return (
    <Box style={{ maxHeight: "100%", overflowY: "auto" }}>
      <Container>
        <Typography className={classes.header} variant="h6">
          {name}
        </Typography>
        <Grid container alignItems="center">
          <Grid item xs={11}>
            <Box color="text.secondary">
              <Typography variant="subtitle2">
                {notes.length} {notes.length === 1 ? "note" : "notes"}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={1}>
            {getMenu()}
          </Grid>
        </Grid>
      </Container>
      <NoteList notes={notes} noteSetter={noteSetter} />
    </Box>
  );
};

export default NoteListView;
