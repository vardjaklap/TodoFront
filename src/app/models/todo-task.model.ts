export class TodoTask {
  id: number;
  completed: boolean;
  title: string;
  description: string;

  constructor(id: number, completed: boolean, title: string, description: string) {
    this.id = id;
    this.completed = completed;
    this.title = title;
    this.description = description;
  }
}
