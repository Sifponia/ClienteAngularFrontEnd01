import {Injectable} from '@angular/core';
import {Cliente} from "./cliente";
import {Observable, of, throwError} from "rxjs";
//Import   Conectar la parte bancken Spring boot con angular
import {HttpClient, HttpHeaders} from '@angular/common/http'
import Swal from "sweetalert2";
import {catchError, map} from "rxjs/operators";
import {Router} from "@angular/router";


@Injectable({//qUE TIPO DE CLASE REPRESENTA EN ANGULAR, SU ROL, SU TRABAJO
  providedIn: 'root'
})
export class ClientesService {

  //URL para conectar el backend con el Frotend
  private urlEndPonint: string = 'http://localhost:9091/home/clientes';

  //HEADER
  private httHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  //Conectar la parte backend Spring boot con angular
  constructor(private http: HttpClient, private router: Router) {
  }

  //Devuelve una array de Clientes, se añade un observable
  getClientes(): Observable<Cliente[]> {
    //return of(CLIENTES);//Se hace un casting del observable con of
    return this.http.get<Cliente[]>(this.urlEndPonint).pipe(
      map(response => response as Cliente[])
    );//IMPORTANTE:: Es el resultado del Backend
  }

  //POST CLIENTE
  create(cliente: Cliente): Observable<any> {
    return this.http.post<any>(this.urlEndPonint, cliente, {headers: this.httHeaders}).pipe(
      catchError(e => {//Alerta de un error al editar un ID
          Swal.fire(
            `Error ${e.error.mensaje}`,
            'Datos no encontrado',
            'error',
          );
          return throwError(e);//Devuelve el error
        }
      )
    );

    //IMPORTANTE:: Es el resultado del Backend
  }


  //Devuelve una array de Clientes y los actualiza
  getClienteUpdate(id: number): Observable<Cliente> {
    //return of(CLIENTES);//Se hace un casting del observable con of
    return this.http.get<Cliente>(`${this.urlEndPonint}/${id}`).pipe(
      catchError(e => {//Alerta de un error al editar un ID
          this.router.navigate(['/clientes']);
          Swal.fire(
            `Error ${e.error.mensaje}`,
            'Datos no encontrado',
            'error',
          );
          return throwError(e);//Devuelve el error
        }
      )
    );//IMPORTANTE:: Es el resultado del Backend
  }


  //Update
  update(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.urlEndPonint}/${cliente.id}`, cliente, {headers: this.httHeaders}).pipe(
      catchError(e => {//Alerta de un error al editar un ID
          Swal.fire(
            `Error al editar cliente ${e.error.mensaje} `,
            'error',
          );
          return throwError(e);//Devuelve el error
        }
      )
    );
  }

  //Delete
  delete(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndPonint}/${id}`, {headers: this.httHeaders}).pipe(
      catchError(e => {//Alerta de un error al editar un ID
          Swal.fire(
            `Error al Eliminar cliente ${e.error.mensaje} `,
            'error',
          );
          return throwError(e);//Devuelve el error
        }
      )
    );
  }

}
