

export enum INFORMACION_DESTACADA_ACTION_TYPES {
  SET_ITEMS = 'informaciondestacada/SET_ITEMS'
}

export type InformacionDestacada = {
  icono: string,
  nombre: string,
  numeroPendiente: number,
  backgroundColor?: string,
  textColor?: string
};