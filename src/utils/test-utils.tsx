import React, {PropsWithChildren} from 'react'
import {render, RenderOptions} from '@testing-library/react'
import { AppStore } from '../store/store'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { RootState, setupStore } from '../store/store';

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>
  store?: AppStore
}

export function renderWithProviders(
  ui: React.ReactElement,
  extendedRenderOptions: ExtendedRenderOptions = {}
) {
  const {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  } = extendedRenderOptions

  function Wrapper({ children }: PropsWithChildren<{}>) {
    return(
      <Provider store={store}>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </Provider>
    );
  }

  // Return an object with the store and all of RTL's query functions
  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions })
  }
}
export const testUser = {
  email: 'test@test',
  lastname: 'test',
  name: 'test',
  id: 1
};

export * from '@testing-library/react';