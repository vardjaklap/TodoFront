import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {TaskListComponent} from "./components/task-list/task-list.component";
import {TaskService} from "./services/todo.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {TodoTaskComponent} from "./components/todo-task/todo-task.component";


describe('AppComponent', () => {
  let service: TaskService;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    declarations: [AppComponent, TaskListComponent, TodoTaskComponent ],
    providers: [TaskService]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });



});
