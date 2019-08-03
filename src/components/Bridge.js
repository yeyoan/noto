import React from "react";
import NoteListView from "./NoteListView";

const Bridge = ({
  folder,
  items,
  trash,
  tags,
  searchTerm
}) => {
  const search = note => {
    return (
      searchTerm.value.length > 0 &&
      (note.title.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.value.toLowerCase()))
    );
  };

  if (folder.type === "search") {
    document.title = "Search Results - Noto";
    return (
      <NoteListView
        name={
          searchTerm.value.length > 0
            ? `Search results for '${searchTerm.value}'`
            : "Start typing..."
        }
        notes={{
          all: items.notes.all.filter(search),
          open: {
            get: items.notes.open.get,
            set: items.notes.open.set
          }
        }}
        noteSetter={items.notes.open.set}
      />
    );
  }
  if (folder.type === "all") {
    document.title = "All Notes - Noto";
    return (
      <NoteListView
        name="All Notes"
        notes={{
          all: items.notes.all.filter(note => !note.deleted),
          open: {
            get: items.notes.open.get,
            set: items.notes.open.set
          }
        }}
      />
    );
  }
  if (folder.type === "notebook") {
    const name = items.notebooks.all.find(notebook => notebook.id === folder.id).name;
    document.title = `${name} - Noto`;
    return (
      <NoteListView
        name={name}
        notes={{
          all: items.notes.all.filter(note => note.notebook.id === folder.id && !note.deleted),
          open: {
            get: items.notes.open.get,
            set: items.notes.open.set
          }
        }}
        menu="notebook"
        notebooks={{ ...items.notebooks, id: folder.id }}
      />
    );
  }
  if (folder.type === "tag") {
    const tag = tags.find(tag => tag.id === folder.id);
    document.title = `${tag.name} - Noto`;
    return (
      <NoteListView
        name={`Tagged '${tag.name}'`}
        notes={{
          all: items.notes.all.filter(note => note.tags.includes(tag) && !note.deleted),
          open: {
            get: items.notes.open.get,
            set: items.notes.open.set
          }
        }}
      />
    );
  }
  if (folder.type === "trash") {
    document.title = "Trash - Noto";
    return (
      <NoteListView
        name="Trash"
        notes={{
          all: items.notes.all.filter(note => note.deleted),
          open: {
            get: items.notes.open.get,
            set: items.notes.open.set
          }
        }}
        menu="trash"
        trash={trash}
      />
    );
  }
  return <h1>Invalid Folder</h1>;
};

export default Bridge;
