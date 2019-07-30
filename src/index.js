import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import Note from "./models/Note";
import Notebook from "./models/Notebook";
import Tag from "./models/Tag";

const notebooks = [
  new Notebook("My Notebook"),
  new Notebook("TV"),
  new Notebook("Movies"),
  new Notebook("Music")
];

const tags = [
  new Tag("Noto"),
  new Tag("Kanye West"),
  new Tag("Frasier"),
  new Tag("Comedy"),
  new Tag("1980s")
];

const notes = [
  new Note(
    "Welcome to Noto",
    "To get started, click the 'New Note' button on the sidebar.",
    new Date(),
    notebooks[0],
    [tags[0]]
  ),
  new Note(
    "'80s Movies Bucket List",
    "1. Breakfast Club\n2. Sixteen Candles\n3. Top Gun\n4. Back to the Future",
    new Date(2018, 10, 22, 0, 0, 0, 0),
    notebooks[2],
    [tags[4]]
  ),
  new Note(
    "Kanye Discography Ranking",
    "1. ye\n1. The Life of Pablo\n1. Yeezus\n1. My Beautiful Dark Twisted Fantasy\n1. 808s & Heartbreaks\n1. Graduation\n1. Late Registration\n1. The College Dropout\n\nYou can't rank Kanye's albums, they're all amazing.",
    new Date(2019, 6, 10, 0, 0, 0, 0),
    notebooks[1],
    [tags[1]]
  ),
  new Note(
    "Favorite Sitcoms",
    "1. Seinfeld\n2. Frasier\n3. Community\n4. Arrested Development\n5. Fawlty Towers",
    new Date(2019, 5, 12, 0, 0, 0, 0),
    notebooks[3],
    [tags[3], tags[2]]
  )
];

ReactDOM.render(
  <App notes={notes} notebooks={notebooks} tags={tags} />,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
