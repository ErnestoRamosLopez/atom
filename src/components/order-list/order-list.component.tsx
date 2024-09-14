import moment from "moment";
import { Fragment, useState } from "react";
import 'moment/locale/es';
import {ReactComponent as SortIcon} from '@material-design-icons/svg/outlined/sort.svg';
import CarouselWithButtons from "../carousel-with-buttons/carousel-with-buttons.component";
import { mesesList, ordenesAnosList, ordenesList } from "../../utils/constantes-test.utils";

const OrderList = () => {
    
    const [ordenesAnos] = useState(ordenesAnosList);
    const [ordenes] = useState(ordenesList);
    const [sortBy, setSortBy] = useState('old');

    const handleClick = (sort: string) => {
        const elem = document.activeElement;
        if (elem) {
          (elem as HTMLElement).blur();
        }
        setSortBy(sort);
    };
    
    return (
        <div className="grid grid-cols-8 gap-y-4 gap-x-3">
            <span className="col-span-full font-bold text-xl text-left">Mis ordenes</span>
            <div className="grid col-span-2 text-left">
                <span>Año</span>
                <select className="select select-bordered w-full max-w-xs" defaultValue={''}>
                    <option value={''}>Seleccione</option>
                    {ordenesAnos.map((item, index) => (
                        <option key={index} value={item}>{item}</option>
                    ))}
                </select>
            </div>
            <div className="grid col-span-2 text-left">
                <span>Mes</span>
                <select className="select select-bordered w-full max-w-xs" defaultValue={''}>
                    <option value={''}>Seleccione</option>
                    {mesesList.map((item, index) => (
                        <option key={index} value={index}>{item}</option>
                    ))}
                </select>
            </div>
            <div className="grid col-span-2 text-left items-end">
                <div className="dropdown dropdown-bottom">
                    <div tabIndex={0} role="button" className="btn btn-circle">
                        <SortIcon />
                    </div>
                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                        <li className={(sortBy === 'new' ? 'bg-base-300 ' : '') + 'rounded'}><button onClick={() => handleClick('new')}>
                                Nuevos primero
                        </button></li>
                        <li className={(sortBy === 'old' ? 'bg-base-300 ' : '') + 'rounded'}><button onClick={() => handleClick('old')}>
                                Antiguos primero
                        </button></li>
                    </ul>
                </div>
            </div>
            <div className="flex col-span-2 items-end gap-x-3 justify-end">
                <button className="btn btn-secondary">
                    Limpiar filtros
                </button>
                <button className="btn btn-primary">
                    Buscar
                </button>
            </div>
            <div className="grid col-span-full">
                {
                    ordenes.map((item) => (
                        <div key={item.id} className="card grid grid-cols-8 my-3 min-h-48 border">
                            <div className="card-body grid grid-cols-6 col-span-7 text-left">
                               <span>Folio: {item.id}</span>
                               <span>Fecha: {moment(item.fecha).format('DD/MMMM/YYYY')}</span>
                                <CarouselWithButtons 
                                    mainContainerClass="grid grid-cols-6 col-span-full" 
                                    previousButtonContainerClass="col-span-1"
                                    itemsContainerClass="col-span-4 flex items-center"
                                    nextButtonContainerClass="col-span-1"
                                >
                                    <Fragment>
                                        {item.productos.map((item, index) => 
                                            <div key={index} className="carousel-item ms-0 mx-5">
                                                <div className="card bg-base-100 shadow-xlrd">
                                                    <img className="h-20" src={item} alt=""/>
                                                </div>
                                            </div>
                                        )}
                                    </Fragment>
                                </CarouselWithButtons>
                            </div>
                            <div className="rounded-lg ">
                                <button className="btn h-full w-full">Detalles</button>
                            </div>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default OrderList;