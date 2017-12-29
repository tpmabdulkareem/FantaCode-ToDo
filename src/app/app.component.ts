import { Component, OnInit } from '@angular/core';
import { Todo } from './todo.model';
import { TodoService } from './services/todo.service';
import { Input } from '@angular/core/';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  show: Boolean = false;
  tid:number = 1;
  showMessage:String;
  TodoList: Todo[] = [];
constructor(private todoService: TodoService) { }
EditingTodo: Todo = null;
async ngOnInit() {

    try {
      var s = await this.todoService.GetListTodo();
      this.TodoList = s;

      console.log(s);
    }
    catch (e) {
      console.error("Some error occured while adding the todo: ", e);
    }
  }


  OnAddButtonClicked() {
    console.log("Add button is clicked.");
    this.show = true;



  }

  OnAddClosed() {
    this.show = false;
  }

  OnTodoEditRequest(todo: Todo) {
    console.warn(todo);
    this.EditingTodo = todo;
    this.show = true;
  }



}

