import { Component } from '@angular/core';
import { TodoTask } from '../../models/todo-task.model';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { TaskService } from '../../services/todo.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  tasks: TodoTask[] = [
    new TodoTask(1,false, 'Task 1', 'This is task 1.'),
    new TodoTask(2,false, 'Task 2', 'This is task 2.'),
    new TodoTask(3,false, 'Task 3', 'This is task 3.')
  ];

  newTaskCreating: boolean = false;
  constructor(private taskService: TaskService) {}
  taskForm: FormGroup = new FormGroup({
    title: new FormControl('',[
      Validators.required,
      Validators.maxLength(20)]),
    description: new FormControl('',[
      Validators.maxLength(50)
    ])
  });
  get title() { return this.taskForm.get('title'); }
  get description() { return this.taskForm.get('description'); }

  ngOnInit(): void {
    this.getAllTasks();
  }

  getAllTasks(): void {
    this.taskService.getAllTasks().subscribe(
      (tasks: TodoTask[]) => {
        this.tasks = tasks;
      },
      (error: any) => {
        console.error('Error fetching tasks:', error);
      }
    );
  }
  addNewTask() {
    this.newTaskCreating = true;
  }
  addNewTaskComplete(result: number) {
    if(result == 1) {
      const newTask: TodoTask = {
        id: 0,
        title: this.title?.value,
        description: this.description?.value,
        completed: false
      };
      this.taskService.createTask(newTask).subscribe( (task: TodoTask) => {
        this.tasks.push(task);
      });

      //this.tasks.push(newTask);
    }
    this.newTaskCreating = false;
    this.taskForm.reset();

  }
  onTaskDeleted(task: TodoTask): void {
    this.taskService.deleteTask(task.id).subscribe( () => {
      console.log('Task deleted successfully.');
      const index = this.tasks.indexOf(task);
      if (index > -1) {
        this.tasks.splice(index, 1);
      }
    });

  }
  onTaskUpdated(updatedTask: TodoTask): void {
    this.taskService.updateTask(updatedTask).subscribe( () => {
      console.log('Task updated successfully.');
      const taskIndex = this.tasks.findIndex(task => task.id === updatedTask.id);
      if (taskIndex !== -1) {
        this.tasks[taskIndex] = updatedTask;
      }
    });

  }
}
