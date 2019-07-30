import React from "react";
import NoteListView from "./NoteListView";

const Bridge = ({ page, openFolder, notes, notebooks, tags, noteSetter }) => {
  if (openFolder === "all") {
    return (
      <NoteListView name="All Notes" notes={notes} noteSetter={noteSetter} />
    );
  }
  if (openFolder === "notebook") {
    console.log('notebook clicked')
    return (
      <NoteListView
        name={notebooks.filter(notebook => notebook.id === page)[0].name}
        notes={notes.filter(note => note.notebook.id === page)}
        noteSetter={noteSetter}
      />
    );
  }
  if (openFolder === 'tag') {
    console.log('tag clicked')
    return (
      <NoteListView
        name={tags.filter(tag => tag.id === page)[0].name}
        notes={notes.filter(note => note.tags.includes(tags[page]))}
        noteSetter={noteSetter}
      />
    );
  }
  if (openFolder === 'trash') {
    return (
      <NoteListView name="Trash" notes={notes.filter(note => note.deleted)} noteSetter={noteSetter} />
    );
  }
  return <h1>Invalid Folder</h1>;
};

export default Bridge;
