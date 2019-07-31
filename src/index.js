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
  new Tag("The Beatles"),
  new Tag("Frasier"),
  new Tag("Comedy"),
  new Tag("1980s")
];

const notes = [
  new Note(
    "Welcome to Noto 📝",
    "To get started, click the 'New Note' button on the sidebar.",
    new Date(),
    notebooks[0],
    [tags[0]]
  ),
  new Note(
    "'80s Movies Bucket List 🎬🍿",
    "1. Breakfast Club\n2. Sixteen Candles\n3. Top Gun\n4. Back to the Future",
    new Date(2018, 10, 22, 0, 0, 0, 0),
    notebooks[2],
    [tags[4]]
  ),
  new Note(
    "The Beatles",
    "1. Sgt. Pepper's\n2. Abbey Road\n3. Rubber Sould\n4. Revolver\n5. Haven't listened to the rest.",
    new Date(2019, 6, 10, 0, 0, 0, 0),
    notebooks[3],
    [tags[1]]
  ),
  new Note(
    "Cicero",
    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex",
    new Date(2019, 2, 1, 0, 0, 0, 0),
    notebooks[0]
  ),
  new Note(
    "Classic Sitcoms",
    "Some from the '70s all the way to last year\n\n1. Seinfeld\n2. Frasier\n3. Community\n4. Arrested Development\n5. Fawlty Towers",
    new Date(2019, 5, 12, 0, 0, 0, 0),
    notebooks[1],
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
