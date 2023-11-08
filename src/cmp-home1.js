import { LitElement, html } from 'lit-element';
import stylesScss from './cmp-homeStyle';
import { Router } from '@vaadin/router';
import { UserService } from './main';
import './cmp-nuevo-usuario';

export class Home1 extends LitElement {
    static get properties() {
        return {
            usuariosRegistrados: { type: Array },
            usuarioEncontrado: { type: Object },
            usuariosFiltrados: { type: Array }, // Agregar la propiedad usuariosFiltrados
            isModalOpen: { type: Boolean },
            usuarioSeleccionado: { type: Object },
            llamadasRealizadas: { type: Number }
            
        };
    }

    constructor() {
        super();
        this.usuariosRegistrados = UserService.usuariosRegistrados;
        this.usuarioEncontrado = null;
        this.usuariosFiltrados = this.usuariosRegistrados;
        this.isModalOpen = false;
        this.usuarioSeleccionado = null;
        this.llamadasRealizadas = parseInt(localStorage.getItem('llamadasRealizadas')) || 0;
    
        // Calcular el número de usuarios ausentes
        this.usuariosAusentes = this.usuariosRegistrados.filter(user => {
            const campaña = UserService.campañas.find(campaña => campaña.nombre === user.campaign);
            return campaña && !campaña.isActiva;
        });
    }
    


    openCampañaModal() {
        // Abre el modal de selección de campañas
        const modal = this.shadowRoot.querySelector('#campañaModal');
        modal.style.display = 'block';
    }

    // Función para cerrar el modal de selección de campañas
    closeCampañaModal() {
        // Cierra el modal de selección de campañas
        const modal = this.shadowRoot.querySelector('#campañaModal');
        modal.style.display = 'none';
    }


    buscarUsuario() {
        const numeroInput = this.shadowRoot.querySelector('#numero').value;
        const nombreInput = this.shadowRoot.querySelector('#nombre').value;

        const usuarioEncontrado = this.usuariosRegistrados.find(user => user.numero === numeroInput && user.nombre === nombreInput);

        if (usuarioEncontrado) {
            this.usuarioEncontrado = usuarioEncontrado;
        } else {
            this.usuarioEncontrado = null;
            alert("No puedes hacer la debida consulta debido a que no se encuentra el usuario o campos desiertos.")
        }
    }

    campanas() {
        Router.go('/campanas');
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
        this.usuarioEncontrado = null;
        this.isModalOpen = false; // Cierra la ventana modal
    }

    showUserDetails(user) {
        this.usuarioSeleccionado = user;
    }

    abrirModalLlamada() {
        const modal = this.shadowRoot.getElementById("modals");
        const horaInicio = this.shadowRoot.getElementById("horaInicio");
        const horaFin = this.shadowRoot.getElementById("horaFin");
        const now = new Date();

        horaInicio.textContent = now.toLocaleTimeString();

        // Calcular la hora de finalización agregando una hora a la hora de inicio
        const horaInicioDate = new Date(now);
        horaInicioDate.setHours(horaInicioDate.getHours() + 1);

        // Actualizar la hora de finalización
        horaFin.textContent = horaInicioDate.toLocaleTimeString();

        modal.style.display = "block";

        // Incrementar el contador de llamadas realizadas
        this.llamadasRealizadas++;
        this.guardarLlamadasRealizadas(this.llamadasRealizadas);
    }

    cortarLlamada() {
        const modal = this.shadowRoot.getElementById("modals");
        modal.style.display = "none";
    }

    // Función para guardar el valor de llamadasRealizadas en localStorage
    guardarLlamadasRealizadas(valor) {
        localStorage.setItem('llamadasRealizadas', valor.toString());
    }

    filtrarPorCampaña(e) {
        const campañaSeleccionada = e.target.value;

        if (campañaSeleccionada) {
            // Filtra los usuarios por la campaña seleccionada
            this.usuariosFiltrados = this.usuariosRegistrados.filter(user => user.campaign === campañaSeleccionada);
        } else {
            // Si se selecciona "Todas las Campañas", muestra todos los usuarios
            this.usuariosFiltrados = this.usuariosRegistrados;
        }
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
                                <a href="#" class="nav-link active bg-light pt-2 font-weight-bold" style="color: grey; border-radius: 10px; height: 45px; font-size: 18px;" aria-current="page">
                                    <i class="fas fa-user me-2"></i> Usuarios
                                </a>
                            </li>
                            <li class="nav-item pt-3">
                                <a href="#" @click=${(e) => this.campanas()} class="nav-link active bg-light pt-2 font-weight-bold" style="color: grey; border-radius: 10px; height: 45px; font-size: 18px;" aria-current="page">
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
                            <div id="cajas" class="col-sm-6 col-md-4">${this.usuariosAusentes.length}</div>
                            <div id="cajas2" class="col-md-5 pt-2">Usuarios Ausentes</div>
                            </div>
                        
                            &nbsp&nbsp&nbsp
                            &nbsp&nbsp&nbsp
                            &nbsp&nbsp&nbsp
                            <div class="row g-0 text-center pt-3">
                                <div id="cajas" class="col-sm-6 col-md-4">${UserService.campañas.length}</div>
                                <div id="cajas2" class="col-md-5 pt-2">Campañas Activas</div>
                            </div>
                            &nbsp&nbsp&nbsp
                            &nbsp&nbsp&nbsp
                            &nbsp&nbsp&nbsp
                            <div class="row g-0 pt-3">
                            <div id="cajas" class="col-sm-6 col-md-4">${this.llamadasRealizadas}</div>
                            <div id="cajas2" class="col-md-5 pt-2">Llamadas Realizadas</div>
                        </div>
                        
                        </div>
                    </div>
                    <br>

                    <div id="cuadro" class="container border border-dark ml-2">
                        <div class="d-flex p-3" >
                            <div class="border border-dark" style="width: 14rem; height: 27rem; border-radius: 1rem;">
                                <div>
                                    <div class="d-flex flex-shrink-0 p-3" style="width: 222px; background-color: rgb(201, 205, 207); border-top-left-radius: 1rem; border-top-right-radius: 1rem; height: 10rem; ">
                                        <hr>
                                        <ul class="nav nav-pills flex-column mb-auto" style="width: 25rem;">
                                            <div class="input-group mt-1" style="width: 12rem;">
                                                <input id="numero" class="form-control font-weight-bold" type="number" placeholder="Número">
                                            </div>
                                            <div class="input-group mt-3" style="width: 12rem;">
                                                <input id="nombre" class="form-control font-weight-bold" type="text" placeholder="Nombre">
                                            </div>
                                            <div class="d-flex justify-content-center">
                                                <button @click=${this.buscarUsuario} class="mt-2 text-center" style="width: 5rem; border-radius: 5px; border: rgb(250, 101, 101); background-color: rgb(250, 101, 101); color: white;" ?disabled=${this.isModalOpen}>Buscar</button>
                                            </div>                                            
                                            <div class="container border border-dark mt-4" style="width: 12rem; height: 16rem;">
                                            <div id="usuarioEncontrado" class="text-center mt-2">
                                            <cmp-nuevo-usuario ?isModalOpen=${this.isModalOpen} @close=${this.closeModal}></cmp-nuevo-usuario>
                                
                                            ${this.usuarioEncontrado
                                                ? html`
                                                    <p>Nombre: ${this.usuarioEncontrado.nombre}</p>
                                                    <p>Correo: ${this.usuarioEncontrado.email}</p>
                                                    <p>Campaña: ${this.usuarioEncontrado.campaign}</p>
                                                    <button @click=${this.abrirModalLlamada} class="mt-2 text-center" style="width: 5rem; border-radius: 5px; border: rgb(250, 101, 101); background-color: rgb(250, 101, 101); color: white;">Llamar</button>
                                                    <button @click=${this.closeModal} class="mt-2 text-center" style="width: 5rem; border-radius: 5px; border: rgb(250, 101, 101); background-color: rgb(250, 101, 101); color: white;">Cerrar</button>
                                                `
                                                : ''}
                                        </div>

                                                <div id="usuarioDetalleModal" ?hidden=${!this.usuarioSeleccionado}>
                                                <p>Nombre: ${this.usuarioSeleccionado ? this.usuarioSeleccionado.nombre : ''}</p>
                                                <p>Apellido: ${this.usuarioSeleccionado ? this.usuarioSeleccionado.apellido : ''}</p>
                                                <p>Numero: ${this.usuarioSeleccionado ? this.usuarioSeleccionado.numero : ''}</p>
                                                <p>Email: ${this.usuarioSeleccionado ? this.usuarioSeleccionado.email : ''}</p>
                                                <p>Campaña: ${this.usuarioSeleccionado ? this.usuarioSeleccionado.campaign : ''}</p>

                                                <!-- Agrega más detalles aquí según tu modelo de datos -->
                                                <button @click=${() => this.usuarioSeleccionado = null} style="width: 8rem; border-radius: 5px; border: rgb(250, 101, 101); background-color: rgb(250, 101, 101); color: white;">Cerrar</button>

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
                                            <select @change=${this.filtrarPorCampaña}>
                                            <option value="">Todas las Campañas</option>
                                            ${UserService.campañas ? UserService.campañas.map(campaña => html`
                                                <option value=${campaña.nombre}>${campaña.nombre}</option>
                                            `) : ''}
                                        </select>
                                        &nbsp&nbsp&nbsp
                                        &nbsp&nbsp&nbsp
                                        &nbsp&nbsp&nbsp
                                        &nbsp&nbsp&nbsp
                                        &nbsp&nbsp&nbsp
                                        &nbsp&nbsp&nbsp
                                        &nbsp&nbsp&nbsp
                                        &nbsp&nbsp&nbsp
                                        &nbsp&nbsp&nbsp
                                        &nbsp&nbsp&nbsp
                                        &nbsp&nbsp&nbsp
                                        &nbsp&nbsp&nbsp
                                        &nbsp&nbsp&nbsp
                                        &nbsp&nbsp&nbsp
                                        &nbsp&nbsp&nbsp
                                        &nbsp&nbsp&nbsp
                                        &nbsp&nbsp&nbsp
                                        
                                            <button @click=${this.openModal} class="mt-1 text-center" style="width: 70px; height: 40px; border-radius: 5px; border: rgb(250, 101, 101); background-color: rgb(250, 101, 101); color: white;">Nuevo</button>                                            
                                            </div>
                                    </div>
                                </div>
                                <div class="container border border-dark mt-4 ml-4" style="border-radius: 1rem; width: 35rem; height: 21rem;">
                                <table class="table">
                                    <thead>
                                        <tr>
                                        <th>Nombre</th>
                                        <th>Apellido</th>
                                        <th>Campaña</th>
                                        <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${this.usuariosFiltrados.map((user, index) => html`
                                            <tr>
                                                <td>${user.nombre}</td>
                                                <td>${user.apellido}</td>
                                                <td>${user.campaign}</td>
                                                <td>
                                                    <button @click=${() => this.showUserDetails(user)}  class="btn btn-primary" style="border-radius: 5px; border: rgb(250, 101, 101); background-color: rgb(250, 101, 101); color: white;">Ver Detalles</button>
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
            
            <div id="modal-container" class="modal-container">
            <div id="modals" class="modal">
                <div class="modal-content">
                    <p>Llamada en curso... </p>
                    <p>Hora de inicio: <span id="horaInicio"></span></p>
                    <p>Hora de finalización: <span id="horaFin"></span></p>
                    <button class="cut-call-button" @click=${this.cortarLlamada}>Cortar llamada</button>
                </div>
            </div>
        </div>
    </div>
                `;
              }
            }

customElements.define('cmp-home1', Home1)