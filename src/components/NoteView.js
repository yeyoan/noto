import React, { useState } from "react";
import {
  Container,
  Typography,
  Divider,
  Box,
  Drawer,
  Chip,
  IconButton,
  Menu,
  Grid
} from "@material-ui/core";
import BookIcon from "@material-ui/icons/BookOutlined";
import { makeStyles } from "@material-ui/core/styles";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import LocalOfferIcon from "@material-ui/icons/LocalOfferOutlined";
import EditNoteDialog from "./EditNoteDialog";
import DeleteNoteDialog from "./DeleteNoteDialog";

const useStyles = makeStyles(theme => ({
  view: {
    padding: theme.spacing(3)
  },
  iconLeft: {
    marginRight: theme.spacing(1)
  },
  drawer: {
    width: 840,
    flexShrink: 0
  },
  drawerPaper: {
    width: 840
  },
  chip: {
    margin: theme.spacing(0.5)
  },
  title: {
    marginTop: theme.spacing(3)
  }
}));

const NoteView = ({ note, editNote, deleteNote, notebooks }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const getTags = () => {
    return note.tags.map((tag, index) => {
      return (
        <Chip
          variant="outlined"
          size="small"
          icon={<LocalOfferIcon />}
          key={tag.id}
          label={tag.name}
          className={classes.chip}
        />
      );
    });
  };

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
      <Box className={classes.view}>
        <Grid container spacing={0} direction="row" alignItems="center">
          <Grid item xs={11}>
            <Box
              color="text.secondary"
              justifyContent="center"
              alignItems="center"
            >
              <Typography variant="subtitle2" gutterBottom>
                <BookIcon fontSize="inherit" className={classes.iconLeft} />
                {note.notebook.name}
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
        </Menu>
        <Divider />
        <Container className={classes.view}>
          {getTags()}
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
    </Drawer>
  );
};

export default NoteView;
