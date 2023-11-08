import { LitElement, html } from "lit-element";

export class Myelement extends LitElement{
    constructor(){
        super();
        this.saludo = 'Mundo'
    }

    static get properties(){
        return{
            saludo: {
                type: String
            }
        }
    }

    render() {
        return html `
        <p>Soy ${this.saludo}</p>
        `;
    }
}
customElements.define('my-element' , Myelement);