import {Component, Input, Output, EventEmitter } from '@angular/core';
import {TodoTask} from "../../models/todo-task.model";

@Component({
  selector: 'app-todo-task',
  templateUrl: './todo-task.component.html',
  styleUrls: ['./todo-task.component.css']
})
export class TodoTaskComponent {
  @Input() task: TodoTask = new TodoTask(1, false, "", ""); // Input property to receive the task object
  @Output() update: EventEmitter<any> = new EventEmitter<any>(); // Output property to emit changes
  @Output() delete: EventEmitter<any> = new EventEmitter();
  isEditMode: boolean = false;
  updatedTitle: string = this.task.title;
  updatedDescription: string = this.task.description;

  onDelete() {
    // Emit the task object to be deleted
    this.delete.emit(null);
  }
  onCheckboxChange(event: any) {
    this.task.completed = !this.task.completed;
    this.onUpdate();
  }
  onUpdate(){
    this.update.emit(this.task);
  }
  onSaveChanges() {
    this.task.title = this.updatedTitle;
    this.task.description = this.updatedDescription;
    this.isEditMode = false;
    this.onUpdate();

  }
  onCancelChanges() {
    this.isEditMode = false;
    if(this.task.id==-1){
      this.onDelete();
    }
  }
  onEditTask() {
    this.updatedTitle = this.task.title;
    this.updatedDescription= this.task.description;

    this.isEditMode = true;
  }
}
