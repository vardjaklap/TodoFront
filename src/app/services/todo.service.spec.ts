import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TaskService } from './todo.service';
import { TodoTask } from '../models/todo-task.model';

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService]
    });
    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve all tasks', () => {
    const mockTasks: TodoTask[] = [
      { id: 1, completed: false, title: 'Task 1', description: 'Description 1' },
      { id: 2, completed: true, title: 'Task 2', description: 'Description 2' }
    ];

    service.getAllTasks().subscribe((tasks) => {
      expect(tasks).toEqual(mockTasks);
    });

    const req = httpMock.expectOne('http://localhost:3000/tasks');
    expect(req.request.method).toBe('GET');
    req.flush(mockTasks);
  });

  it('should retrieve a specific task by ID', () => {
    const taskId = 1;
    const mockTask: TodoTask = { id: taskId, completed: false, title: 'Task 1', description: 'Description 1' };

    service.getTaskById(taskId).subscribe((task) => {
      expect(task).toEqual(mockTask);
    });

    const req = httpMock.expectOne(`http://localhost:3000/tasks/${taskId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTask);
  });

  it('should create a new task', () => {
    const newTask: TodoTask = { id: 1, completed: false, title: 'New Task', description: 'New Description' };

    service.createTask(newTask).subscribe((task) => {
      expect(task).toEqual(newTask);
    });

    const req = httpMock.expectOne('http://localhost:3000/tasks');
    expect(req.request.method).toBe('POST');
    req.flush(newTask);
  });

  it('should update an existing task', () => {
    const updatedTask: TodoTask = { id: 1, completed: true, title: 'Updated Task', description: 'Updated Description' };

    service.updateTask(updatedTask).subscribe((task) => {
      expect(task).toEqual(updatedTask);
    });

    const req = httpMock.expectOne(`http://localhost:3000/tasks/${updatedTask.id}`);
    expect(req.request.method).toBe('PATCH');
    req.flush(updatedTask);
  });

  it('should delete a task', () => {
    const taskId = 1;

    service.deleteTask(taskId).subscribe(() => {
      expect().nothing(); // No assertion needed for void response
    });

    const req = httpMock.expectOne(`http://localhost:3000/tasks/${taskId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null); // Respond with null since it's a void response
  });
});
