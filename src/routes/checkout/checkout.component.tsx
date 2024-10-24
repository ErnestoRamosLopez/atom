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
import { selectCheckoutDiscounts, selectCheckoutTotal, selectHasAcceptedOrderSummary, selectIsCartUpdated, selectIsOrderCompleted, selectIsOrderReady, selectIsShipmentInformationValid, selectPaymentInformation, selectShippingInformation } from "../../store/checkout/checkout.selector";
import ShippingDetails from "../../components/checkout-shipping-details/checkout-shipping-details.component";
import CheckoutOrderSummary from "../../components/checkout-order-summary/checkout-order-summary.component";
import CheckoutPayment from "../../components/checkout-payment/checkout-payment.component";

const Checkout: FC<any> = () => {
    const isUserLoggedIn = useSelector(selectIsUserLoggedIn);
    const shoppingCartItems = useSelector(selectCartTotal);
    const isCartUpdated = useSelector(selectIsCartUpdated);
    const isShipmentValid = useSelector(selectIsShipmentInformationValid);
    const hasAcceptedOrder = useSelector(selectHasAcceptedOrderSummary);
    const isOrderReady = useSelector(selectIsOrderReady);
    const isOrderCompleted = useSelector(selectIsOrderCompleted);
    const shippingInformation = useSelector(selectShippingInformation);
    const checkoutTotal = useSelector(selectCheckoutTotal);
    const paymentInformation = useSelector(selectPaymentInformation);
    const discounts = useSelector(selectCheckoutDiscounts);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(initializeCheckout());
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
        const isValidInformation = shippingInformation && checkoutTotal > 0 && paymentInformation;
        if(isOrderReady && isValidInformation){
            let params = {
                shippingInformation,
                total: checkoutTotal,
                paymentInformation,
                discounts
            }
            promise = dispatch(createOrder(params));
        }

        return () => {
            if(promise){
                promise.abort();
            }
        }
    }, [isOrderReady, shippingInformation, checkoutTotal, paymentInformation]);
    
    useEffect(() => {
        if(isOrderCompleted){
            navigate('/orderSuccess');
        }
    }, [isOrderCompleted]);

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
                    <ShippingDetails hidden={isShipmentValid}/>
                    <CheckoutOrderSummary hidden={!isShipmentValid || hasAcceptedOrder}/>
                    <CheckoutPayment hidden={!isShipmentValid || !hasAcceptedOrder} />
                </div>
            }
            
        </div>
    )
}

export default Checkout;