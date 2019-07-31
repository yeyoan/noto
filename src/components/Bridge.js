import React from "react";
import NoteListView from "./NoteListView";

const Bridge = ({ page, openFolder, notes, notebooks, tags, noteSetter }) => {
  if (openFolder === "all") {
    return (
      <NoteListView name="All Notes" notes={notes.filter(note => !note.deleted)} noteSetter={noteSetter} />
    );
  }
  if (openFolder === "notebook") {
    return (
      <NoteListView
        name={notebooks.filter(notebook => notebook.id === page)[0].name}
        notes={notes.filter(note => note.notebook.id === page && !note.deleted)}
        noteSetter={noteSetter}
      />
    );
  }
  if (openFolder === 'tag') {
    return (
      <NoteListView
        name={`Tagged '${tags.filter(tag => tag.id === page)[0].name}'`}
        notes={notes.filter(note => note.tags.includes(tags[page]) && !note.deleted)}
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
