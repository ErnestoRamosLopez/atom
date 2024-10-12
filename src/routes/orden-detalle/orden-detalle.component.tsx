import { FC, useEffect, useState } from "react"
import { CartItem } from "../../store/cart/cart.types"
import moment from "moment"
import 'moment/locale/es'
import {ReactComponent as EyeIcon} from '@material-design-icons/svg/outlined/visibility.svg';
import ScalableDiv from "../../utils/styled-components/scalable-div.styled";
import { useParams } from "react-router-dom";
import {  orderDetail } from "../../utils/constantes-test.utils";

export interface OrderDetailsProps{
    id: number,
    total: number,
    date: string,
    status: string,
    products: CartItem[]
}

const OrdenDetalle : FC = () => {
    const { id } = useParams();
    const [order, setOrder] = useState<OrderDetailsProps | null>(null);

    useEffect(() => {
        setOrder( orderDetail );
    }, []);

    return (
        <div className="grid grid-cols-8 gap-y-4 gap-x-3">
            <span className="col-span-6 font-bold text-xl text-left">Detalles de la orden</span>
            <div className="col-span-2 justify-end">
                <button className="btn btn-primary">
                    Volver
                </button>
            </div>
            <div className="grid col-span-full text-left">
                <span><strong>Orden</strong> #{order?.id}</span>
                <span><strong>Fecha</strong>: {moment(order?.date).locale('es').format('DD-MMMM.YYYY').replace('-', ' de ').replace('.', ' del ')}</span>
                <span><strong>Total</strong>: {order?.total}</span>
                <div className="flex space-x-3">
                    <span><strong>Estatus</strong>: {order?.status}</span>
                    <button className="btn btn-sm btn-circle">
                        <EyeIcon />
                    </button>
                </div>
            </div>
            {/* Tabla  */}
            <div className="grid grid-cols-9 col-span-full text-left card-body">
                <span className="col-span-2">Imagen</span>
                <span className="col-span-2">Nombre</span>
                <span className="col-span-2">Cantidad</span>
                <span className="col-span-2">Precio</span>
                <span className="col-span-1">Total</span>
            </div>
            {
                order?.products.map((product) => {
                    const total = Math.round(product.price * product.quantity * 100)/100;
                    return (
                        <ScalableDiv key={product.id} className="col-span-full card border border-2 hover:bg-base-300" scale={1.02}>
                            <div className="card-body grid grid-cols-9">
                                <div className="col-span-2 flex ">
                                    <img src={product.imageUrl} alt="" className="h-20" />
                                </div>
                                <div className="col-span-2 flex ">
                                    <span className="my-auto">{product.name}</span>
                                </div>
                                <div className="col-span-2 flex ">
                                    <span className="my-auto">{product.quantity}</span>
                                </div>
                                <div className="col-span-2 flex ">
                                    <span className="my-auto">{product.price}</span>
                                </div>
                                <div className="col-span-1 flex ">
                                    <span className="my-auto">{total}</span>
                                </div>
                            </div>
                        </ScalableDiv>
                        
                    )
                })
            }
            <div className="col-span-3 flex justify-start my-3">
                <button className="btn btn-primary">
                    Tengo un problema
                </button>
            </div>
        </div>
    )
}

export default OrdenDetalle;