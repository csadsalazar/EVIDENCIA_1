import { LitElement, html } from 'lit-element';
import stylesScss from './cmp-homeStyle';
import { Router } from '@vaadin/router';
import { UserService } from './main';
import './cmp-nuevo-equipo';

export class Home3 extends LitElement {
    static get properties() {
        return {
            equipos: { type: Array },
            equipoencontrado: { type: Object },
            isModalOpen: { type: Boolean }, // Nueva propiedad para controlar la ventana modal
        };
    }

    constructor() {
        super();
        this.equipos = UserService.equipos;
        this.equipoencontrado = null;
        this.isModalOpen = false; // Inicialmente, la ventana modal está cerrada
    }


    usuarios() {
        Router.go('/usuarios');
    }

    campanas() {
        Router.go('/campanas');
    }

    login() {
        Router.go('/');
    }

    openModal() {
        this.isModalOpen = true; // Abre la ventana modal
    }
    
    closeModal() {
        this.isModalOpen = false; // Cierra la ventana modal
    }
    
       // Función para mostrar los detalles del equipo seleccionado
       showEquipoDetails(equip) {
        this.equipoencontrado = equip;
    }

    // Función para cerrar los detalles del equipo
    closeEquipoDetails() {
        this.equipoencontrado = null;
    }

    static get styles() {
        return [stylesScss];
    }



  render() {
    return html`
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

    <div class="d-flex">
        <div class="pt-2 d-flex justify-content-left">
            <div class="d-flex flex-shrink-0 p-3 ml-5" style="width: 250px; background-color: rgb(201, 205, 207); border-radius: 1rem; height: 36rem;">
                <hr>
                <ul class="nav nav-pills flex-column mb-auto" style="width: 25rem;">
                    <li class="nav-item">
                        <a href="#" @click=${(e) => this.usuarios()} class="nav-link active bg-light pt-2 font-weight-bold" style="color: grey; border-radius: 10px; height: 45px; font-size: 18px;" aria-current="page">
                            <i class="fas fa-user me-2"></i> Usuarios
                        </a>
                    </li>
                    <li class="nav-item pt-3">
                        <a href="#" @click=${(e) => this.campanas()} class="nav-link active bg-light pt-2 font-weight-bold" style="color: grey; border-radius: 10px; height: 45px; font-size: 18px;" aria-current="page">
                            <i class="fas fa-user me-2"></i> Campañas
                        </a>
                    </li>
                    <li class="nav-item pt-3">
                        <a href="#" class="nav-link active bg-light pt-2 font-weight-bold" style="color: grey; border-radius: 10px; height: 45px; font-size: 18px;" aria-current="page">
                            <i class="fas fa-user me-2"></i> Equipos
                        </a>
                    </li>
                </ul>
                <hr>
            </div>
        </div>
        &nbsp&nbsp&nbsp
        &nbsp&nbsp&nbsp
        <div class="pt-2">
            <div class="d-flex justify-content-left">
                &nbsp&nbsp&nbsp
                &nbsp&nbsp&nbsp
                <div class="row d-flex">
                    <div class="row g-0 text-center pt-3">
                        <div id="cajas" class="col-sm-6 col-md-4"> ${UserService.equipos.length} </div>
                        <div id="cajas2" class="col-md-5 pt-2">Equipos Activos</div>
                    </div>
  
                </div>
            </div>
            <br>

            <div id="cuadro" class="container border border-dark ml-2">
                <div class="d-flex p-3" >
                    <div class="border border-dark" style="width: 14rem; height: 27rem; border-radius: 1rem;">
                        <div>
                            <div class="d-flex flex-shrink-0 p-3" style="width: 222px; border-top-left-radius: 1rem; border-top-right-radius: 1rem; height: 10rem; ">
                                <hr>
                                <ul class="nav nav-pills flex-column mb-auto" style="width: 25rem;">
                                    <div class="container border border-dark mt-4" style="width: 12rem; height: 22.5rem;">
                                    <cmp-nuevo-equipo ?isModalOpen=${this.isModalOpen} @close=${this.closeModal}></cmp-nuevo-equipo>
                                    <!-- Mostrar detalles del equipo seleccionado -->
                                    <div id="equipoDetails" ?hidden=${!this.equipoencontrado}>
                                        <p>Nombre: ${this.equipoencontrado ? this.equipoencontrado.nombre : ''}</p>
                                        <p>Numero participantes: ${this.equipoencontrado ? this.equipoencontrado.numeroparticipantes : ''}</p>
                                        <p>Campaña: ${this.equipoencontrado ? this.equipoencontrado.campaign : ''}</p>
                                        <button @click=${this.closeEquipoDetails} style="width: 8rem; border-radius: 5px; border: rgb(250, 101, 101); background-color: rgb(250, 101, 101); color: white;">Cerrar</button>
                                    </div>
                                    </div>
                                </ul>
                                <hr>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="d-flex justify-content-around">
                            <div class="ml-5 d-flex justify-content-around">
                                <div class="row g-0 text-center pt-1">
                                    <button id="btnFiltrar" class="col-sm-6 col-md-4 border border-secondary font-weight-bold" style="font-size: 19px; height: 68px; border-radius: 7px;">Filtrar por campaña</button>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                                    <button @click=${this.openModal} class="mt-1 text-center" style="width: 70px; height: 40px; border-radius: 5px; border: rgb(250, 101, 101); background-color: rgb(250, 101, 101); color: white;">Nuevo</button>                                            
                                    </div>
                            </div>
                        </div>
                   
            <div class="container border border-dark mt-4 ml-4" style="border-radius: 1rem; width: 35rem; height: 21rem;">
            <table class="table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Número de Participantes</th>
                <th>Campaña</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              ${this.equipos.map(equip => html`
                <tr>
                  <td>${equip.nombre}</td>
                  <td>${equip.numeroparticipantes}</td>
                  <td>${equip.campaign}</td>
                  <td>
                    <button @click=${() => this.showEquipoDetails(equip)} class="btn btn-primary" style="border-radius: 5px; border: rgb(250, 101, 101); background-color: rgb(250, 101, 101); color: white;">Ver Detalles</button>
                  </td>
                </tr>
              `)}
            </tbody>
          </table>
          
        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
  }
}

customElements.define("cmp-home3", Home3);