import { css } from "lit-element";

export default css `
#cajas{
    height: 70px;
    font-size: 40px;
    font-weight: bold;
    background-color: rgb(197, 24, 24);
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    color: white;
}
#btnFiltrar{
    width: 700px;
}
#pt{
    padding-top: 210px;
}
#cajas2{
    width: 200px;
    height: 70px;
    font-size: 15px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    background-color: rgb(241, 112, 112);
    color: white;
}
#cuadro{
    width: 55rem;
    height: 29rem;
    border-radius: 1rem;
    border-color: black;
}

/* Estilo para el modal */
.modal {
    display: none;
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%); /* Centrar horizontalmente */
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    z-index: 9999;
    justify-content: center;
    align-items: center;
}


.modal-content {
  background: white;
  width: 60%; 
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.cut-call-button {
  background: rgb(250, 101, 101);
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
}

`