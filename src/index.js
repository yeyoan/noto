import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import Note from "./models/Note";
import Notebook from "./models/Notebook";

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
  new Notebook("Notebook 3")
];

const tags = ["tag1", "tag2", "tag3"];

ReactDOM.render(
  <App dnotes={notes} dnotebooks={notebooks} dtags={tags} />,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
