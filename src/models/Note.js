import Notebook from "./Notebook";

let id = 1;

export default class Note {
  constructor(
    title,
    content,
    notebook = new Notebook('Default'),
    deleted = false,
    tags = []
  ) {
    this.id = id++;
    this.title = title;
    this.content = content;
    this.notebook = notebook;
    this.deleted = deleted;
    this.tags = tags;
    this.date = new Date();
  }
}
