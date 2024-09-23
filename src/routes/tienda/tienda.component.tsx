import { FC, useEffect, useState } from "react";
import {ReactComponent as SearchIcon} from '@material-design-icons/svg/outlined/search.svg';
import {ReactComponent as FilterIcon} from '@material-design-icons/svg/outlined/tune.svg';
import ProductItem from "../../components/product-item/product-item.component";
import axios from "axios";
import { Product } from "../../store/product/product.types";


const Tienda : FC = () => {
    const [_page, setPage] = useState(1);
    const [_perPage, setPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        getProducts();
    }, [_page]);

    const searchPage = (page: number) => setPage(page);

    const getProducts = async () => {
        const apiUrl = process.env.REACT_APP_API_BASE_URL ?? '';
        try{
            const productList = await axios.get(`${apiUrl}/products?_page=${_page}&_perPage=${_perPage}`);
            setProducts(productList.data);

            const totalCount = productList.headers['x-total-count'] ?? 0;
            setTotalPages(Math.round(totalCount / _perPage));
        }catch(ex){

        }
    };

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
            <div className="col-span-full grid grid-cols-8 gap-3 product-grid">
                {
                    products.map((product) => (
                        <div key={product.id} className="col-span-2">
                            <ProductItem product={product}/>
                        </div>
                    ))
                }
            </div>
            
            {
                totalPages >= 1 && 
                <div className="join col-span-full justify-center my-4 pagination">
                    {
                        Array.from({ length: totalPages }).map((item, index) => (
                            <button className={"join-item btn "+(index + 1 === _page ? 'btn-active' : '')} key={index} onClick={() => searchPage(index + 1)}>{index + 1 }</button>
                        ))
                    }
                </div>
            }
        </div>
    )
}

export default Tienda;