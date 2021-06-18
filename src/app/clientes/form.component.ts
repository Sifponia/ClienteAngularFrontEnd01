import {Component, OnInit} from '@angular/core';
import {Cliente} from "./cliente";
import {ClientesService} from "./clientes.service";
import {Router, ActivatedRoute} from "@angular/router";//Se añade ActivatedRoute para actualizar datos del cliente:: UPDATE
import Swal from 'sweetalert2'


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  cliente: Cliente = new Cliente();

  //Se añaden las clases al constructor para luiego inyectarlas:: IMPORTANTE
  constructor(private clienteService: ClientesService, private router: Router,
              private activatedRoute: ActivatedRoute) {
  }


  ngOnInit(): void {
    this.cargarCliente()
  }

  //Cargar cliente para combobar que existe. IPDATE CLIENTE
  cargarCliente(): void {
    //Se debera suscribir un obsevable para ucctualizar los datos del cliente
    this.activatedRoute.params.subscribe(params => {
        //Comprobamos si existe el cliente
        let id = params['id']
        if (id) {
          this.clienteService.getClienteUpdate(id).subscribe(clientParam => this.cliente = clientParam)

        }
      }
    )
  }

  //Crear Cliente
  public create(): void {
    // console.log("click")
    //console.log(this.cliente)
    this.clienteService.create(this.cliente).subscribe(cliente => {
        this.router.navigate(['/clientes'])
        //Alert Swwet
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `Client ${this.cliente.nombre} created`,
          showConfirmButton: false,
          timer: 2000
        });
      }
    );

  }

  //Update Cliente
  update(): void {
    this.clienteService.update(this.cliente)
      .subscribe(cliente => {
        this.router.navigate(['/clientes'])
        //Alert Swwet
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `Client ${this.cliente.nombre} Edit`,
          showConfirmButton: false,
          timer: 2000
        })
      });
  }

  /*Delete Cliente
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


            swalWithBootstrapButtons.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          }
        );

      } else if (
        /* Read more about handling dismissals below
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })


  }*/

}
