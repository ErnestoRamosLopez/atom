import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/store";
import { initializeCheckout } from "../../store/checkout/checkout.actions";

interface OrderSuccessProps {

}

const OrderSuccess: FC<OrderSuccessProps> = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(initializeCheckout());
    }, []);
    
    return (
        <div className="order-success h-full">
            <div className="hero bg-base-200 h-full">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">Gracias por tu compra!</h1>
                        <p className="py-6">
                            Recibiras un correo con todos los detalles de la compra, 
                            te enviaremos correo con el estatus de tu pedido
                        </p>
                        <button className="btn btn-success" onClick={() => navigate('/tienda')}>Volver a la tienda</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderSuccess;