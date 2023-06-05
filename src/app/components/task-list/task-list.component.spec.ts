import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskListComponent } from './task-list.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../services/todo.service';
import { TodoTask } from '../../models/todo-task.model';
import {Observable, of} from 'rxjs';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let masterService: TaskService;

  let mockTaskService: jasmine.SpyObj<TaskService>;
  let spy: jasmine.Spy;

  beforeEach(async () => {
    spy = jasmine.createSpyObj('TaskService', [
      'getAllTasks',
      'createTask',
      'deleteTask',
      'updateTask'
    ]);


    await TestBed.configureTestingModule({
      declarations: [TaskListComponent],
      providers: [{ provide: TaskService, useValue: spy }]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    mockTaskService = TestBed.inject(TaskService) as jasmine.SpyObj<TaskService>;
    mockTaskService.getAllTasks.and.returnValue(of([]));
    mockTaskService.createTask.and.returnValue(of(new TodoTask(0, false, 'New Task', 'This is a new task')));
    mockTaskService.deleteTask.and.returnValue(of(undefined));

  });

  beforeEach(() => {
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize tasks on ngOnInit', () => {
    const mockTasks: TodoTask[] = [
      new TodoTask(1, false, 'Task 1', 'This is task 1.'),
      new TodoTask(2, false, 'Task 2', 'This is task 2.'),
      new TodoTask(3, false, 'Task 3', 'This is task 3.')
    ];
    mockTaskService.getAllTasks.and.returnValue(of(mockTasks));

    component.ngOnInit();


    expect(mockTaskService.getAllTasks).toHaveBeenCalled();
    expect(component.tasks).toEqual(mockTasks);
  });

  it('should add a new task', () => {

    const newTask: TodoTask = new TodoTask(0, false, 'New Task', 'This is a new task');
    const taskForm = component.taskForm;
    taskForm.get('title')?.setValue(newTask.title);
    taskForm.get('description')?.setValue(newTask.description);


    mockTaskService.createTask.and.returnValue(of(newTask));

    component.addNewTaskComplete(1);

    expect(component.tasks).toContain(newTask);
  });

  it('should delete a task', () => {

    const taskToDelete: TodoTask = new TodoTask(1, false, 'Task 1', 'This is task 1.');

    //Create the task first
    mockTaskService.createTask.and.returnValue(of(taskToDelete));
    component.addNewTaskComplete(1);
    expect(component.tasks).toContain(taskToDelete);

    //delete and check that it has been deleted

    component.onTaskDeleted(taskToDelete);

    expect(component.tasks).not.toContain(taskToDelete);
  });

  it('should update a task', () => {
    const initialTask: TodoTask = new TodoTask(1, false, 'Initial Task', 'This is an initial task');

    const updatedTask: TodoTask = new TodoTask(1, false, 'Updated Task', 'This is an updated task');

    //Create the task first
    mockTaskService.createTask.and.returnValue(of(initialTask));
    component.addNewTaskComplete(1);

    //Update the task
    mockTaskService.updateTask.and.returnValue(of(updatedTask));
    component.onTaskUpdated(updatedTask);

    expect(mockTaskService.updateTask).toHaveBeenCalledWith(updatedTask);
    expect(component.tasks).toContain(updatedTask);
  });
});
