import { FC, Fragment, useEffect, useState } from "react";
import { logout } from "../../utils/login.utils";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsUserLoggedIn } from "../../store/user/user.selector";
import { selectCartTotal } from "../../store/cart/cart.selector";
import { useAppDispatch } from "../../store/store";
import { initializeCheckout } from "../../store/checkout/checkout.actions";
import { createOrder, updateUserCartCheckout } from "../../store/checkout/checkout.thunks";
import { selectHasAcceptedOrderSummary, selectIsCartUpdated, selectIsOrderCompleted, selectIsOrderReady, selectIsShipmentInformationValid } from "../../store/checkout/checkout.selector";
import ShippingDetails from "../../components/checkout-shipping-details/checkout-shipping-details.component";
import CheckoutOrderSummary from "../../components/checkout-order-summary/checkout-order-summary.component";
import { CheckoutPaymentDetails, CheckoutShipmentDetails } from "../../store/checkout/checkout.types";
import CheckoutPayment from "../../components/checkout-payment/checkout-payment.component";

const Checkout: FC<any> = () => {
    const isUserLoggedIn = useSelector(selectIsUserLoggedIn);
    const shoppingCartItems = useSelector(selectCartTotal);
    const isCartUpdated = useSelector(selectIsCartUpdated);
    const isShipmentValid = useSelector(selectIsShipmentInformationValid);
    const hasAcceptedOrder = useSelector(selectHasAcceptedOrderSummary);
    const isOrderReady = useSelector(selectIsOrderReady);
    const isOrderCompleted = useSelector(selectIsOrderCompleted);

    const [shippingInformation, setShippingInformation] = useState<CheckoutShipmentDetails | null>(null);
    const [total, setTotal] = useState<number | null>(0);
    const [paymentInformation, setPaymentInformation] = useState<CheckoutPaymentDetails | null>(null);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(initializeCheckout);
    }, [dispatch]);

    useEffect(() => {
        let promise = null;
        if(isOrderCompleted){
            return;
        }
        if(!isCartUpdated){
            promise = dispatch(updateUserCartCheckout());
        }

        return () => {
            if(promise){
                promise.abort();
            }
        };
    }, [isCartUpdated]);
    
    useEffect(() => {
        if(!isUserLoggedIn){
            logout(axios, navigate, dispatch, '/');
        }
        if(isOrderCompleted){
            return;
        }
        if(shoppingCartItems === 0){
            navigate('/carrito');
        }
    }, [isUserLoggedIn, shoppingCartItems]);

    useEffect(() => {
        let promise = null;
        const isValidInformation = shippingInformation && total !== null && total > 0 && paymentInformation;
        if(isOrderReady && isValidInformation){
            let params = {
                shippingInformation,
                total,
                paymentInformation
            }
            promise = dispatch(createOrder(params));
        }

        return () => {
            if(promise){
                promise.abort();
            }
        }
    }, [isOrderReady, shippingInformation, total, paymentInformation]);
    
    useEffect(() => {
        if(isOrderCompleted){
            navigate('/orderSuccess');
        }
    }, [isOrderCompleted]);

    const setShipping = (data: CheckoutShipmentDetails) => {
        setShippingInformation(data);
    }

    const setTotalOrder = (data: number | null) => {
        setTotal(data);
    }

    const setPayment = (data: CheckoutPaymentDetails) => {
        setPaymentInformation(data);
    }

    return (
        <div className="checkout flex flex-col justify-center">
            <h2 className=" text-left font-bold">Pantalla de pago</h2>
            {
                !isCartUpdated &&
                <Fragment>
                    <span className="">Loading...</span>
                </Fragment>
            }
            {
                isCartUpdated && 
                <div className="grid grid-cols-1">
                    <ul className="col-span-full steps steps-horizontal">
                        <li className="step step-primary">Domicilio y envio</li>
                        <li className={"step " + (isShipmentValid ? 'step-primary' : '')}>Resumen</li>
                        <li className={"step " + (hasAcceptedOrder ? 'step-primary' : '')}>Pago</li>
                    </ul>
                    <ShippingDetails hidden={isShipmentValid} setValuesFunction={setShipping}/>
                    <CheckoutOrderSummary hidden={!isShipmentValid || hasAcceptedOrder} setValuesFunction={setTotalOrder} shipmentPrice={shippingInformation?.shipmentPrice}/>
                    <CheckoutPayment hidden={!isShipmentValid || !hasAcceptedOrder} setValuesFunction={setPayment} />
                </div>
            }
            
        </div>
    )
}

export default Checkout;