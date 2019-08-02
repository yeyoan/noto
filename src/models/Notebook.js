let id = 0;

export default class Notebook {
  constructor(author, name) {
    this.id = id++;
    this.author = author;
    this.name = name;
  }
}
