import { LitElement, html } from 'lit-element';
import stylesScss from './cmp-homeStyle';
import { Router } from '@vaadin/router';
import { UserService } from './main';
import './cmp-nueva-campaña';

export class Home2 extends LitElement {
    static get properties() {
        return {
            campañas: { type: Array },
            campañaencontrada: { type: Object },
            isModalOpen: { type: Boolean }, // Nueva propiedad para controlar la ventana modal
        };
    }

    constructor() {
        super();
        this.campañas = UserService.campañas;
        this.campañaencontrada = null;
        this.isModalOpen = false; // Inicialmente, la ventana modal está cerrada
    }


    usuarios() {
        Router.go('/usuarios');
    }

    equipos() {
        Router.go('/equipos');
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

    saveCampañasToLocalStorage() {
        localStorage.setItem('campaigns', JSON.stringify(this.campañas));
    }

    toggleCampañaActiva(camp) {
        camp.isActiva = !camp.isActiva;
        this.saveCampañasToLocalStorage();
        this.requestUpdate();
    }
    
    showCampañaDetails(camp) {
        this.campañaencontrada = camp;
    }

    closeCampañaDetails() {
        this.campañaencontrada = null;
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
                        <a href="#" class="nav-link active bg-light pt-2 font-weight-bold" style="color: grey; border-radius: 10px; height: 45px; font-size: 18px;" aria-current="page">
                            <i class="fas fa-user me-2"></i> Campañas
                        </a>
                    </li>
                    <li class="nav-item pt-3">
                        <a href="#" @click=${(e) => this.equipos()} class="nav-link active bg-light pt-2 font-weight-bold" style="color: grey; border-radius: 10px; height: 45px; font-size: 18px;" aria-current="page">
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
                        <div id="cajas" class="col-sm-6 col-md-4">${UserService.usuariosRegistrados.length}</div>
                        <div id="cajas2" class="col-md-5 pt-2">Usuarios Conectados</div>
                    </div>
                    &nbsp&nbsp&nbsp
                    &nbsp&nbsp&nbsp
                    &nbsp&nbsp&nbsp
                    <div class="row g-0 text-center pt-3">
                        <div id="cajas" class="col-sm-6 col-md-4">${UserService.equipos.length}</div>
                        <div id="cajas2" class="col-md-5 pt-2">Equipos Activos</div>
                    </div>
                    &nbsp&nbsp&nbsp
                    &nbsp&nbsp&nbsp
                    &nbsp&nbsp&nbsp
                    <div class="row g-0 text-center pt-3">
                        <div id="cajas" class="col-sm-6 col-md-4"> ${UserService.campañas.length} </div>
                        <div id="cajas2" class="col-md-5 pt-2">Campañas Activas</div>
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
                                    <cmp-nueva-campaña ?isModalOpen=${this.isModalOpen} @close=${this.closeModal}></cmp-nueva-campaña>
                                    <!-- Mostrar detalles de la campaña seleccionada -->
                                    <div id="campañaDetails" ?hidden=${!this.campañaencontrada}>
                                        <p>Nombre: ${this.campañaencontrada ? this.campañaencontrada.nombre : ''}</p>
                                        <p>Director: ${this.campañaencontrada ? this.campañaencontrada.director : ''}</p>
                                        <p>Empresa: ${this.campañaencontrada ? this.campañaencontrada.empresa : ''}</p>
                                        <p>Fecha Inicio: ${this.campañaencontrada ? this.campañaencontrada.inicio : ''}</p>
                                        <p>Fecha Finalizacion: ${this.campañaencontrada ? this.campañaencontrada.fin : ''}</p>
                                        <p>Equipo: ${this.campañaencontrada ? this.campañaencontrada.equipo : ''}</p>
                                        <button @click=${this.closeCampañaDetails} style="width: 8rem; border-radius: 5px; border: rgb(250, 101, 101); background-color: rgb(250, 101, 101); color: white;">Cerrar</button>
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
                            <th>Empresa</th>
                            <th>Director</th>
                            <th>Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          ${this.campañas.map(camp => html`
                            <tr>
                              <td>${camp.nombre}</td>
                              <td>${camp.empresa}</td>
                              <td>${camp.director}</td>
                              <td>
                                <button @click=${() => this.toggleCampañaActiva(camp)} class="btn btn-primary" style="border-radius: 5px; border: rgb(250, 101, 101); background-color: rgb(250, 101, 101); color: white;">
                                  ${camp.isActiva ? 'Desactivar' : 'Activar'}
                                </button>
                                <button @click=${() => this.showCampañaDetails(camp)} class="btn btn-primary" style="border-radius: 5px; border: rgb(250, 101, 101); background-color: rgb(250, 101, 101); color: white;">Ver Detalles</button>
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

customElements.define("cmp-home2", Home2);