import { Router } from '@vaadin/router';
import './cmp-login.js'; // Import the Login component
import './cmp-home1.js';
import './cmp-home2.js';
import './cmp-home3.js';

export const UserService = {
  usuariosRegistrados: [],
  campañas: [],
  equipos: []
};

function loadUsersFromLocalStorage() {
  const data = localStorage.getItem('users');
  UserService.usuariosRegistrados = data ? JSON.parse(data) : [];
}
loadUsersFromLocalStorage(); 


function loadCampaignsFromLocalStorage() {
  const data = localStorage.getItem('campaigns');
  UserService.campañas = data ? JSON.parse(data) : [];
}

loadCampaignsFromLocalStorage();

function loadEquiposFromLocalStorage() {
  const data = localStorage.getItem('equipos');
  UserService.equipos = data ? JSON.parse(data) : [];
}

loadEquiposFromLocalStorage();

const routes = [
  {
    path: '/',
    component: 'cmp-login',
  },
  {
    path: '/usuarios',
    component: 'cmp-home1',
  },
  {
    path: '/campanas',
    component: 'cmp-home2',
  },
  {
    path: '/equipos',
    component: 'cmp-home3',
  }
];

const outlet = document.getElementById('app');
const router = new Router(outlet);
router.setRoutes(routes);
