import moment from "moment";
import 'moment/locale/es';

export const apiUrl = process.env.REACT_APP_API_BASE_URL ?? '';
export const whitelistForbidden = [
    'api/auth/',
    'api/tickets/contact',
];
export const sidebarOptions = [
    {
      icono: 'dashboard',
      nombre: 'Dashboard',
      link: 'home',
      needsUser: true
    },
    {
      icono: 'shopping_cart',
      nombre: 'Mis compras',
      link: 'ordenes',
      needsUser: true
    },
    {
      icono: 'shopping_bag',
      nombre: 'Tienda',
      link: 'tienda',
      needsUser: false
    },
    {
      icono: 'work',
      nombre: 'Contacto',
      link: 'contacto',
      needsUser: false
    },
    {
      icono: 'settings',
      nombre: 'Configuracion',
      link: 'perfil/configuracion',
      needsUser: true
    },
    {
      icono: 'work',
      nombre: 'Administracion',
      link: 'administracion',
      needsUser: true
    }
];

export const mesesList = [
  ...moment.localeData('es').months().map((month) => month[0].toUpperCase() + month.slice(1))
];