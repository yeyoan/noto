import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import Note from "./models/Note";
import Notebook from "./models/Notebook";
import Tag from "./models/Tag";
import Account from "./models/Account";

const users = [
  new Account("Joshua Abad", "yeyoan@gmail.com", "123"),
  new Account("John Doe", "test@gmail.com", "123")
];

const notebooks = [new Notebook(users[0], "My Notebook")];

const tags = [new Tag(users[0], "Noto"), new Tag(users[0], "WIP")];

const notes = [
  new Note(
    users[0],
    "Welcome to Noto 📝",
    "To get started, click the 'New Note' button on the sidebar.\n\nCreate notebooks to organize notes with a common topic. Add tags at the top each note to further categorize them.",
    new Date(2019, 6, 29),
    notebooks[0],
    [tags[0]]
  ),
  new Note(
    users[0],
    "TODO 📃",
    "✅ Add dark mode 🌙\n✅ Add login/logout 👤\n✅ Implement search 🔍\n✅ Tag creation/removal in note view\n✅ CRUD notes\n✅ Rename and delete notebooks 📓\n✅ Empty the trash 🗑\n❌ Order notes displayed (alphabetical, date created, ascending/descending)\n❌ Use a rich text editor (maybe Draft.js)",
    new Date(2019, 7, 1),
    notebooks[0],
    [...tags]
  ),
  new Note(
    users[0],
    "Known Issues 🐛",
    "- NOT responsive on mobile.\n- Cannot move arrow keys up or down in edit note dialog.\n- React complains about something in edit note dialog (most likely related to above).",
    new Date(2019, 7, 1),
    notebooks[0],
    [...tags]
  )
];

ReactDOM.render(
  <App users={users} notes={notes} notebooks={notebooks} tags={tags} />,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
