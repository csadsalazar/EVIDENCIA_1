import { LitElement, html } from "lit-element";
import stylesScss from './login-componentStyle';

export class Login extends LitElement{
    constructor(){
        super();
        this.mensaje='';

    }

    ingresarLogin(){
        let username =this.shadowRoot.querySelector('#username').value;
        let password =this.shadowRoot.querySelector('#password').value;

        if(username == null  || username ==undefined || username == ''){
            this.mensaje = 'Atencion... campo username vacio.';
            return false;
        }
       
        if(password == null  || password ==undefined || password == ''){
            this.mensaje = 'Atencion... campo password vacio.';
            return false;
        }else {
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

    render(){
        return html `
   
            <input type= 'text' placeholder="Username" id="username">
            <input type= 'password' placeholder="Password" id="password" >
            <button class="btn"  @click=${(e)=>this.ingresarLogin()}>Ingresar</button>
            ${this.mostrarError()}
       
        `
       
    };
}

customElements.define('login-component' , Login);