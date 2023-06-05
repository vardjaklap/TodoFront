import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TodoTaskComponent } from './components/todo-task/todo-task.component';
import { TaskListComponent } from './components/task-list/task-list.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoTaskComponent,
    TaskListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
