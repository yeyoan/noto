let id = 0;

export default class Account {
  constructor(name, email, password) {
    this.id = id++;
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
