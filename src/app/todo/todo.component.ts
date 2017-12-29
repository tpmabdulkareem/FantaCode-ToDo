import { Component, Input, EventEmitter } from '@angular/core';
import { Todo } from '../todo.model';
import { TodoService } from '../services/todo.service';
import { Output } from '@angular/core/';

@Component({
  selector: 'app-todo-root',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {
  @Input() todo: Todo;
  @Output() onTodoEdit: EventEmitter<Todo> = new EventEmitter<Todo>();
  isActive: boolean = false;

  show: boolean = false;
  public id: String;
  constructor(private todoService: TodoService) { }
  OnEditButtonClicked(todo: Todo) {
    this.onTodoEdit.emit(todo);
  }
  OnAddClosed() {
    this.show = false;
  }
  async OnDeleteButtonClicked(values: Todo) {
    console.log(" Deleting process.");
    try {
      await this.todoService.DeleteTodo(values.todoId);
      console.log("Successfully deleted");
      window.location.reload();

    }
    catch (e) {
      console.log("some error occured", e);
    }
  }
  async OnCheckButtonClicked(values: Todo) {

    console.log(" checking process.");
    try {
      values.done = !values.done;
      await this.todoService.UpdateListTodo(values.todoId, values);
      console.log("Successfully checked.");
      console.log(values.done);
    }

    catch (e) {
      console.log("some error occured", e);
    }
  }

  IsDone(todo: Todo) {
    return todo.done;
  }

}
