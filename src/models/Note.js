import Notebook from "./Notebook";

let id = 1;

export default class Note {
  constructor(
    title,
    content,
    date = new Date(),
    notebook = new Notebook('Default'),
    tags = [],
  ) {
    this.id = id++;
    this.title = title;
    this.content = content;
    this.date = date;
    this.notebook = notebook;
    this.deleted = false;
    this.tags = tags;
  }
}
