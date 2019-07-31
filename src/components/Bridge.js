import React from "react";
import NoteListView from "./NoteListView";

const Bridge = ({ page, openFolder, notes, notebooks, tags, noteSetter }) => {
  if (openFolder === "all") {
    document.title = 'All Notes - Noto'
    return (
      <NoteListView name="All Notes" notes={notes.filter(note => !note.deleted)} noteSetter={noteSetter} />
    );
  }
  if (openFolder === "notebook") {
    const notebookName = notebooks.find(notebook => notebook.id === page).name;
    document.title = `${notebookName} - Noto`
    return (
      <NoteListView
        name={notebookName}
        notes={notes.filter(note => note.notebook.id === page && !note.deleted)}
        noteSetter={noteSetter}
      />
    );
  }
  if (openFolder === 'tag') {
    const tagName = tags.find(tag => tag.id === page).name;
    document.title = `${tagName} - Noto`
    return (
      <NoteListView
        name={`Tagged '${tagName}'`}
        notes={notes.filter(note => note.tags.includes(tags[page]) && !note.deleted)}
        noteSetter={noteSetter}
      />
    );
  }
  if (openFolder === 'trash') {
    document.title = 'Trash - Noto'
    return (
      <NoteListView name="Trash" notes={notes.filter(note => note.deleted)} noteSetter={noteSetter} />
    );
  }
  return <h1>Invalid Folder</h1>;
};

export default Bridge;
