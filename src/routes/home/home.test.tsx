import React from 'react';
import Home from './home.component';

import { fireEvent, renderWithProviders, screen, testUser, waitFor } from '../../utils/test-utils';
import * as router from 'react-router'
import axios from 'axios';
import { mesesList } from '../../utils/constantes.utils';
import moment from 'moment';

const navigate = jest.fn()

jest.mock("axios");


const totalSpent = {
  mesActual: [2000,0,0,0],
  mesAnterior: [0,0,0,0]
}

const mesActual: string = mesesList.at(moment().month())!;
const mesAnterior: string = mesesList.at(moment().month() - 1)!;

describe('Home component tests - test integracion con tsx', () => {
  beforeEach(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
  });
  
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('it should redirect to home if user is not logged in', async () => {
    renderWithProviders(<Home />, {
      preloadedState: {
        user: {
          currentUser: null
        }
      }
    });

    expect(navigate).toHaveBeenCalledWith('/tienda');
  });

  test('it should show chart dots - ui test', async () => {
    const response = {data: totalSpent};
    (axios.get as jest.Mock).mockResolvedValue(response);
   
    const {container} = renderWithProviders(<Home />, {
      preloadedState: {
        user: {
          currentUser: testUser
        }
      }
    });

    expect(axios.get).toHaveBeenCalledWith(`http://localhost:3001/api/profile/totalSpent?userId=${testUser.id}`);

    await waitFor(()=> {
      // eslint-disable-next-line testing-library/no-container
      let contenedoresPuntos = container.querySelectorAll<HTMLElement>('g.recharts-layer.recharts-line-dots > circle#lineaMesActual');

      expect(contenedoresPuntos.length).toBe(4);
    });

    // eslint-disable-next-line testing-library/no-container
    let lineaMesAnterior = container.querySelectorAll<HTMLElement>('g.recharts-layer.recharts-line-dots > circle#lineaMesAnterior');
    expect(lineaMesAnterior.length).toBe(4);
  });

  test('it should hide the lines when button is clicked', async () => {
    const response = {data: totalSpent};
    (axios.get as jest.Mock).mockResolvedValue(response);

    const {container} = renderWithProviders(<Home />, {
      preloadedState: {
        user: {
          currentUser: testUser
        }
      }
    });

    expect(axios.get).toHaveBeenCalledWith(`http://localhost:3001/api/profile/totalSpent?userId=${testUser.id}`);

    await waitFor(()=> {
      // eslint-disable-next-line testing-library/no-container
      let contenedoresPuntos = container.querySelectorAll<HTMLElement>('g.recharts-layer.recharts-line-dots > circle#lineaMesActual');

      expect(contenedoresPuntos.length).toBe(4);
    });

    const mesActualButton = await screen.findByRole('button', { name: `${mesActual} button` });
    const mesAnteriorButton = await screen.findByRole('button', { name: `${mesAnterior} button` });


    //------------------- Mes Actual ----------------------
    fireEvent.click(mesActualButton);

    await waitFor(()=> {
      // eslint-disable-next-line testing-library/no-container
      let contenedoresPuntos = container.querySelectorAll<HTMLElement>('g.recharts-layer.recharts-line-dots > circle#lineaMesActual');

      expect(contenedoresPuntos.length).toBe(0);
    });

    fireEvent.click(mesActualButton);

    await waitFor(()=> {
      // eslint-disable-next-line testing-library/no-container
      let contenedoresPuntos = container.querySelectorAll<HTMLElement>('g.recharts-layer.recharts-line-dots > circle#lineaMesActual');

      expect(contenedoresPuntos.length).toBe(4);
    });


    //------------------- Mes Anterior ----------------------
    fireEvent.click(mesAnteriorButton);

    await waitFor(()=> {
      // eslint-disable-next-line testing-library/no-container
      let contenedoresPuntos = container.querySelectorAll<HTMLElement>('g.recharts-layer.recharts-line-dots > circle#lineaMesAnterior');

      expect(contenedoresPuntos.length).toBe(0);
    });

    fireEvent.click(mesAnteriorButton);

    await waitFor(()=> {
      // eslint-disable-next-line testing-library/no-container
      let contenedoresPuntos = container.querySelectorAll<HTMLElement>('g.recharts-layer.recharts-line-dots > circle#lineaMesAnterior');

      expect(contenedoresPuntos.length).toBe(4);
    });

  });
});