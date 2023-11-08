import { LitElement, html } from "lit-element";
import stylesScss from './login-componentStyle';


export class Registrar extends LitElement{
    constructor(){
      super();
      this.mensaje='';
    }

    ingresarRegistro(){
      let username =this.shadowRoot.querySelector('#username').value;
      let email =this.shadowRoot.querySelector('#email').value;
      let password =this.shadowRoot.querySelector('#password').value;
      let confirmar =this.shadowRoot.querySelector('#confirmar').value;

      if(username == null  || username ==undefined || username == ''){
          this.mensaje = 'Atencion... campo username vacio.';
          return false;
      }
    
      if(email == null  || email ==undefined || email == ''){
        this.mensaje = 'Atencion... campo email vacio.';
        return false;
      } 

      if(password == null  || password ==undefined || password == ''){
          this.mensaje = 'Atencion... campo password vacio.';
          return false;
      }

      if(confirmar == null  || confirmar ==undefined || confirmar == ''){
        this.mensaje = 'Atencion... campo confirmacion de contraseña vacio.';
        return false;
      }
      
      if(password.value == confirmar.value){
        this.mensaje = 'Atencion... las contraseñas no coinciden.';
        return false;
      }else{
          this.mensaje='';
      }
    
    }

    mostrarError(){
      return html `<div>${this.mensaje}</div>`;
    
    }



    static get properties(){
      return{
        
          mensaje:{
              type:String
          }
      }
    }

    static get styles(){
      return[stylesScss];
    }

    render() {
        return html `
        
      
                <input type="text" placeholder="Nombre" id="username">
                <input type="email" placeholder="Email" id="email">
                <input type="password" placeholder="Contraseña" id="password"> 
                <input type="password" placeholder="Confirmación de Contraseña" id="confirmar">
                <button class="btn" @click=${(e)=>this.ingresarRegistro()}>Enviar</button>
                ${this.mostrarError()}
        `;
    }
}
customElements.define('registrar-component' , Registrar);

