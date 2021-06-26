import {AfterContentInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {Cliente} from "./cliente";
import {ClientesService} from "./clientes.service";
import Swal from "sweetalert2";
import {Router, ActivatedRoute} from "@angular/router";//Se añade ActivatedRoute para actualizar datos del cliente:: UPDATE
//import { MdbTablePaginationComponent, MdbTableDirective } from '@PATH-TO-MDB-ANGULAR-HERE';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  //@ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
//  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective

  elements: any = [];
  previous: any = [];
  headElements = ['ID', 'First', 'Last', 'Handle'];

//Este array inicia con los datos del Json
  clientes: Cliente[] = [];

  header: string = 'Clients';
  content: string = 'List of Cliente';



  //Cuando el service esta creado se realiza una inyeccion de dependencia en el constructor
  constructor(private clienteService: ClientesService, private router: Router, private cdRef: ChangeDetectorRef   ) {
  }

  ngOnInit(): void {

    //Realizo una suscripcion con el observable
    this.clienteService.getClientes().subscribe(
      //Funcion anonima funcional
      clientes => this.clientes = clientes
    );
/*
    for (let i = 1; i <= 15; i++) {
      this.elements.push({id: i.toString(), first: 'User ' + i, last: 'Name ' + i, handle: 'Handle ' + i});
    }

    this.mdbTable.setDataSource(this.elements);
    this.elements = this.mdbTable.getDataSource();
    this.previous = this.mdbTable.getDataSource();*/

  }


  //Delete Cliente
  delete(clientee: Cliente): void {
    //SweeAlert
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: `¿Estas seguro de eliminar ${clientee.nombre} ${clientee.apellido}?`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.delete(clientee.id).subscribe(
          response => {

            this.clientes = this.clientes.filter(x => x !== clientee)

            swalWithBootstrapButtons.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          }
        );

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })


  }





}

