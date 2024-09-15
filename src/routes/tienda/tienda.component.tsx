import { FC, useState } from "react";
import {ReactComponent as SearchIcon} from '@material-design-icons/svg/outlined/search.svg';
import {ReactComponent as FilterIcon} from '@material-design-icons/svg/outlined/tune.svg';
import { productList } from "../../utils/constantes-test.utils";
import ProductItem from "../../components/product-item/product-item.component";


const Tienda : FC = () => {
    const [products] = useState(productList);

    return (
        <div className="grid grid-cols-4">
            <span className="col-span-full text-left font-bold text-lg my-3">Tienda</span>
            <div className="col-span-2 flex w-80">
                <label className="input input-bordered flex items-center gap-2">
                    <input type="text" className="grow" placeholder="Buscar" />
                    <SearchIcon className="h-4 w-4" />
                </label>
            </div>
            <div className="col-span-2 flex justify-end">
                <button className="btn">
                    <FilterIcon className="h-4 w-4" />
                    Filtrar
                </button>
            </div>
            <div className="col-span-full grid grid-cols-8 gap-3">
                {
                    products.map((product) => (
                        <div key={product.id} className="col-span-2">
                            <ProductItem product={product}/>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Tienda;