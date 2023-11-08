import { LitElement, html } from 'lit-element';
import { UserService } from './main';

export class NuevoUsuario extends LitElement {
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
        // Obtén los valores de los campos del formulario
        const nombre = this.shadowRoot.querySelector('#nombre').value;
        const apellido = this.shadowRoot.querySelector('#apellido').value;
        const numero = this.shadowRoot.querySelector('#numero').value;
        const email = this.shadowRoot.querySelector('#email').value;
        const password = this.shadowRoot.querySelector('#password').value;

        if (!nombre || !apellido || !email || !password || !numero || !this.selectedCampaign) {
            alert('Por favor, complete todos los campos y seleccione una campaña.');
            return;
        }

        // Verifica si el número de teléfono ya existe
        const numeroExistente = UserService.usuariosRegistrados.some(user => user.numero === numero);
        if (numeroExistente) {
            alert('Este número de teléfono ya está registrado.');
            return;
        }

        if (numero.length !== 10) {
            alert('El número de teléfono debe tener exactamente 10 dígitos.');
            return;
        }

        // Registra el usuario en el servicio UserService
        const newUser = { nombre, apellido, numero, email, password, campaign: this.selectedCampaign };
        UserService.usuariosRegistrados.push(newUser);
        this.saveUsuariosToLocalStorage();

        alert('Usuario registrado correctamente.');
        this.close();
    }

    saveUsuariosToLocalStorage() {
        localStorage.setItem('users', JSON.stringify(UserService.usuariosRegistrados));
    }

    render() {
        return html`
            <!-- Ventana modal -->
            <div class="modal fade" ?class=${this.isModalOpen ? 'show' : ''} tabindex="-1" role="dialog" style="display: ${this.isModalOpen ? 'block' : 'none'};">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Registro Usuario</h5>
                        </div>
                        <div class="modal-body">
                            <div class="input-group mt-1">
                                <input id="nombre" class="form-control font-weight-bold" type="text" placeholder="Nombre" required>
                            </div>
                            <div class="input-group mt-1">
                                <input id="apellido" class="form-control font-weight-bold" type="text" placeholder="Apellido" required>
                            </div>
                            <div class="input-group mt-1">
                                <input id="numero" class="form-control font-weight-bold" type="number" placeholder="Número Teléfono" required>
                            </div>
                            <div class="input-group mt-1">
                                <input id="email" class "form-control font-weight-bold" type="email" placeholder="Email" required>
                            </div>
                            <div class="input-group mt-1">
                                <input id="password" class="form-control font-weight-bold" type="password" placeholder="Contraseña" required>
                            </div>
                            <div class="input-group mt-1">
                                <select id="campaign" class="form-select font-weight-bold" @change=${(e) => this.selectedCampaign = e.target.value}>
                                    <option value="" selected>Seleccione una campaña</option>
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

customElements.define('cmp-nuevo-usuario', NuevoUsuario);
