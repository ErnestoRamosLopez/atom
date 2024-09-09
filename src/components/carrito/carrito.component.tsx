import { FC } from "react"

interface CarritoProps {
    isDropdown: boolean
}
const Carrito: FC<CarritoProps> = ({isDropdown}) => {
    return (
        <div
            tabIndex={0}
            className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
            <div className="card-body">
                <span className="text-lg font-bold">8 Items</span>
                <span className="text-info">Subtotal: $999</span>
                <div className="card-actions">
                    <button className="btn btn-primary btn-block">View cart</button>
                </div>
            </div>
        </div>
    );
}

export default Carrito;