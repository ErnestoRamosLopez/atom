import { createSelector } from 'reselect';
import { InformacionDestacadaState } from './informacion-destacada.reducer';

const selectCartReducer = (state: any): InformacionDestacadaState => state.informaciondestacada;

export const selectInformacionDestacada = createSelector(
  [selectCartReducer],
  (cart) => cart.items
);
