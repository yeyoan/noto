import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import Note from "./models/Note";
import Notebook from "./models/Notebook";
import Tag from "./models/Tag";

const notes = [
  new Note("Title 1", "Content 1"),
  new Note("Title 2", "Content 2"),
  new Note(
    "Title 3",
    "This right here is some really long content.\nFormatting this bih is gonna be a doozy."
  )
];

const notebooks = [
  new Notebook("Notebook 1"),
  new Notebook("Notebook 2"),
  new Notebook("Notebook 3"),
  new Notebook("Notebook 4"),
  new Notebook("Notebook 5"),
  new Notebook("Notebook 6"),
  new Notebook("Notebook 7"),
  new Notebook("Notebook 8"),
  new Notebook("Notebook 9"),
  new Notebook("Notebook 10"),
  new Notebook("Notebook 11"),
  new Notebook("Notebook 12"),
];

const tags = [
  new Tag("tag1"),
  new Tag("tag2"),
  new Tag("tag3"),
  new Tag("tag4"),
  new Tag("tag5"),
  new Tag("tag6"),
];

ReactDOM.render(
  <App dnotes={notes} dnotebooks={notebooks} dtags={tags} />,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
