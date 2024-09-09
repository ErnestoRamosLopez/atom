import { ActionWithPayload, createAction, withMatcher } from '../../utils/reducer/reducer.utils';
import { INFORMACION_DESTACADA_ACTION_TYPES, InformacionDestacada } from './informacion-destacada.types';


export type SetItems = ActionWithPayload<
  INFORMACION_DESTACADA_ACTION_TYPES.SET_ITEMS,
  InformacionDestacada[]
>;

export const setItems = withMatcher((cartItems: InformacionDestacada[]) =>
  createAction(INFORMACION_DESTACADA_ACTION_TYPES.SET_ITEMS, cartItems)
);
