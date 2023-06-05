import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoTaskComponent } from './todo-task.component';
import { TodoTask } from '../../models/todo-task.model';

describe('TodoTaskComponent', () => {
  let component: TodoTaskComponent;
  let fixture: ComponentFixture<TodoTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoTaskComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should emit delete event on delete', () => {
    spyOn(component.delete, 'emit');

    component.onDelete();

    expect(component.delete.emit).toHaveBeenCalled();
  });

  it('should emit update event on save changes', () => {
    // Set up initial component state
    component.task = { id: 1, completed: false, title: 'Initial Title', description: 'Initial Description' };
    component.updatedTitle = 'Updated Title';
    component.updatedDescription = 'Updated Description';

    // Spy on the emit method of the update event emitter
    spyOn(component.update, 'emit');
    // Call the onSaveChanges method
    component.onSaveChanges();

    // Assert the expected behavior
    expect(component.isEditMode).toBeFalse();
    expect(component.update.emit).toHaveBeenCalledWith(component.task);
  });

  it('should cancel changes on cancelChanges', () => {
    spyOn(component, 'onDelete');
    component.isEditMode = true;
    component.task.id = -1;

    component.onCancelChanges();

    expect(component.isEditMode).toBe(false);
    expect(component.onDelete).toHaveBeenCalled();
  });

  it('should enter edit mode on editTask', () => {
    const title = 'Task 1';
    const description = 'Description 1';
    component.task = { id: 1, completed: false, title, description };
    component.isEditMode = false;

    component.onEditTask();

    expect(component.updatedTitle).toBe(title);
    expect(component.updatedDescription).toBe(description);
    expect(component.isEditMode).toBe(true);
  });
});
