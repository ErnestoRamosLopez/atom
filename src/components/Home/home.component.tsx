import React, { FC, Fragment, useState } from 'react';
import './home.styles.css';
import Destacados from '../destacados/destacados.component';
import moment from 'moment';
import {ReactComponent as CheckIcon} from '../../assets/icons/check.svg';
import {ReactComponent as LineIcon} from '../../assets/icons/horizontal_rule.svg';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface HomeProps {}

const listaInboxH = [
  {
    id: 123456,
    mensaje: 'Esperando orden #12345',
    hora: '2024-01-01 04:39'
  },
  {
    id: 1234567,
    mensaje: 'Soporte id #22334',
    hora: '2024-01-01 11:07'
  }
]

const listaActividadH = [
  {
    id: 1,
    mensaje: 'Confirma actualizacion de pedido',
    hora: '2024-01-01 04:39',
    estatus: 1,
    prioridad: 0
  },
  {
    id: 2,
    mensaje: 'Confirma tus datos de envio',
    hora: '2024-01-01 11:07',
    estatus: 2,
    prioridad: 0
  },
  {
    id: 3,
    mensaje: 'Crea una nueva orden',
    hora: '2024-01-01 11:07',
    estatus: 3,
    prioridad: 4
  },
  {
    id: 4,
    mensaje: 'Actualiza tu metodo de pago',
    hora: '2024-01-01 11:07',
    estatus: 1,
    prioridad: 5
  }
]

const data = [
  {
    name: 'Semana 1',
    mesActual: 2000,
    mesAnterior: 2400
  },
  {
    name: 'Semana 2',
    mesActual: 500,
    mesAnterior: 1600
  },
  {
    name: 'Semana 3',
    mesActual: 5000,
    mesAnterior: 1400
  },
  {
    name: 'Semana 4',
    mesActual: 500,
    mesAnterior: 600
  },
];

const Home: FC<HomeProps> = () => {
  const [listaInbox] = useState(listaInboxH);
  const [listaActividad] = useState(listaActividadH);
  const [ocultarMesActual, setOcultarMesActual] = useState(false);
  const [ocultarMesAnterior, setOcultarMesAnterior] = useState(false);

  function getBackground(estatus: number): string{
    switch(estatus){
      case 1: return 'btn-primary';
      case 2: return 'bg-error';
      case 3: return 'bg-white';
      default: return 'btn-primary'
    }
  }

  function getPrioridadMensaje(estatus: number): string{
    switch(estatus){
      case 0: return 'URGENTE';
      case 4: return 'NUEVO';
      case 5: return 'DEFAULT';
      default: return 'DEFAULT';
    }
  }

  function getPrioridadBackground(estatus: number): string {
    switch(estatus){
      case 0: return 'btn-warning';
      case 4: return 'btn-success';
      case 5: return 'btn-neutral';
      default: return 'btn-neutral';
    }
  }

  function ocultarLinea(mes: number){
    if(mes === 1 ){
      setOcultarMesActual(!ocultarMesActual);
    }else{
      setOcultarMesAnterior(!ocultarMesAnterior);
    }
  }

  return (
  <div className="Home h-full mx-16">
    <Destacados />
    <div className='grid grid-cols-2 mt-5 gap-5'>
      <div className='grid auto-rows-min gap-5'>
        <div className='row-span-1 border p-3'>
          <div className='flex justify-between w-full mb-10'>
            <span className='font-bold text-xl'>Inbox</span>
            <button className='btn btn-link'>Ver detalles</button>
          </div>
          <div className='grid grid-cols-8'>
            {listaInbox.map((item, index) => 
              <Fragment key={item.id}>
                <span className='col-span-6 text-left'>{item.mensaje}</span>
                <span className='col-span-2'>{moment(item.hora).format('hh:mm')}</span>
                {
                  index !== listaInbox.length-1 && <div className="divider col-span-full"></div>
                }
              </Fragment>
            )}
          </div>
        </div>
        <div className='row-span-1 border p-3'>
          <div className='flex justify-between w-full mb-10'>
            <span className='font-bold text-xl'>Actividad reciente</span>
            <button className='btn btn-link'>Ver todo</button>
          </div>
          <div className='grid grid-cols-8'>
            {listaActividad.map((item, index) => {
              const buttonEstatusBackground = getBackground(item.estatus);
              const buttonPrioridadBackground = getPrioridadBackground(item.prioridad);
              const prioridadMensaje = getPrioridadMensaje(item.prioridad);
              return (
              <Fragment key={item.id}>
                <div className={"btn btn-circle "+buttonEstatusBackground}>
                  {
                    item.estatus === 1 && <CheckIcon />
                  }
                </div>
                <span className='col-span-5 text-left'>{item.mensaje}</span>
                <button className={"btn "+buttonPrioridadBackground}>{prioridadMensaje}</button>
                {
                  index !== listaActividad.length-1 && <div className="divider col-span-full"></div>
                }
              </Fragment>
            )})}
          </div>
        </div>
      </div>
      
      <div className='border p-2'>
        <div className='grid grid-cols-2 mb-3'>
          <div className='grid grid-cols-1 text-left'>
            <span className='font-bold text-xl'>Gastos del mes</span>
            <span className='text-neutral text-sm'>Septiembre</span>
          </div>
          <div className='grid grid-cols-1'>
            <button className='flex align-center' onClick={() => ocultarLinea(1)}>
              <LineIcon className='text-primary' />
              <span className={ocultarMesActual ? 'line-through' : ''}>Septiembre</span>
            </button>
            <button className='flex align-center w-min' onClick={() => ocultarLinea(2)}>
              <LineIcon className='text-neutral-content'/>
              <span className={(ocultarMesAnterior ? 'line-through' : '')}>Agosto</span>
            </button>
          </div>
        </div>
        <div className='h-4/6 w-full'>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" hide={ocultarMesActual} dataKey="mesActual" stroke="oklch(var(--p))" activeDot={{ r: 1 }} />
            <Line type="monotone" hide={ocultarMesAnterior} dataKey="mesAnterior" stroke="oklch(var(--nc))" />
          </LineChart>
        </ResponsiveContainer>
        </div>
        
        
      </div>
    </div>
  </div>
);
}

export default Home;
