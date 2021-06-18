import {Component, OnInit} from '@angular/core';
import {Cliente} from "./cliente";
import {ClientesService} from "./clientes.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

//Este array inicia con los datos del Json
  clientes: Cliente[] = [];

  header: string = 'Clients';
  content: string = 'List of Cliente';



  //Cuando el service esta creado se realiza una inyeccion de dependecia en el constructor
  constructor(private clienteService: ClientesService) {
  }

  ngOnInit(): void {

    //Realizo una suscripcion con el observable
    this.clienteService.getClientes().subscribe(
      //Funcion anonima funcional
      clientes => this.clientes = clientes
    );
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

