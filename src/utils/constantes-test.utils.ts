import moment from "moment";
import 'moment/locale/es';
import { OrderDetailsProps } from "../routes/orden-detalle/orden-detalle.component";
import { Product } from "../store/product/product.types";

export const ordenesAnosList = [
    2019,
    2020,
    2021
];

export const mesesList = [
    ...moment.localeData('es').months().map((month) => month[0].toUpperCase() + month.slice(1))
];

export const ordenesList = [
    {
        id: 1,
        fecha: '20240101',
        productos: [
            'https://fastly.picsum.photos/id/865/200/200.jpg?hmac=YU_vd-bJ6z9YfrQwr6tDOm--FtikU1rNpyxItCoIOgQ',
            'https://fastly.picsum.photos/id/611/200/200.jpg?hmac=1Tkz2gFbAArMMLUWylD-8s6PzYgu0sPIdO71hlp9Xs0',
            'https://fastly.picsum.photos/id/315/200/200.jpg?hmac=cE5OEQSh9gvXqkP0fkrmaSbqLfc_KQdDPtH7yBbeuiQ',
            'https://fastly.picsum.photos/id/865/200/200.jpg?hmac=YU_vd-bJ6z9YfrQwr6tDOm--FtikU1rNpyxItCoIOgQ',
            'https://fastly.picsum.photos/id/611/200/200.jpg?hmac=1Tkz2gFbAArMMLUWylD-8s6PzYgu0sPIdO71hlp9Xs0',
            'https://fastly.picsum.photos/id/315/200/200.jpg?hmac=cE5OEQSh9gvXqkP0fkrmaSbqLfc_KQdDPtH7yBbeuiQ',
            'https://fastly.picsum.photos/id/865/200/200.jpg?hmac=YU_vd-bJ6z9YfrQwr6tDOm--FtikU1rNpyxItCoIOgQ',
            'https://fastly.picsum.photos/id/611/200/200.jpg?hmac=1Tkz2gFbAArMMLUWylD-8s6PzYgu0sPIdO71hlp9Xs0',
            'https://fastly.picsum.photos/id/315/200/200.jpg?hmac=cE5OEQSh9gvXqkP0fkrmaSbqLfc_KQdDPtH7yBbeuiQ',
            'https://fastly.picsum.photos/id/865/200/200.jpg?hmac=YU_vd-bJ6z9YfrQwr6tDOm--FtikU1rNpyxItCoIOgQ',
            'https://fastly.picsum.photos/id/611/200/200.jpg?hmac=1Tkz2gFbAArMMLUWylD-8s6PzYgu0sPIdO71hlp9Xs0',
            'https://fastly.picsum.photos/id/315/200/200.jpg?hmac=cE5OEQSh9gvXqkP0fkrmaSbqLfc_KQdDPtH7yBbeuiQ',
        ]
    },
    {
        id: 2,
        fecha: '20240202',
        productos: [
            '',
            '',
            ''
        ]
    },
    {
        id: 3,
        fecha: '20240303',
        productos: [
            'https://fastly.picsum.photos/id/865/200/200.jpg?hmac=YU_vd-bJ6z9YfrQwr6tDOm--FtikU1rNpyxItCoIOgQ',
            'https://fastly.picsum.photos/id/611/200/200.jpg?hmac=1Tkz2gFbAArMMLUWylD-8s6PzYgu0sPIdO71hlp9Xs0',
            'https://fastly.picsum.photos/id/315/200/200.jpg?hmac=cE5OEQSh9gvXqkP0fkrmaSbqLfc_KQdDPtH7yBbeuiQ',
            'https://fastly.picsum.photos/id/865/200/200.jpg?hmac=YU_vd-bJ6z9YfrQwr6tDOm--FtikU1rNpyxItCoIOgQ',
            'https://fastly.picsum.photos/id/611/200/200.jpg?hmac=1Tkz2gFbAArMMLUWylD-8s6PzYgu0sPIdO71hlp9Xs0',
            'https://fastly.picsum.photos/id/315/200/200.jpg?hmac=cE5OEQSh9gvXqkP0fkrmaSbqLfc_KQdDPtH7yBbeuiQ',
            'https://fastly.picsum.photos/id/865/200/200.jpg?hmac=YU_vd-bJ6z9YfrQwr6tDOm--FtikU1rNpyxItCoIOgQ',
            'https://fastly.picsum.photos/id/611/200/200.jpg?hmac=1Tkz2gFbAArMMLUWylD-8s6PzYgu0sPIdO71hlp9Xs0',
            'https://fastly.picsum.photos/id/315/200/200.jpg?hmac=cE5OEQSh9gvXqkP0fkrmaSbqLfc_KQdDPtH7yBbeuiQ',
        ]
    },
    {
        id: 4,
        fecha: '20240404',
        productos: [
            'https://fastly.picsum.photos/id/865/200/200.jpg?hmac=YU_vd-bJ6z9YfrQwr6tDOm--FtikU1rNpyxItCoIOgQ',
            'https://fastly.picsum.photos/id/611/200/200.jpg?hmac=1Tkz2gFbAArMMLUWylD-8s6PzYgu0sPIdO71hlp9Xs0',
            'https://fastly.picsum.photos/id/315/200/200.jpg?hmac=cE5OEQSh9gvXqkP0fkrmaSbqLfc_KQdDPtH7yBbeuiQ',
            'https://fastly.picsum.photos/id/865/200/200.jpg?hmac=YU_vd-bJ6z9YfrQwr6tDOm--FtikU1rNpyxItCoIOgQ',
            'https://fastly.picsum.photos/id/611/200/200.jpg?hmac=1Tkz2gFbAArMMLUWylD-8s6PzYgu0sPIdO71hlp9Xs0',
            'https://fastly.picsum.photos/id/315/200/200.jpg?hmac=cE5OEQSh9gvXqkP0fkrmaSbqLfc_KQdDPtH7yBbeuiQ',
            'https://fastly.picsum.photos/id/865/200/200.jpg?hmac=YU_vd-bJ6z9YfrQwr6tDOm--FtikU1rNpyxItCoIOgQ',
            'https://fastly.picsum.photos/id/611/200/200.jpg?hmac=1Tkz2gFbAArMMLUWylD-8s6PzYgu0sPIdO71hlp9Xs0',
            'https://fastly.picsum.photos/id/315/200/200.jpg?hmac=cE5OEQSh9gvXqkP0fkrmaSbqLfc_KQdDPtH7yBbeuiQ',
        ]
    },
    {
        id: 5,
        fecha: '20240505',
        productos: [
            '',
            '',
            ''
        ]
    },
    {
        id: 6,
        fecha: '20240606',
        productos: [
           'https://fastly.picsum.photos/id/865/200/200.jpg?hmac=YU_vd-bJ6z9YfrQwr6tDOm--FtikU1rNpyxItCoIOgQ',
        ]
    },
    {
        id: 7,
        fecha: '20240707',
        productos: [
            'https://fastly.picsum.photos/id/865/200/200.jpg?hmac=YU_vd-bJ6z9YfrQwr6tDOm--FtikU1rNpyxItCoIOgQ',
            'https://fastly.picsum.photos/id/611/200/200.jpg?hmac=1Tkz2gFbAArMMLUWylD-8s6PzYgu0sPIdO71hlp9Xs0',
        ]
    },
    {
        id: 8,
        fecha: '20240808',
        productos: [
           'https://fastly.picsum.photos/id/865/200/200.jpg?hmac=YU_vd-bJ6z9YfrQwr6tDOm--FtikU1rNpyxItCoIOgQ',
            'https://fastly.picsum.photos/id/611/200/200.jpg?hmac=1Tkz2gFbAArMMLUWylD-8s6PzYgu0sPIdO71hlp9Xs0',
            'https://fastly.picsum.photos/id/315/200/200.jpg?hmac=cE5OEQSh9gvXqkP0fkrmaSbqLfc_KQdDPtH7yBbeuiQ',
            'https://fastly.picsum.photos/id/865/200/200.jpg?hmac=YU_vd-bJ6z9YfrQwr6tDOm--FtikU1rNpyxItCoIOgQ',
           'https://fastly.picsum.photos/id/865/200/200.jpg?hmac=YU_vd-bJ6z9YfrQwr6tDOm--FtikU1rNpyxItCoIOgQ',
        ]
    },
    {
        id: 9,
        fecha: '20240909',
        productos: [
           'https://fastly.picsum.photos/id/865/200/200.jpg?hmac=YU_vd-bJ6z9YfrQwr6tDOm--FtikU1rNpyxItCoIOgQ',
           'https://fastly.picsum.photos/id/865/200/200.jpg?hmac=YU_vd-bJ6z9YfrQwr6tDOm--FtikU1rNpyxItCoIOgQ',
            'https://fastly.picsum.photos/id/611/200/200.jpg?hmac=1Tkz2gFbAArMMLUWylD-8s6PzYgu0sPIdO71hlp9Xs0',
            'https://fastly.picsum.photos/id/315/200/200.jpg?hmac=cE5OEQSh9gvXqkP0fkrmaSbqLfc_KQdDPtH7yBbeuiQ',
            'https://fastly.picsum.photos/id/865/200/200.jpg?hmac=YU_vd-bJ6z9YfrQwr6tDOm--FtikU1rNpyxItCoIOgQ',
            'https://fastly.picsum.photos/id/611/200/200.jpg?hmac=1Tkz2gFbAArMMLUWylD-8s6PzYgu0sPIdO71hlp9Xs0',
            'https://fastly.picsum.photos/id/315/200/200.jpg?hmac=cE5OEQSh9gvXqkP0fkrmaSbqLfc_KQdDPtH7yBbeuiQ',
            'https://fastly.picsum.photos/id/865/200/200.jpg?hmac=YU_vd-bJ6z9YfrQwr6tDOm--FtikU1rNpyxItCoIOgQ',
            'https://fastly.picsum.photos/id/611/200/200.jpg?hmac=1Tkz2gFbAArMMLUWylD-8s6PzYgu0sPIdO71hlp9Xs0',
            'https://fastly.picsum.photos/id/315/200/200.jpg?hmac=cE5OEQSh9gvXqkP0fkrmaSbqLfc_KQdDPtH7yBbeuiQ',
            'https://fastly.picsum.photos/id/865/200/200.jpg?hmac=YU_vd-bJ6z9YfrQwr6tDOm--FtikU1rNpyxItCoIOgQ',
            'https://fastly.picsum.photos/id/611/200/200.jpg?hmac=1Tkz2gFbAArMMLUWylD-8s6PzYgu0sPIdO71hlp9Xs0',
            'https://fastly.picsum.photos/id/315/200/200.jpg?hmac=cE5OEQSh9gvXqkP0fkrmaSbqLfc_KQdDPtH7yBbeuiQ',
            'https://fastly.picsum.photos/id/865/200/200.jpg?hmac=YU_vd-bJ6z9YfrQwr6tDOm--FtikU1rNpyxItCoIOgQ',
            'https://fastly.picsum.photos/id/611/200/200.jpg?hmac=1Tkz2gFbAArMMLUWylD-8s6PzYgu0sPIdO71hlp9Xs0',
            'https://fastly.picsum.photos/id/315/200/200.jpg?hmac=cE5OEQSh9gvXqkP0fkrmaSbqLfc_KQdDPtH7yBbeuiQ',
            'https://fastly.picsum.photos/id/865/200/200.jpg?hmac=YU_vd-bJ6z9YfrQwr6tDOm--FtikU1rNpyxItCoIOgQ',
            'https://fastly.picsum.photos/id/611/200/200.jpg?hmac=1Tkz2gFbAArMMLUWylD-8s6PzYgu0sPIdO71hlp9Xs0',
            'https://fastly.picsum.photos/id/315/200/200.jpg?hmac=cE5OEQSh9gvXqkP0fkrmaSbqLfc_KQdDPtH7yBbeuiQ',
            'https://fastly.picsum.photos/id/865/200/200.jpg?hmac=YU_vd-bJ6z9YfrQwr6tDOm--FtikU1rNpyxItCoIOgQ',
            'https://fastly.picsum.photos/id/611/200/200.jpg?hmac=1Tkz2gFbAArMMLUWylD-8s6PzYgu0sPIdO71hlp9Xs0',
            'https://fastly.picsum.photos/id/315/200/200.jpg?hmac=cE5OEQSh9gvXqkP0fkrmaSbqLfc_KQdDPtH7yBbeuiQ',
            'https://fastly.picsum.photos/id/865/200/200.jpg?hmac=YU_vd-bJ6z9YfrQwr6tDOm--FtikU1rNpyxItCoIOgQ',
            'https://fastly.picsum.photos/id/611/200/200.jpg?hmac=1Tkz2gFbAArMMLUWylD-8s6PzYgu0sPIdO71hlp9Xs0',
            'https://fastly.picsum.photos/id/315/200/200.jpg?hmac=cE5OEQSh9gvXqkP0fkrmaSbqLfc_KQdDPtH7yBbeuiQ',
            'https://fastly.picsum.photos/id/865/200/200.jpg?hmac=YU_vd-bJ6z9YfrQwr6tDOm--FtikU1rNpyxItCoIOgQ',
            'https://fastly.picsum.photos/id/611/200/200.jpg?hmac=1Tkz2gFbAArMMLUWylD-8s6PzYgu0sPIdO71hlp9Xs0',
            'https://fastly.picsum.photos/id/315/200/200.jpg?hmac=cE5OEQSh9gvXqkP0fkrmaSbqLfc_KQdDPtH7yBbeuiQ',
            'https://fastly.picsum.photos/id/865/200/200.jpg?hmac=YU_vd-bJ6z9YfrQwr6tDOm--FtikU1rNpyxItCoIOgQ',
            'https://fastly.picsum.photos/id/611/200/200.jpg?hmac=1Tkz2gFbAArMMLUWylD-8s6PzYgu0sPIdO71hlp9Xs0',
            'https://fastly.picsum.photos/id/315/200/200.jpg?hmac=cE5OEQSh9gvXqkP0fkrmaSbqLfc_KQdDPtH7yBbeuiQ',
            'https://fastly.picsum.photos/id/865/200/200.jpg?hmac=YU_vd-bJ6z9YfrQwr6tDOm--FtikU1rNpyxItCoIOgQ',
            'https://fastly.picsum.photos/id/611/200/200.jpg?hmac=1Tkz2gFbAArMMLUWylD-8s6PzYgu0sPIdO71hlp9Xs0',
            'https://fastly.picsum.photos/id/315/200/200.jpg?hmac=cE5OEQSh9gvXqkP0fkrmaSbqLfc_KQdDPtH7yBbeuiQ',
            'https://fastly.picsum.photos/id/865/200/200.jpg?hmac=YU_vd-bJ6z9YfrQwr6tDOm--FtikU1rNpyxItCoIOgQ',
            'https://fastly.picsum.photos/id/611/200/200.jpg?hmac=1Tkz2gFbAArMMLUWylD-8s6PzYgu0sPIdO71hlp9Xs0',
            'https://fastly.picsum.photos/id/315/200/200.jpg?hmac=cE5OEQSh9gvXqkP0fkrmaSbqLfc_KQdDPtH7yBbeuiQ',
        ]
    },
];

export const destacadosList = [
    {
        icono: 'shopping_cart.svg',
        nombre: 'Ordenes en curso',
        numeroPendiente: 9,
        backgroundColor: 'bg-rose-400',
        textColor: 'text-white'
    },
    {
        icono: 'star.svg',
        nombre: 'Lista de deseados',
        numeroPendiente: 35,
        backgroundColor: 'bg-fuchsia-600',
        textColor: 'text-white'
    },
    {
        icono: 'star.svg',
        nombre: 'Lista de deseados',
        numeroPendiente: 35,
        backgroundColor: 'bg-fuchsia-600',
        textColor: 'text-white'
    }
];

export const inboxList = [
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
];

export const actividadList = [
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
];

export const gastosList = [
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

export const shoppingItemsList = [
    {
        productId: 1,
        iconUrl: 'https://fastly.picsum.photos/id/845/200/200.jpg?hmac=KMGSD70gM0xozvpzPM3kHIwwA2TRlVQ6d2dLW_b1vDQ',
        name: 'Tele',
        price: 299.11,
        quantity: 15,
    },
    {
        productId: 2,
        iconUrl: 'https://fastly.picsum.photos/id/514/200/200.jpg?hmac=ywW8zoc6PM1wbLeZvKJPGczujmQgEM7QOTaWiOTjhjM',
        name: 'Nintendo switch',
        price: 25.11,
        quantity: 6,
    },
    {
        productId: 3,
        iconUrl: 'https://fastly.picsum.photos/id/841/200/200.jpg?hmac=jAPzaXgN_B37gVuIQvmtuRCmYEC0lJP86OZexH1yam4',
        name: 'Agua',
        price: 20,
        quantity: 2,
    },
    {
        productId: 4,
        iconUrl: 'https://fastly.picsum.photos/id/63/200/200.jpg?hmac=qWHuiJWhQdWUspXyFKWgfsomzV1IvMNFZQ0hlDl8RZc',
        name: 'Taza',
        price: 42,
        quantity: 2,
    },
    {
        productId: 5,
        iconUrl: 'https://fastly.picsum.photos/id/585/200/200.jpg?hmac=xPWUtHiddZixyCUwkNykuZcN4myA3sY2ewf9zFRc7oM',
        name: 'Memoria usb',
        price: 80,
        quantity: 1,
    },
];

export const orderDetail : OrderDetailsProps = {
    id: 1,
    total: 23000,
    status: 'entregado', 
    date: '2020-09-16',
    products: [
        {
            id: 1,
            name: 'Television samsung',
            imageUrl: 'https://fastly.picsum.photos/id/516/200/200.jpg?hmac=CsDADXBJh2feopw8BAy8PQ6Ma5u0as6pKj5EuJ7zyMw',
            quantity: 23,
            price: 6.90,
        },
        {
            id: 2,
            name: 'Iphone',
            imageUrl: 'https://fastly.picsum.photos/id/615/200/200.jpg?hmac=dtUr9nHZQ2Q9aTaRUG-DbStwQeKUNwxAXn3snkihUI4',
            quantity: 1,
            price: 7000,
        },
        {
            id: 3,
            name: 'Disco duro Adata 1tb',
            imageUrl: 'https://fastly.picsum.photos/id/273/200/200.jpg?hmac=q1g4PnYVQHWkGBWnLmy3VaiQHuPGrZXnpZK986TwkFg',
            quantity: 1,
            price: 2000,
        },
        {
            id: 4,
            name: 'Baterias AAA',
            imageUrl: 'https://fastly.picsum.photos/id/650/200/200.jpg?hmac=gu3C13pBxCSHokbnumczMYlmWRLt3CFGx1sDaPpfRnk',
            quantity: 2,
            price: 79.99,
        },
        {
            id: 5,
            name: 'Impresora epson',
            imageUrl: 'https://fastly.picsum.photos/id/694/200/200.jpg?hmac=XDsL53lxiWu9Ht6OLBlFVliuBDn24o7KV0pAqMFKHbk',
            quantity: 1,
            price: 5499,
        },
        {
            id: 6,
            name: 'Tarjeta de regalo',
            imageUrl: 'https://fastly.picsum.photos/id/693/200/200.jpg?hmac=7KcC6ytdAPoUzLmXyr1r5hDXHyYQL-W1P40rRURkouE',
            quantity: 1,
            price: 200.00,
        },
        {
            id: 7,
            name: 'Monitor 27 pulgadas',
            imageUrl: 'https://fastly.picsum.photos/id/1073/200/200.jpg?hmac=LPcHRYBCZpePYgP88_kX9NqVC1Jcdqch62FZtUH_s-s',
            quantity: 1,
            price: 4300.99,
        }
    ]
}

export const productList : Product[] = [
    {
        id: 1,
        price: 7,
        name: "Huawei P Smart Z",
        imageUrl: 'https://fastly.picsum.photos/id/923/200/200.jpg?hmac=3VHvOqFmO1AmGdpW-XcIVVb5CSOm5AwgyYRt9jYWAvo'
    },
    {
        id: 2,
        price: 31,
        name: "LG LG-500",
        imageUrl: 'https://fastly.picsum.photos/id/538/200/200.jpg?hmac=oJRLJPsN8ZdWjPpKGEU-oqAZMBKa4JsTnuUSqgRbyP4'
    },
    {
        id: 3,
        price: 77,
        name: "Samsung Z600",
        imageUrl: 'https://fastly.picsum.photos/id/179/200/200.jpg?hmac=I0g6Uht7h-y3NHqWA4e2Nzrnex7m-RceP1y732tc4Lw'
    },
    {
        id: 4,
        price: 21,
        name: "vivo Y20G",
        imageUrl: 'https://fastly.picsum.photos/id/418/200/200.jpg?hmac=FPLIYEnmfmXtqHPsuZvUzJeXJJbbxMWNq6Evh7mMSN4'
    },
    {
        id: 5,
        price: 93,
        name: "Lenovo Tab P11",
        imageUrl: 'https://fastly.picsum.photos/id/533/200/200.jpg?hmac=HvhCl1BSaQrsbedBJm-X8gfnZGp_222QGZ-mYnstPiA'
    },
    {
        id: 6,
        price: 42,
        name: "HTC Wildfire E1 plus",
        imageUrl: 'https://fastly.picsum.photos/id/423/200/200.jpg?hmac=fXwRSSVHFlYgq9MfObWaWCb_p9L6ysOWda9lLOtAWc0'
    },
    {
        id: 7,
        price: 94,
        name: "Samsung D600",
        imageUrl: 'https://fastly.picsum.photos/id/34/200/200.jpg?hmac=XRWBHNng_p1BDrqV2tGH2Fbk12qD7KRzoufu_JIJW20'
    },
    {
        id: 8,
        price: 18,
        name: "Siemens SX66",
        imageUrl: 'https://fastly.picsum.photos/id/1029/200/200.jpg?hmac=CQyxD4azaGb2UDjepBq254UP9v1mF-_rBhYVx8Jw8rs'
    },
    {
        id: 9,
        price: 60,
        name: "Motorola StarTAC 130",
        imageUrl: 'https://fastly.picsum.photos/id/937/200/200.jpg?hmac=8ePB28CQ2kANO2nsqXZ4GA-tQ6YTCG1MgZBnDsimIdQ'
    },
    {
        id: 10,
        price: 28,
        name: "Nokia 3650",
        imageUrl: 'https://fastly.picsum.photos/id/134/200/200.jpg?hmac=a3L-JjVSGeG8w3SdNpzxdh8WSC0xHJXgeD6QryCK7pU'
    },
    {
        id: 11,
        price: 93,
        name: "Samsung E950",
        imageUrl: 'https://fastly.picsum.photos/id/44/200/200.jpg?hmac=W5KcqhapHjBgEIHGQpQnX6o9jdOXQEVCKEdGIohjisY'
    },
    {
        id: 12,
        price: 66,
        name: "Qtek 8100",
        imageUrl: 'https://fastly.picsum.photos/id/478/200/200.jpg?hmac=YfKBYcZHT991lmrKfB0pYNaztmUvQecXbVrc5V4mj8E'
    },
    {
        id: 13,
        price: 64,
        name: "BLU C6",
        imageUrl: 'https://fastly.picsum.photos/id/487/200/200.jpg?hmac=acsZoF1o2OcaX5f6QJScaXgr19-izrth6ECMjr7hG9M'
    },
    {
        id: 14,
        price: 27,
        name: "Xiaomi Mi Max 4 Pro",
        imageUrl: 'https://fastly.picsum.photos/id/1040/200/200.jpg?hmac=l5Cp_plxzlfQobWWyd5uqBPiqjX1CApBpWP3w8DzYK0'
    },
    {
        id: 15,
        price: 77,
        name: "Ericsson A2628",
        imageUrl: 'https://fastly.picsum.photos/id/406/200/200.jpg?hmac=RkvoDL29GdYFLEDajHXtCCieqAjWVp9vl__A-D6bddw'
    },
    {
        id: 16,
        price: 55,
        name: "Lenovo S720",
        imageUrl: 'https://fastly.picsum.photos/id/940/200/200.jpg?hmac=bIX4juxj93bHJKYbdztQYmQByF-1mM6YI2ec9UrnrTo'
    },
    {
        id: 17,
        price: 59,
        name: "Sony Xperia Tablet Z Wi-Fi",
        imageUrl: 'https://fastly.picsum.photos/id/302/200/200.jpg?hmac=pq7hvNyk4pwuEe5cs2qejMNTc7S1kgev72rC8bSHdJE'
    },
    {
        id: 18,
        price: 53,
        name: "Karbonn S5 Titanium",
        imageUrl: 'https://fastly.picsum.photos/id/941/200/200.jpg?hmac=kQpV3E7TgV1yMW4b1IDbV6zJqEvKVw9CTK4RkI14kmQ'
    },
    {
        id: 19,
        price: 47,
        name: "Blackview A10",
        imageUrl: 'https://fastly.picsum.photos/id/931/200/200.jpg?hmac=htOesDJIBiVYN2fj1J6jQqQC-qu81A24bW_tcpe5Hxg'
    },
    {
        id: 20,
        price: 83,
        name: "Samsung Galaxy Ace II X S7560M",
        imageUrl: 'https://fastly.picsum.photos/id/588/200/200.jpg?hmac=amAMbyBq8ZvuCFGI8jPIt928PLIRtxNQ33bISsbDAys'
    }
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