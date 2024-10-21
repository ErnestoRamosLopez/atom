import { FC, useEffect, useState } from "react"
import moment from "moment"
import 'moment/locale/es'
import {ReactComponent as EyeIcon} from '@material-design-icons/svg/outlined/visibility.svg';
import { useNavigate, useParams } from "react-router-dom";
import ProductItem from "../../components/product-item/product-item.component";
import { OrderWithDetails } from "../../interfaces/OrderWithDetails";
import { useSelector } from "react-redux";
import { selectIsUserLoggedIn } from "../../store/user/user.selector";
import axios, { CancelTokenSource } from "axios";
import { apiUrl } from "../../utils/constantes.utils";


const OrdenDetalle : FC = () => {
    const isUserLoggedIn = useSelector(selectIsUserLoggedIn);

    const [order, setOrder] = useState<OrderWithDetails | null>(null);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const source = axios.CancelToken.source();
        if(!isUserLoggedIn){
            navigate('/');
            return;
        }

        fetchOrder(source);

        return () => {
            source.cancel("Operation canceled due to new request.");
        }
    }, [isUserLoggedIn]);

    const fetchOrder = async (cancelToken: CancelTokenSource) => {
        try{
            let ordenes = await axios.get(`${apiUrl}/orders/myOrders`, {
                cancelToken: cancelToken.token,
                params: {
                    orderId: id
                }
            });
            
            setOrder(ordenes.data[0]);
        }catch{
            setOrder(null);
        }
    }

    return (
        <div className="grid grid-cols-8 gap-y-4 gap-x-3">
            <span className="col-span-6 font-bold text-xl text-left">Detalles de la orden</span>
            <div className="col-span-2 justify-end">
                <button className="btn btn-primary" onClick={() => navigate('/ordenes')}>
                    Volver
                </button>
            </div>
            <div className="grid col-span-full text-left">
                <span><strong>Orden</strong> #{order?.id}</span>
                <span><strong>Fecha</strong>: {moment(order?.createdAt).locale('es').format('DD-MMMM.YYYY').replace('-', ' de ').replace('.', ' del ')}</span>
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
                order?.items.map((product) => 
                    <ProductItem key={product.id} scale={1.02} product={product} />
                )
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