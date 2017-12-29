import { Todo } from "../todo.model";
import { Injectable } from "@angular/core";

import { HttpClient,HttpParams} from "@angular/common/http";


@Injectable()
export class TodoService {
    BaseUrl = "https://todointern.azurewebsites.net/";
    

    constructor(private http: HttpClient ) {
    }

    // api/Todo (POST) Add a new Todo
    async AddTodo(todo: Todo): Promise<void> {
        return this.http.post<void>(
            this.BaseUrl + 'api/Todo',
            todo
        ).toPromise();
    }
//Get List of Todo (Get)
   async  GetListTodo():Promise<Todo[]>{
    
       return this.http.get<Todo[]>( this.BaseUrl + 'api/Todo'
       ).toPromise();
      
    }

// Update list of Todo
   async UpdateListTodo(id,todo:Todo){
       
      return this.http.put(this.BaseUrl + 'api/Todo/' +id, todo).toPromise();
   }

// Delete Task

   async DeleteTodo(id){
       console.log(id);
    return this.http.delete(this.BaseUrl + 'api/Todo/' +id).toPromise();
 }

 //Done or Strike Task

   async DoneTodo(id){
    return this.http.get(this.BaseUrl + 'api/Todo/done/' +id).toPromise();

   }

}