import React from "react";
import NoteListView from "./NoteListView";

const Bridge = ({ page, notes, notebooks, tags }) => {
  if (page === 1) {
    return <NoteListView name='All Notes' notes={notes} />;
  }
  if (Math.floor(page) === 2) {
    const index = Math.round((page - 2) * 10) - 1;
    return <NoteListView name={notebooks[index].name} notes={notes} />
  }
  if (Math.floor(page) === 3) {
    const index = Math.round((page - 3) * 10) - 1;
    return <NoteListView name={tags[index]} notes={notes} />
  }
  if (page === 4) {
    const notesToShow = notes.filter(note => note.deleted);
    return <NoteListView name='Trash' notes={notesToShow} />
  }
  return <h1>Home</h1>;
};

export default Bridge;
