import { Component, Input,Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from '../todo.model';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-popup-root',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  @Input() todo : Todo;
  todoForm: FormGroup;

 

  constructor(
    private fb: FormBuilder,
    private todoService: TodoService
  ) {
    this.todoForm = fb.group(
      {
        'todoId': 0,
        'Task': [null, Validators.required],
        'Description': null
      }
    );
  }

  ngOnInit() {
    console.error(this.todo)
    if(this.todo) {
      //there is a todo to edit
      this.todoForm.controls['todoId'].setValue(this.todo.todoId);
      this.todoForm.controls['Task'].setValue(this.todo.task);
      this.todoForm.controls['Description'].setValue(this.todo.description);
    }
  }

 OnCloseClicked() {
    this.close.emit();
    window.location.reload();
  }
     
  async OnFormSubmitted(values: Todo) {
    console.log(values);

    if(values.todoId!=0){
      console.log("Starting editing process.");
      try {
        await this.todoService.UpdateListTodo(values.todoId,values);
        console.log("Successfully edited.");
        this.close.emit();
        window.location.reload();
      }
      catch(e) {
        console.error("Some error occured while adding the todo: ", e);
      }
    }
    else     
 {
      console.log("Starting adding process.");
      try {
        await this.todoService.AddTodo(values);
        console.log("Successfully added.");
        this.close.emit();
        window.location.reload();
      }
      catch(e) {
        console.error("Some error occured while adding the todo: ", e);
      }
    }
    
   
  }
}

