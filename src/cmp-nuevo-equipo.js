import { LitElement, html } from 'lit-element';
import { UserService } from './main';

export class NuevoEquipo extends LitElement {
    static get properties() {
        return {
            isModalOpen: { type: Boolean },
            selectedCampaign: { type: String },
            campaigns: { type: Array },
        };
    }

    constructor() {
        super();
        this.isModalOpen = false;
        this.selectedCampaign = '';
        this.campaigns = UserService.campañas; // Cargar las campañas existentes desde UserService
    }


    open() {
        this.isModalOpen = true;
    }

    close() {
        this.isModalOpen = false;
    }

    handleRegistration() {
        const nombre = this.shadowRoot.querySelector('#nombre').value;
        const numeroparticipantes = this.shadowRoot.querySelector('#numeroparticipantes').value;


        if (!nombre || !numeroparticipantes || !this.selectedCampaign) {
            alert('Por favor, complete todos los campos y seleccione una campaña.');
            return;
        }

        // Registra el usuario en el servicio UserService
        const newEquipo = { nombre, numeroparticipantes, campaign: this.selectedCampaign };
        UserService.equipos.push(newEquipo);
        this.saveEquiposToLocalStorage();

        alert('Equipo registrado correctamente.');
        this.close();
    }

    saveEquiposToLocalStorage() {
        localStorage.setItem('equipos', JSON.stringify(UserService.equipos));
    }

    render() {
        return html`
            <!-- Ventana modal -->
            <div class="modal fade" ?class=${this.isModalOpen ? 'show' : ''} tabindex="-1" role="dialog" style="display: ${this.isModalOpen ? 'block' : 'none'};">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Registro Equipos</h5>
                        </div>
                        <div class="modal-body">
                            <div class="input-group mt-1">
                                <input id="nombre" class="form-control font-weight-bold" type="text" placeholder="Nombre" required>
                            </div>
                            <div class="input-group mt-1">
                                <input id="numeroparticipantes" class="form-control font-weight-bold" type="number" placeholder="Numero Participantes" required>
                            </div>
                            <div class="input-group mt-1">
                                <select id="campaign" class="form-select font-weight-bold" @change=${(e) => this.selectedCampaign = e.target.value}>
                                    <option value="" selected>Seleccione una campaña</option>
                                    <option value="Prueba" selected>Prueba</option>
                                    ${this.campaigns.map(campaign => html`
                                        <option value=${campaign.nombre}>${campaign.nombre}</option>
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

customElements.define('cmp-nuevo-equipo', NuevoEquipo);
