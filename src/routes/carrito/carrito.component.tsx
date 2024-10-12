import { FC } from "react";
import ShoppingCart from "../../components/shopping-cart/shopping-cart.component";

const Carrito : FC = () => {
    return (
        <div>
            <ShoppingCart isDropdown={false}/>
        </div>
    )
}

export default Carrito;