import { LitElement, html } from 'lit-element';
import { UserService } from './main';

export class NuevaCampaña extends LitElement {
    static get properties() {
        return {
            isModalOpen: { type: Boolean },
            selectedEquipo: { type: String },
            equipos: { type: Array },
        };
    }

    constructor() {
        super();
        this.isModalOpen = false;
        this.selectedEquipo = '';
        this.equipos = UserService.equipos;
    }



    open() {
        this.isModalOpen = true;
    }

    close() {
        this.isModalOpen = false;
    }

    handleRegistration() {
        const nombre = this.shadowRoot.querySelector('#nombreCampaña').value;
        const director = this.shadowRoot.querySelector('#director').value;
        const empresa = this.shadowRoot.querySelector('#empresa').value;
        const inicio = this.shadowRoot.querySelector('#inicio').value;
        const fin = this.shadowRoot.querySelector('#fin').value;

        if (!nombre || !director || !empresa || !inicio || !fin || !this.selectedEquipo) {
            alert('Por favor, complete todos los campos y seleccione un equipo.');
            return;
        }

        // Registra el usuario en el servicio UserService con el estado de la campaña
        const newCamp = { nombre, director, empresa, inicio, fin, equipo: this.selectedEquipo};
        UserService.campañas.push(newCamp);
        this.saveCampañasToLocalStorage();

        alert('Campaña registrada correctamente.');
        this.close();
    }

  
    saveCampañasToLocalStorage() {
        localStorage.setItem('campaigns', JSON.stringify(UserService.campañas));
    }

    render() {
        return html`
            <!-- Ventana modal -->
            <div class="modal fade" ?class=${this.isModalOpen ? 'show' : ''} tabindex="-1" role="dialog" style="display: ${this.isModalOpen ? 'block' : 'none'};">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Registro de Campaña</h5>
                        </div>
                        <div class="modal-body">
                            <div class="input-group mt-1">
                                <input id="nombreCampaña" class="form-control font-weight-bold" type="text" placeholder="Nombre de la campaña" required>
                            </div>
                            <div class="input-group mt-1">
                                <input id="director" class="form-control font-weight-bold" type="text" placeholder="Director" required>
                            </div>
                            <div class "input-group mt-1">
                                <input id="empresa" class="form-control font-weight-bold" type="text" placeholder="Empresa" required>
                            </div>
                            <div class="input-group mt-1">
                                <input id="inicio" class="form-control font-weight-bold" type="date" placeholder="Inicio" required>
                            </div>
                            <div class="input-group mt-1">
                                <input id="fin" class="form-control font-weight-bold" type="date" placeholder="Fin" required>
                            </div>
                            <div class="input-group mt-1">
                            <select id="campaign" class="form-select font-weight-bold" @change=${(e) => this.selectedEquipo = e.target.value}>
                            <option value="" selected>Seleccione un equipo</option>
                            ${this.equipos.map(equipo => html`
                                <option value=${equipo.nombre}>${equipo.nombre}</option>
                            `)}
                        </select>
                        
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button @click=${this.handleRegistration} class="btn btn-primary">Registrar</button>
                            <button @click=${this.close} class="btn btn-secondary">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('cmp-nueva-campaña', NuevaCampaña);
