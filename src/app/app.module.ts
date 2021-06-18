import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {ClientesComponent} from './clientes/clientes.component';
import {ClientesService} from "./clientes/clientes.service";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from './home/home.component';
import {GameComponent} from './game/game.component';
import { HeaderComponent } from './header/header.component';
import {HttpClientModule} from '@angular/common/http';
import {FormComponent} from "./clientes/form.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




const routes: Routes = [
  {path: '', redirectTo: '/clientes', pathMatch: 'full'},
  {path: 'game', component: GameComponent},
  {path: 'clientes', component: ClientesComponent},
  {path: 'clientes/form', component: FormComponent},
  //Enlance para actualizar un cliente
  {path: 'clientes/form/:id', component: FormComponent},



]

//Nombres de las clases
@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    HomeComponent,
    GameComponent,
    HeaderComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    //Impor Router
    RouterModule.forRoot(routes)
  ],
  providers: [ClientesService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

/*
<!---              "/assets/javascript/bootstrap.bundle.min.js",    "/assets/javascript/popper.min.js",-->

 */
