import { Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Todo } from 'src/models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public modo: String = 'lista';
  public todos: Todo[] = [];
  public title: String ='Minhas tarefas!'
  public form: FormGroup;

  constructor(private fb:FormBuilder){
    this.form=this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(255),
        Validators.required
      ])]
    });
    this.populaTarefas();
  }

  removeTarefa(todo: Todo){
    const index = this.todos.indexOf(todo);
    if(index !== -1){
      this.todos.splice(index, 1);
    }
    this.salvaTarefa();
  }

  marcarFeito(todo: Todo){
    todo.feito = true;
    this.salvaTarefa();
  }

  marcarDesfeito(todo: Todo){
    todo.feito = false;
    this.salvaTarefa();
  }

  adicionaTarefa(){
    const id = this.todos.length+1;
    const title = this.form.controls['title'].value;
    this.todos.push(new Todo(id,title,false));
    this.salvaTarefa();
    this.limpaCampoTarefa();
  }

  limpaCampoTarefa(){
    this.form.reset();
  }

  salvaTarefa(){
    const data = JSON.stringify(this.todos);
    localStorage.setItem("todos", data);
  }

  populaTarefas(){
    const data = localStorage.getItem("todos");
    if(data !== null){
      this.todos = JSON.parse(data);
    }else{
      this.todos=[];
    }
  }
  
  alteraModo(modo: string){
    this.modo=modo;
  }
}