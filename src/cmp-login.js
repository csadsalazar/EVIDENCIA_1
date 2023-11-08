import { LitElement, html } from "lit-element";
import stylesScss from './cmp-loginStyle';
import { Router } from "@vaadin/router";

export class Login extends LitElement {
  constructor() {
    super();
    // Usuario predefinido
    this.usuarioPredefinido = {
      email: "cesar@ejemplo.com",
      password: "12345",
    };

    // Comprueba si se recuerda el usuario
    this.rememberedEmail = localStorage.getItem("rememberedEmail") || "";
    this.rememberedPassword = localStorage.getItem("rememberedPassword") || "";
  }

  static get styles() {
    return [stylesScss];
  }

  toggleRememberMe(e) {
    const rememberMe = e.target.checked;
    if (rememberMe) {
      localStorage.setItem("rememberedEmail", this.rememberedEmail);
      localStorage.setItem("rememberedPassword", this.rememberedPassword);
    } else {
      localStorage.removeItem("rememberedEmail");
      localStorage.removeItem("rememberedPassword");
    }
  }

  login() {
    const emailInput = this.shadowRoot.querySelector("#container-email").value;
    const passwordInput = this.shadowRoot.querySelector("#container-password").value;

    if (!emailInput || !passwordInput) {
      alert("Por favor, completa todos los campos.");
    } else if (emailInput === this.usuarioPredefinido.email && passwordInput === this.usuarioPredefinido.password) {
      alert("Inicio de sesión exitoso.");
      Router.go('/usuarios');

      // Guardar credenciales si "Recuérdame" está marcado
      if (this.rememberedEmail && this.rememberedPassword) {
        localStorage.setItem("rememberedEmail", this.rememberedEmail);
        localStorage.setItem("rememberedPassword", this.rememberedPassword);
      } else {
        // Limpiar las credenciales almacenadas si "Recuérdame" no está marcado
        localStorage.removeItem("rememberedEmail");
        localStorage.removeItem("rememberedPassword");
      }
    } else {
      alert("Credenciales incorrectas.");
    }
  }

  connectedCallback() {
    super.connectedCallback();

    // Esperar a que se cargue el DOM antes de acceder a los elementos
    window.addEventListener("DOMContentLoaded", () => {
      const emailInput = this.shadowRoot.querySelector("#container-email");
      const passwordInput = this.shadowRoot.querySelector("#container-password");
      const rememberMeCheckbox = this.shadowRoot.querySelector("#rememberMe");

      // Establecer los valores recordados
      emailInput.value = this.rememberedEmail;
      passwordInput.value = this.rememberedPassword;
      rememberMeCheckbox.checked = !!this.rememberedEmail;
    });
  }

  render() {
    return html`
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

      <div class="d-flex justify-content-center align-items-center vh-100" style="background: linear-gradient(to right, #df1212, #ecd6d6); ">
        <div>
          <div id="form" style="width: 28rem; height: 18rem; text-align: center; position: relative;">

            <img src="./assets/img/user.png" alt="login-icon" style="height: 10rem; position: absolute; top: -5rem; left: 50%; transform: translateX(-50%);">

            <div class="input-group mt-3" style="width: 20rem; right: 11%;">
              <div class="input-group-text bg-danger">
                <img src="./assets/img/username-icon.svg" alt="username-icon" style="height: 1rem;">
              </div>
              <input
                id="container-email"
                class="form-control font-weight-bold"
                type="email"
                placeholder="Email"
                required
                value="${this.rememberedEmail}"
              >
            </div>
            <div class="input-group mt-3" style="width: 20rem; right: 11%;">
              <div class="input-group-text bg-danger">
                <img src="./assets/img/password-icon.svg" alt="username-icon" style="height: 1rem">
              </div>
              <input
                id="container-password"
                class="form-control font-weight-bold"
                type="password"
                placeholder="Contraseña"
                required
                value="${this.rememberedPassword}"
              >
            </div>

            <div class="d-flex justify-content-around mt-3">
              <div class="d-flex align-items-center">
                <input class="form-check-input" type="checkbox" id="rememberMe" @change=${this.toggleRememberMe} ?checked="${!!this.rememberedEmail}">
                <div class="pt-1 font-weight-bold">Recuérdame</div>
              </div>
              &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
              <div class="pt-1">
                <a class="text-decoration-none text-dark font-weight-bold" style="font-size: 0.8rem">
                  Registrarse
                </a>
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-center ">
            <button @click=${(e) => this.login()} id="form2" class="p-2 mt-1 font-weight-bold rounded-top text-center" style="font-size: 1.3rem; width: 20rem;">Login</button>
          </div>
        </div>
      </div>`;
  }
}

customElements.define('cmp-login', Login);
