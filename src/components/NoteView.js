import React from "react";
import { Container, Typography } from "@material-ui/core";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

const NoteView = ({ note }) => {
  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        {note.title}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {note.content}
      </Typography>
      <Typography variant="caption" gutterBottom>
        {days[note.date.getDay()]}
      </Typography>
    </Container>
  );
};

export default NoteView;
