import React, { useState } from "react";
import {
  Container,
  Typography,
  Divider,
  Box,
  Drawer,
  IconButton,
  Menu,
  Grid,
  MenuItem,
  ListItemIcon,
  AppBar,
  Toolbar
} from "@material-ui/core";
import BookIcon from "@material-ui/icons/BookOutlined";
import { makeStyles } from "@material-ui/core/styles";
import MoreHorizIcon from "@material-ui/icons/MoreVert";
import UndoIcon from "@material-ui/icons/UndoOutlined";
import EditNoteDialog from "./EditNoteDialog";
import DeleteNoteDialog from "./DeleteNoteDialog";
import ChipInput from "material-ui-chip-input";

const useStyles = makeStyles(theme => ({
  appBar: {
    top: "auto",
    bottom: 0
  },
  view: {
    padding: theme.spacing(3)
  },
  iconLeft: {
    marginRight: theme.spacing(1)
  },
  drawer: {
    width: 740,
    flexShrink: 0
  },
  drawerPaper: {
    width: 740
  },
  chip: {
    margin: theme.spacing(0.5)
  },
  title: {
    marginTop: theme.spacing(3)
  }
}));

const NoteView = ({
  note,
  editNote,
  deleteNote,
  restoreNote,
  notebooks,
  tags
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  if (!note) {
    return (
      <Drawer
        variant="permanent"
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper
        }}
        anchor="right"
      >
        <Container />
      </Drawer>
    );
  }
  return (
    <Drawer
      variant="permanent"
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper
      }}
      anchor="right"
    >
      <Box
        className={classes.view}
        style={{ maxHeight: "100%", overflowY: "auto" }}
      >
        <Grid container spacing={0} direction="row" alignItems="center">
          <Grid item xs={11}>
            <Box
              color="text.secondary"
              justifyContent="center"
              alignItems="center"
            >
              <Typography variant="subtitle2" gutterBottom>
                {!note.deleted ? (
                  <div>
                    <BookIcon fontSize="inherit" className={classes.iconLeft} />
                    {note.notebook.name}
                  </div>
                ) : (
                  <div />
                )}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={1}>
            <Box justifyContent="center" alignContent="right">
              <IconButton
                onClick={event => setAnchorEl(event.currentTarget)}
                edge="end"
                aria-label="more"
              >
                <MoreHorizIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          {!note.deleted ? (
            <div>
              <EditNoteDialog
                note={note}
                editNote={editNote}
                notebooks={notebooks}
                closeMenu={() => setAnchorEl(null)}
              />
              <DeleteNoteDialog
                noteTitle={note.title}
                deleteNote={event => deleteNote(note.id)}
                closeMenu={() => setAnchorEl(null)}
              />
            </div>
          ) : (
            <MenuItem
              onClick={() => {
                restoreNote(note.id);
                setAnchorEl(null);
              }}
            >
              <ListItemIcon>
                <UndoIcon />
              </ListItemIcon>
              Restore
            </MenuItem>
          )}
        </Menu>
        <Divider />
        <Container className={classes.view}>
          <Typography variant="h4" className={classes.title} gutterBottom>
            {note.title}
          </Typography>
          <Typography
            style={{ whiteSpace: "pre-wrap" }}
            variant="body1"
            gutterBottom
          >
            {note.content}
          </Typography>
        </Container>
      </Box>
      {!note.deleted ? (
        <AppBar position="absolute" color="inherit" className={classes.appBar}>
          <Toolbar>
            <ChipInput
              value={note.tags.map(tag => tag.name)}
              onAdd={chip => tags.add(note.id, chip)}
              onDelete={chip => tags.remove(note.id, chip)}
              placeholder="Add tag"
              fullWidth
            />
          </Toolbar>
        </AppBar>
      ) : (
        <div />
      )}
    </Drawer>
  );
};

export default NoteView;
