import { TestBed } from "@angular/core/testing";

import { HttpClient } from '@angular/common/http';
import { Observable,Observer } from 'rxjs';
import { TasksService } from "./todo.service";
import { Store } from "./todo.store";
import  {Task} from "./task";


const todolist : Task[] =[{
    "id": 1,
    "nome": "Responder e-mails",
    "finalizado": true,
    "iniciado": false
  }];

  function creaateResponse(body){
      return Observable.create((observer:Observer<any>)=>{
        observer.next(body);
      });
  }

  class MockHttp{
      get(){
          return creaateResponse(todolist);
      }
  }

  describe('TaskService',()=>{
        let service : TasksService;
        let http : HttpClient;

        beforeEach(()=>{
            const bed  = TestBed.configureTestingModule({
                providers : [
                    {provide: HttpClient, useClass: MockHttp},
                    TasksService,
                    Store
                ]

            });

            http = bed.get(HttpClient);
            service = bed.get(TasksService);

        });

        it('Deve retornar lista de tarefas',()=>{
            // não necessario pois o get utilizado é o da classe MockHttp
            //spyOn(http,'get').and.returnValue(creaateResponse(todolist));

            service.getTodoList$
            .subscribe((result) =>{
                expect(result.length).toBe(1)
                expect(result).toEqual(todolist);
            });
        });
  });